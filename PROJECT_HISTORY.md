# Chompify Project History

> **Document Purpose**: This file serves as the permanent, chronological engineering and design journal for the CHOMPIFY project. It records *what actually happened* during development, including features, design evolution, technical bugs, root causes, solutions, verification results, integrations, and milestones.
>
> **Maintenance Rule**: Update this document after every **significant** project milestone (architectural changes, feature integrations, major bug fixes, design shifts, or production releases). Do NOT record minor typos or routine styling tweaks.

---

## Project Overview

**CHOMPIFY** is a single-page interactive digital-art portfolio and commission website built for digital artist **SAANVI KHORATE**.

The website serves two primary purposes simultaneously:
1. **Artistic Portfolio**: Showcases Saanvi's digital artwork in an interactive, editorial, and visually memorable presentation.
2. **Commission Pathway**: Provides interested visitors and book authors with clear pricing, terms of service, and a streamlined inquiry submission process connected directly to the artist's Google Sheets database.

### Target Audience
Fantasy and fiction book authors, character design clients, indie publishers, and digital art enthusiasts seeking custom book covers, character illustrations, and editorial artwork.

---

## Timeline

### Phase 1 — Initial Concept (Sep 11, 2026)
* **Objective**: Create a fast, responsive, and visually distinctive single-page digital art portfolio.
* **Structure**: Exactly four primary sections:
  1. Portfolio
  2. Pricing
  3. Commission / Contact
  4. About
* **Initial Tech Stack**:
  * Next.js 15 (App Router) + TypeScript
  * Vanilla CSS + Tailwind CSS
  * Framer Motion for micro-animations and parallax effects
  * React Hook Form + Zod for client-side form validation

---

### Phase 2 — Initial Design Exploration (Sep 11–12, 2026)
* **Gallery Concepts Explored**:
  * *Polaroid & String-Lights Layout*: Hanging artwork cards with pin lights.
  * *Digital Gallery Wall*: Grid layout with frame borders.
  * *2.5D Collage Canvas*: Floating artwork pieces with heavy layering.
* **Problems Discovered**:
  * Visual clutter on smaller viewports.
  * Inconsistent spacing and screen overlap.
  * Low contrast between background textures and vibrant artwork colors.
* **Evolution Rationale**: Shifted away from busy physical gallery tropes toward a clean, editorial layout where the artwork remains the primary focal point.

---

### Phase 3 — Editorial / Solstice-Inspired Direction (Sep 12, 2026)
* **Visual Reference**: Adopted design inspiration from editorial digital publications (such as *Solstice*), emphasizing high contrast, elegant serif typography, generous negative space, and curated color palettes.
* **Brand Identity Retained**:
  * **Color Palette**: Warm beige canvas (`#F5EBE6`), rich mahogany dark accents, warm terracotta primary (`#C25E38`), charcoal text (`#2B2625`).
  * **Typography**: *The Seasons* (serif headings), *Garet* (sans-serif body), monospace (`font-mono`) metadata captions.
  * **Hand-Drawn Sketches**: Backdrop watermarks featuring authentic fantasy sketches (grimoire, rapier, crescent scimitar, candlestick, celestial clouds, cracked mirror, feathered wings, floral blossom).
  * **Dynamic Portrait**: About section artist portrait featuring a grayscale-to-color transition.
* **Portfolio Architecture**:
  * **Hero Section**: Centered logo with floating hand-drawn watermark sketches.
  * **Horizontal Marquee**: Continuous, full-bleed artwork stream.
  * **Interactive Lightbox/Modal**: High-resolution detailed artwork view with metadata and "Get Something Similar" quick-action trigger.

---

### Phase 4 — Portfolio & Marquee Iteration (Sep 12–15, 2026)
* **Marquee Development**:
  * Implemented smooth continuous horizontal scrolling for featured artwork using Framer Motion.
  * Extended marquee stream to full-bleed edge-to-edge desktop styling (`f2b577c`).
  * Mobile dynamic scroll optimization (`0a25259`, `1d12da8`): Integrated hardware-accelerated touch swipe scrolling with momentum inertia deceleration.
* **Artwork Lightbox Fixes**:
  * Resolved mobile close button obstruction and z-index stacking (`83ef915`).
  * Fixed image cropping in modal, enabling full-view scrollable lightbox (`88bc0b8`, `55a877e`).
* **Visual Prompts & Micro-Interactions**:
  * Added subtle editorial prompts (`88646df`): `HOVER ELEMENTS TO EXPLORE SKETCHES` in hero section, `Hover to reveal color` on About portrait.
  * Enhanced touch accessibility (`312f1a1`): Enabled tap-to-toggle color reveal on mobile/tablet devices for both the artist portrait and hero sketch elements.
  * Visual cleanup (`da663bf`): Removed bottom text tooltips under hero sketches for cleaner aesthetics.

---

### Phase 5 — Pricing Section (Sep 12–13, 2026)
* **Restructuring**:
  * Replaced unstructured lists with a scannable grid layout (`755e97c`, `6e3328c`).
  * Integrated visual character figurine illustrations (`f19dae8`).
* **Tier Architecture**:
  * **Chibi Illustration**: $35+
  * **Character Bust**: $60+
  * **Full Character**: $120+
  * **Book Covers (Specialty Tier)**: $250+ onwards (`8af4fcf`, `787ff53`), featuring a dragon illustration background and translucent glassmorphic badge box.
* **Quotation Philosophy**: Clarified that listed prices represent base starting estimates; final custom quotes are confirmed via the Commission form.

---

### Phase 6 — Terms of Service Section (Sep 12, 2026)
* Added a dedicated **Terms of Service** section (`2e5cb9c`) positioned directly above the Commission form.
* Linked directly from the Commission submission controls with smooth offset scrolling.
* Defines commercial rights, usage permissions, payment schedules, turnaround times, and revision guidelines.

---

### Phase 7 — Commission Form (Sep 12, 2026)
* Built using `react-hook-form` and `zod` validation (`c3c86ea`, `798e27e`).
* **Form Fields**:
  * Name (required, min 2 chars)
  * Email Address (required, valid email)
  * Preferred Mode of Contact (Email, Threads, Instagram, Other)
  * Custom Platform (required if "Other")
  * Contact Handle (required for Threads, Instagram, Other; optional for Email)
  * Idea Description (required, min 10 chars)
  * Expected Timeline (optional)
  * Reference Links / Artwork Inspiration (optional)
* **"Get Something Similar" Context**: Auto-populates `referenceArtwork` field when initiated from any portfolio artwork modal.

---

### Phase 8 — Google Sheets Integration Sequence (Sep 12–15, 2026)

The full end-to-end integration of the production commission form was completed through the following 14 steps:

1. **Initial Concept**: Store inquiry submissions directly in Google Sheets without requiring an external database.
2. **Test Sheet Setup**: Created a standalone test Google Sheet and Apps Script project.
3. **Apps Script Implementation**: Wrote a `doPost(e)` Google Apps Script function to parse incoming JSON payloads and append rows to the spreadsheet.
4. **Token Security Design**: Added a shared secret token passed in the request body to prevent unauthorized submissions.
5. **CORS & Authentication Problem**: Direct browser-to-Apps-Script POST requests were blocked by browser CORS security policies.
   * *Solution*: Created a Next.js App Router API proxy route (`src/app/api/commission/route.ts`).
6. **JSON Parsing Fix**: Configured Apps Script to read request contents via `JSON.parse(e.postData.contents)`.
7. **Apps Script Versioning**: Identified that Apps Script updates require creating a **New Version** deployment to take effect.
8. **Next.js API Handler**: Implemented server-side token validation and request forwarding in `/api/commission`.
9. **Frontend Integration**: Updated `CommissionContact.tsx` to submit data via `fetch("/api/commission")`.
10. **Local Submission Verification**: Successfully submitted form data from `localhost` to the test Google Sheet.
11. **Production Migration**: Migrated deployment to Saanvi Khorate's official Google account and commission spreadsheet (`66a1b44`).
12. **Production Secret Storage**: Stored the production authorization token in Google Apps Script `PropertiesService.getScriptProperties()`.
13. **Vercel Environment Setup**: Configured `GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_APPS_SCRIPT_TOKEN` on Vercel (`4c2c456`).
14. **Production Testing & Verification**: Verified end-to-end submissions from both desktop and mobile devices on the live domain (`33c23d6`).

---

### Phase 9 — Production Security Hardening (Sep 15, 2026)
* **Honeypot Anti-Bot Field**: Added a visually-hidden, accessibility-safe `website` field to reject automated bot spam (`4ec3f71`).
* **Rate Limiting**: Implemented an in-memory IP sliding window rate limiter (max 3 submissions per IP per 10 minutes, returning HTTP `429 Too Many Requests`).
* **Request Payload Protection**: Enforced a 15 KB body size cap (HTTP `413`) and strict input character limits in Zod schema.
* **Secret Isolation**: Verified that `GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_APPS_SCRIPT_TOKEN` are accessed exclusively server-side and never exposed to the client or console logs.
* **Response Handling**: Retained explicit handling for Google Apps Script redirects (`script.googleusercontent.com`) to guarantee accurate success/failure states.

---

## Major Technical Problems & Resolutions

### Technical Problem 1: Client-Side CORS Blockage on Direct Google Apps Script Submissions

#### Problem
Browser form submissions directly targeting the Google Apps Script Web App URL failed with CORS and network errors.

#### Symptoms
The browser console displayed `Access-Control-Allow-Origin` errors, and form submissions failed silently or threw network exceptions.

#### Root Cause
Google Apps Script Web Apps (`script.google.com`) respond to POST requests with HTTP 302 redirects to `script.googleusercontent.com`. Web browsers block cross-origin credentials and strict headers during cross-site redirects.

#### Solution
Created a server-side proxy handler in Next.js (`src/app/api/commission/route.ts`). The client submits form data to `/api/commission`, and the Node.js server forwards the request to Google Apps Script server-to-server.

#### Verification
Form submissions succeeded cleanly without CORS errors across all desktop and mobile browsers.

---

### Technical Problem 2: False Failures on Successful Google Apps Script Submissions

#### Problem
The Next.js API route returned HTTP `502 External Service Error` even when rows were successfully written to Google Sheets.

#### Symptoms
Users saw an error banner saying submission failed, but the artist received the row in Google Sheets.

#### Root Cause
Google Apps Script's `ContentService` issues a 302 redirect to `script.googleusercontent.com`. Standard `fetch()` calls following redirects receive an opaque or transformed response where `response.url` points to `googleusercontent.com`, which failed strict status checks expecting a 200 JSON payload directly from `script.google.com`.

#### Solution
Updated `/api/commission/route.ts` (`6fb25b6`) to evaluate `finalHost.includes("googleusercontent.com")` and check response text for explicit Google Apps Script engine exceptions (e.g. `Exception:`, `Script error`). If no engine error exists, the redirect represents a successful write.

#### Verification
Tested live submissions on desktop and mobile. All valid submissions returned `{ success: true }` and created sheet rows.

---

### Technical Problem 3: Marquee Scroll Stutter and Rigid Touch Swipe on Mobile

#### Problem
The horizontal artwork marquee felt rigid, jumpy, or difficult to drag on mobile and tablet devices.

#### Symptoms
Swiping on mobile caused page jitter, layout shifts, or sudden stops when releasing touch drag.

#### Root Cause
Relying solely on standard CSS animation without hardware-accelerated touch delta calculation caused main-thread layout thrashing during touch drag events.

#### Solution
Refactored `PortfolioGallery.tsx` (`0a25259`, `1d12da8`) to use Framer Motion drag physics with momentum inertia deceleration and touch-action overflow controls.

#### Verification
Tested smooth continuous touch swiping on mobile viewports.

---

### Technical Problem 4: Bounding Box Layering Blocking Hero Sketch Hovers

#### Problem
Hand-drawn sketch icons located near the center of the hero section were not highlighting on hover.

#### Symptoms
Hovering over certain sketches hovered the main CHOMPIFY logo instead of the sketch icon underneath.

#### Root Cause
The transparent bounding box of the centered logo container sat on top of adjacent sketch elements, capturing pointer events.

#### Solution
Elevated sketch elements to `z-20` (and `z-30` on hover) and applied `pointer-events-none` to the logo's outer bounding container (`88646df`).

#### Verification
All hero sketch icons highlight individually when hovered or tapped.

---

## Major Design Iterations

### Design Iteration 1: Gallery Presentation
* **Original Direction**: Physical gallery wall with framed images and string lights.
* **Problem**: Looked generic and crowded on small mobile screens.
* **Feedback / Observation**: The artist wanted an editorial, digital-first presentation that feels modern and high-end.
* **New Direction**: Full-bleed horizontal marquee artwork stream coupled with an interactive scannable modal gallery.
* **Result**: Clean, uncluttered layout with focus on artwork detail.

---

### Design Iteration 2: Color Scheme & Aesthetic
* **Original Direction**: Plain bright red/blue accents on white background.
* **Problem**: Felt like a standard generic landing page rather than a fine digital art portfolio.
* **Feedback / Observation**: The visual source of truth (`brandGuidelines.md`) called for warm, artistic tones.
* **New Direction**: Warm cream canvas (`#F5EBE6`), deep mahogany dark accents, and rich terracotta (`#C25E38`).
* **Result**: High-end editorial feel aligned with fantasy and character art themes.

---

### Design Iteration 3: Specialty Commission Card
* **Original Direction**: Standard 3-card pricing grid with plain text descriptions.
* **Problem**: The $250+ Book Covers tier did not stand out as a specialty offering.
* **Feedback / Observation**: Book cover illustration is the artist's premium service and required distinct visual weight.
* **New Direction**: Added integrated dragon artwork background with a translucent glassmorphic badge box (`8af4fcf`, `787ff53`).
* **Result**: Distinctive visual hierarchy emphasizing the specialty tier.

---

## Important Architectural Decisions

| Decision | Choice | Context / Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) + TypeScript | Modern server/client architecture, fast static generation, and secure API routes. |
| **Styling** | Vanilla CSS + Tailwind CSS | Precise control over design system tokens and responsive utility classes. |
| **Animations** | Framer Motion | Fluid micro-animations, marquee physics, and modal transitions without WebGL overhead. |
| **No WebGL/Three.js** | Pure DOM + Canvas/SVG | Keeps bundle size light, ensures 60fps performance on mobile devices. |
| **Page Layout** | Single-Page Application (SPA) | Seamless scrolling across 4 primary sections: Portfolio, Pricing, Terms, About/Contact. |
| **Database** | Google Sheets + Google Apps Script | Zero-maintenance, no SQL database setup needed; artist views inquiries directly in Google Sheets. |
| **API Proxy** | `/api/commission` | Server-side proxy handling token authentication, rate limiting, size protection, and CORS bypass. |
| **Secret Management** | Vercel Environment Variables & Script Properties | Keeps API endpoints and authorization tokens completely isolated from browser client code. |

---

## Git History Milestone Log

| Commit Hash | Date | Author | Milestone / Description |
| :--- | :--- | :--- | :--- |
| `6cc64b3` | 2026-09-11 | Vedansh Vaidya | Initial Chompify Website codebase setup |
| `755e97c` | 2026-09-12 | Vedansh Vaidya | Changed pricing section and added scannable grid layout |
| `6e3328c` | 2026-09-12 | Vedansh Vaidya | Added visual representation for pricing cards |
| `476568e` | 2026-09-12 | Vedansh Vaidya | Adjusted section routing for portfolio marquee and pricing grids |
| `2e5cb9c` | 2026-09-12 | Vedansh Vaidya | Added Terms of Service section |
| `c3c86ea` | 2026-09-12 | Vedansh Vaidya | Refined Commission section, added contact mode selection |
| `798e27e` | 2026-09-12 | Vedansh Vaidya | Configured platform-dependent contact handle validation |
| `4c2c456` | 2026-09-12 | Vedansh Vaidya | Added Google Apps Script environment configuration |
| `66a1b44` | 2026-09-12 | Vedansh Vaidya | Connected Commission form to Google Sheets API |
| `9884b20` | 2026-09-12 | Vedansh Vaidya | Added About section artist photo with grayscale-to-color transition |
| `e4b42a3` | 2026-09-13 | Vedansh Vaidya | Updated favicon and refined marquee background palette |
| `976d00b` | 2026-09-13 | Vedansh Vaidya | Updated README with live domain and social links |
| `143cd7a` | 2026-09-13 | Vedansh Vaidya | Cleaned up README contact section |
| `79a8077` | 2026-09-13 | Vedansh Vaidya | Added mobile 3-bar burger navigation menu |
| `5cf8aa1` | 2026-09-13 | Vedansh Vaidya | Fixed marquee header text stacking on mobile viewports |
| `83ef915` | 2026-09-13 | Vedansh Vaidya | Elevated artwork modal z-index and added mobile close controls |
| `88bc0b8` | 2026-09-13 | Vedansh Vaidya | Uncropped artwork image in modal and enabled modal scrolling |
| `8af4fcf` | 2026-09-13 | Vedansh Vaidya | Added Book Covers specialty tier with dragon artwork background |
| `55a877e` | 2026-09-13 | Vedansh Vaidya | Positioned artwork modal close X button to top-right on desktop |
| `f19dae8` | 2026-09-13 | Vedansh Vaidya | Adjusted character figurine illustration sizes in pricing cards |
| `aaf1669` | 2026-09-13 | Vedansh Vaidya | Enlarged brand logo in footer and aligned subtitle |
| `e9d0b2e` | 2026-09-13 | Vedansh Vaidya | Fixed mobile footer subtitle positioning to prevent overlap |
| `787ff53` | 2026-09-13 | Vedansh Vaidya | Refined translucent glassmorphic badge for Book Covers tier |
| `7f614b2` | 2026-09-13 | Vedansh Vaidya | Ensured full-screen edge-to-edge marquee background on mobile |
| `0a25259` | 2026-09-15 | Vedansh Vaidya | Optimized marquee for mobile/tablet dynamic touch scrolling |
| `6fb25b6` | 2026-09-15 | Vedansh Vaidya | Refined Google Apps Script redirect response handling in API route |
| `1d12da8` | 2026-09-15 | Vedansh Vaidya | Implemented smooth physics momentum deceleration on touch swipe |
| `33c23d6` | 2026-09-15 | Vedansh Vaidya | Form testing and connection with production Google Sheet |
| `f2b577c` | 2026-09-15 | Vedansh Vaidya | Made mahogany background and artwork stream full-bleed on desktop |
| `88646df` | 2026-09-15 | Vedansh Vaidya | Added subtle visual aid prompts for hero sketches & About portrait |
| `312f1a1` | 2026-09-15 | Vedansh Vaidya | Added tap toggle interaction & responsive prompt text for mobile |
| `da663bf` | 2026-09-15 | Vedansh Vaidya | Removed bottom text tooltips under hero sketch elements |
| `4ec3f71` | 2026-09-15 | Vedansh Vaidya | Implemented production hardening pass (honeypot, rate limit, size limit) |

---

## Current Architecture Snapshot

```text
Visitor (Browser)
  │
  ├─► Frontend UI (Next.js / React / Framer Motion)
  │     ├── Navbar (Mobile Burger / Desktop Links)
  │     ├── Hero Section (Logo + Floating Sketches)
  │     ├── Portfolio Gallery (Full-Bleed Marquee + Lightbox Modal)
  │     ├── Pricing Section (Grid + Glassmorphic Book Cover Tier)
  │     ├── Terms of Service Section
  │     ├── About Section (Artist Bio + Grayscale-to-Color Portrait)
  │     └── Commission Form (React Hook Form + Zod + Honeypot)
  │
  └─► POST /api/commission (Next.js Server Proxy)
        ├── Request Size Check (Max 15 KB)
        ├── IP Rate Limiter (3 req / 10 min)
        ├── Honeypot Anti-Bot Inspection
        ├── Server-Side Zod Validation
        └── Server Token Injection
              │
              ▼
        Google Apps Script Web App (HTTPS POST)
              │
              ▼
        Artist's Google Sheet Database
```

---

## Current State

The following core features have been fully implemented, verified, and pushed to production (`origin/main`):

* **Website Execution**: Runs cleanly both locally (`npm run dev`) and on Vercel production.
* **Portfolio Marquee**: Hardware-accelerated horizontal auto-scroll and touch-swipe momentum.
* **Artwork Lightbox**: High-res artwork inspection with modal controls and "Get Something Similar" quick-action trigger.
* **Pricing & Terms**: Responsive 4-tier pricing grid and integrated Terms of Service.
* **Commission Form**: Client and server-side Zod validation with dynamic contact handle rules.
* **Google Sheets Integration**: Submissions write directly to Saanvi Khorate's Google Sheet via Google Apps Script.
* **Touch Accessibility**: Full touch-tap support for mobile and tablet devices across all interactive components.
* **Production Hardening**: Includes hidden honeypot validation, IP rate limiting, request size limits, and secret isolation.
* **Build Integrity**: `npx tsc --noEmit` and `npm run build` pass with 0 errors.

---

## Known Limitations

* **Serverless Rate Limiting**: The current IP rate limiter uses an in-memory sliding window Map. On serverless platforms (Vercel), state is preserved across warm container instances, but cold starts or multi-region invocations do not share state.
* **Asset Optimization**: Artwork files are stored in `/public/artwork/` and served directly; addition of Next.js Image Optimization optimization parameters can be tuned as portfolio size increases.

---

## Future Work

* **Upstash Redis Rate Limiting**: Plug in `@upstash/ratelimit` if commission submission volume expands significantly across global serverless regions.
* **WAF Bot Protection**: Configure Cloudflare or Vercel Web Application Firewall rules for edge bot mitigation.
* **Gallery Expansion**: Add category filtering (e.g. Book Covers, Character Art, Sketches) as Saanvi's portfolio expands.

---

## How to Update This Document

Future agents and developers MUST follow these instructions when updating `PROJECT_HISTORY.md`:

1. **When to Update**: Update ONLY after completing a **significant** milestone (e.g. new feature, architecture refactor, external integration, bug fix, or design shift).
2. **Verification First**: Verify the implementation with `npx tsc --noEmit` and `npm run build` before recording it.
3. **No Fabrication**: Record exact git commit hashes, dates, root causes, and solutions. If a detail cannot be established with confidence, record it as `[UNKNOWN / NOT RECORDED]`.
4. **Section Integrity**: Keep the 4 primary project specification files distinct (`brandGuidelines.md`, `GEMINI.md`, `tasks.md`, `decisions.md`). Do not merge their responsibilities into this journal.
