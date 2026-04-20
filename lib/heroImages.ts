// Local copies of review hero images served from /public to avoid cross-origin blocking.
// explorebesthotels.com (WordPress) blocks background-image requests from other origins.
export const LOCAL_HERO_IMAGES: Record<string, string> = {
  'shebara-resort-saudi-arabia': '/images/shebara-resort-hero.jpg',
  'secret-bay-dominica':         '/images/secret-bay-hero.jpg',
  'le-sereno-st-barthelemy':     '/images/le-sereno-hero.jpg',
}

export function resolveHeroImage(slug: string, heroImageUrl?: string): string {
  return LOCAL_HERO_IMAGES[slug] || heroImageUrl || ''
}
