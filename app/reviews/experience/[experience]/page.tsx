import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { REVIEWS_BY_EXPERIENCE_QUERY } from '@/sanity/queries/reviews'
import ReviewCard from '@/components/ReviewCard'
import Link from 'next/link'

interface Props { params: { experience: string } }

export async function generateStaticParams() {
  try {
    const experiences = await client.fetch(`*[_type=="experience"]{ "slug": slug.current }`)
    return experiences.map((e: { slug: string }) => ({ experience: e.slug }))
  } catch { return [] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const expName = params.experience.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return { title: `Best ${expName} Hotels`, description: `Browse our curated reviews of the best luxury ${expName.toLowerCase()} hotels and resorts worldwide.` }
}

export default async function ExperiencePage({ params }: Props) {
  let reviews: { _id: string; slug: string; hotelName: string; regionLabel?: string; locationLabel?: string; score?: number; excerpt?: string; heroImageUrl?: string }[] = []
  let expName = params.experience.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  try {
    const result = await client.fetch(REVIEWS_BY_EXPERIENCE_QUERY, { expSlug: params.experience })
    reviews = result
    const expDoc = await client.fetch(`*[_type=="experience" && slug.current==$slug][0]{name}`, { slug: params.experience })
    if (expDoc?.name) expName = expDoc.name
  } catch {}

  return (
    <>
      <section className="page-hero" style={{ height: 320, backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2000&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="page-hero-content">
          <div className="page-eyebrow"><Link href="/reviews">Reviews</Link> · {expName}</div>
          <h1 className="page-title">Best <em>{expName}</em> Hotels</h1>
          <p className="page-sub">{reviews.length} {reviews.length === 1 ? 'property' : 'properties'} reviewed</p>
        </div>
      </section>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <ReviewCard key={r._id} slug={r.slug} hotelName={r.hotelName} regionLabel={r.regionLabel} locationLabel={r.locationLabel} score={r.score} excerpt={r.excerpt} heroImageUrl={r.heroImageUrl} featured={i === 0 && reviews.length >= 3} />
        ))}
      </div>
      {reviews.length === 0 && <div className="empty-results"><p>No {expName.toLowerCase()} reviews yet.</p></div>}
    </>
  )
}
