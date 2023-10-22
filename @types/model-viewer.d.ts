export declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.AllHTMLAttributes<
          Partial<globalThis.HTMLElementTagNameMap['model-viewer']>
        > & { ar?: boolean }, // Thêm thuộc tính "ar" vào đây
        Partial<globalThis.HTMLElementTagNameMap['model-viewer']>
      >;
    }
  }
}
