// This file is required to ensure Vike prerenders the root route ('/') as a static HTML file.
// Without `prerender: true`, Vike will not generate `dist/client/index.html` during `build:spa`,
// which is necessary for Capacitor/Android to load the SPA from local assets.
export default {
  prerender: true,
};
