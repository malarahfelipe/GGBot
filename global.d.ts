/// <reference types="deskgap" />

declare const PRERENDER: boolean;

declare interface NodeModule {
  hot: any;
}

declare interface Window {
  STATE: any;
}

declare namespace JSX {
  interface Element { }
  interface IntrinsicElements { }
  interface HTMLAttributes {
    decoding?: string;
  }
}

declare module 'classnames' {
  export default function classnames(...args: any[]): string;
}
