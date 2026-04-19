import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { HOTELS_BY_EXP_AND_CONTINENT_QUERY, ALL_HOTELS_SLIM_QUERY } from '@/sanity/queries/rankings'
import RankingPageTemplate, { type RankingHotel } from '@/components/RankingPageTemplate'

const MIN_HOTELS = 5

const EXPERIENCE_OPTIONS = [
  'Beach', 'Safari', 'Ski', 'Overwater', 'Eco', 'Wellness',
  'Adults-Only', 'Honeymoon', 'Family', 'Heritage', 'City',
  'Desert', 'Surf', 'Wilderness', 'Wine Country', 'Boutique',
]

const CONTINENT_OPTIONS = [
  'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Caribbean', 'Middle East',
]

function expToSlug(exp: string) { return exp.toLowerCase().replace(/\s+/g, '-') }
function slugToExp(slug: string) { return EXPERIENCE_OPTIONS.find(e => expToSlug(e) === slug) }
function contToSlug(cont: string) { return cont.toLowerCase().replace(/\s+/g, '-') }
function slugToCont(slug: string) { return CONTINENT_OPTIONS.find(c => contToSlug(c) === slug) }

export async function generateStaticParams() {
  const hotels: { experiences?: string[]; country?: { continent?: string } }[] = await client.fetch(ALL_HOTELS_SLIM_QUERY)
  const counts: Record<string, number> = {}
  for (const h of hotels) {
    if (!h.country?.continent) continue
    for (const exp of h.experiences ?? []) {
      const key = `${expToSlug(exp)}|${contToSlug(h.country.continent)}`
      counts[key] = (counts[key] ?? 0) + 1
    }
  }
  return Object.entries(counts)
    .filter(([, c]) => c >= MIN_HOTELS)
    .map(([key]) => {
      const [experience, continent] = key.split('|')
      return { experience, continent }
    })
}

export default async function ExpContinentRankingPage({ params }: { params: { experience: string; continent: string } }) {
  const exp = slugToExp(params.experience)
  const continent = slugToCont(params.continent)
  if (!exp || !continent) notFound()

  const hotels: RankingHotel[] = await client.fetch(HOTELS_BY_EXP_AND_CONTINENT_QUERY, { exp, continent })

  if (hotels.length < MIN_HOTELS) notFound()

  const rankingSlug = `experience-${params.experience}-continent-${params.continent}`

  return (
    <RankingPageTemplate
      eyebrow={`${exp} · ${continent}`}
      title={`Top ${exp} Hotels in ${continent}`}
      subtitle={`The finest ${exp.toLowerCase()} properties across ${continent}.`}
      hotels={hotels}
      rankingSlug={rankingSlug}
    />
  )
}
