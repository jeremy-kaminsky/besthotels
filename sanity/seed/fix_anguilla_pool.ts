import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'rpcxgrby',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const BROKEN = 'https://images.unsplash.com/photo-1602002418082-dd4a3f5b4d5c?w=1400&q=85&auto=format&fit=crop'
const REPLACEMENT = '/images/reviews/four-seasons-anguilla/03.jpg'

async function main() {
  const doc = await client.fetch(`*[_type == 'review' && slug.current == 'four-seasons-anguilla'][0]`)
  console.log(`Document: ${doc._id}`)

  const body: any[] = doc.body || []
  let patchedBody = false

  for (let i = 0; i < body.length; i++) {
    const block = body[i]
    if (block._type === 'photoGrid' && Array.isArray(block.images)) {
      for (let j = 0; j < block.images.length; j++) {
        if (block.images[j].url === BROKEN) {
          console.log(`Found broken URL at body[${i}].images[${j}] — patching...`)
          body[i].images[j].url = REPLACEMENT
          patchedBody = true
        }
      }
    }
  }

  if (!patchedBody) {
    console.log('Broken URL not found in body. No changes made.')
    return
  }

  await client.patch(doc._id).set({ body }).commit()
  console.log(`Patched published doc: ${doc._id}`)
}

main().catch(console.error)
