/**
 * Patch — The Buccaneer (St. Croix): three remaining formatting gaps vs
 * the Shebara template:
 *   1. Convert the 6 plain-paragraph section titles into sectionHeader blocks
 *      (same position, same _key — just a type/field change).
 *   2. Repopulate photoStrip with 4 images (reusing existing uploaded assets)
 *      for the opening strip under the hero.
 *   3. Add captions to the two single-layout photoGrid blocks.
 *
 * Run: npx tsx sanity/seed/patch_buccaneer_headers_strip_captions.ts
 * Requires SANITY_API_TOKEN (Editor permissions) exported in the shell.
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

// ─── Existing asset refs (uploaded by create_the_buccaneer.ts) ────────────
const ASSETS: Record<string, string> = {
  "pool.jpg": "image-7fe1c78aa0ea551c64a83a40bf14ca8a5bed89d8-2048x3072-jpg",
  "palm-sunset.jpg": "image-69ddf501817d249525a04049c4124d02b03bff1c-1882x3344-jpg",
  "aerial-golf.jpg": "image-5c51c7bbfde0639cad52eb64940a6409fac5413d-1882x3344-jpg",
  "cabana.jpg": "image-4a29b5cba46b215789ebeb9d404b8990caaf894d-2252x4000-jpg",
  "buddha.jpg": "image-dd1347b8a3c6b4d5959a59f1139df599ef3b1d2d-2252x4000-jpg",
  "villa-fruit.jpg": "image-febe3ee0d8fcff03914a8b99359c4c79595f33fb-2112x3492-jpg",
  "boat-excursion.jpg": "image-c7bd59d4ae9bbda8f7e7f7f11c79f44c5094c491-1872x2810-jpg",
}

// ─── 1. Header conversions: _key -> expected current text -> new sectionHeader fields ──
const HEADER_CONVERSIONS: {
  key: string
  expectedText: string
  label: string
  heading: string
  headingItalic: string
}[] = [
  { key: "p5", expectedText: "Beaches to Explore", label: "BEACHES & SNORKELING", heading: "Four Beaches, ", headingItalic: "Four Personalities" },
  { key: "p9", expectedText: "Golf With a View", label: "GOLF", heading: "A Golf Course ", headingItalic: "With a View" },
  { key: "p12", expectedText: "Plenty of Dining Options", label: "DINING", heading: "Never Leave ", headingItalic: "the Resort" },
  { key: "p14", expectedText: "An Authentic Caribbean Experience", label: "CHARACTER & CHARM", heading: "Unmistakably ", headingItalic: "St. Croix" },
  { key: "p19", expectedText: "Who Should Stay Here?", label: "WHO SHOULD STAY", heading: "Best For ", headingItalic: "Families" },
  { key: "p22", expectedText: "Final Thoughts", label: "FINAL THOUGHTS", heading: "Genuine, ", headingItalic: "Not Extravagant" },
]

// ─── 2. Opening photoStrip (Sanity assets, not external URLs) ─────────────
const STRIP_FILES = ["pool.jpg", "palm-sunset.jpg", "aerial-golf.jpg", "cabana.jpg"]

// ─── 3. Captions for the two single-layout photoGrid blocks ───────────────
const CAPTION_TARGETS: { blockKey: string; filename: string; caption: string }[] = [
  { blockKey: "photo-villa-fruit", filename: "villa-fruit.jpg", caption: "Inside The Beach House villa at The Buccaneer." },
  { blockKey: "photo-golf", filename: "aerial-golf.jpg", caption: "The Buccaneer's golf course, with its cliffside signature hole overlooking the Caribbean." },
]

async function main() {
  console.log("=== Patching The Buccaneer: sectionHeaders + photoStrip + captions ===\n")

  const doc = await client.getDocument(DOC_ID)
  if (!doc) throw new Error(`Document not found: ${DOC_ID}`)

  const body = doc.body as Record<string, any>[]
  if (!Array.isArray(body) || body.length === 0) {
    throw new Error("Document has no body array to patch.")
  }

  const newBody = body.map((b) => ({ ...b }))

  // ─── 1. Convert headers ───────────────────────────────────────────────────
  console.log("Converting section headers:")
  for (const conv of HEADER_CONVERSIONS) {
    const idx = newBody.findIndex((b) => b._key === conv.key)
    if (idx === -1) throw new Error(`Header block "${conv.key}" not found.`)
    const block = newBody[idx]
    if (block._type === "sectionHeader") {
      throw new Error(`Block "${conv.key}" is already a sectionHeader — refusing to convert again.`)
    }
    if (block._type !== "block") {
      throw new Error(`Block "${conv.key}" is _type "${block._type}", expected "block".`)
    }
    const actualText = block.children?.[0]?.text
    if (actualText !== conv.expectedText) {
      throw new Error(`Block "${conv.key}" text mismatch.\n  expected: ${conv.expectedText}\n  actual:   ${actualText}`)
    }
    newBody[idx] = {
      _type: "sectionHeader",
      _key: conv.key,
      label: conv.label,
      heading: conv.heading,
      headingItalic: conv.headingItalic,
    }
    console.log(`  -> "${conv.key}" (was: "${conv.expectedText}") => label="${conv.label}" heading="${conv.heading}" headingItalic="${conv.headingItalic}"`)
  }

  // ─── 3. Add captions to the two single-layout photoGrid blocks ───────────
  console.log("\nAdding captions:")
  for (const target of CAPTION_TARGETS) {
    const idx = newBody.findIndex((b) => b._key === target.blockKey)
    if (idx === -1) throw new Error(`photoGrid block "${target.blockKey}" not found.`)
    const block = newBody[idx]
    if (block._type !== "photoGrid" || block.layout !== "single") {
      throw new Error(`Block "${target.blockKey}" is not a single-layout photoGrid (type=${block._type}, layout=${block.layout}).`)
    }
    if (!Array.isArray(block.images) || block.images.length !== 1) {
      throw new Error(`Block "${target.blockKey}" does not have exactly one image.`)
    }
    if (block.images[0].alt && !block.images[0].alt.toLowerCase().includes(target.filename.split(".")[0].split("-")[0])) {
      // soft sanity check only — not fatal, just a signal the wrong block might be targeted
      console.log(`  (note: alt text "${block.images[0].alt}" doesn't obviously match ${target.filename} — verify manually)`)
    }
    newBody[idx] = {
      ...block,
      images: [{ ...block.images[0], caption: target.caption }],
    }
    console.log(`  -> "${target.blockKey}": caption="${target.caption}"`)
  }

  // ─── 2. Repopulate photoStrip ──────────────────────────────────────────────
  const currentStrip = (doc.photoStrip as unknown[]) || []
  if (currentStrip.length !== 0) {
    throw new Error(`Expected photoStrip to be empty before repopulating, found ${currentStrip.length} item(s).`)
  }
  const newPhotoStrip = STRIP_FILES.map((filename, i) => ({
    _key: `strip-${i + 1}`,
    _type: "image",
    asset: { _type: "reference", _ref: ASSETS[filename] },
  }))
  console.log(`\nRepopulating photoStrip with: ${STRIP_FILES.join(", ")}`)

  console.log(`\nOriginal body length: ${body.length}, new body length: ${newBody.length} (no blocks added/removed, only converted)`)

  console.log("\nPatching document...")
  await client
    .patch(DOC_ID)
    .set({ body: newBody, photoStrip: newPhotoStrip })
    .commit()

  console.log("\nDone. Document patched:", DOC_ID)
}

main().catch((err) => {
  console.error("\nError:", err.message || err)
  process.exit(1)
})
