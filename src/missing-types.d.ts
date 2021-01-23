
// Handling file-loader imports:
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.wasm' {
  const content: string;
  export default content;
}

declare module 'url-loader!*' {
  const value: string;
  export default value;
}

interface HTMLImageElement {
  decode: (() => Promise<void>) | undefined;
}

interface CanvasRenderingContext2D {
  imageSmoothingQuality: 'low' | 'medium' | 'high';
}

declare module '*.scss'

declare module '*.css'

declare var VERSION: string;
