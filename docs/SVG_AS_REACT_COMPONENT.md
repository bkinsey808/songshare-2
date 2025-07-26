## Advanced: Manually Constructing SVGs with JSX

You can also create SVG icons as pure React components by translating SVG XML to JSX. This gives you full control, no build tooling required, and works for any SVG content.

**Example:**

```tsx
// src/icons/HammerLogo.tsx
import * as React from "react";

export function HammerLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="hammer"
      width="41.217"
      height="41.217"
      version="1.1"
      viewBox="-50 -50 41.217 41.217"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <mask id="mask111">
          <rect
            x="-19.21"
            y="-25.7"
            width="46.217"
            height="41.217"
            fill="url(#linearGradient115)"
          />
        </mask>
        <linearGradient
          id="linearGradient115"
          x1="-25.395"
          x2="-25.395"
          y1="-9.3005"
          y2="-18.03"
          gradientTransform="matrix(1.0589 0 0 .94436 30.79 24.3)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" />
          <stop stopColor="#fff" offset="1" />
        </linearGradient>
      </defs>
      <g transform="translate(-33.29,-24.3)" mask="url(#mask111)">
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="m-8.511-10.449 1.126 4.064 2.707-2.765z" fill="#ababab" />
          <path
            d="m-2.273-24.496-6.238 14.047 3.833 1.299 6.238-14.048z"
            fill="#949494"
          />
          <path d="m-2.273-24.496 3.465-1.204.368 2.502z" fill="#ababab" />
          <path
            d="m17.511 4.674-2.707 2.766-22.189-13.825 2.707-2.765z"
            fill="#949494"
          />
        </g>
        <g stroke="#878787">
          <path d="m-9.045 20.369-1.169 2.634" strokeWidth="9.6" />
          <path
            d="m-12.418 23.191c-1.85-1.153-2.326-2.132-1.086-2.238 1.239-.106 3.642.709 5.493 1.862s2.326 2.132 1.087 2.238c-1.24.106-3.643-.709-5.494-1.862"
            fill="#878787"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m-11.248 20.557c1.851 1.153 4.254 1.968 5.493 1.862 1.24-.106.764-1.085-1.086-2.238-1.851-1.153-4.254-1.968-5.494-1.862-1.239.106-.764 1.085 1.087 2.238"
            fill="#878787"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
```

**When to use:**

- For custom icons, when you want full control, or if you want to avoid build-time SVG tooling.
- You can copy-paste SVG XML and convert attributes to JSX (e.g., `class` → `className`, `stroke-linecap` → `strokeLinecap`).

# SVG as React Component Usage

## Best Practice: SVGs as React Components (with `?react`)

For icons, logos, or graphics that need to be styled, animated, or manipulated in React, use the following pattern:

1. **Place your SVG in `src/icons/` or another folder inside `src/`.**
2. **Import the SVG as a React component using the `?react` query:**

   ```tsx
   import LogoSvg from "@/icons/logo.svg?react";

   export function Logo() {
     return (
       <LogoSvg
         style={{ width: 64, height: 64 }}
         role="img"
         aria-label="logo"
       />
     );
   }
   ```

3. **TypeScript Setup:**
   Add this to `src/types/svg.d.ts` if not already present:

   ```ts
   declare module "*.svg?react" {
     import * as React from "react";
     const ReactComponent: React.FunctionComponent<
       React.SVGProps<SVGSVGElement>
     >;
     export default ReactComponent;
   }
   ```

4. **Advantages:**
   - Style SVGs with props, className, or inline styles
   - Animate or manipulate SVGs with React state/logic
   - Compose, reuse, or conditionally render SVGs as part of your component tree

## For Static Assets (Favicons, etc.)

- Place all static assets (SVG, PNG, etc.) needed by URL in the `public/` directory.
- Reference them by URL in your code or HTML, e.g.:

  ```tsx
  <img src="/logo.svg" alt="Logo" />
  <link rel="icon" type="image/svg+xml" href="/logo.svg" />
  ```

## References

- See [docs/STATIC_ASSETS.md](./STATIC_ASSETS.md) for asset placement best practices.
