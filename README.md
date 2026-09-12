# CHOMPIFY — Digital Art Portfolio & Commission Studio

> Official digital art portfolio and commission platform for **Saanvi (Chomp)**.  
> **Live Site**: [chompify.art](https://chompify.art)

---

## 🎨 About the Project

CHOMPIFY is an interactive digital art portfolio built with Next.js, Framer Motion, and Tailwind CSS. It features a continuous artwork gallery stream, interactive commission pricing guide, about section with artist story, and a direct Google Apps Script serverless backend for commission inquiries.

---

## ✨ Features

- **Interactive Gallery & Marquee**: Continuous artwork stream with interactive modal views and parallax scroll elements.
- **Commission Inquiry System**: Dynamic commission form with automated background Google Sheets logging & email proxy.
- **Transparent Pricing**: Detailed breakdowns for Headshots, Half-Body, Full-Body, and additional license add-ons.
- **Custom Branding**: Bespoke warm editorial theme, smooth micro-animations, custom typography, and high-DPI favicons.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Handling & Validation**: React Hook Form + Zod
- **Backend & Integrations**: Next.js API Routes + Google Apps Script Web App
- **Deployment**: Vercel (Production Domain: `chompify.art`)

---

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VV5456/chompify-portfolio.git
   cd chompify-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file:
   ```env
   GOOGLE_APPS_SCRIPT_URL=your_google_apps_script_url
   GOOGLE_APPS_SCRIPT_TOKEN=your_security_token
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view in browser.

---

© 2026 Saanvi (Chomp). All rights reserved.
