# Estate & Co. — Real Estate Platform

A scalable Next.js App Router starter for a property listing business. Built with JavaScript, Tailwind CSS, MongoDB Atlas/Mongoose, Cloudinary and signed admin sessions.

## Included

- Responsive public homepage and seven category routes.
- Property detail pages with image gallery, specifications, amenities and inquiry modal.
- Public inquiry and owner property-submission forms.
- Admin login, dashboard, property CRUD/archive, inquiries and owner-request views.
- Cloudinary image upload endpoint.
- Public-page SEO manager, metadata, robots and sitemap.
- Zod request validation, bcrypt password hashing and HTTP-only signed session cookie.
- INR formatting and Indian digit grouping.

## Requirements

- Node.js 18.17+ (Node 20 LTS recommended)
- MongoDB Atlas database
- Cloudinary account for admin image uploads

## Setup

1. Extract the ZIP and open the project folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local`.
4. Fill in `MONGODB_URI`, a random `SESSION_SECRET` (32+ characters), `ADMIN_EMAIL`, and a strong `ADMIN_PASSWORD`.
5. Add Cloudinary credentials for image uploads.
6. Create the first admin:

   ```bash
   npm run seed:admin
   ```

7. Start development:

   ```bash
   npm run dev
   ```

8. Open `http://localhost:3000`; admin login is at `/admin/login`.

## Add a property

Sign in, open **Properties**, fill the property form, upload at least one image, set a unique slug, choose category and listing type, then choose `Published` to make it public. Draft/inactive/archived records are not exposed by public listing queries.

## Environment variables

See `.env.example`. Never commit `.env.local`. Cloudinary credentials and MongoDB credentials must remain server-only.

## Important implementation notes

- `DELETE` on a property archives it instead of permanently deleting it. This protects inquiry history and SEO links.
- Property categories and listing type are separate concepts. For example, a listing may be in the Apartments category and be for Sale or Rent.
- `Offers` and `Featured` are curated categories. Admin can assign those categories and use the featured flag.
- Public inquiry forms are validated server-side. For a production launch, add a managed rate limiter (e.g. Redis/Upstash), CAPTCHA/honeypot and email notifications.
- Admin pages and APIs are protected by middleware plus a signed, HTTP-only session. Configure HTTPS in production. Add CSRF/origin checks and account lockout before exposing the admin login to the public internet.
- This starter intentionally keeps admin authorization single-role. Do not create a public admin registration route.
- Add automated tests, monitoring, backup policies and an email provider integration before production launch.

## Production checklist

- Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain.
- Use a strong unique `SESSION_SECRET`.
- Use a least-privilege MongoDB database user and restrict Atlas network access.
- Configure Cloudinary upload limits and allowed formats.
- Enable HTTPS and platform security headers.
- Configure backups and database monitoring.
- Add rate limiting to public forms and login.
- Run `npm run build` before deployment.

## Project structure

- `src/app`: pages, layouts and route handlers
- `src/components`: reusable UI
- `src/models`: Mongoose models
- `src/lib`: database, auth, validation and Cloudinary utilities
- `scripts`: admin bootstrap script
