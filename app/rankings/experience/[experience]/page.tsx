import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { HOTELS_BY_EXPERIENCE_QUERY, ALL_HOTELS_SLIM_QUERY } from '@/sanity/queries/rankings'
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
  const hotels: { experiences?: string[] }[] = await client.fetch(ALL_HOTELS_SLIM_QUERY)
  const counts: Record<string, number> = {}
  for (const h of hotels) {
    for (const exp of h.experiences ?? []) {
      const s = expToSlug(exp)
      counts[s] = (counts[s] ?? 0) + 1
    }
  }
  return Object.entries(counts)
    .filter(([, c]) => c >= MIN_HOTELS)
    .map(([experience]) => ({ experience }))
}

export async function generateMetadata({ params }: { params: { experience: string } }) {
  const exp = slugToExp(params.experience) ?? params.experience
  return { title: `Top ${exp} Hotels` }
}

export default async function ExperienceRankingPage({ params }: { params: { experience: string } }) {
  const exp = slugToExp(params.experience)
  if (!exp) notFound()

  const hotels: RankingHotel[] = await client.fetch(HOTELS_BY_EXPERIENCE_QUERY, { exp })

  if (hotels.length < MIN_HOTELS) notFound()

  const rankingSlug = `experience-${params.experience}`

  return (
    <RankingPageTemplate
      eyebrow={`Experience · ${exp}`}
      title={`Top ${exp} Hotels`}
      subtitle={`The world's finest ${exp.toLowerCase()} properties, selected by our editorial team.`}
      hotels={hotels}
      rankingSlug={rankingSlug}
    />
  )
}
