import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

// Replacement 1400px Unsplash images per review — distinct from strip images
const REPLACEMENTS: Record<string, [string, string]> = {
  "four-seasons-maui-wailea": [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540541338537-ad197787cc00?w=1400&q=85&auto=format&fit=crop",
  ],
  "four-seasons-hualalai": [
    "https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=1400&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1400&q=85&auto=format&fit=crop",
  ],
  "four-seasons-anguilla": [
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1400&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602002418082-dd4a3f5b4d5c?w=1400&q=85&auto=format&fit=crop",
  ],
  "four-seasons-nevis": [
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=1400&q=85&auto=format&fit=crop",
  ],
}

async function main() {
  for (const [slug, [url1, url2]] of Object.entries(REPLACEMENTS)) {
    const doc = await client.fetch(
      `*[_type == "review" && slug.current == $slug][0] { _id, body }`,
      { slug }
    )
    if (!doc) { console.log(`${slug}: NOT FOUND`); continue }

    // Deep-clone body and replace photoGrid 2col image URLs
    const body = JSON.parse(JSON.stringify(doc.body || []))
    let changed = false
    for (const block of body) {
      if (block._type === "photoGrid" && block.layout === "2col" && block.images?.length === 2) {
        const oldUrls = block.images.map((i: {url?: string}) => i.url)
        // Only replace if current URLs are local 400px thumbnails
        if (oldUrls.every((u: string) => u && u.startsWith("/images/"))) {
          block.images[0].url = url1
          block.images[1].url = url2
          changed = true
          console.log(`${slug}: replacing [${oldUrls.join(", ")}] → Unsplash 1400px`)
        }
      }
    }

    if (!changed) { console.log(`${slug}: no 2col local-path photoGrid found, skipping`); continue }

    await client.patch(doc._id).set({ body }).commit()
    console.log(`${slug}: patched ✓`)
  }
  console.log("\nDone.")
}
main().catch(console.error)
