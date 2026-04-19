import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { ALL_REVIEWS_QUERY, ALL_FILTER_OPTIONS_QUERY } from '@/sanity/queries/reviews'
import ReviewsClient from './ReviewsClient'

export const metadata: Metadata = {
  title: 'Resort & Hotel Reviews',
  description: 'Every property reviewed in person. We stay so you can choose with confidence. Filter by country, region, city, and experience type.',
}

export default async function ReviewsPage() {
  let reviews: Parameters<typeof ReviewsClient>[0]['reviews'] = []
  let filterOptions: {
    countries: Parameters<typeof ReviewsClient>[0]['countries']
    states: Parameters<typeof ReviewsClient>[0]['states']
    cities: Parameters<typeof ReviewsClient>[0]['cities']
    experiences: Parameters<typeof ReviewsClient>[0]['experiences']
  } = { countries: [], states: [], cities: [], experiences: [] }

  try {
    const [fetchedReviews, fetchedFilters] = await Promise.all([
      client.fetch(ALL_REVIEWS_QUERY),
      client.fetch(ALL_FILTER_OPTIONS_QUERY),
    ])
    reviews = fetchedReviews
    filterOptions = fetchedFilters
  } catch (e) {
    console.error('[ReviewsPage] Sanity fetch failed:', e)
  }

  return (
    <>
      <section
        className="page-hero reviews-hero"
        style={{ height: '55vh' }}
      >
        <Image
          src="/images/reviews-hero-aminess-khalani.jpg"
          alt="Aminess Laurel Khalani Hotel pool and sea view, Makarska Croatia"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className="page-hero-content">
          <p className="page-eyebrow fu">Aminess Laurel Khalani · Makarska, Croatia</p>
          <h1 className="page-title fu">Resort &amp; Hotel <em>Reviews</em></h1>
          <p className="page-sub fu">Every property reviewed in person. We stay so you can choose with confidence.</p>
        </div>
      </section>

      <Suspense fallback={<div style={{ padding: '4rem 3rem', color: 'var(--muted)' }}>Loading filters…</div>}>
        <ReviewsClient
          reviews={reviews}
          countries={filterOptions.countries}
          states={filterOptions.states}
          cities={filterOptions.cities}
          experiences={filterOptions.experiences}
        />
      </Suspense>
    </>
  )
}
