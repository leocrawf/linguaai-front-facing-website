# LinguaAI Public Website Design

**Date:** 2026-04-18  
**Status:** Approved

## Overview

A public-facing marketing and compliance website for the LinguaAI mobile app. Static HTML/CSS — no build tools, no npm, no framework. Deployable anywhere (GitHub Pages, Netlify, etc.).

## Goals

- Market the LinguaAI app to prospective users
- Provide App Store-compliant URLs for Terms of Use and Privacy Policy
- Allow users to request account/data deletion without needing the app (GDPR/App Store requirement)
- Spam-protect the deletion form with Google reCAPTCHA v3

## File Structure

```
linguaai-front-facing-website/
├── index.html          # Main page: Hero, Features, Pricing, Delete Account
├── terms.html          # Terms of Use (full content)
├── privacy.html        # Privacy Policy (full content)
├── styles.css          # Shared stylesheet across all pages
├── delete-account.js   # reCAPTCHA v3 + Convex HTTP endpoint call
└── assets/
    ├── icon.png         # App logo (copied from LinguaAI src/assets/images/icon.png)
    └── screenshots/     # App screenshots (copied from Desktop screenshots folder)
```

## Color Scheme

| Token | Value | Usage |
|---|---|---|
| Background | `#131417` | Page background |
| Surface | `#1C1E23` | Cards, nav, footer |
| Accent | `#F3B01C` | Buttons, highlights, active states |
| Text | `#FFFFFF` | Body text |
| Text secondary | `#9CA3AF` | Subtitles, captions |
| Border | `#2D2F36` | Card borders, dividers |

## Typography

System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`. No external font dependencies.

## Layout

- Max-width: `1100px` centered
- Mobile breakpoint: `768px`
- Responsive hamburger nav on mobile

---

## `index.html` Sections

### Nav
- Sticky top bar, `#1C1E23` background
- Left: `icon.png` + "LinguaAI" text
- Right: anchor links → Features, Pricing, Delete Account
- Mobile: hamburger menu toggling a dropdown

### Hero
- Full-width section, dark background
- Heading: *"Learn Spanish with AI"*
- Subtext: *"Practice real conversations with your personal AI tutor — anytime, anywhere."*
- Two CTA buttons (disabled, "Coming Soon"): App Store + Google Play with respective SVG badge styling
- App screenshot displayed to the right on desktop, below on mobile

### Features
- 2×2 card grid
- Cards: Real-time AI Conversations, Comprehensive Lessons, Instant Feedback, Ad-Free Learning
- Each card: gold Ionicon-style Unicode icon, bold title, short description

### Pricing
- Heading: *"Plans to fit your learning journey."*
- One featured plan card with gold border + "Most Popular" badge
- Placeholder price + feature list bullets
- Disabled CTA: "Available on App Store & Google Play"

### Delete Account
- Section heading: *"Request Account Deletion"*
- Subtext explaining data will be permanently deleted within 30 days
- Form: email input + invisible reCAPTCHA v3 + red submit button
- On submit: `delete-account.js` verifies reCAPTCHA token, POSTs to Convex HTTP endpoint
- Inline success message: *"Your deletion request has been received."*
- Inline error message on failure

### Footer
- Copyright: *"© 2026 LinguaAI. All rights reserved."*
- Links: Terms of Use (`terms.html`), Privacy Policy (`privacy.html`)

---

## `terms.html`

Shared nav + footer. Single-column document. Sections:
1. Acceptance of Terms
2. Description of Service
3. User Accounts
4. Subscription & Payments
5. Intellectual Property
6. Prohibited Uses
7. Termination
8. Disclaimer of Warranties
9. Limitation of Liability
10. Governing Law
11. Changes to Terms
12. Contact

Full standard legal content — not placeholders. Tailored to LinguaAI (subscription app, AI voice, Clerk auth, Convex).

---

## `privacy.html`

Shared nav + footer. Single-column document. Sections:
1. Information We Collect
2. How We Use Your Information
3. Third-Party Services (Clerk, ElevenLabs, Convex, Google reCAPTCHA)
4. Data Retention
5. Your Rights (including deletion request link → Delete Account section)
6. Children's Privacy
7. Security
8. Changes to This Policy
9. Contact

Full standard legal content tailored to LinguaAI's actual data practices.

---

## `delete-account.js`

Handles the deletion form:
1. On submit, call `grecaptcha.execute(siteKey, { action: 'delete_account' })`
2. Await token
3. POST to Convex HTTP endpoint: `{ email, recaptchaToken }`
4. Show inline success or error message
5. Disable button after successful submission to prevent duplicate requests

## Convex HTTP Endpoint (in LinguaAI repo)

A new `httpAction` in `convex/http.ts`:
- Route: `POST /delete-account`
- Verifies reCAPTCHA token with Google's API (`https://www.google.com/recaptcha/api/siteverify`)
- Rejects if score < 0.5
- Looks up user by email in `users` table
- Inserts a record into `accountDeletionRequests` table (already defined in schema)
- Returns `200` on success, `400`/`500` on failure

## Assets

- `assets/icon.png` — copied from `C:/Developer/EXPO/LinguaAI/src/assets/images/icon.png`
- `assets/screenshots/` — up to 5 representative screenshots copied from `C:/Users/leocr/OneDrive/Desktop/screenshots-linguaAi/`

## Out of Scope

- Backend CMS
- App Store / Google Play live links (placeholder only)
- Actual subscription plan data (placeholder pricing)
- Email notifications for deletion requests (handled separately in LinguaAI app)
