import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { HOTELS_BY_REGION_QUERY, HOTEL_COUNT_BY_REGION_QUERY } from '@/sanity/queries/rankings'
import RankingPageTemplate, { type RankingHotel } from '@/components/RankingPageTemplate'

const MIN_HOTELS = 5

export async function generateStaticParams() {
  const regions: { slug: string; count: number }[] = await client.fetch(HOTEL_COUNT_BY_REGION_QUERY)
  return regions
    .filter(r => r.count >= MIN_HOTELS)
    .map(r => ({ region: r.slug }))
}

export async function generateMetadata({ params }: { params: { region: string } }) {
  return {
    title: `Top Hotels in ${params.region.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
  }
}

export default async function RegionRankingPage({ params }: { params: { region: string } }) {
  const hotels: RankingHotel[] = await client.fetch(HOTELS_BY_REGION_QUERY, { slug: params.region })

  if (hotels.length < MIN_HOTELS) notFound()

  const regionName = hotels[0]?.region?.name ?? params.region
  const rankingSlug = `region-${params.region}`

  return (
    <RankingPageTemplate
      eyebrow={`Region · ${regionName}`}
      title={`Top Hotels in ${regionName}`}
      subtitle={`The finest properties across ${regionName}, ranked by editorial merit.`}
      hotels={hotels}
      rankingSlug={rankingSlug}
    />
  )
}
