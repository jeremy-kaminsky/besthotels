import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { REVIEWS_BY_CITY_QUERY } from '@/sanity/queries/reviews'
import ReviewCard from '@/components/ReviewCard'
import Link from 'next/link'

interface Props { params: { city: string } }

export async function generateStaticParams() {
  try {
    const cities = await client.fetch(`*[_type=="city"]{ "slug": slug.current }`)
    return cities.map((c: { slug: string }) => ({ city: c.slug }))
  } catch { return [] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityName = params.city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return { title: `Best Hotels in ${cityName}`, description: `Browse our curated reviews of the best luxury hotels in ${cityName}.` }
}

export default async function CityPage({ params }: Props) {
  let reviews: { _id: string; slug: string; hotelName: string; regionLabel?: string; locationLabel?: string; score?: number; excerpt?: string; heroImageUrl?: string }[] = []
  let cityName = params.city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  try {
    const result = await client.fetch(REVIEWS_BY_CITY_QUERY, { citySlug: params.city })
    reviews = result
    const cityDoc = await client.fetch(`*[_type=="city" && slug.current==$slug][0]{name}`, { slug: params.city })
    if (cityDoc?.name) cityName = cityDoc.name
  } catch {}

  return (
    <>
      <section className="page-hero" style={{ height: 320, backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2000&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="page-hero-content">
          <div className="page-eyebrow"><Link href="/reviews">Reviews</Link> · {cityName}</div>
          <h1 className="page-title">Best Hotels in <em>{cityName}</em></h1>
          <p className="page-sub">{reviews.length} {reviews.length === 1 ? 'property' : 'properties'} reviewed</p>
        </div>
      </section>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <ReviewCard key={r._id} slug={r.slug} hotelName={r.hotelName} regionLabel={r.regionLabel} locationLabel={r.locationLabel} score={r.score} excerpt={r.excerpt} heroImageUrl={r.heroImageUrl} featured={i === 0 && reviews.length >= 3} />
        ))}
      </div>
      {reviews.length === 0 && <div className="empty-results"><p>No reviews yet for {cityName}.</p></div>}
    </>
  )
}
