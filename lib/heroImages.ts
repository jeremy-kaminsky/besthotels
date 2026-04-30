// Local copies of review hero images served from /public to avoid cross-origin blocking.
// explorebesthotels.com (WordPress) blocks background-image requests from other origins.
// NOTE: Four Seasons press site only serves 400px thumbnails (official images blocked at 403).
// W Costa Rica images could not be sourced from Marriott (JS-rendered, blocked).
export const LOCAL_HERO_IMAGES: Record<string, string> = {
  'shebara-resort-saudi-arabia':   '/images/shebara-resort-hero.jpg',
  'secret-bay-dominica':           '/images/secret-bay-hero.jpg',
  'le-sereno-st-barthelemy':       '/images/le-sereno-hero.jpg',
  'four-seasons-maui-wailea':      '/images/reviews/four-seasons-maui-wailea/hero.jpg',
  'four-seasons-hualalai':         '/images/reviews/four-seasons-hualalai/hero.jpg',
  'ritz-carlton-grand-cayman':     '/images/reviews/ritz-carlton-grand-cayman/hero.jpg',
  'four-seasons-anguilla':         '/images/reviews/four-seasons-anguilla/hero.jpg',
  'four-seasons-nevis':            '/images/reviews/four-seasons-nevis/hero.jpg',
  'w-costa-rica-reserva-conchal':  '/images/reviews/w-costa-rica-reserva-conchal/hero.jpg',
}

export function resolveHeroImage(slug: string, heroImageUrl?: string): string {
  if (LOCAL_HERO_IMAGES[slug]) return LOCAL_HERO_IMAGES[slug]
  // Skip WordPress URLs — explorebesthotels.com blocks external requests with 403
  if (heroImageUrl && !heroImageUrl.includes('explorebesthotels.com')) return heroImageUrl
  return ''
}
