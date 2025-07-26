#!/bin/bash
# deploy-ssr.sh


# Extract variables from .env
ACCOUNT_ID=$(grep CLOUDFLARE_ACCOUNT_ID .env | cut -d '=' -f2)
PAGES_NAME=$(grep CLOUDFLARE_PAGES_NAME .env | cut -d '=' -f2)

# Substitute both variables in the template
sed "s|\${CLOUDFLARE_ACCOUNT_ID}|$ACCOUNT_ID|g; s|\${CLOUDFLARE_PAGES_NAME}|$PAGES_NAME|g" wrangler.template.toml > wrangler.toml

wrangler deploy