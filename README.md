This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Cloudinary Image Uploads

Product images are uploaded via [Cloudinary](https://cloudinary.com) using the `next-cloudinary` package.

### Local Development

Create a `.env.local` file in the project root (already in `.gitignore`, never committed):

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dla8ojffk
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=d-hairs
```

Restart `npm run dev` after creating the file so Next.js picks up the vars.

### Vercel Deployment

1. Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**.
2. Add the following variables for **Production** and **Preview** environments:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = `dla8ojffk`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` = `d-hairs`
3. Click **Save** and trigger a **Redeploy** — env vars only apply after a new build.

### Cloudinary Upload Preset Requirements

- The preset **must be UNSIGNED** (Cloudinary Dashboard → Settings → Upload → Upload presets → Edit → Signing mode: **Unsigned**).
- The preset name must match exactly: **`d-hairs`**.
