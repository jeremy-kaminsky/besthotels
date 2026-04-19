import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { HOTELS_BY_COUNTRY_QUERY, HOTEL_COUNT_BY_COUNTRY_QUERY } from '@/sanity/queries/rankings'
import RankingPageTemplate, { type RankingHotel } from '@/components/RankingPageTemplate'

const MIN_HOTELS = 5

export async function generateStaticParams() {
  const countries: { slug: string; count: number }[] = await client.fetch(HOTEL_COUNT_BY_COUNTRY_QUERY)
  return countries
    .filter(c => c.count >= MIN_HOTELS)
    .map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `Top Hotels in ${params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
  }
}

export default async function CountryRankingPage({ params }: { params: { slug: string } }) {
  const hotels: RankingHotel[] = await client.fetch(HOTELS_BY_COUNTRY_QUERY, { slug: params.slug })

  if (hotels.length < MIN_HOTELS) notFound()

  const countryName = hotels[0]?.country?.name ?? params.slug
  const rankingSlug = `country-${params.slug}`

  return (
    <RankingPageTemplate
      eyebrow={`Country · ${countryName}`}
      title={`Top Hotels in ${countryName}`}
      subtitle={`The finest properties across ${countryName}, ranked by editorial merit.`}
      hotels={hotels}
      rankingSlug={rankingSlug}
    />
  )
}
