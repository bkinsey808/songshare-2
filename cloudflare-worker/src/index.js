export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    console.log("Incoming request:", url.pathname);
    console.log("Query parameters:", url.searchParams.toString());

    // Only proxy /__/auth/handler requests
    if (url.pathname.startsWith("/__/auth/handler")) {
      const firebaseHost = env.FIREBASE_AUTH_HANDLER_HOST;
      const proxiedUrl = new URL(request.url);
      proxiedUrl.protocol = "https:";
      proxiedUrl.hostname = firebaseHost;

      console.log("Proxied URL:", proxiedUrl.toString());

      // Simplified headers - only keep essential ones
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

      // Keep referer if present
      if (request.headers.get("Referer")) {
        headers.set("Referer", request.headers.get("Referer"));
      }

      const proxiedRequest = new Request(proxiedUrl.toString(), {
        method: request.method,
        headers: headers,
        body: request.body,
        redirect: "follow", // Changed from manual to follow
      });

      try {
        const response = await fetch(proxiedRequest);
        console.log("Response status:", response.status);

        // Clone response to read body
        const responseClone = response.clone();
        const responseBody = await responseClone.text();
        console.log("Response body length:", responseBody.length);

        // Return original response with proper headers
        const newResponse = new Response(responseBody, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });

        return newResponse;
      } catch (error) {
        console.error("Error during fetch:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  },
};
