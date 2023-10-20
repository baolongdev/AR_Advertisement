declare module '@google/model-viewer' {
  namespace ModelViewerElement {
    export interface ModelViewerAttributes {
      ar?: boolean;
    }
  }
}

export declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.AllHTMLAttributes<
          Partial<globalThis.HTMLElementTagNameMap['model-viewer']>
        >,
        Partial<globalThis.HTMLElementTagNameMap['model-viewer']>
      >;
    }
  }
}