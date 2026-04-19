import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { TOP50_RANKING_QUERY } from '@/sanity/queries/rankings'
import RankingPageTemplate, { type RankingHotel } from '@/components/RankingPageTemplate'

export const metadata: Metadata = {
  title: 'Top 50 Hotels in the World',
  description: "Best Hotels' definitive global ranking — 50 properties that represent the absolute pinnacle of luxury hospitality.",
}

export default async function Top50Page() {
  const ranking: { title: string; description?: string; hotels: RankingHotel[] } | null =
    await client.fetch(TOP50_RANKING_QUERY)

  if (!ranking || !ranking.hotels || ranking.hotels.length === 0) notFound()

  return (
    <RankingPageTemplate
      eyebrow="Global · Definitive List"
      title="Top 50 Hotels in the World"
      subtitle={ranking.description ?? "The absolute pinnacle of luxury hospitality — fifty properties that define what a hotel can be."}
      hotels={ranking.hotels}
      rankingSlug="global-top-50"
    />
  )
}
