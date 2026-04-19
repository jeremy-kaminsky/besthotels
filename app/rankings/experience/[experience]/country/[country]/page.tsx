import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { HOTELS_BY_EXP_AND_COUNTRY_QUERY, ALL_HOTELS_SLIM_QUERY } from '@/sanity/queries/rankings'
import RankingPageTemplate, { type RankingHotel } from '@/components/RankingPageTemplate'

const MIN_HOTELS = 5

const EXPERIENCE_OPTIONS = [
  'Beach', 'Safari', 'Ski', 'Overwater', 'Eco', 'Wellness',
  'Adults-Only', 'Honeymoon', 'Family', 'Heritage', 'City',
  'Desert', 'Surf', 'Wilderness', 'Wine Country', 'Boutique',
]

function expToSlug(exp: string) { return exp.toLowerCase().replace(/\s+/g, '-') }
function slugToExp(slug: string) { return EXPERIENCE_OPTIONS.find(e => expToSlug(e) === slug) }

export async function generateStaticParams() {
  const hotels: { experiences?: string[]; country?: { slug: string } }[] = await client.fetch(ALL_HOTELS_SLIM_QUERY)
  const counts: Record<string, number> = {}
  for (const h of hotels) {
    for (const exp of h.experiences ?? []) {
      const key = `${expToSlug(exp)}|${h.country?.slug}`
      counts[key] = (counts[key] ?? 0) + 1
    }
  }
  return Object.entries(counts)
    .filter(([, c]) => c >= MIN_HOTELS)
    .map(([key]) => {
      const [experience, country] = key.split('|')
      return { experience, country }
    })
}

export default async function ExpCountryRankingPage({ params }: { params: { experience: string; country: string } }) {
  const exp = slugToExp(params.experience)
  if (!exp) notFound()

  const hotels: RankingHotel[] = await client.fetch(HOTELS_BY_EXP_AND_COUNTRY_QUERY, {
    exp,
    country: params.country,
  })

  if (hotels.length < MIN_HOTELS) notFound()

  const countryName = hotels[0]?.country?.name ?? params.country
  const rankingSlug = `experience-${params.experience}-country-${params.country}`

  return (
    <RankingPageTemplate
      eyebrow={`${exp} · ${countryName}`}
      title={`Top ${exp} Hotels in ${countryName}`}
      subtitle={`The finest ${exp.toLowerCase()} properties in ${countryName}.`}
      hotels={hotels}
      rankingSlug={rankingSlug}
    />
  )
}
