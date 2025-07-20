/**
 * Firebase Authentication Proxy Worker for Cloudflare Pages
 *
 * PURPOSE:
 * This worker acts as a proxy for Firebase Authentication endpoints, enabling
 * Firebase Auth redirect flow to work on static hosting platforms like Cloudflare Pages.
 *
 * WHY THIS IS NECESSARY:
 *
 * 1. STATIC HOSTING LIMITATION:
 *    - Firebase Auth redirect flow expects `/__/auth/handler` and other auth endpoints
 *    - Static hosting (Cloudflare Pages) can't natively serve these dynamic endpoints
 *    - Without this proxy, `getRedirectResult()` fails and OAuth redirects break
 *
 * 2. CORS REQUIREMENTS:
 *    - Firebase auth endpoints need proper CORS headers for browser security
 *    - Direct requests to Firebase from static sites can be blocked by CORS
 *    - This worker adds necessary CORS headers to all responses
 *
 * 3. MIME TYPE HANDLING:
 *    - Firebase serves JavaScript files that need correct `application/javascript` MIME type
 *    - Incorrect MIME types cause browser security errors and script execution failures
 *
 * WHAT IT DOES:
 *
 * 1. PROXIES FIREBASE AUTH REQUESTS:
 *    - Intercepts all requests to `/__/auth/*` paths
 *    - Forwards them to the actual Firebase project (`bkinsey808-firebase.firebaseapp.com`)
 *    - Returns Firebase's response with enhanced headers
 *
 * 2. ADDS CORS SUPPORT:
 *    - Handles preflight OPTIONS requests
 *    - Adds CORS headers to all responses
 *    - Enables cross-origin requests from the frontend
 *
 * 3. ENSURES PROPER CONTENT TYPES:
 *    - Sets correct MIME type for JavaScript files
 *    - Prevents "Refused to execute script" errors
 *
 * DEPLOYMENT:
 * - Deployed as a Cloudflare Worker
 * - Bound to route: `https://nextgen.bardoshare.com/__/auth/*`
 * - Environment variable: FIREBASE_AUTH_HANDLER_HOST=bkinsey808-firebase.firebaseapp.com
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    console.log("Incoming request:", url.pathname);
    console.log("Query parameters:", url.searchParams.toString());

    /**
     * FIREBASE AUTH PROXY HANDLER
     *
     * Handles all Firebase authentication-related requests by proxying them
     * to the actual Firebase project and returning the response with proper
     * CORS headers and content types.
     */
    if (url.pathname.startsWith("/__/auth/")) {
      /**
       * CORS PREFLIGHT HANDLER
       *
       * Browsers send OPTIONS requests before actual requests to check CORS permissions.
       * We respond with appropriate CORS headers to allow the actual request.
       */
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400", // Cache preflight for 24 hours
          },
        });
      }

      /**
       * REQUEST PROXYING SETUP
       *
       * Construct the target Firebase URL and prepare headers for the proxied request.
       * We modify the URL to point to the actual Firebase project while keeping
       * the same path and query parameters.
       */
      const firebaseHost = env.FIREBASE_AUTH_HANDLER_HOST;
      const proxiedUrl = new URL(request.url);
      proxiedUrl.protocol = "https:";
      proxiedUrl.hostname = firebaseHost;

      console.log("Proxied URL:", proxiedUrl.toString());

      /**
       * HEADER PREPARATION
       *
       * Copy essential headers from the original request but filter out headers
       * that might cause issues when proxying (like Host, which we override).
       */
      const headers = new Headers();
      headers.set("Host", firebaseHost);
      headers.set(
        "User-Agent",
        request.headers.get("User-Agent") || "Mozilla/5.0"
      );
      headers.set("Accept", request.headers.get("Accept") || "*/*");
      headers.set(
        "Accept-Language",
        request.headers.get("Accept-Language") || "en-US,en;q=0.5"
      );

      /**
       * PRESERVE IMPORTANT HEADERS
       *
       * Keep referer and content-type headers if they exist, as Firebase
       * may need them for proper authentication flow handling.
       */
      if (request.headers.get("Referer")) {
        headers.set("Referer", request.headers.get("Referer"));
      }

      /**
       * CONTENT-TYPE HANDLING FOR POST REQUESTS
       *
       * For POST requests (like OAuth token exchanges), preserve the
       * Content-Type header so Firebase can properly parse the request body.
       */
      if (request.method === "POST" && request.headers.get("Content-Type")) {
        headers.set("Content-Type", request.headers.get("Content-Type"));
      }

      /**
       * CREATE PROXIED REQUEST
       *
       * Build the actual request to send to Firebase with:
       * - Modified URL pointing to Firebase
       * - Filtered/enhanced headers
       * - Original body for POST requests
       * - Follow redirects automatically
       */
      const proxiedRequest = new Request(proxiedUrl.toString(), {
        method: request.method,
        headers: headers,
        body: request.method === "POST" ? request.body : null,
        redirect: "follow", // Let the worker handle redirects automatically
      });

      try {
        /**
         * EXECUTE PROXIED REQUEST
         *
         * Send the request to Firebase and process the response.
         * We clone the response to read the body while preserving
         * the original response for return.
         */
        const response = await fetch(proxiedRequest);
        console.log("Response status:", response.status);

        // Clone response to read body without consuming the original
        const responseClone = response.clone();
        const responseBody = await responseClone.text();
        console.log("Response body length:", responseBody.length);

        /**
         * RESPONSE HEADER PREPARATION
         *
         * Copy all headers from Firebase's response, then add/override
         * specific headers needed for CORS and proper content types.
         */
        const responseHeaders = new Headers();

        // Copy all original headers from Firebase
        for (const [key, value] of response.headers) {
          responseHeaders.set(key, value);
        }

        /**
         * ADD CORS HEADERS
         *
         * These headers are essential for the browser to allow
         * cross-origin requests from our frontend domain.
         */
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        responseHeaders.set(
          "Access-Control-Allow-Methods",
          "GET, POST, OPTIONS"
        );
        responseHeaders.set("Access-Control-Allow-Headers", "Content-Type");

        /**
         * ENSURE CORRECT MIME TYPES
         *
         * Firebase serves JavaScript files that browsers need to recognize
         * as executable scripts. Without the correct MIME type, browsers
         * will refuse to execute the scripts, breaking authentication.
         */
        if (url.pathname.endsWith(".js")) {
          responseHeaders.set("Content-Type", "application/javascript");
        }

        /**
         * RETURN ENHANCED RESPONSE
         *
         * Create a new response with the original body and status,
         * but with our enhanced headers that include CORS support
         * and correct content types.
         */
        const newResponse = new Response(responseBody, {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
        });

        return newResponse;
      } catch (error) {
        /**
         * ERROR HANDLING
         *
         * If the proxied request fails, log the error and return
         * a 500 status. This helps with debugging connection issues
         * or Firebase service problems.
         */
        console.error("Error during fetch:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }

    /**
     * FALLBACK FOR NON-AUTH REQUESTS
     *
     * This worker only handles Firebase auth endpoints. Any other
     * requests should not reach this worker based on our route
     * configuration, but we return 404 as a safety measure.
     */
    return new Response("Not found", { status: 404 });
  },
};
