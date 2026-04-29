import "dotenv/config"
import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
})

// Unsplash strip placeholders chosen to match each property's character
const STRIP_CONFIGS: Record<string, { photoStripUrls: string[]; heroImageUrl?: string }> = {
  "review-four-seasons-maui-wailea": {
    photoStripUrls: [
      "/images/reviews/four-seasons-maui-wailea/jake-01.jpg",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80&auto=format&fit=crop",
    ],
  },
  "review-four-seasons-hualalai": {
    photoStripUrls: [
      "/images/reviews/four-seasons-hualalai/jake-01.jpg",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559494007-9f5347c5a4e2?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=900&q=80&auto=format&fit=crop",
    ],
  },
  "review-ritz-carlton-grand-cayman": {
    photoStripUrls: [
      "/images/reviews/ritz-carlton-grand-cayman/jake-01.jpg",
      "/images/reviews/ritz-carlton-grand-cayman/01.jpg",
      "/images/reviews/ritz-carlton-grand-cayman/02.jpg",
      "/images/reviews/ritz-carlton-grand-cayman/03.jpg",
    ],
  },
  "review-w-costa-rica-reserva-conchal": {
    photoStripUrls: [
      "/images/reviews/w-costa-rica-reserva-conchal/jake-01.jpg",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=900&q=80&auto=format&fit=crop",
    ],
    // heroImageUrl removed — now using local hero.jpg via heroImages.ts
  },
  "review-four-seasons-anguilla": {
    photoStripUrls: [
      "/images/reviews/four-seasons-anguilla/jake-01.jpg",
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1480760e89?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80&auto=format&fit=crop",
    ],
  },
  "review-four-seasons-nevis": {
    photoStripUrls: [
      "/images/reviews/four-seasons-nevis/jake-01.jpg",
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=900&q=80&auto=format&fit=crop",
    ],
  },
}

async function main() {
  for (const [id, config] of Object.entries(STRIP_CONFIGS)) {
    const patch = client.patch(id).set({ photoStripUrls: config.photoStripUrls })
    // Clear heroImageUrl for W Costa Rica since we now use local file via heroImages.ts
    if (id === "review-w-costa-rica-reserva-conchal") {
      patch.unset(["heroImageUrl"])
    }
    await patch.commit()
    console.log(`✓ updated ${id}`)
  }
  console.log("Done.")
}

main().catch(e => { console.error(e); process.exit(1) })
