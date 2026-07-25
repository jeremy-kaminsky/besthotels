/**
 * Create review — The Buccaneer (St. Croix, U.S. Virgin Islands)
 * Run: npx tsx sanity/seed/create_the_buccaneer.ts
 * Requires SANITY_API_TOKEN (Editor permissions) exported in the shell.
 *
 * BEFORE RUNNING:
 *   1. Paste the review body text into the BODY_PARAGRAPHS array.
 */
import "dotenv/config"
import { createClient } from "@sanity/client"
import fs from "fs"
import path from "path"

const client = createClient({
  projectId: "rpcxgrby",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
})

const IMAGE_DIR = "/Users/jordankaminsky/Downloads/buccaneer-photos"

const HERO_FILE = "pool.jpg"
const GALLERY_FILES = [
  "palm-sunset.jpg",
  "aerial-golf.jpg",
  "cabana.jpg",
  "buddha.jpg",
  "villa-fruit.jpg",
  "boat-excursion.jpg",
]

const BODY_PARAGRAPHS: string[] = [
  "A Caribbean Classic Made for Families",
  "Some resorts may impress us with brilliant luxury- while others can leave a lasting impression by making you feel at home. The Buccaneer in St. Croix firmly belongs in the latter category, offering one of the St. Croix's most authentic island experiences.",
  "During our week-long stay, my family had the opportunity to stay in The Beach House, a spectacular private residence at the resort, perched atop a cliff overlooking the Caribbean Sea. It was large enough to comfortably accommodate twelve of us, the home somehow managed to make everyone feel together without ever feeling crowded. Whether we were drinking coffee on the balcony in the morning, cooling off in the beautiful pool, grilling dinner in the evening, or simply watching the waves crash against the cliffs below, it soon became one of those places you never wanted to leave.",
  "The beach house at the Buccaneer is a home that works just as well for a multi-generational family vacation as it would for a reunion with friends or wedding parties.",
  "Beaches to Explore",
  "One thing I didn't fully appreciate until we arrived was just how much variety The Buccaneer offers. Instead of one main beach, we found ourselves exploring four different beach areas throughout the week, each with its own personality.",
  "Some had calm, crystal-clear water that was perfect for swimming, while others felt tucked away beneath rocky cliffs, making them feel almost private- my favorites were Whistle and Mermaid Beach. Rather than spending seven days looking at the same stretches of sand, we enjoyed discovering a different corner of the resort each day. Snorkeling is a must!",
  "Getting to the beaches was part of the experience. The winding paths through the property are beautifully landscaped, with tropical flowers, towering palms, and incredible views around nearly every turn. I actually looked forward to the walks almost as much as the beach itself.",
  "Golf With a View",
  "I couldn't pass up The Buccaneer's golf course—and I'm glad I didn't.",
  "The course winds through rolling hills with its signature hole #3 overlooking the Caribbean, it is a masterpiece. It isn't meant to be the toughest course you'll ever play, but it delivers exactly what a vacation round should: beautiful views, a relaxed pace, and a setting that's hard to beat.",
  "Plenty of Dining Options",
  "Another thing our family appreciated was having several restaurants to choose from throughout the week. Whether we wanted a casual lunch after the beach or a relaxed dinner overlooking the water, it was nice not feeling like we had to leave the resort every evening.",
  "An Authentic Caribbean Experience",
  "If I had one criticism, it's also part of what makes The Buccaneer unique..",
  "Travelers or couples looking for a sleek, ultra-luxury resort with cutting-edge design and every modern finish may find other Caribbean resorts that better fit that lux style. The Buccaneer wears its history proudly, and some accommodations reflect that.",
  "Personally, I think that's part of its charm-",
  "Instead of feeling like a luxury resort that could exist anywhere in the world, The Buccaneer feels unmistakably St. Croix. The colorful architecture, friendly staff, mature landscaping, and laid-back atmosphere give it a personality that many newer resorts simply can't replicate.",
  "Who Should Stay Here?",
  "If you're planning a romantic honeymoon and your priority is a modern and luxurious energy, there may be better options elsewhere in the Caribbean.",
  "But if you're traveling with family, I honestly think The Buccaneer is one of the best choices on the island. Between the multiple beaches, pools, restaurants, golf course, tennis courts, and spacious accommodations, there's enough to keep everyone happy without ever feeling like you're competing for space.",
  "Final Thoughts",
  "Some resorts are unforgettable because they're extravagant. The Buccaneer is unforgettable because it feels genuine.",
  "A week here reminded me that the best vacations aren't always about finding the fanciest rooms—they're about spending time with the people you're with, discovering beautiful places together, and leaving with stories you'll still be talking about years later.",
]

function block(key: string, text: string, style = "normal") {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-s`, marks: [], text }],
  }
}

async function getOrCreateDoc(doc: Record<string, unknown>): Promise<string> {
  const id = doc._id as string
  const existing = await client.getDocument(id)
  if (existing) {
    console.log(`  -> exists: ${id}`)
    return id
  }
  await client.createOrReplace(doc)
  console.log(`  -> created: ${id}`)
  return id
}

async function uploadImage(filename: string) {
  const filePath = path.join(IMAGE_DIR, filename)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Image not found: ${filePath}`)
  }
  const buffer = fs.readFileSync(filePath)
  console.log(`  Uploading ${filename}...`)
  const asset = await client.assets.upload("image", buffer, { filename })
  console.log(`    -> asset ${asset._id}`)
  return asset
}

async function main() {
  console.log("=== Creating review: The Buccaneer (St. Croix) ===\n")

  if (IMAGE_DIR === "/path/to/image/folder") {
    throw new Error("Set IMAGE_DIR at the top of this script before running.")
  }

  // ─── Location references ────────────────────────────────────────────────
  console.log("Resolving country/region...")

  const countryId = await getOrCreateDoc({
    _type: "country",
    _id: "country-us-virgin-islands",
    name: "U.S. Virgin Islands",
    slug: { _type: "slug", current: "us-virgin-islands" },
    continent: "Caribbean",
  })

  const regionId = await getOrCreateDoc({
    _type: "region",
    _id: "region-st-croix",
    name: "St. Croix",
    slug: { _type: "slug", current: "st-croix" },
    country: { _type: "reference", _ref: countryId },
  })

  // ─── Images ──────────────────────────────────────────────────────────────
  console.log("\nUploading hero image...")
  const heroAsset = await uploadImage(HERO_FILE)

  console.log("\nUploading gallery images...")
  const galleryAssets = []
  for (const filename of GALLERY_FILES) {
    galleryAssets.push(await uploadImage(filename))
  }

  // ─── Body content ──────────────────────────────────────────────────────
  const body =
    BODY_PARAGRAPHS.length > 0
      ? BODY_PARAGRAPHS.map((text, i) => block(`p${i + 1}`, text))
      : []

  if (body.length === 0) {
    console.log("\nNOTE: BODY_PARAGRAPHS is empty — creating doc with no body content. Re-run after pasting the text.")
  }

  // ─── Review document ─────────────────────────────────────────────────────
  console.log("\nCreating review document...")

  await getOrCreateDoc({
    _type: "review",
    _id: "review-the-buccaneer-st-croix",
    hotelName: "The Buccaneer",
    slug: { _type: "slug", current: "the-buccaneer-st-croix" },
    subtitle: "A Caribbean Classic Made for Families",
    regionLabel: "Caribbean · U.S. Virgin Islands",
    locationLabel: "St. Croix, U.S. Virgin Islands",
    score: 9,
    country: { _type: "reference", _ref: countryId },
    region: { _type: "reference", _ref: regionId },
    heroImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroAsset._id },
    },
    photoStrip: galleryAssets.map((asset, i) => ({
      _type: "image",
      _key: `photo-${i + 1}`,
      asset: { _type: "reference", _ref: asset._id },
    })),
    body,
  })

  console.log("\nDone. Document ID: review-the-buccaneer-st-croix")
}

main().catch((err) => {
  console.error("\nError:", err.message || err)
  process.exit(1)
})
