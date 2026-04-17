import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { ALL_RANKING_LISTS_QUERY, RANKING_LIST_BY_SLUG_QUERY, RANKING_ENTRIES_BY_LIST_QUERY } from '@/sanity/queries/rankings'
import RankingEntry from '@/components/RankingEntry'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  try {
    const lists = await client.fetch(ALL_RANKING_LISTS_QUERY)
    return lists.map((l: { slug: string }) => ({ slug: l.slug }))
  } catch { return [] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const list = await client.fetch(RANKING_LIST_BY_SLUG_QUERY, { slug: params.slug })
    if (!list) return {}
    return { title: list.title, description: list.description || `Our definitive ranking: ${list.title}` }
  } catch { return {} }
}

export default async function RankingPage({ params }: Props) {
  let list: {
    _id: string; title: string; slug: string; eyebrow?: string; description?: string;
    heroImageUrl?: string; propertyCount?: string; updatedLabel?: string; countryCount?: string;
    methodology?: string
  } | null = null
  let entries: {
    _id: string; rank: number; hotelName: string; regionTag?: string; location?: string;
    excerpt?: string; imageUrl?: string; tags?: string[]; isEditorsPick?: boolean;
    linkedReview?: { slug: string } | null
  }[] = []
  let otherLists: { _id: string; title: string; slug: string; heroImageUrl?: string; propertyCount?: string }[] = []

  try {
    const [fetchedList, fetchedEntries, allLists] = await Promise.all([
      client.fetch(RANKING_LIST_BY_SLUG_QUERY, { slug: params.slug }),
      client.fetch(RANKING_ENTRIES_BY_LIST_QUERY, { slug: params.slug }),
      client.fetch(ALL_RANKING_LISTS_QUERY),
    ])
    list = fetchedList
    entries = fetchedEntries || []
    otherLists = (allLists || []).filter((l: { slug: string }) => l.slug !== params.slug).slice(0, 4)
  } catch {}

  if (!list) return notFound()

  const heroUrl = list.heroImageUrl || 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=2000&q=85&auto=format&fit=crop'

  return (
    <>
      {/* HERO */}
      <section className="rank-hero">
        <div className="rank-hero-bg" style={{ backgroundImage: `url('${heroUrl}')` }} />
        <div className="rank-hero-content">
          <div className="rank-breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/rankings">Rankings</Link><span>/</span>
            {list.title}
          </div>
          {list.eyebrow && <div className="rank-eyebrow">{list.eyebrow}</div>}
          <h1 className="rank-hero-title" dangerouslySetInnerHTML={{ __html: list.title.replace(/(.+)(in .+|of .+|Resorts|Lodges|Hotels)/, '$1<em>$2</em>') }} />
          {list.description && <p className="rank-hero-desc">{list.description}</p>}
          <div className="rank-meta">
            {list.propertyCount && <span className="rank-meta-item"><span className="rank-meta-dot" />{list.propertyCount}</span>}
            {list.updatedLabel && <span className="rank-meta-item"><span className="rank-meta-dot" />{list.updatedLabel}</span>}
            {list.countryCount && <span className="rank-meta-item"><span className="rank-meta-dot" />{list.countryCount}</span>}
          </div>
        </div>
      </section>

      {/* LAYOUT */}
      <div className="rank-layout">
        {/* LIST */}
        <div className="rank-list">
          {entries.map((entry) => (
            <RankingEntry
              key={entry._id}
              rank={entry.rank}
              hotelName={entry.hotelName}
              regionTag={entry.regionTag}
              location={entry.location}
              excerpt={entry.excerpt}
              imageUrl={entry.imageUrl}
              tags={entry.tags}
              isEditorsPick={entry.isEditorsPick}
              linkedReviewSlug={entry.linkedReview?.slug}
            />
          ))}
          {entries.length === 0 && (
            <div style={{ padding: '4rem 0', color: 'var(--muted)', fontSize: '0.9rem' }}>
              Entries are being added to this list.
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="rank-sidebar">
          <div className="sidebar-sticky">
            {/* Quick top-10 */}
            <div className="sb-block">
              <div className="sb-eyebrow">Quick List</div>
              <div className="sb-title">{list.title}</div>
              <ol className="sb-mini-list">
                {entries.slice(0, 10).map((e) => (
                  <li key={e._id}>
                    <span className="sb-mini-num">{e.rank}</span>
                    {e.linkedReview
                      ? <Link href={`/reviews/${e.linkedReview.slug}`}>{e.hotelName}</Link>
                      : <span>{e.hotelName}</span>
                    }
                  </li>
                ))}
              </ol>
            </div>

            {/* Methodology */}
            {list.methodology && (
              <div className="sb-block">
                <div className="sb-eyebrow">Methodology</div>
                <p className="sb-text">{list.methodology}</p>
              </div>
            )}

            {/* Updated */}
            {list.updatedLabel && (
              <div className="sb-block">
                <div className="sb-eyebrow">Last Updated</div>
                <p className="sb-text" style={{ marginBottom: 0 }}>{list.updatedLabel}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RELATED RANKINGS */}
      {otherLists.length > 0 && (
        <div className="rank-related">
          <div className="related-eyebrow">More Rankings</div>
          <h2 className="related-heading">Explore <em>Other Lists</em></h2>
          <div className="related-grid">
            {otherLists.map((l) => (
              <Link
                key={l._id}
                href={`/rankings/${l.slug}`}
                className="related-card"
                style={{ backgroundImage: `url('${l.heroImageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80'}')` }}
              >
                <div className="rc-overlay" />
                <div className="rc-info">
                  <div className="rc-region">{l.propertyCount || 'Ranking'}</div>
                  <div className="rc-name">{l.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
