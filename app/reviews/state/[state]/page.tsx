import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { REVIEWS_BY_STATE_QUERY } from '@/sanity/queries/reviews'
import ReviewCard from '@/components/ReviewCard'
import Link from 'next/link'

interface Props { params: { state: string } }

export async function generateStaticParams() {
  try {
    const states = await client.fetch(`*[_type=="state"]{ "slug": slug.current }`)
    return states.map((s: { slug: string }) => ({ state: s.slug }))
  } catch { return [] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stateName = params.state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return { title: `Best Hotels in ${stateName}`, description: `Browse our curated reviews of the best luxury hotels in ${stateName}.` }
}

export default async function StatePage({ params }: Props) {
  let reviews: { _id: string; slug: string; hotelName: string; regionLabel?: string; locationLabel?: string; score?: number; excerpt?: string; heroImageUrl?: string }[] = []
  let stateName = params.state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  try {
    const result = await client.fetch(REVIEWS_BY_STATE_QUERY, { stateSlug: params.state })
    reviews = result
    const stateDoc = await client.fetch(`*[_type=="state" && slug.current==$slug][0]{name}`, { slug: params.state })
    if (stateDoc?.name) stateName = stateDoc.name
  } catch {}

  return (
    <>
      <section className="page-hero" style={{ height: 320, backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2000&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="page-hero-content">
          <div className="page-eyebrow"><Link href="/reviews">Reviews</Link> · {stateName}</div>
          <h1 className="page-title">Best Hotels in <em>{stateName}</em></h1>
          <p className="page-sub">{reviews.length} {reviews.length === 1 ? 'property' : 'properties'} reviewed</p>
        </div>
      </section>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <ReviewCard key={r._id} slug={r.slug} hotelName={r.hotelName} regionLabel={r.regionLabel} locationLabel={r.locationLabel} score={r.score} excerpt={r.excerpt} heroImageUrl={r.heroImageUrl} featured={i === 0 && reviews.length >= 3} />
        ))}
      </div>
      {reviews.length === 0 && <div className="empty-results"><p>No reviews yet for {stateName}.</p></div>}
    </>
  )
}
