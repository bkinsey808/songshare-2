# TODO: Deploy vike-app SSR to nextgen.bardoshare.com via Cloudflare Workers

This checklist outlines all steps required to deploy the SSR version of vike-app to nextgen.bardoshare.com using Cloudflare Workers, without interfering with the root cloudflare-worker (used for auth).

---

## 1. Prepare Environment Variables

- [ ] Identify all environment variables and secrets actually required by `vike-app` for SSR (API keys, endpoints, etc.).
- [ ] Ignore Firebase or expo-app-specific variables unless they are also used by SSR in `vike-app`.
- [ ] List and document only the variables/secrets needed for SSR functionality.
- [ ] Add these variables to the Cloudflare Worker environment (via dashboard or `wrangler.toml`).

## 2. Configure vike-app for SSR on Workers

- [ ] Ensure SSR build output is compatible with Cloudflare Workers (ESM, no Node.js built-ins).
- [ ] Use `vike-cloudflare` for SSR integration (already present in dependencies).
- [ ] Create or update the Worker entry point in `vike-app` (e.g., `vike-app/dist/cloudflare/worker.js` or similar) to handle SSR requests.
- [ ] Update `wrangler.toml` in `vike-app` to set the correct name, route, and env vars for nextgen.bardoshare.com.

## 3. Build and Deploy

- [ ] Run `pnpm build:ssr` in `vike-app` to generate the SSR bundle.
- [ ] Run `pnpm deploy:ssr` to deploy the Worker using Wrangler.

## 4. Cloudflare Dashboard Configuration

- [ ] In Cloudflare dashboard, go to Workers > your Worker > Settings > Variables and add all required environment variables.
- [ ] Under "Workers Routes", set a route for `nextgen.bardoshare.com/*` to your new Worker.
- [ ] Remove or disable the Pages project for `nextgen.bardoshare.com` to avoid conflicts.
- [ ] Ensure DNS for `nextgen.bardoshare.com` is set to "proxied" (orange cloud).

## 5. Test and Validate

- [ ] Visit https://nextgen.bardoshare.com and verify SSR is working as expected.
- [ ] Check Cloudflare Worker logs for errors or missing env vars.
- [ ] Test all critical app flows, especially those involving authentication and API calls.

## 6. Documentation and Clean Up

- [ ] Update `docs/CLOUDFLARE.md` and `docs/DEPLOYING.md` to reflect the new SSR Worker deployment process.
- [ ] Remove or archive any old deployment scripts or configs related to Pages for this subdomain.

---

**Note:**

- Do NOT modify or interfere with the root-level `cloudflare-worker/` directory, as it is required for authentication and other concerns.
- All package management should use `pnpm`.
- Follow project coding, documentation, and security guidelines as outlined in the `docs/` folder.
