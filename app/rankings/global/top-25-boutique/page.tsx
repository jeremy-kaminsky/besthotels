import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { TOP25_BOUTIQUE_QUERY } from '@/sanity/queries/rankings'
import type { RankingHotel } from '@/components/RankingPageTemplate'

export const metadata: Metadata = {
  title: 'Top 25 Boutique Hotels in the World',
  description: "The world's finest intimate properties — 100 rooms or fewer, independent spirit, design-forward.",
}

function expToSlug(exp: string) { return exp.toLowerCase().replace(/\s+/g, '-') }

export default async function Top25BoutiquePage() {
  let hotels: RankingHotel[] = []
  try {
    hotels = await client.fetch(TOP25_BOUTIQUE_QUERY)
  } catch (e) {
    console.error('[Top25BoutiquePage] Sanity fetch failed:', e)
  }

  return (
    <>
      <section
        className="page-hero"
        style={{ height: '55vh', background: 'linear-gradient(160deg, var(--dark-2) 0%, var(--dark) 100%)' }}
      >
        <div className="page-hero-content">
          <p className="page-eyebrow">Definitive Global List</p>
          <h1 className="page-title">Top 25 Boutique Hotels <em>in the World</em></h1>
          <p className="page-sub">The world&apos;s finest intimate properties — 100 rooms or fewer, independent spirit, design-forward.</p>
        </div>
      </section>

      <div className="rank-page-layout">
        {hotels.length === 0 ? (
          <p style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--muted)', letterSpacing: '0.2em', fontSize: '0.85rem', textTransform: 'uppercase' }}>
            No hotels found
          </p>
        ) : (
          <div className="boutique-ranked-list">
            {hotels.map((hotel, i) => (
              <div key={hotel._id} className="boutique-entry">
                <div className="boutique-rank-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="boutique-entry-body">
                  <div className="boutique-entry-meta">
                    {hotel.country && <span className="boutique-entry-country">{hotel.country.name}</span>}
                    {hotel.review && (
                      <Link href={`/reviews/${hotel.review.slug}`} className="rank-entry-review-link">
                        Read Review →
                      </Link>
                    )}
                  </div>
                  <h2 className="boutique-entry-name">{hotel.name}</h2>
                  {(hotel.city || hotel.region) && (
                    <div className="boutique-entry-location">
                      {[hotel.city?.name, hotel.region?.name].filter(Boolean).join(' · ')}
                    </div>
                  )}
                  {hotel.description && (
                    <p className="boutique-entry-desc">{hotel.description}</p>
                  )}
                  {hotel.experiences && hotel.experiences.length > 0 && (
                    <div className="rank-exp-tags">
                      {hotel.experiences.map(exp => (
                        <Link key={exp} href={`/rankings/experience/${expToSlug(exp)}`} className="rank-exp-tag">
                          {exp}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
