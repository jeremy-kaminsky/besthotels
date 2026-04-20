'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import RankingsFilterBar from '@/components/RankingsFilterBar'

const EXPERIENCE_OPTIONS = [
  'Beach', 'Safari', 'Ski', 'Overwater', 'Eco', 'Wellness',
  'Adults-Only', 'Honeymoon', 'Family', 'Heritage', 'City',
  'Desert', 'Surf', 'Wilderness', 'Wine Country', 'Boutique',
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
      const slug = expToSlug(exp)
      const count = hotels.filter(h => h.experiences?.includes(exp)).length
      if (count >= MIN_HOTELS) cards.push({
        title: `Top ${exp} Hotels`, href: `/rankings/experience/${slug}`,
        category: 'Experience', count, expSlug: slug,
      })
    }

    return cards
  }, [countries, regions, cities, hotels])

  const filtered = useMemo(() => rankings.filter(card => {
    if (filterCountry && card.countrySlug !== filterCountry) return false
    if (filterRegion && card.regionSlug !== filterRegion) return false
    if (filterCity && card.citySlug !== filterCity) return false
    if (filterExp && card.expSlug !== filterExp) return false
    return true
  }), [rankings, filterCountry, filterRegion, filterCity, filterExp])

  const hasFilters = !!(filterCountry || filterRegion || filterCity || filterExp)

  return (
    <div className="rankings-index-wrap">
      <div className="rankings-featured-cta">
        <Link href="/rankings/global/top-50" className="rankings-top50-card">
          <span className="rankings-top50-eyebrow">Definitive Global List</span>
          <span className="rankings-top50-title">Top 50 Hotels in the World</span>
          <span className="rankings-top50-arrow">→</span>
        </Link>
      </div>

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
      />

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
  )
}
