import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { HOTELS_BY_CITY_QUERY, HOTEL_COUNT_BY_CITY_QUERY } from '@/sanity/queries/rankings'
import RankingPageTemplate, { type RankingHotel } from '@/components/RankingPageTemplate'

const MIN_HOTELS = 5

export async function generateStaticParams() {
  const cities: { slug: string; count: number }[] = await client.fetch(HOTEL_COUNT_BY_CITY_QUERY)
  return cities
    .filter(c => c.count >= MIN_HOTELS)
    .map(c => ({ city: c.slug }))
}

export async function generateMetadata({ params }: { params: { city: string } }) {
  return {
    title: `Top Hotels in ${params.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
  }
}

export default async function CityRankingPage({ params }: { params: { city: string } }) {
  const hotels: RankingHotel[] = await client.fetch(HOTELS_BY_CITY_QUERY, { slug: params.city })

  if (hotels.length < MIN_HOTELS) notFound()

  const cityName = hotels[0]?.city?.name ?? params.city
  const rankingSlug = `city-${params.city}`

  return (
    <RankingPageTemplate
      eyebrow={`City · ${cityName}`}
      title={`Top Hotels in ${cityName}`}
      subtitle={`The finest properties in ${cityName}, ranked by editorial merit.`}
      hotels={hotels}
      rankingSlug={rankingSlug}
    />
  )
}
