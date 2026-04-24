'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import RankingsFilterBar from '@/components/RankingsFilterBar'

const EXPERIENCE_OPTIONS = [
  'Beach', 'Safari', 'Ski', 'Heritage', 'Wine Country', 'Wellness',
  'Boutique', 'Overwater', 'Honeymoon', 'Adults-Only', 'City',
  'Desert', 'Eco', 'Family', 'Wilderness', 'Surf',
]

function expToSlug(exp: string) { return exp.toLowerCase().replace(/\s+/g, '-') }

const MIN_HOTELS = 5

interface Hotel {
  experiences?: string[]
  countrySlug?: string
  regionSlug?: string
  citySlug?: string
}

interface RankingCard {
  title: string
  href: string
  category: string
  count: number
  countrySlug?: string
  regionSlug?: string
  citySlug?: string
  expSlug?: string
}

interface Props {
  countries: { slug: string; name: string; continent: string }[]
  regions: { slug: string; name: string; countrySlug?: string }[]
  cities: { slug: string; name: string; countrySlug?: string; regionSlug?: string }[]
  hotels: Hotel[]
}

export default function RankingsClient({ countries, regions, cities, hotels }: Props) {
  const [filterCountry, setFilterCountry] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const [filterCity, setFilterCity] = useState('')
  const [filterExp, setFilterExp] = useState('')

  const rankings = useMemo<RankingCard[]>(() => {
    const cards: RankingCard[] = []

    for (const c of countries) {
      const count = hotels.filter(h => h.countrySlug === c.slug).length
      if (count >= MIN_HOTELS) cards.push({
        title: `Top Hotels in ${c.name}`, href: `/rankings/country/${c.slug}`,
        category: 'Country', count, countrySlug: c.slug,
      })
    }

    for (const r of regions) {
      const count = hotels.filter(h => h.regionSlug === r.slug).length
      if (count >= MIN_HOTELS) cards.push({
        title: `Top Hotels in ${r.name}`, href: `/rankings/region/${r.slug}`,
        category: 'Region', count, countrySlug: r.countrySlug, regionSlug: r.slug,
      })
    }

    for (const c of cities) {
      const count = hotels.filter(h => h.citySlug === c.slug).length
      if (count >= MIN_HOTELS) cards.push({
        title: `Top Hotels in ${c.name}`, href: `/rankings/city/${c.slug}`,
        category: 'City', count, countrySlug: c.countrySlug, regionSlug: c.regionSlug, citySlug: c.slug,
      })
    }

    for (const exp of EXPERIENCE_OPTIONS) {
      const expSlug = expToSlug(exp)
      const count = hotels.filter(h => h.experiences?.includes(exp)).length
      if (count >= MIN_HOTELS) cards.push({
        title: `Top ${exp} Hotels`, href: `/rankings/experience/${expSlug}`,
        category: 'Experience', count, expSlug,
      })
    }

    return cards
  }, [countries, regions, cities, hotels])

  const hasFilters = !!(filterCountry || filterRegion || filterCity || filterExp)

  const filtered = useMemo(() => {
    if (!hasFilters) return rankings.slice(0, 24)
    return rankings.filter(card => {
      if (filterCountry && card.countrySlug !== filterCountry) return false
      if (filterRegion && card.regionSlug !== filterRegion) return false
      if (filterCity && card.citySlug !== filterCity) return false
      if (filterExp && card.expSlug !== filterExp) return false
      return true
    })
  }, [rankings, filterCountry, filterRegion, filterCity, filterExp, hasFilters])

  return (
    <>
      {/* FLAGSHIP FEATURE BLOCK */}
      <div className="rankings-index-wrap">
        <section className="rankings-flagship-section">
          <Link href="/rankings/global/top-25-boutique" className="rankings-flagship-card">
            <div className="rankings-flagship-inner">
              <span className="rankings-flagship-eyebrow">Definitive Global List</span>
              <h2 className="rankings-flagship-title">Top 25 Boutique Hotels<br /><em>in the World</em></h2>
              <p className="rankings-flagship-sub">The world&apos;s finest intimate properties — 100 rooms or fewer, independent spirit, design-forward.</p>
              <span className="rankings-flagship-arrow">→</span>
            </div>
          </Link>
        </section>

        {/* BROWSE BY EXPERIENCE */}
        <section className="rankings-exp-section">
          <div className="rankings-section-header">
            <p className="rankings-section-eyebrow">Browse by Experience</p>
            <h2 className="rankings-section-title">Curated by <em>Category</em></h2>
          </div>
          <div className="rankings-exp-grid">
            {EXPERIENCE_OPTIONS.map(exp => (
              <Link key={exp} href={`/rankings/experience/${expToSlug(exp)}`} className="rankings-exp-card">
                <span className="rankings-exp-name">{exp}</span>
                <span className="rankings-exp-link">→ View ranking</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* BROWSE BY DESTINATION — full-width dark band */}
      <RankingsFilterBar
        countries={countries}
        regions={regions}
        cities={cities}
        experienceOptions={EXPERIENCE_OPTIONS}
        filterCountry={filterCountry}
        filterRegion={filterRegion}
        filterCity={filterCity}
        filterExp={filterExp}
        onCountryChange={setFilterCountry}
        onRegionChange={setFilterRegion}
        onCityChange={setFilterCity}
        onExpChange={setFilterExp}
        eyebrow="Browse by Destination"
        heading={<>Filter by <em>Country, Region &amp; City</em></>}
      />

      {/* RANKINGS GRID */}
      <div className="rankings-index-wrap rankings-grid-section">
        {filtered.length === 0 ? (
          <p className="rankings-empty">
            {hasFilters ? 'No rankings match your selection.' : 'No rankings available yet.'}
          </p>
        ) : (
          <div className="rankings-grid">
            {filtered.map(card => (
              <Link key={card.href} href={card.href} className="rankings-card">
                <span className="rankings-card-category">{card.category}</span>
                <span className="rankings-card-title">{card.title}</span>
                <span className="rankings-card-count">{card.count} hotel{card.count !== 1 ? 's' : ''}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
