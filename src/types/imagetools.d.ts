// imagetools.d.ts
// https://github.com/microsoft/TypeScript/issues/38638
/** append imagetools to the import when using image tool query params */
declare module '*&imagetools' {
  const value: FunctionComponent<
    Omit<
      ImgHTMLAttributes<HTMLImageElement>,
      'width' | 'height' | 'src' | 'srcSet'
    >
  >;
  export default value;
}
