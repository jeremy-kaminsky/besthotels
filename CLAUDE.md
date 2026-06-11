# Best Hotels — Project Instructions

## Project Overview
Best Hotels (explorebesthotels.com) is a luxury hotel editorial review and ranking platform. This file contains permanent instructions for all development work on this project.

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
- Pexels API key: QFAujlETDAehAaXskEzSlzbHXcyCM4YbYUKrpbLqNHqMxYwYmMELhkNC

## Sanity
- Project ID: rpcxgrby
- Dataset: production
- API tokens need Editor-level permissions for write operations
- SANITY_API_TOKEN must be exported as environment variable before running scripts

## GitHub Push
- Use personal access token embedded in remote URL:
  git remote set-url origin https://TOKEN@github.com/jeremy-kaminsky/besthotels.git && git push
- Tokens expire — generate new ones at github.com/settings/tokens (classic, repo scope)

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
- Jordan makes changes via Claude Code
- Claude Code commits and pushes to GitHub
- Vercel auto-deploys from main branch
- Always commit and push at the end of every task
