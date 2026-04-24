import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { client } from '@/sanity/client'
import { RANKINGS_INDEX_QUERY } from '@/sanity/queries/rankings'
import RankingsClient from './RankingsClient'

export const metadata: Metadata = {
  title: 'Hotel Rankings',
  description: 'Our definitive lists — by country, region, city, and experience.',
}

export default async function RankingsPage() {
  let data: {
    countries: { slug: string; name: string; continent: string }[]
    regions: { slug: string; name: string; countrySlug?: string }[]
    cities: { slug: string; name: string; countrySlug?: string; regionSlug?: string }[]
    hotels: { experiences?: string[]; countrySlug?: string; regionSlug?: string; citySlug?: string; continent?: string }[]
  } = { countries: [], regions: [], cities: [], hotels: [] }

  try {
    data = await client.fetch(RANKINGS_INDEX_QUERY)
  } catch (e) {
    console.error('[RankingsPage] Sanity fetch failed:', e)
  }

  return (
    <>
      <section className="page-hero rankings-hero" style={{ height: '55vh' }}>
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
          <p className="page-eyebrow fu">Editorial Curation</p>
          <h1 className="page-title fu">Hotel <em>Rankings</em></h1>
          <p className="page-sub fu">Our definitive lists — by country, region, city, and experience.</p>
        </div>
      </section>

      <Suspense fallback={null}>
        <RankingsClient
          countries={data.countries}
          regions={data.regions}
          cities={data.cities}
          hotels={data.hotels}
        />
      </Suspense>
    </>
  )
}
