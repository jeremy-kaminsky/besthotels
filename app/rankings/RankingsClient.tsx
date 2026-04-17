'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import FilterBar from '@/components/FilterBar'

interface RankingList {
  _id: string; title: string; slug: string; eyebrow?: string; description?: string;
  heroImageUrl?: string; propertyCount?: string; updatedLabel?: string;
  countryCount?: string; region?: string; experience?: string;
  country?: { name: string; slug: string } | null;
  state?: { name: string; slug: string } | null;
  city?: { name: string; slug: string } | null;
  experiences?: { name: string; slug: string }[] | null;
}
interface RankingEntry {
  _id: string; rank: number; hotelName: string; regionTag?: string; location?: string;
  excerpt?: string; imageUrl?: string; tags?: string[]; isEditorsPick?: boolean;
  linkedReview?: { slug: string; hotelName: string } | null
}
interface FilterOption {
  _id: string; name: string; slug: string;
  country?: { _id: string; slug: string };
  state?: { _id: string; slug: string };
  icon?: string;
}
interface Props {
  lists: RankingList[]
  entriesByList: Record<string, RankingEntry[]>
  countries: FilterOption[]
  states: FilterOption[]
  cities: FilterOption[]
  experiences: (FilterOption & { icon?: string })[]
}

export default function RankingsClient({ lists, entriesByList, countries, states, cities, experiences }: Props) {
  const searchParams = useSearchParams()

  const activeCountry = searchParams.get('country') || 'All'
  const activeState = searchParams.get('state') || 'All'
  const activeCity = searchParams.get('city') || 'All'
  const activeExp = searchParams.get('experience') || 'All'
  const tabParam = searchParams.get('tab') || ''

  // A list shows if it has NO filter tags (global/always-visible),
  // OR if every ACTIVE filter dimension matches (only restrict on dimensions the list is tagged for).
  const filtered = useMemo(() => {
    const hasAnyFilter = activeCountry !== 'All' || activeState !== 'All' || activeCity !== 'All' || activeExp !== 'All'
    if (!hasAnyFilter) return lists

    return lists.filter(list => {
      const hasAnyTag = !!(list.country || list.state || list.city || list.experiences?.length)
      if (!hasAnyTag) return true // global list — always show

      const countryOk = activeCountry === 'All' || !list.country || list.country.slug === activeCountry
      const stateOk   = activeState  === 'All' || !list.state   || list.state.slug   === activeState
      const cityOk    = activeCity   === 'All' || !list.city    || list.city.slug    === activeCity
      const expOk     = activeExp    === 'All' || !list.experiences?.length || list.experiences.some(e => e.slug === activeExp)

      return countryOk && stateOk && cityOk && expOk
    })
  }, [lists, activeCountry, activeState, activeCity, activeExp])

  const activeSlug = tabParam && filtered.find(l => l.slug === tabParam)
    ? tabParam
    : filtered[0]?.slug || ''

  const [manualTab, setManualTab] = useState<string>('')
  const resolvedSlug = manualTab && filtered.find(l => l.slug === manualTab) ? manualTab : activeSlug

  const active = filtered.find(l => l.slug === resolvedSlug) || null
  const entries = active ? (entriesByList[active.slug] || []) : []

  // Reset manual tab when filters change (so first matching tab is shown)
  const prevFilterKey = `${activeCountry}|${activeState}|${activeCity}|${activeExp}`
  const [lastFilterKey, setLastFilterKey] = useState(prevFilterKey)
  if (prevFilterKey !== lastFilterKey) {
    setLastFilterKey(prevFilterKey)
    setManualTab('')
  }

  return (
    <>
      <FilterBar
        countries={countries}
        states={states}
        cities={cities}
        experiences={experiences}
      />

      {/* TABS */}
      <div className="tabs-bar">
        {filtered.map(list => (
          <button
            key={list._id}
            className={`tab-btn${list.slug === resolvedSlug ? ' active' : ''}`}
            onClick={() => setManualTab(list.slug)}
          >
            {list.title}
          </button>
        ))}
        {filtered.length === 0 && (
          <span style={{ padding: '1.2rem 1.5rem', color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            No lists match these filters
          </span>
        )}
      </div>

      {/* ACTIVE LIST CONTENT */}
      {active && (
        <div className="rank-page-layout">
          <div className="rank-list-header">
            {active.eyebrow && <div className="rank-eyebrow">{active.eyebrow}</div>}
            <h2 className="rank-list-title">{active.title}</h2>
            {active.description && <p className="rank-list-desc">{active.description}</p>}
            <div className="rank-list-meta">
              {active.propertyCount && <span className="rank-meta-item"><span className="rank-meta-dot" />{active.propertyCount}</span>}
              {active.updatedLabel && <span className="rank-meta-item"><span className="rank-meta-dot" />{active.updatedLabel}</span>}
              {active.countryCount && <span className="rank-meta-item"><span className="rank-meta-dot" />{active.countryCount}</span>}
              <Link href={`/rankings/${active.slug}`} className="rank-view-full">View Full List →</Link>
            </div>
          </div>

          <div className="rank-entries-full">
            {entries.slice(0, 10).map(entry => (
              <div
                key={entry._id}
                className={`rank-entry${entry.rank <= 3 ? ' top3' : ''}`}
                style={{ cursor: entry.linkedReview ? 'pointer' : 'default' }}
                onClick={() => entry.linkedReview && (window.location.href = `/reviews/${entry.linkedReview.slug}`)}
              >
                <div className="rank-num-col">
                  <span className="rank-num">{String(entry.rank).padStart(2, '0')}</span>
                </div>
                <div className="entry-text">
                  {entry.isEditorsPick && <div className="top-pick">★ Editor&apos;s Pick</div>}
                  {entry.regionTag && <div className="entry-region">{entry.regionTag}</div>}
                  <div className="entry-name">{entry.hotelName}</div>
                  {entry.location && <div className="entry-location">{entry.location}</div>}
                  {entry.excerpt && <p className="entry-excerpt">{entry.excerpt}</p>}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="entry-tags">
                      {entry.tags.map(t => <span key={t} className="entry-tag">{t}</span>)}
                    </div>
                  )}
                  {entry.linkedReview && <span className="entry-read">Read Full Review</span>}
                </div>
                <div className="entry-photo">
                  <img
                    src={entry.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'}
                    alt={entry.hotelName}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
            {entries.length === 0 && (
              <div style={{ padding: '4rem 0', color: 'var(--muted)', fontSize: '0.9rem' }}>
                Entries are being added to this list.{' '}
                <Link href={`/rankings/${active.slug}`} style={{ color: 'var(--gold)' }}>View full list</Link>
              </div>
            )}
            {entries.length > 0 && (
              <div className="rank-view-all-wrap">
                <Link href={`/rankings/${active.slug}`} className="rank-view-all-btn">
                  View All {active.propertyCount || 'Properties'} →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ALL LISTS GRID */}
      <div className="rank-related" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '5rem 3rem' }}>
        <div className="related-eyebrow">All Rankings</div>
        <h2 className="related-heading">Browse <em>Every List</em></h2>
        <div className="related-grid">
          {lists.map(list => (
            <Link
              key={list._id}
              href={`/rankings/${list.slug}`}
              className="related-card"
              style={{ backgroundImage: `url('${list.heroImageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80'}')` }}
            >
              <div className="rc-overlay" />
              <div className="rc-info">
                <div className="rc-region">{list.experience || list.region || list.propertyCount || ''}</div>
                <div className="rc-name">{list.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
