/**
 * Update hero image for Four Seasons Anguilla review.
 * Run: npx tsx sanity/seed/update_anguilla_hero.ts
 */
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'

const client = createClient({
  projectId: 'rpcxgrby',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const SLUG = 'four-seasons-anguilla'

async function downloadImage(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const protocol = url.startsWith('https') ? https : http
    const request = (urlToFetch: string) => {
      protocol.get(urlToFetch, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close()
          fs.unlinkSync(dest)
          const redirectUrl = res.headers.location!
          console.log(`  Redirecting to: ${redirectUrl}`)
          // Handle redirect with possibly different protocol
          const newFile = fs.createWriteStream(dest)
          const newProtocol = redirectUrl.startsWith('https') ? https : http
          newProtocol.get(redirectUrl, (res2) => {
            res2.pipe(newFile)
            newFile.on('finish', () => { newFile.close(); resolve() })
            newFile.on('error', reject)
          }).on('error', reject)
          return
        }
        if (res.statusCode !== 200) {
          file.close()
          fs.unlinkSync(dest)
          reject(new Error(`HTTP ${res.statusCode} for ${urlToFetch}`))
          return
        }
        res.pipe(file)
        file.on('finish', () => { file.close(); resolve() })
        file.on('error', reject)
      }).on('error', (err) => {
        file.close()
        fs.unlinkSync(dest)
        reject(err)
      })
    }
    request(url)
  })
}

async function main() {
  // ── 1. Find the document ────────────────────────────────────────────────────
  console.log(`\nSearching for review with slug: ${SLUG}`)
  const doc = await client.fetch(
    `*[_type == "review" && slug.current == $slug][0]`,
    { slug: SLUG }
  )

  if (!doc) {
    throw new Error(`No review found with slug "${SLUG}"`)
  }

  console.log(`\nFound document: ${doc._id}`)
  console.log(`  Hotel: ${doc.hotelName}`)
  console.log(`  Current heroImage: ${JSON.stringify(doc.heroImage, null, 2)}`)
  console.log(`  Current heroImageUrl: ${doc.heroImageUrl || '(none)'}`)

  // ── 2. Fetch official press image ───────────────────────────────────────────
  // Official Four Seasons Anguilla press/media image — aerial beach shot of
  // Barnes Bay (Meads Bay) property. Direct URL from Four Seasons media assets.
  // Official Four Seasons Anguilla hero image — the same image used on fourseasons.com/anguilla/
  // AIL_109_original.jpg = beach/resort exterior shot from the Four Seasons press portal
  const PRESS_URL = 'https://press.fourseasons.com/content/dam/fourseasons/images/web/AIL/AIL_109_original.jpg'

  const tmpPath = path.join('/tmp', 'fs-anguilla-hero.jpg')

  console.log(`\nDownloading official press image: AIL_109_original.jpg`)
  try {
    await downloadImage(PRESS_URL, tmpPath)
    const stat = fs.statSync(tmpPath)
    console.log(`  Downloaded ${(stat.size / 1024).toFixed(0)}KB`)
  } catch (e: any) {
    // Fall back to the local copy (which was sourced from the same press URL)
    const localHero = path.join(process.cwd(), 'public/images/reviews/four-seasons-anguilla/hero.jpg')
    if (fs.existsSync(localHero)) {
      const stat = fs.statSync(localHero)
      console.log(`  Download failed (${e.message}), using local copy: ${(stat.size / 1024).toFixed(0)}KB`)
      fs.copyFileSync(localHero, tmpPath)
    } else {
      throw new Error(`Could not fetch image and no local fallback: ${e.message}`)
    }
  }

  // ── 3. Upload to Sanity ─────────────────────────────────────────────────────
  console.log('\nUploading image asset to Sanity...')
  const imageBuffer = fs.readFileSync(tmpPath)
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: 'four-seasons-anguilla-hero.jpg',
    contentType: 'image/jpeg',
  })
  console.log(`  Uploaded asset: ${asset._id}`)
  console.log(`  URL: ${asset.url}`)

  // ── 4. Patch the document ───────────────────────────────────────────────────
  const draftId = doc._id.startsWith('drafts.') ? doc._id : `drafts.${doc._id}`
  const publishedId = doc._id.replace(/^drafts\./, '')

  console.log(`\nPatching draft document: ${draftId}`)
  await client
    .patch(draftId)
    .set({
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
    })
    .commit({ autoGenerateArrayKeys: true })
    .catch(async (err) => {
      // Draft may not exist — patch the published doc directly
      if (err.statusCode === 404) {
        console.log(`  Draft not found, patching published: ${publishedId}`)
        await client
          .patch(publishedId)
          .set({
            heroImage: {
              _type: 'image',
              asset: { _type: 'reference', _ref: asset._id },
            },
          })
          .commit({ autoGenerateArrayKeys: true })
      } else {
        throw err
      }
    })

  // ── 5. Publish ──────────────────────────────────────────────────────────────
  console.log('\nPublishing document...')
  // Fetch the full draft to publish
  const draft = await client.fetch(`*[_id == $id][0]`, { id: draftId })
  if (draft) {
    const { _id, _rev, _updatedAt, ...rest } = draft
    await client.createOrReplace({ ...rest, _id: publishedId })
    // Delete the draft
    await client.delete(draftId).catch(() => {})
    console.log(`  Published: ${publishedId}`)
  } else {
    console.log(`  No draft to publish (document was already published in place)`)
  }

  console.log('\nDone! Hero image updated for Four Seasons Anguilla.')
  console.log(`  Asset ID: ${asset._id}`)
  console.log(`  Asset URL: ${asset.url}`)

  // Clean up
  fs.unlinkSync(tmpPath)
}

main().catch((err) => {
  console.error('\nError:', err.message || err)
  process.exit(1)
})
