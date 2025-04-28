# Deploying to Cloudflare

This document outlines the steps to deploy your web app and Node.js server to Cloudflare.

## Prerequisites

1. A Cloudflare account.
2. A registered domain connected to Cloudflare.
3. The Cloudflare CLI (`wrangler`) installed. You can install it using npm:
   ```bash
   npm install -g wrangler
   ```
4. Your Node.js server code ready for deployment.

## Deploying the Web App

1. **Build the Web App**

   - Run the build command for your web app to generate the production-ready files. For example:
     ```bash
     npm run build
     ```

2. **Upload to Cloudflare Pages**
   - Log in to your Cloudflare account.
   - Navigate to the **Pages** section.
   - Create a new project and connect it to your Git repository or manually upload the build files.
   - Configure the build settings if needed and deploy the app.

## Deploying the Node.js Server

1. **Set Up a Cloudflare Worker**

   - Use the `wrangler` CLI to create a new Cloudflare Worker project:
     ```bash
     wrangler init my-node-server
     ```

2. **Configure the Worker**

   - Update the `wrangler.toml` file with your project details, such as the account ID and zone ID.
   - Add any required environment variables to the `wrangler.toml` file.

3. **Write the Worker Code**

   - Replace the default Worker code with your Node.js server logic. Note that Cloudflare Workers use a lightweight runtime and may require adjustments to your Node.js code.

4. **Deploy the Worker**

   - Run the following command to deploy the Worker:
     ```bash
     wrangler publish
     ```

5. **Test the Deployment**
   - Access the deployed Worker using the provided URL and verify its functionality.

## Additional Notes

- Ensure that your DNS settings in Cloudflare are correctly configured to route traffic to the deployed web app and Worker.
- Review Cloudflare's documentation for advanced features like caching, custom domains, and security settings.
