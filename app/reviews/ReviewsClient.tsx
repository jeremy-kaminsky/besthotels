'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'
import FilterBar from '@/components/FilterBar'
import ReviewCard from '@/components/ReviewCard'

interface Review {
  _id: string
  slug: string
  hotelName: string
  regionLabel?: string
  locationLabel?: string
  score?: number
  excerpt?: string
  heroImageUrl?: string
  publishedDate?: string
  country?: { name: string; slug: string }
  state?: { name: string; slug: string }
  city?: { name: string; slug: string }
  experiences?: { name: string; slug: string }[]
}

interface FilterOption {
  _id: string
  name: string
  slug: string
  country?: { _id: string; slug: string }
  state?: { _id: string; slug: string }
  icon?: string
}

interface Props {
  reviews: Review[]
  countries: FilterOption[]
  states: FilterOption[]
  cities: FilterOption[]
  experiences: (FilterOption & { icon?: string })[]
}

export default function ReviewsClient({ reviews, countries, states, cities, experiences }: Props) {
  const searchParams = useSearchParams()
  const countrySlug = searchParams.get('country')
  const stateSlug = searchParams.get('state')
  const citySlug = searchParams.get('city')
  const expSlug = searchParams.get('experience')
  const sort = searchParams.get('sort') || 'editor'

  const filtered = useMemo(() => {
    let result = [...reviews]
    if (countrySlug) result = result.filter(r => r.country?.slug === countrySlug)
    if (stateSlug) result = result.filter(r => r.state?.slug === stateSlug)
    if (citySlug) result = result.filter(r => r.city?.slug === citySlug)
    if (expSlug) result = result.filter(r => r.experiences?.some(e => e.slug === expSlug))
    if (sort === 'newest') result.sort((a, b) => (b.publishedDate || '').localeCompare(a.publishedDate || ''))
    else if (sort === 'rating') result.sort((a, b) => (b.score || 0) - (a.score || 0))
    else if (sort === 'az') result.sort((a, b) => a.hotelName.localeCompare(b.hotelName))
    return result
  }, [reviews, countrySlug, stateSlug, citySlug, expSlug, sort])

  const hasFilters = !!(countrySlug || stateSlug || citySlug || expSlug)

  return (
    <>
      <FilterBar countries={countries} states={states} cities={cities} experiences={experiences} />

      <div style={{ padding: '1.5rem 3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="results-bar">
          <div>
            <span className="count" id="resultCount">{hasFilters ? filtered.length : 'All'}</span> properties matching your filters
          </div>
          <div className="sort">
            Sort by
            <select
              defaultValue={sort}
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search)
                params.set('sort', e.target.value)
                window.history.replaceState(null, '', `?${params.toString()}`)
              }}
            >
              <option value="editor">Editor&apos;s Pick</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-results">
          <p>No properties match these filters.</p>
          <Link href="/reviews">
            <button>Clear all filters</button>
          </Link>
        </div>
      ) : (
        <div className="reviews-grid">
          {filtered.map((review, i) => (
            <ReviewCard
              key={review._id}
              slug={review.slug}
              hotelName={review.hotelName}
              regionLabel={review.regionLabel}
              locationLabel={review.locationLabel}
              score={review.score}
              excerpt={review.excerpt}
              heroImageUrl={review.heroImageUrl}
              featured={i === 0 && filtered.length >= 4}
            />
          ))}
        </div>
      )}
    </>
  )
}
