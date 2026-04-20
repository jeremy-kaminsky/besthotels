import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { client } from '@/sanity/client'
import { RANKINGS_INDEX_QUERY } from '@/sanity/queries/rankings'
import RankingsClient from './RankingsClient'

export const metadata: Metadata = {
  title: 'Hotel Rankings',
  description: 'Our definitive editorial rankings — by country, region, city, and experience type.',
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
      <section
        className="page-hero rankings-hero"
        style={{ height: '55vh' }}
      >
        <Image
          src="/images/rankings-hero-platz.jpg"
          alt="Hotel Platz, South Tyrol Italy"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="page-hero-content">
          <p className="page-eyebrow fu">Definitive Lists</p>
          <h1 className="page-title fu">Hotel <em>Rankings</em></h1>
          <p className="page-sub fu">Our definitive editorial rankings — by country, region, city, and experience type.</p>
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
