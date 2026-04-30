import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

const U = (id: string) => `https://images.unsplash.com/${id}?w=1600&q=90&auto=format&fit=crop`

// Verified Unsplash CDN IDs (all confirmed free, non-premium)
const OW1 = U("photo-1602002418209-55d7a55adf42") // W Hotel Maldives overwater villa
const OW2 = U("photo-1601999705946-fbf42c3c6c66") // W Hotel Maldives overwater villa (angle 2)
const OW3 = U("photo-1753939223042-872934ffda15") // Maldives overwater bungalows walkways
const OW4 = U("photo-1753190550747-c56d10ff6d35") // Overwater bungalows clear ocean

const CA1 = U("photo-1763402084674-a3a45263ee2c") // Ritz-Carlton Aruba Caribbean luxury beach
const CA2 = U("photo-1760984425552-231eff1769da") // Curaçao turquoise water lush hills
const CA3 = U("photo-1746131272890-6f7f2678743c") // Thoddoo tropical beach palm turquoise
const CA4 = U("photo-1756572798557-1d196dcf8b2b") // Aerial tropical island white sand
const CA5 = U("photo-1692903438784-6c5415a2d217") // St Lucia Royalton resort beach

const HI1 = U("photo-1625959157952-fb2b24f7c272") // Wailea Beach Resort-Marriott Maui pool
const HI2 = U("photo-1624323118557-f758581865c6") // Koloa Kauai beach sunset palms
const HI3 = U("photo-1719469243598-0191cfae6f83") // Waikiki Honolulu sunset palms
const HI4 = U("photo-1688520820847-2d0c81c464ea") // Big Island Pu'uhonua beach palms
const HI5 = U("photo-1665513950300-127867f8c21b") // Lahaina Maui beach palm cluster

const CR1 = U("photo-1650033756944-2fbbe4ad9c1a") // Aerial Playa Espadilla Quepos Costa Rica
const CR2 = U("photo-1714319001328-2383617c51d2") // Costa Rica beach palm trees mountains
const CR3 = U("photo-1721850672216-f9e2ec176756") // Uvita Costa Rica sunset palm silhouette

const TR1 = U("photo-1682887524162-306ae119cd48") // Tropical hut in Caribbean forest
const TR2 = U("photo-1753679704710-8e6c5b687d0e") // Aerial tropical beach turquoise Maldives

// ─────────────────────────────────────────────────────────────────────────────
// STRIP CONFIGS  (photoStripUrls in Sanity)
// ─────────────────────────────────────────────────────────────────────────────
const STRIPS: Record<string, string[]> = {
  "review-shebara-resort-saudi-arabia":   ["/images/shebara-resort-hero.jpg",  OW1, OW2, OW3],
  "review-secret-bay-dominica":           ["/images/secret-bay-hero.jpg",      TR1, CA2],
  "review-le-sereno-st-barthelemy":       ["/images/le-sereno-hero.jpg",       CA1, CA5],
  "review-four-seasons-maui-wailea":      ["/images/reviews/four-seasons-maui-wailea/jake-01.jpg",      HI1, HI2, HI5],
  "review-four-seasons-hualalai":         ["/images/reviews/four-seasons-hualalai/jake-01.jpg",         HI4, HI2, HI3],
  // Ritz-Carlton: keep existing 1400px Marriott images — no strip update needed
  "review-w-costa-rica-reserva-conchal":  ["/images/reviews/w-costa-rica-reserva-conchal/jake-01.jpg", CR1, CR2, CR3],
  "review-four-seasons-anguilla":         ["/images/reviews/four-seasons-anguilla/jake-01.jpg",         CA2, CA4, CA3],
  "review-four-seasons-nevis":            ["/images/reviews/four-seasons-nevis/jake-01.jpg",            CA5, CA1, TR2],
}

// ─────────────────────────────────────────────────────────────────────────────
// BODY PHOTOGRID FIXES  (replace WordPress CDN URLs with Unsplash)
// ─────────────────────────────────────────────────────────────────────────────

// Map: [block index, image slot index] → replacement URL
// Shebara has 6 photoGrid blocks at various positions in body array
// We'll replace any URL containing explorebesthotels.com with appropriate ones

const SHEBARA_GRID_REPLACEMENTS = [
  // block 0: single → OW2
  [OW2],
  // block 1: 2col → OW1, OW3
  [OW1, OW3],
  // block 2: single → OW4
  [OW4],
  // block 3: 2col (restaurant) → CA3, CA1
  [CA3, CA1],
  // block 4: 3col (pool, resort, ocean) → TR2, CA4, CA2
  [TR2, CA4, CA2],
  // block 5: 2col (pool at night, overwater) → CA5, OW4
  [CA5, OW4],
]

const SECRET_BAY_GRID_REPLACEMENTS = [
  // block 0: single (Jake portrait) → TR1 (tropical forest hut — no personal photo)
  [TR1],
  // block 1: 4col (villa, villa, room, room) → TR1, CA2, TR2, CA3
  [TR1, CA2, TR2, CA3],
  // block 2: 2col (breakfast, fruit) → CA5, CA3
  [CA5, CA3],
  // block 3: 3col (bread, lobster, photo) → CA1, CA4, CA2
  [CA1, CA4, CA2],
  // block 4: 2col (pool, photo) → CA2, TR1
  [CA2, TR1],
  // block 5: 2col (views) → CA4, CA5
  [CA4, CA5],
  // blocks 6 & 7: Untitled designs + Fort Young Hotel → REMOVE (set to null/empty so we can splice)
]

const LE_SERENO_GRID_REPLACEMENTS = [
  // block 0: 2col (Le Sereno hotel, resort) → CA1, CA5
  [CA1, CA5],
  // block 1: single (Le Sereno hotel) → CA2
  [CA2],
]

async function patchStrips() {
  console.log("\n=== UPDATING STRIP IMAGES ===")
  for (const [docId, urls] of Object.entries(STRIPS)) {
    try {
      await client.patch(docId).set({ photoStripUrls: urls }).commit()
      console.log(`strip ✓ ${docId}`)
    } catch (e: unknown) {
      console.log(`strip ✗ ${docId}: ${e}`)
    }
  }
}

async function patchBody(
  slug: string,
  gridReplacements: string[][],
  removeTrailingGrids = 0
) {
  const doc = await client.fetch(
    `*[_type == "review" && slug.current == $slug][0] { _id, body }`,
    { slug }
  )
  if (!doc) { console.log(`${slug}: NOT FOUND`); return }

  const body: Record<string, unknown>[] = JSON.parse(JSON.stringify(doc.body || []))
  let gridIdx = 0
  const toDelete: number[] = []

  for (let i = 0; i < body.length; i++) {
    const block = body[i]
    if (block._type !== "photoGrid") continue

    const totalGrids = body.filter(b => b._type === "photoGrid").length
    const isTrailing = gridIdx >= totalGrids - removeTrailingGrids

    if (isTrailing) {
      toDelete.push(i)
      gridIdx++
      continue
    }

    if (gridIdx < gridReplacements.length) {
      const newUrls = gridReplacements[gridIdx]
      const images = block.images as Record<string, unknown>[]
      if (images) {
        for (let j = 0; j < images.length; j++) {
          if (j < newUrls.length) {
            images[j].url = newUrls[j]
          }
        }
      }
      console.log(`  grid[${gridIdx}] ${block.layout} → ${newUrls.length} images`)
    }
    gridIdx++
  }

  // Remove trailing blocks in reverse order
  for (const idx of toDelete.reverse()) {
    body.splice(idx, 1)
    console.log(`  removed block at index ${idx}`)
  }

  await client.patch(doc._id).set({ body }).commit()
  console.log(`body ✓ ${slug}`)
}

async function main() {
  await patchStrips()

  console.log("\n=== UPDATING BODY PHOTOGRID IMAGES ===")
  await patchBody("shebara-resort-saudi-arabia", SHEBARA_GRID_REPLACEMENTS, 0)
  await patchBody("secret-bay-dominica", SECRET_BAY_GRID_REPLACEMENTS, 2)
  await patchBody("le-sereno-st-barthelemy", LE_SERENO_GRID_REPLACEMENTS, 0)

  console.log("\nDone.")
}

main().catch(console.error)
