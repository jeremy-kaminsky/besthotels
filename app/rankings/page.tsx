import type { Metadata } from 'next'
import { Suspense } from 'react'
import { client } from '@/sanity/client'
import { ALL_RANKING_LISTS_QUERY, RANKING_ENTRIES_BY_LIST_QUERY } from '@/sanity/queries/rankings'
import { ALL_FILTER_OPTIONS_QUERY } from '@/sanity/queries/reviews'
import RankingsClient from './RankingsClient'

export const metadata: Metadata = {
  title: 'Hotel Rankings',
  description: 'Our definitive editorial rankings across every category — from beach resorts to ski lodges, safari camps to city hotels.',
}

export default async function RankingsPage() {
  let lists: {
    _id: string; title: string; slug: string; eyebrow?: string; description?: string;
    heroImageUrl?: string; propertyCount?: string; updatedLabel?: string;
    countryCount?: string; region?: string; experience?: string;
    country?: { name: string; slug: string } | null;
    state?: { name: string; slug: string } | null;
    city?: { name: string; slug: string } | null;
    experiences?: { name: string; slug: string }[] | null;
  }[] = []
  let entriesByList: Record<string, {
    _id: string; rank: number; hotelName: string; regionTag?: string; location?: string;
    excerpt?: string; imageUrl?: string; tags?: string[]; isEditorsPick?: boolean;
    linkedReview?: { slug: string; hotelName: string } | null
  }[]> = {}
  let filterOptions: {
    countries: { _id: string; name: string; slug: string }[]
    states: { _id: string; name: string; slug: string; country?: { _id: string; slug: string } }[]
    cities: { _id: string; name: string; slug: string; state?: { _id: string; slug: string }; country?: { _id: string; slug: string } }[]
    experiences: { _id: string; name: string; slug: string; icon?: string }[]
  } = { countries: [], states: [], cities: [], experiences: [] }

  try {
    const [fetchedLists, fetchedFilters] = await Promise.all([
      client.fetch(ALL_RANKING_LISTS_QUERY),
      client.fetch(ALL_FILTER_OPTIONS_QUERY),
    ])
    lists = fetchedLists || []
    filterOptions = fetchedFilters || filterOptions
    const entryResults = await Promise.all(
      lists.map(l => client.fetch(RANKING_ENTRIES_BY_LIST_QUERY, { slug: l.slug }))
    )
    lists.forEach((l, i) => { entriesByList[l.slug] = entryResults[i] || [] })
  } catch (e) {
    console.error('[RankingsPage] Sanity fetch failed:', e)
  }

  return (
    <>
      <section
        className="page-hero"
        style={{
          height: 460,
          backgroundImage: "url('https://www.hotelplatz.it/wp-content/uploads/header-platz-5.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center 50%',
        }}
      >
        <div className="page-hero-content" style={{ maxWidth: 700 }}>
          <p className="page-eyebrow">Definitive Lists</p>
          <h1 className="page-title">Hotel <em>Rankings</em></h1>
          <p className="page-sub">Our definitive editorial rankings across every category — from beach resorts to ski lodges, safari camps to city hotels.</p>
        </div>
      </section>

      <Suspense fallback={null}>
        <RankingsClient
          lists={lists}
          entriesByList={entriesByList}
          countries={filterOptions.countries}
          states={filterOptions.states}
          cities={filterOptions.cities}
          experiences={filterOptions.experiences}
        />
      </Suspense>
    </>
  )
}
