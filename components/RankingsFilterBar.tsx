'use client'

import { useEffect, useRef, useState } from 'react'

interface Option { slug: string; name: string; countrySlug?: string; regionSlug?: string }

interface Props {
  countries: Option[]
  regions: Option[]
  cities: Option[]
  experienceOptions: string[]
  filterCountry: string
  filterRegion: string
  filterCity: string
  filterExp: string
  onCountryChange: (v: string) => void
  onRegionChange: (v: string) => void
  onCityChange: (v: string) => void
  onExpChange: (v: string) => void
}

function expToSlug(exp: string) { return exp.toLowerCase().replace(/\s+/g, '-') }

export default function RankingsFilterBar({
  countries, regions, cities, experienceOptions,
  filterCountry, filterRegion, filterCity, filterExp,
  onCountryChange, onRegionChange, onCityChange, onExpChange,
}: Props) {
  const [openCell, setOpenCell] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const filteredRegions = filterCountry
    ? regions.filter(r => r.countrySlug === filterCountry)
    : regions

  const filteredCities = filterRegion
    ? cities.filter(c => c.regionSlug === filterRegion)
    : filterCountry
      ? cities.filter(c => c.countrySlug === filterCountry)
      : cities

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpenCell(null)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const activeValues: Record<string, string> = {
    country: filterCountry ? (countries.find(c => c.slug === filterCountry)?.name || filterCountry) : '',
    region:  filterRegion  ? (regions.find(r => r.slug === filterRegion)?.name   || filterRegion)  : '',
    city:    filterCity    ? (cities.find(c => c.slug === filterCity)?.name       || filterCity)    : '',
    experience: filterExp  ? (experienceOptions.find(e => expToSlug(e) === filterExp) || filterExp) : '',
  }

  const placeholders: Record<string, string> = {
    country: 'All countries', region: 'All regions', city: 'All cities', experience: 'Any experience',
  }
  const labels: Record<string, string> = {
    country: 'Country', region: 'Region', city: 'City', experience: 'Experience',
  }

  return (
    <section className="filter-section">
      <div className="filter-eyebrow">Find Your Ranking</div>
      <h2 className="filter-heading">Filter by <em>Destination &amp; Experience</em></h2>

      <div className="filter-bar" ref={barRef}>
        {(['country', 'region', 'city', 'experience'] as const).map(type => {
          const val = activeValues[type]
          const isOpen = openCell === type

          return (
            <div
              key={type}
              className={`filter-cell${isOpen ? ' open' : ''}${val ? ' active' : ''}`}
              data-type={type}
              onClick={e => { e.stopPropagation(); setOpenCell(isOpen ? null : type) }}
            >
              <div className="filter-label-text">{labels[type]}</div>
              <div className={`filter-value${!val ? ' placeholder' : ''}`}>
                {val || placeholders[type]} <span className="arrow">▾</span>
              </div>
              <div className="filter-dropdown" onClick={e => e.stopPropagation()}>
                {type === 'country' && (
                  <>
                    <div className="filter-option" onClick={() => { onCountryChange(''); onRegionChange(''); onCityChange(''); setOpenCell(null) }}>All countries</div>
                    {countries.map(c => (
                      <div key={c.slug} className={`filter-option${filterCountry === c.slug ? ' selected' : ''}`}
                        onClick={() => { onCountryChange(c.slug); onRegionChange(''); onCityChange(''); setOpenCell(null) }}>
                        {c.name}
                      </div>
                    ))}
                  </>
                )}
                {type === 'region' && (
                  <>
                    <div className="filter-option" onClick={() => { onRegionChange(''); onCityChange(''); setOpenCell(null) }}>All regions</div>
                    {filteredRegions.map(r => (
                      <div key={r.slug} className={`filter-option${filterRegion === r.slug ? ' selected' : ''}`}
                        onClick={() => { onRegionChange(r.slug); onCityChange(''); setOpenCell(null) }}>
                        {r.name}
                      </div>
                    ))}
                    {filteredRegions.length === 0 && (
                      <div className="filter-option" style={{ opacity: 0.4, cursor: 'default' }}>Select a country first</div>
                    )}
                  </>
                )}
                {type === 'city' && (
                  <>
                    <div className="filter-option" onClick={() => { onCityChange(''); setOpenCell(null) }}>All cities</div>
                    {filteredCities.map(c => (
                      <div key={c.slug} className={`filter-option${filterCity === c.slug ? ' selected' : ''}`}
                        onClick={() => { onCityChange(c.slug); setOpenCell(null) }}>
                        {c.name}
                      </div>
                    ))}
                    {filteredCities.length === 0 && (
                      <div className="filter-option" style={{ opacity: 0.4, cursor: 'default' }}>Select a region first</div>
                    )}
                  </>
                )}
                {type === 'experience' && (
                  <>
                    <div className="filter-option" onClick={() => { onExpChange(''); setOpenCell(null) }}>Any experience</div>
                    {experienceOptions.map(exp => (
                      <div key={exp} className={`filter-option${filterExp === expToSlug(exp) ? ' selected' : ''}`}
                        onClick={() => { onExpChange(expToSlug(exp)); setOpenCell(null) }}>
                        {exp}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
