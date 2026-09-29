# 🌿 Ecolates B2B Platform — Project Handover & Documentation Guide

> **Generated on:** September 28, 2026  
> **Repository:** [https://github.com/shivkumar-zx/ECOLATES.git](https://github.com/shivkumar-zx/ECOLATES.git)  
> **Tech Stack:** Next.js 16 (App Router, Turbopack) + React 19 + Payload CMS 3.0 + Dual Database (SQLite / PostgreSQL)

---

## 📌 Quick Access & Credentials

### 1. Local Development
- **Public Website:** `http://localhost:3001`
- **CMS Admin Dashboard:** `http://localhost:3001/admin`
- **Database:** Local SQLite (`ecolates.db`)

### 2. Live Cloud / Vercel Deployment
- **Website URL:** `https://ecolates.vercel.app` (or your chosen Vercel domain)
- **CMS Admin URL:** `https://ecolates.vercel.app/admin`
- **Cloud Database:** Neon PostgreSQL Serverless

### 3. Master Admin Login
- **Email:** `admin@ecolates.com`
- **Password:** `ecolates_admin_2026`
- **Role:** Super Admin (Full Control)

---

## 🗄️ Database Configuration & Dual-Mode Adapter

The platform is engineered with **Smart Database Auto-Detection** in `payload.config.ts`:

1. **Local Development (No Server Required)**:
   - Uses local SQLite file: `ecolates.db`
   - All 27 products, categories, pages, and settings are already seeded locally.

2. **Cloud / Vercel Deployment**:
   - As soon as `DATABASE_URI` starts with `postgres://` or `postgresql://`, Payload automatically activates `@payloadcms/db-postgres`.
   - **Your Active Neon PostgreSQL Connection String**:
     ```text
     postgresql://neondb_owner:npg_ia9NsR0AxgCY@ep-icy-star-b5ovd6d2-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require
     ```
   - **Status:** Already seeded with all 27 products, categories, pages, site settings, and the master admin user.

---

## 🚀 Vercel Deployment Settings

When importing the GitHub repository (`shivkumar-zx/ECOLATES`) to Vercel:

| Setting | Value |
| :--- | :--- |
| **Project Name** | `ecolates` *(must be all lowercase)* |
| **Framework Preset** | `Next.js` |
| **Root Directory** | `./` |
| **Build Command** | `next build` *(leave default)* |

### Environment Variables:
| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `PAYLOAD_SECRET` | `ecolates_b2b_sugarcane_tableware_secret_key_2026_super_secure` | Session encryption |
| `DATABASE_URI` | `postgresql://neondb_owner:npg_ia9NsR0AxgCY@ep-icy-star-b5ovd6d2-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require` | Neon Postgres Connection |
| `NEXT_PUBLIC_SERVER_URL` | `https://ecolates.vercel.app` | Base URL for API & Admin |

---

## 🛠️ Key Architectural Milestones & Solutions

### 1. Next.js Route Groups & Root Layout Isolation
* **Issue Solved:** The previous top-level `src/app/layout.jsx` was wrapping `/admin` with the public storefront marquee, header, and modals, causing a fatal React DOM hydration conflict (*"This page couldn't load"*).
* **Fix Implemented:** Separated routes into Next.js App Router Route Groups:
  - `src/app/(frontend)/layout.jsx` → Handles public storefront navigation, cart drawer, and sample modal.
  - `src/app/(payload)/layout.tsx` → Dedicated root layout for Payload CMS 3.0.
  - Removed conflicting top-level `src/app/layout.jsx`.

### 2. Next.js 15/16 Async Params Fix on Single Product Page
* **Issue Solved:** Dynamic parameters (`params`) in Next.js 15+ are asynchronous Promises. Accessing `params.slug` synchronously returned `undefined` and caused a *"Product Not Found"* error.
* **Fix Implemented:** Updated `src/app/(frontend)/products/[slug]/page.jsx` with `const { slug } = await params;` in both `generateMetadata` and `ProductDetailPage`. Single product pages now load with multi-angle gallery, tiered B2B pricing, carton packaging specs, and RFQ forms.

### 3. CMS Dashboard Organization & Structure
The Payload CMS admin panel is organized into logical groups:

```text
├── 📦 Catalog Management
│   ├── Products (All 27 sugarcane items with specs & tiered pricing)
│   └── Categories (Bowls, Plates, Trays, Containers, Cutlery)
│
├── 🌐 Website & SEO
│   ├── Pages (Home, About, Certifications — with Meta Titles, Descriptions, Keywords)
│   └── Site Settings (Brand info, WhatsApp, Sales Phone, Marquee Banner)
│
├── 💼 B2B Inquiries & Leads
│   ├── Sample Requests (Physical evaluation kit requests from buyers)
│   └── Wholesale RFQs (Bulk volume price quotes)
│
└── 👤 Administration
    └── Users (Admin accounts & passwords)
```

---

## 📋 Common Terminal Commands

```bash
# Start local development server on port 3001
npm start -- -p 3001

# Rebuild Next.js production build
npm run build

# Push latest code to GitHub
git push origin main

# Re-seed local SQLite database (if needed)
npx tsx seed_payload.ts
npx tsx seed_pages.ts

# Re-seed Neon Cloud PostgreSQL database (if needed)
set DATABASE_URI=postgresql://neondb_owner:npg_ia9NsR0AxgCY@ep-icy-star-b5ovd6d2-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require
npx tsx seed_payload.ts
npx tsx seed_pages.ts
```

---

## 🌐 Transitioning to a Dedicated Host (VPS) in the Future

When you are ready to move from Vercel to a dedicated VPS (DigitalOcean, Hetzner, AWS EC2, or Railway):
1. **Zero Database Lock-in:** You can either continue using your free Neon PostgreSQL database, or run PostgreSQL in Docker on your VPS, or simply copy the local `ecolates.db` SQLite file.
2. **Process Management:** Run the app using `pm2 start npm --name "ecolates" -- start -- -p 3000`.
3. **Reverse Proxy:** Point Nginx to `localhost:3000` with an SSL certificate (`certbot --nginx`).
