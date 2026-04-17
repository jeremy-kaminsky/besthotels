'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface FilterOption {
  _id: string
  name: string
  slug: string
  country?: { _id: string; slug: string }
  state?: { _id: string; slug: string }
}

interface FilterBarProps {
  countries: FilterOption[]
  states: FilterOption[]
  cities: FilterOption[]
  experiences: (FilterOption & { icon?: string })[]
}

const EXPERIENCE_LIST = [
  'All Experiences', 'Beach', 'Ski', 'Safari', 'Wellness', 'Family',
  'Adults Only', 'Honeymoon', 'City', 'Eco', 'Boutique', 'Overwater',
  'Desert', 'Wilderness', 'Heritage',
]

export default function FilterBar({ countries, states, cities, experiences }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [openCell, setOpenCell] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const activeCountry = searchParams.get('country') || 'All'
  const activeState = searchParams.get('state') || 'All'
  const activeCity = searchParams.get('city') || 'All'
  const activeExp = searchParams.get('experience') || 'All'

  const updateURL = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([k, v]) => {
      if (v === 'All') params.delete(k)
      else params.set(k, v)
    })
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [router, pathname, searchParams])

  function setCountry(slug: string) {
    updateURL({ country: slug, state: 'All', city: 'All' })
    setOpenCell(null)
  }
  function setState(slug: string) {
    updateURL({ state: slug, city: 'All' })
    setOpenCell(null)
  }
  function setCity(slug: string) {
    updateURL({ city: slug })
    setOpenCell(null)
  }
  function setExperience(slug: string) {
    updateURL({ experience: slug })
    setOpenCell(null)
  }
  function clearAll() {
    router.push(pathname, { scroll: false })
  }
  function clearOne(key: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (key === 'country') { params.delete('country'); params.delete('state'); params.delete('city') }
    else if (key === 'state') { params.delete('state'); params.delete('city') }
    else params.delete(key)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Close dropdowns on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenCell(null)
      }
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [])

  // Cascade filtering
  const filteredStates = activeCountry === 'All'
    ? states
    : states.filter(s => s.country?.slug === activeCountry)

  const filteredCities = activeState !== 'All'
    ? cities.filter(c => c.state?.slug === activeState)
    : activeCountry !== 'All'
      ? cities.filter(c => {
          const matchState = states.find(s => s.slug === activeState || s.country?.slug === activeCountry)
          return c.state && filteredStates.some(s => s.slug === c.state?.slug)
        })
      : cities

  const activeFilters = [
    activeCountry !== 'All' && { key: 'country', label: activeCountry },
    activeState !== 'All' && { key: 'state', label: activeState },
    activeCity !== 'All' && { key: 'city', label: activeCity },
    activeExp !== 'All' && { key: 'experience', label: activeExp },
  ].filter(Boolean) as { key: string; label: string }[]

  function cellLabel(type: string) {
    const map: Record<string, string> = { country: 'Country', state: 'Region', city: 'City', experience: 'Experience' }
    return map[type]
  }
  function activeValue(type: string) {
    const v = searchParams.get(type)
    if (!v) return null
    if (type === 'country') return countries.find(c => c.slug === v)?.name || v
    if (type === 'state') return states.find(s => s.slug === v)?.name || v
    if (type === 'city') return cities.find(c => c.slug === v)?.name || v
    if (type === 'experience') return experiences.find(e => e.slug === v)?.name || v
    return v
  }
  function placeholder(type: string) {
    const map: Record<string, string> = { country: 'All countries', state: 'All regions', city: 'All cities', experience: 'Any experience' }
    return map[type] || `All ${cellLabel(type).toLowerCase()}s`
  }

  return (
    <section className="filter-section">
      <div className="filter-eyebrow">Find Your Stay</div>
      <h2 className="filter-heading">Filter by <em>Destination &amp; Experience</em></h2>

      <div className="filter-bar" ref={barRef}>
        {(['country', 'state', 'city', 'experience'] as const).map((type) => {
          const val = activeValue(type)
          const isOpen = openCell === type
          const isActive = !!val

          return (
            <div
              key={type}
              className={`filter-cell${isOpen ? ' open' : ''}${isActive ? ' active' : ''}`}
              data-type={type}
              onClick={(e) => { e.stopPropagation(); setOpenCell(isOpen ? null : type) }}
            >
              <div className="filter-label-text">{cellLabel(type)}</div>
              <div className={`filter-value${!val ? ' placeholder' : ''}`}>
                {val || placeholder(type)} <span className="arrow">▾</span>
              </div>
              <div className="filter-dropdown" onClick={(e) => e.stopPropagation()}>
                {type === 'country' && (
                  <>
                    <div className="filter-option" onClick={() => setCountry('All')}>All countries</div>
                    {countries.map(c => (
                      <div
                        key={c._id}
                        className={`filter-option${activeCountry === c.slug ? ' selected' : ''}`}
                        onClick={() => setCountry(c.slug)}
                      >{c.name}</div>
                    ))}
                  </>
                )}
                {type === 'state' && (
                  <>
                    <div className="filter-option" onClick={() => setState('All')}>All regions</div>
                    {filteredStates.map(s => (
                      <div
                        key={s._id}
                        className={`filter-option${activeState === s.slug ? ' selected' : ''}`}
                        onClick={() => setState(s.slug)}
                      >{s.name}</div>
                    ))}
                    {filteredStates.length === 0 && (
                      <div className="filter-option" style={{ opacity: 0.4, cursor: 'default' }}>Select a country first</div>
                    )}
                  </>
                )}
                {type === 'city' && (
                  <>
                    <div className="filter-option" onClick={() => setCity('All')}>All cities</div>
                    {filteredCities.map(c => (
                      <div
                        key={c._id}
                        className={`filter-option${activeCity === c.slug ? ' selected' : ''}`}
                        onClick={() => setCity(c.slug)}
                      >{c.name}</div>
                    ))}
                    {filteredCities.length === 0 && (
                      <div className="filter-option" style={{ opacity: 0.4, cursor: 'default' }}>Select a region first</div>
                    )}
                  </>
                )}
                {type === 'experience' && (
                  <>
                    <div className="filter-option" onClick={() => setExperience('All')}>Any experience</div>
                    {experiences.map(e => (
                      <div
                        key={e._id}
                        className={`filter-option${activeExp === e.slug ? ' selected' : ''}`}
                        onClick={() => setExperience(e.slug)}
                      >{e.name}</div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Experience quick pills */}
      <div className="style-pills">
        <button
          className={`style-pill${activeExp === 'All' ? ' active' : ''}`}
          onClick={() => setExperience('All')}
        >All Experiences</button>
        {experiences.map(e => (
          <button
            key={e._id}
            className={`style-pill${activeExp === e.slug ? ' active' : ''}`}
            onClick={() => setExperience(e.slug)}
          >{e.name}</button>
        ))}
      </div>

      {/* Active filter tags */}
      {activeFilters.length > 0 && (
        <div className="filter-tags">
          {activeFilters.map(({ key, label }) => (
            <div key={key} className="filter-tag" onClick={() => clearOne(key)}>
              {label} <span className="x">×</span>
            </div>
          ))}
          <button className="filter-clear" onClick={clearAll}>Clear all</button>
        </div>
      )}
    </section>
  )
}
