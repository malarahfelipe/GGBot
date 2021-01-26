module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: {
    mode: 'layers',
    layers: ['base', 'components', 'utilities'],
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.ts',
      './src/**/*.js',
      './src/**/*.jsx'
    ],
    preserveHtmlElements: true
  },
  theme: {
    fontSize: {
      '4xxs': '.275rem',
      '2xxs': '.475rem',
      xxs: '.675rem',
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    extend: {
      colors: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        'cool-gray': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cfd8e3',
          400: '#97a6ba',
          500: '#64748b',
          600: '#475569',
          700: '#364152',
          800: '#27303f',
          900: '#1a202e'
        }
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
}
