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

interface ModelViewerProps extends React.HTMLProps<HTMLDivElement> {
  id: string;
  "ar": true;
  "ar-scale": string;
  "camera-controls": true;
  "touch-action": string;
  "auto-rotate": true;
  "src": string;
  "shadow-intensity": string;
  "alt": string;
  "title": string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerProps;
    }
  }
}