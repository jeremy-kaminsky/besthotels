# Best Hotels — Project Instructions for Codex

## Project Overview
Best Hotels (explorebesthotels.com) is a luxury hotel editorial review and ranking platform. These instructions are adapted from CLAUDE.md for Codex and apply to all development work on this project. Explicit user instructions take precedence, including requests not to commit or push.

## Team
- Jeremy Kaminsky — Owner & President (strategy and partnerships)
- Jake Trerotola — Founder & Creative Director (creative and property visits)
- Jordan — Site ownership and management
- Andrea Persia — Travel content contributor

## Tech Stack
- **Frontend:** Next.js
- **CMS:** Sanity (project ID: rpcxgrby, dataset: production)
- **Hosting:** Vercel (auto-deploys on push to main)
- **Domain:** Namecheap
- **GitHub repo:** jeremy-kaminsky/besthotels

## Design System
- **Fonts:** Playfair Display (serif), Inter (sans-serif)
- **Aesthetic:** Dark luxury
- **Gold accent:** #B8A082
- **Body text:** #EDE8E0
- **Background:** Near black (#0a0a0a)

## Site Structure
- /reviews — hotel reviews
- /rankings — dynamic ranking pages by country/region/city/experience
- /about — team page
- /contact

## Images
- **Local images:** public/images/
- **Hotel review images:** public/images/reviews/[hotel-slug]/
- **Category images:** public/images/categories/
- **Team images:** public/images/jake-trerotola.png, public/images/jeremy-kaminsky.png
- NEVER use Booking.com, Expedia, Unsplash, or Google image thumbnails
- Only use official hotel press/media pages for hotel photos

## Sanity
- Project ID: rpcxgrby
- Dataset: production
- API tokens need Editor-level permissions for write operations
- SANITY_API_TOKEN must be exported as an environment variable before running scripts

## Credentials and GitHub Push
- Never include API keys, access tokens, passwords, or other secret values in project instruction files or committed files.
- Use authenticated GitHub access for jeremy-kaminsky/besthotels without recording credentials in these instructions.
- GitHub personal access tokens expire; replacements can be generated at github.com/settings/tokens (classic, repo scope).

## Jake's Photo CSS
Always apply these styles to Jake's circle photo:
- objectFit: 'cover'
- objectPosition: 'center 20%'
- transform: 'scale(1.1)'
- transformOrigin: 'center 30%'

## Content Rules
- No placeholder content — all hotel data must be real and sourced
- Partnership model: hotels receive coverage in exchange for hosted stay (no payment)
- Never use Unsplash URLs in Sanity documents
- All review images must be official press photos

## Workflow
- Jordan makes changes via Codex.
- Codex commits and pushes to GitHub.
- Vercel auto-deploys from the main branch.
- Always commit and push at the end of every task unless the user explicitly instructs otherwise. A request not to commit or push overrides this default.
