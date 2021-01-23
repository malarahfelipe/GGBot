const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WatchTimestampsPlugin = require('./config/watch-timestamps-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const WorkerPlugin = require('worker-plugin')
const AutoSWPlugin = require('./config/auto-sw-plugin')
const CrittersPlugin = require('critters-webpack-plugin')
const AssetTemplatePlugin = require('./config/asset-template-plugin')
const addCssTypes = require('./config/add-css-types')

function readJson (filename) {
  return JSON.parse(fs.readFileSync(filename))
}

const VERSION = readJson('./package.json').version

const outputPath = path.join(__dirname, 'app', 'build')

module.exports = async function (_, env) {
  const isProd = env.mode === 'production'
  const nodeModules = path.join(__dirname, 'node_modules')
  const componentStyleDirs = [
    path.join(__dirname, 'src/components'),
    path.join(__dirname, 'src/codecs'),
    path.join(__dirname, 'src/custom-els'),
    path.join(__dirname, 'src/lib'),
  ]

  await addCssTypes(componentStyleDirs, { watch: !isProd })

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/index',
    devtool: isProd ? 'source-map' : 'inline-source-map',
    stats: 'minimal',
    output: {
      filename: isProd ? '[name].[chunkhash:5].js' : '[name].js',
      chunkFilename: '[name].[chunkhash:5].js',
      path: outputPath,
      publicPath: '/',
      globalObject: 'self'
    },
    resolve: {
      extensions: ['.wasm', '.json', '.ts', '.tsx', '.mjs', '.js', '.scss', '.css'],
      fallback: {
        "path": require.resolve("path-browserify"),
        "util": require.resolve("util"),
        "fs": require.resolve("fs"),
        "os": require.resolve("os-browserify/browser"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "stream": require.resolve("stream-browserify"),
        "zlib": require.resolve("browserify-zlib")
      },
      alias: {
        style: path.join(__dirname, 'src/style'),
        "@": path.join(__dirname, 'src'),
      }
    },
    resolveLoader: {
      alias: {
        // async-component-loader returns a wrapper component that waits for the import to load before rendering:
        async: path.join(__dirname, 'config/async-component-loader')
      }
    },
    module: {
      // Disable the default JavaScript handling:
      defaultRules: [],
      rules: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.node$/,
          loader: "native-ext-loader"
        },
        {
          oneOf: [
            {
              test: /(\.mjs|\.esm\.js)$/i,
              type: 'javascript/esm',
              resolve: {},
              parser: {
                harmony: true,
                amd: false,
                commonjs: false,
                system: false,
                requireInclude: false,
                requireEnsure: false,
                requireContext: false,
                browserify: false,
                requireJs: false,
                node: false
              }
            },
            {
              type: 'javascript/auto',
              resolve: {},
              parser: {
                system: false,
                requireJs: false
              }
            }
          ]
        },
        {
          test: /\.(scss|sass)$/,
          loader: 'sass-loader',
          // SCSS gets preprocessed, then treated like any other CSS:
          enforce: 'pre',
          options: {
            sourceMap: true,
            sassOptions: {
              includePaths: [nodeModules]
            }
          }
        },
        {
          test: /\.(scss|sass|css)$/,
          // Only enable CSS Modules within `src/components/*`
          include: componentStyleDirs,
          use: [
            // In production, CSS is extracted to files on disk. In development, it's inlined into JS:
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isProd ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
                  namedExport: true,
                  exportLocalsConvention: "camelCaseOnly"
                },
                importLoaders: 1,
                sourceMap: isProd,
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.(scss|sass|css)$/,
          // Process non-modular CSS everywhere *except* `src/components/*`
          exclude: componentStyleDirs,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: isProd
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.tsx?$/,
          exclude: nodeModules,
          loader: 'ts-loader'
        },
        {
          // All the codec files define a global with the same name as their file name. `exports-loader` attaches those to `module.exports`.
          test: /\/codecs\/.*\.js$/,
          loader: 'exports-loader'
        },
        {
          test: /\/codecs\/.*\.wasm$/,
          // This is needed to make webpack NOT process wasm files.
          // See https://github.com/webpack/webpack/issues/6725
          type: 'javascript/auto',
          loader: 'file-loader',
          options: {
            name: '[name].[hash:5].[ext]',
          },
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[hash:5].[ext]',
          },
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(
        /(fs|crypto|path|codecs)/
      ),

      // Pretty progressbar showing build progress:
      new ProgressBarPlugin({
        format: '\u001b[90m\u001b[44mBuild\u001b[49m\u001b[39m [:bar] \u001b[32m\u001b[1m:percent\u001b[22m\u001b[39m (:elapseds) \u001b[2m:msg\u001b[22m\r',
        renderThrottle: 100,
        summary: false,
        clear: true
      }),

      // Remove old files before outputting a production build:
      // TODO: verify that
      // isProd && new CleanWebpackPlugin([
      //   'assets',
      //   '**/*.{css,js,json,html,map}'
      // ], {
      //   root: outputPath,
      //   verbose: false,
      //   beforeEmit: true
      // }),

      new WorkerPlugin(),

      // Automatically split code into async chunks.
      // See: https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      isProd && new webpack.optimize.SplitChunksPlugin({}),

      // In production, extract all CSS to produce files on disk, even for
      // lazy-loaded CSS chunks. CSS for async chunks is loaded on-demand.
      // This is a modern Webpack 4 replacement for ExtractTextPlugin.
      // See: https://github.com/webpack-contrib/mini-css-extract-plugin
      // See also: https://twitter.com/wsokra/status/970253245733113856
      isProd && new MiniCssExtractPlugin({
        filename: '[name].[contenthash:5].css',
        chunkFilename: '[name].[contenthash:5].css'
      }),

      // These plugins fix infinite loop in typings-for-css-modules-loader.
      // See: https://github.com/Jimdo/typings-for-css-modules-loader/issues/35
      new webpack.WatchIgnorePlugin(
        { paths: [ `${path.join(`${__dirname}`, 'src')}/**/*.d.ts` ] }
      ),
      new WatchTimestampsPlugin(
        { paths: [ `${path.join(`${__dirname}`, 'src')}/**/*.d.ts` ], patterns: /(c|sc|sa)ss\.d\.ts$/ }
      ),

      // TODO:For now we're not doing SSR.
      new HtmlPlugin({
        filename: path.join(outputPath, 'index.html'),
        template: false && isProd ? '!!prerender-loader?string!src/index.html' : 'src/index.html',
        minify: isProd && {
          collapseWhitespace: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeRedundantAttributes: true,
          removeComments: true
        },
        inject: 'body',
        compile: true
      }),

      new AutoSWPlugin({ version: VERSION }),

      isProd && new AssetTemplatePlugin({
        template: path.join(__dirname, '_headers.ejs'),
        filename: '_headers',
      }),

      isProd && new AssetTemplatePlugin({
        template: path.join(__dirname, '_redirects.ejs'),
        filename: '_redirects',
      }),

      // Inline constants during build, so they can be folded by UglifyJS.
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(VERSION),
        // We set node.process=false later in this config.
        // Here we make sure if (process && process.foo) still works:
        process: '{}'
      }),

      // Copying files via Webpack allows them to be served dynamically by `webpack serve`
      new CopyPlugin({
        patterns: [{ from: 'src/assets', to: 'assets' }]
      }),

      // For production builds, output module size analysis to build/report.html
      isProd && new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        openAnalyzer: false
      }),

      // // Inline Critical CSS (for the intro screen, essentially)
      // isProd && new CrittersPlugin({
      //   // use <link rel="stylesheet" media="not x" onload="this.media='all'"> hack to load async css:
      //   preload: 'media',
      //   // inline all styles from any stylesheet below this size:
      //   inlineThreshold: 2000,
      //   // don't bother lazy-loading non-critical stylesheets below this size, just inline the non-critical styles too:
      //   minimumExternalSize: 4000,
      //   // don't emit <noscript> external stylesheet links since the app fundamentally requires JS anyway:
      //   noscriptFallback: false,
      //   // inline the tiny data URL fonts we have for the intro screen:
      //   inlineFonts: true,
      //   // (and don't lazy load them):
      //   preloadFonts: false
      // })
    ].filter(Boolean), // Filter out any falsey plugin array entries.

    optimization: {
      minimizer: [
        new TerserPlugin({
          //sourceMap: isProd,
          extractComments: path.join(outputPath, 'licenses.txt'),
          terserOptions: {
            compress: {
              inline: 1
            },
            mangle: {
              safari10: true
            },
            output: {
              safari10: true
            }
          }
        })
      ]
    },

    // Turn off various NodeJS environment polyfills Webpack adds to bundles.
    // They're supposed to be added only when used, but the heuristic is loose
    // (eg: existence of a variable called setImmedaite in any scope)
    node: {
      // Keep global, it's just an alias of window and used by many third party modules:
      global: true,
      // Inline __filename and __dirname values:
      __filename: false,
      __dirname: false,
      /*
      console: false,
      // Turn off process to avoid bundling a nextTick implementation:
      process: false,
      // Never embed a portable implementation of Node's Buffer module:
      Buffer: false,
      // Never embed a setImmediate implementation:
      setImmediate: false
      */
    },
    devServer: {
      // Any unmatched request paths will serve static files from src/*:
      contentBase: path.join(__dirname, 'src'),
      compress: true,
      // Request paths not ending in a file extension serve index.html:
      historyApiFallback: true,
      // Suppress forwarding of Webpack logs to the browser console:
      clientLogLevel: 'info',
      // Supress the extensive stats normally printed after a dev build (since sizes are mostly useless):
      stats: 'minimal',
      // Don't embed an error overlay ("redbox") into the client bundle:
      overlay: false
    },
    target: 'node'
  }
}
