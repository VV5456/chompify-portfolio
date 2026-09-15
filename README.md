<div align="center">

# 🎨 CHOMPIFY
### Digital Art Portfolio & Interactive Commission Studio

[![Next.js](https://img.shields.io/badge/Next.js-15_App_Router-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://chompify.art)

**[🌐 Visit Live Website — chompify.art](https://chompify.art)**

---

</div>

## 📌 Project Overview

**CHOMPIFY** is a high-performance, single-page interactive digital art portfolio and commission platform created for digital artist **Saanvi Khorate (Chomp)**.

Designed with an **editorial, art-first aesthetic**, the platform showcases high-resolution character illustrations and book cover art while providing fantasy authors and art collectors with a seamless, production-hardened commission request pipeline.

---

## ✨ Highlights & Features

### 🖼️ Interactive Editorial Portfolio
* **Continuous Horizontal Marquee**: A full-bleed, hardware-accelerated artwork stream featuring smooth physics-based momentum deceleration on touch swipe.
* **Hand-Drawn Watermark Backdrop**: Floating fantasy sketch elements (grimoire, ornate rapier, crescent blade, candlestick, celestial clouds, cracked mirror, feathered wings) with subtle parallax micro-animations.
* **Interactive Lightbox Modal**: Full-resolution artwork modal featuring detailed metadata and a instant `"Get Something Similar"` quick-action trigger.

### 🎨 Artist Spotlight
* **Interactive Tap-to-Reveal Portrait**: About section featuring an editorial portrait with dynamic grayscale-to-full-color bloom on desktop hover or mobile tap.

### 💰 Transparent Commission Pricing
* **4-Tier Scannable Grid**: Clear pricing cards for Chibi ($35+), Character Bust ($60+), Full Character ($120+), and Book Covers ($250+).
* **Glassmorphic Specialty Tier**: Specialty Book Cover tier styled with an integrated dragon illustration backdrop and translucent glassmorphic badge.

### 🔒 Production-Hardened Security & Pipeline
* **Serverless Google Sheets Integration**: Custom commission form that routes submissions through a Next.js server proxy directly into the artist's Google Sheets database.
* **Honeypot Anti-Bot Field**: Visually-hidden, accessibility-safe honeypot field rejecting automated spam bots before reaching external endpoints.
* **IP Rate Limiting**: Built-in sliding window rate limiter (3 requests per IP per 10 minutes) preventing submission abuse.
* **Request Payload Protection**: Strict 15 KB request size cap and server-side Zod input sanitization.

---

## 🏗️ Architecture Flow

```text
Visitor (Browser)
   │
   ├──► Interactive Client UI (React 19 + Framer Motion)
   │      ├── Hero Section (Floating Hand-Drawn Sketches)
   │      ├── Portfolio Gallery (Full-Bleed Marquee + Lightbox)
   │      ├── Pricing Grid (Translucent Specialty Tier)
   │      ├── Terms of Service
   │      ├── About Section (Grayscale-to-Color Portrait)
   │      └── Commission Form (React Hook Form + Zod + Honeypot)
   │
   └──► POST /api/commission (Next.js Server Proxy)
          ├── 15 KB Body Size Enforcement
          ├── IP Rate Limiter (3 req / 10 min)
          ├── Honeypot Bot Rejection
          ├── Server-Side Validation
          └── Secret Authorization Token Injection
                 │
                 ▼
          Google Apps Script Web App
                 │
                 ▼
          Artist's Google Sheet Database
```

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Tokens |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Form & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Server Proxy** | Next.js API Routes (`/api/commission`) |
| **Database Integration** | Google Apps Script + Google Sheets API |
| **Hosting & CDN** | [Vercel](https://vercel.com/) |

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js `18.x` or higher
- `npm` or `pnpm`

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/VV5456/chompify-portfolio.git
cd chompify-portfolio
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
GOOGLE_APPS_SCRIPT_TOKEN=your_secure_server_token
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Type Check
```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Run production build
npm run build
```

---

## 📖 Project Documentation & History

* **[`PROJECT_HISTORY.md`](PROJECT_HISTORY.md)** — Chronological engineering journal recording feature implementations, technical bug fixes, root causes, and git milestones.
* **[`brandGuidelines.md`](brandGuidelines.md)** — Visual design source of truth (color palette tokens, typography rules, and aesthetic standards).
* **[`GEMINI.md`](GEMINI.md)** — Technical source of truth and architectural specification.

---

## 📄 License & Credits

* **Artwork & Visual Assets**: © Saanvi Khorate (Chomp). All rights reserved. Artwork may not be reproduced or distributed without explicit permission from the artist.
* **Codebase & Architecture**: Developed with ❤️ for **CHOMPIFY**.
