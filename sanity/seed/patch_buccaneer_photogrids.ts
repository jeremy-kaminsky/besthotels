/**
 * Patch — The Buccaneer (St. Croix): move gallery images from photoStrip
 * into large in-body photoGrid blocks (matching the Shebara Resort pattern),
 * then clear photoStrip since it becomes redundant.
 *
 * Run: npx tsx sanity/seed/patch_buccaneer_photogrids.ts
 * Requires SANITY_API_TOKEN (Editor permissions) exported in the shell.
 *
 * Does NOT re-upload images — reuses the existing asset refs that were
 * uploaded into photoStrip by create_the_buccaneer.ts.
 */
import "dotenv/config"
import { createClient } from "@sanity/client"

const client = createClient({
  projectId: "rpcxgrby",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
})

const DOC_ID = "review-the-buccaneer-st-croix"

// ─── Existing asset refs, as uploaded by create_the_buccaneer.ts ───────────
// (filename -> Sanity asset _id). Used to build large-image URLs without
// re-uploading anything.
const ASSETS: Record<string, string> = {
  "palm-sunset.jpg": "image-69ddf501817d249525a04049c4124d02b03bff1c-1882x3344-jpg",
  "aerial-golf.jpg": "image-5c51c7bbfde0639cad52eb64940a6409fac5413d-1882x3344-jpg",
  "cabana.jpg": "image-4a29b5cba46b215789ebeb9d404b8990caaf894d-2252x4000-jpg",
  "buddha.jpg": "image-dd1347b8a3c6b4d5959a59f1139df599ef3b1d2d-2252x4000-jpg",
  "villa-fruit.jpg": "image-febe3ee0d8fcff03914a8b99359c4c79595f33fb-2112x3492-jpg",
  "boat-excursion.jpg": "image-c7bd59d4ae9bbda8f7e7f7f11c79f44c5094c491-1872x2810-jpg",
}

function sanityAssetUrl(assetId: string, params: string): string {
  const match = assetId.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/)
  if (!match) throw new Error(`Unrecognized asset id: ${assetId}`)
  const [, hash, dims, ext] = match
  return `https://cdn.sanity.io/images/rpcxgrby/production/${hash}-${dims}.${ext}?${params}`
}

function photoGrid(
  key: string,
  layout: "single" | "2col",
  images: { filename: string; alt: string }[]
) {
  const width = layout === "single" ? "w=1400&q=90&auto=format&fit=crop" : "w=1200&q=90&auto=format&fit=crop"
  return {
    _type: "photoGrid",
    _key: key,
    layout,
    images: images.map(({ filename, alt }) => ({
      url: sanityAssetUrl(ASSETS[filename], width),
      alt,
    })),
  }
}

// ─── Insertion plan: insert AFTER the block with this _key ─────────────────
const INSERTIONS: { afterKey: string; afterText: string; block: Record<string, unknown> }[] = [
  {
    afterKey: "p4",
    afterText:
      "The beach house at the Buccaneer is a home that works just as well for a multi-generational family vacation as it would for a reunion with friends or wedding parties.",
    block: photoGrid("photo-villa-fruit", "single", [
      { filename: "villa-fruit.jpg", alt: "Villa interior at The Buccaneer, St. Croix" },
    ]),
  },
  {
    afterKey: "p8",
    afterText:
      "Getting to the beaches was part of the experience. The winding paths through the property are beautifully landscaped, with tropical flowers, towering palms, and incredible views around nearly every turn. I actually looked forward to the walks almost as much as the beach itself.",
    block: photoGrid("photo-beaches", "2col", [
      { filename: "palm-sunset.jpg", alt: "Sunset over palm trees at The Buccaneer, St. Croix" },
      { filename: "cabana.jpg", alt: "Beach cabana at The Buccaneer, St. Croix" },
    ]),
  },
  {
    afterKey: "p11",
    afterText:
      "The course winds through rolling hills with its signature hole #3 overlooking the Caribbean, it is a masterpiece. It isn't meant to be the toughest course you'll ever play, but it delivers exactly what a vacation round should: beautiful views, a relaxed pace, and a setting that's hard to beat.",
    block: photoGrid("photo-golf", "single", [
      { filename: "aerial-golf.jpg", alt: "Aerial view of the golf course at The Buccaneer, St. Croix" },
    ]),
  },
  {
    afterKey: "p18",
    afterText:
      "Instead of feeling like a luxury resort that could exist anywhere in the world, The Buccaneer feels unmistakably St. Croix. The colorful architecture, friendly staff, mature landscaping, and laid-back atmosphere give it a personality that many newer resorts simply can't replicate.",
    block: photoGrid("photo-authentic", "2col", [
      { filename: "buddha.jpg", alt: "Buddha statue accent on the grounds of The Buccaneer, St. Croix" },
      { filename: "boat-excursion.jpg", alt: "Boat excursion from The Buccaneer, St. Croix" },
    ]),
  },
]

async function main() {
  console.log("=== Patching The Buccaneer: photoStrip -> in-body photoGrid ===\n")

  const doc = await client.getDocument(DOC_ID)
  if (!doc) throw new Error(`Document not found: ${DOC_ID}`)

  const body = doc.body as { _key: string; _type: string; children?: { text: string }[] }[]
  if (!Array.isArray(body) || body.length === 0) {
    throw new Error("Document has no body array to patch.")
  }

  // ─── Verify existing photoStrip still has the 6 expected asset refs ──────
  const photoStrip = (doc.photoStrip as { asset?: { _ref?: string } }[]) || []
  const stripRefs = photoStrip.map((p) => p.asset?._ref).filter(Boolean)
  const expectedRefs = Object.values(ASSETS)
  const missing = expectedRefs.filter((ref) => !stripRefs.includes(ref))
  if (missing.length > 0) {
    throw new Error(
      `photoStrip is missing expected asset ref(s): ${missing.join(", ")}. Refusing to patch — asset refs may not match what this script expects.`
    )
  }
  console.log(`photoStrip verified: ${stripRefs.length} assets match expected refs.\n`)

  // ─── Verify anchors exist at the expected _key with the expected text, then splice ──
  const newBody = [...body]
  for (const { afterKey, afterText, block } of INSERTIONS) {
    const idx = newBody.findIndex((b) => b._key === afterKey)
    if (idx === -1) {
      throw new Error(`Anchor block with _key "${afterKey}" not found in body.`)
    }
    const actualText = newBody[idx].children?.[0]?.text
    if (actualText !== afterText) {
      throw new Error(
        `Anchor block "${afterKey}" text mismatch.\n  expected: ${afterText}\n  actual:   ${actualText}`
      )
    }
    newBody.splice(idx + 1, 0, block)
    console.log(`  -> inserting "${block._key}" (${(block as any).layout}) after "${afterKey}"`)
  }

  console.log(`\nOriginal body length: ${body.length}, new body length: ${newBody.length}`)

  console.log("\nPatching document (setting body, clearing photoStrip, heroImage untouched)...")
  await client.patch(DOC_ID).set({ body: newBody, photoStrip: [] }).commit()

  console.log("\nDone. Document patched:", DOC_ID)
}

main().catch((err) => {
  console.error("\nError:", err.message || err)
  process.exit(1)
})
