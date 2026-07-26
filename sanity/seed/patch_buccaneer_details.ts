/**
 * Patch — The Buccaneer (St. Croix): add the remaining structural pieces
 * to match Shebara Resort's template — a "Need to Know" grid + verdict +
 * tag row appended to the body, plus the sidebar-level Hotel Details
 * fields (category, villaCount, diningInfo, nightlyRate, bookingUrl,
 * sidebarDetails).
 *
 * Run: npx tsx sanity/seed/patch_buccaneer_details.ts
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

// ─── New body blocks, appended after the existing final paragraph ─────────
const NEW_BODY_BLOCKS = [
  {
    _type: "sectionHeader",
    _key: "ntk-head",
    heading: "",
    label: "Need to Know",
  },
  {
    _type: "ntkGrid",
    _key: "ntk",
    items: [
      { label: "Nightly Rate", value: "~$300–$700+/night depending on room type and season" },
      { label: "Alcohol", value: "Served — full bar and restaurant wine list on-site" },
      { label: "Getting There", value: "Located near Christiansted; approx. 20 min from Henry E. Rohlsen Airport (STX)" },
      { label: "Best For", value: "Multi-generational family trips, reunions, and destination weddings" },
      { label: "Pro Tip", value: "The Beach House villa is ideal for large groups traveling together" },
    ],
  },
  {
    _type: "verdict",
    _key: "verdict",
    label: "The Verdict",
    title: "A Caribbean classic that trades polish for personality.",
    text:
      "The Buccaneer isn't chasing the sleek, ultra-modern look that so many newer Caribbean resorts lean on — and that's exactly the point. Family-owned and welcoming guests since 1947, it wears its history in the colorful architecture, the mature grounds, and a staff that treats you like a regular after a single stay. For a family chasing four beaches, a golf course, and a home base that never feels crowded, it's one of the best choices on the island.",
  },
  {
    _type: "tagRow",
    _key: "tags",
    tags: ["#CaribbeanTravel", "#FamilyResort", "#StCroix", "#USVirginIslands", "#TheBuccaneer"],
  },
]

// ─── Sidebar-level Hotel Details (top-level schema fields) ────────────────
const TOP_LEVEL_FIELDS = {
  category: "Beach & Golf Resort",
  villaCount: "138 rooms + The Beach House (private villa)",
  diningInfo: "Multiple on-site restaurants + beachfront dining",
  nightlyRate: "~$300–$700+/night",
  bookingUrl: "https://thebuccaneer.com/stay/",
  sidebarDetails: [
    { _key: "sd-0", key: "Alcohol", value: "Served" },
    { _key: "sd-1", key: "Pool", value: "2 freshwater pools" },
    { _key: "sd-2", key: "Spa", value: "On-site spa" },
    { _key: "sd-3", key: "Arrival", value: "Ground transport from STX airport (~20 min)" },
  ],
}

const LAST_ANCHOR_KEY = "p24"
const LAST_ANCHOR_TEXT =
  "A week here reminded me that the best vacations aren't always about finding the fanciest rooms—they're about spending time with the people you're with, discovering beautiful places together, and leaving with stories you'll still be talking about years later."

async function main() {
  console.log("=== Patching The Buccaneer: Need to Know + Verdict + Tags + sidebar details ===\n")

  const doc = await client.getDocument(DOC_ID)
  if (!doc) throw new Error(`Document not found: ${DOC_ID}`)

  const body = doc.body as { _key: string; _type: string; children?: { text: string }[] }[]
  if (!Array.isArray(body) || body.length === 0) {
    throw new Error("Document has no body array to patch.")
  }

  // ─── Idempotency guard: don't double-insert if this has already run ──────
  const alreadyHasVerdict = body.some((b) => b._type === "verdict")
  if (alreadyHasVerdict) {
    throw new Error("Body already contains a 'verdict' block — refusing to patch again to avoid duplicates.")
  }

  // ─── Verify the body still ends where we expect before appending ─────────
  const lastBlock = body[body.length - 1]
  if (lastBlock._key !== LAST_ANCHOR_KEY) {
    throw new Error(`Expected last body block to have _key "${LAST_ANCHOR_KEY}", found "${lastBlock._key}".`)
  }
  const lastText = lastBlock.children?.[0]?.text
  if (lastText !== LAST_ANCHOR_TEXT) {
    throw new Error(`Last block text mismatch.\n  expected: ${LAST_ANCHOR_TEXT}\n  actual:   ${lastText}`)
  }

  const newBody = [...body, ...NEW_BODY_BLOCKS]
  console.log(`Appending ${NEW_BODY_BLOCKS.length} blocks (sectionHeader, ntkGrid, verdict, tagRow).`)
  console.log(`Original body length: ${body.length}, new body length: ${newBody.length}\n`)

  console.log("Setting top-level Hotel Details fields:")
  for (const [key, value] of Object.entries(TOP_LEVEL_FIELDS)) {
    console.log(`  ${key}: ${JSON.stringify(value)}`)
  }

  console.log("\nPatching document...")
  await client
    .patch(DOC_ID)
    .set({ body: newBody, ...TOP_LEVEL_FIELDS })
    .commit()

  console.log("\nDone. Document patched:", DOC_ID)
}

main().catch((err) => {
  console.error("\nError:", err.message || err)
  process.exit(1)
})
