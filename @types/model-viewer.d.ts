export declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.AllHTMLAttributes<
          Partial<globalThis.HTMLElementTagNameMap['model-viewer']>
        > & { ar?: boolean } & { autoplay?: boolean },
        Partial<globalThis.HTMLElementTagNameMap['model-viewer']>
      >;
    }
  }
}
