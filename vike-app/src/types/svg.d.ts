// TypeScript module declarations for importing SVG files in React projects.
//
// These declarations enable two patterns:
//
// 1. Importing SVGs as React components (for inline use, styling, animation, etc.):
//    import Logo from "./logo.svg?react";
//    <Logo style={{ width: 32, height: 32 }} />
//
// 2. Importing SVGs as URLs (for <img src=...> or favicon links):
//    import logoUrl from "./logo.svg";
//    <img src={logoUrl} />
//
// The ?react query is recommended for React component usage with vite-plugin-svgr.

declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
