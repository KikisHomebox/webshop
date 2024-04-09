# Hydrogen template: Skeleton

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

**Requirements:**

- Node.js version 16.14.0 or higher
- You have the staff role on the Shopify store that you're working with
- You have Apps and channels permissions on the Shopify store that you're working with

**Creating .env -file**

- Create empty file '.env'
- Get your API from Shopify
- Edit the '.env' file to:
```bash
SESSION_SECRET="foobar"
PUBLIC_STOREFRONT_API_TOKEN="your_API_token"
PUBLIC_STORE_DOMAIN="your_website_address"
```

[Getting started with the Storefront API](https://shopify.dev/docs/custom-storefronts/building-with-the-storefront-api/getting-started)

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```
## How to run tests

To run the tests, you need to first set the developer password in your environment variables. This can be done in two ways:

1. Using the `export` command in your terminal:

```bash
export LOGIN_PASSWORD=yourpassword
```
replace `yourpassword` with the actual password.

2. Add a line to `.test.env` file:

```bash
LOGIN_PASSWORD=yourpassword
```
replace `yourpassword` with the actual password.

Then you can run the tests with the following command:

```bash
npm test
```
