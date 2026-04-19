import Link from 'next/link'

export interface RankingHotel {
  _id: string
  name: string
  slug: string
  country?: { name: string; slug: string; continent?: string } | null
  region?: { name: string; slug: string } | null
  city?: { name: string; slug: string } | null
  experiences?: string[] | null
  description?: string | null
  featuredIn?: string[] | null
  review?: { slug: string; hotelName: string } | null
}

interface Props {
  eyebrow: string
  title: string
  subtitle: string
  hotels: RankingHotel[]
  rankingSlug: string
}

function expToSlug(exp: string) {
  return exp.toLowerCase().replace(/\s+/g, '-')
}

export default function RankingPageTemplate({ eyebrow, title, subtitle, hotels, rankingSlug }: Props) {
  if (hotels.length === 0) {
    return (
      <div style={{ padding: '8rem 3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)', letterSpacing: '0.2em', fontSize: '0.85rem', textTransform: 'uppercase' }}>
          No hotels found
        </p>
      </div>
    )
  }

  const featured = hotels.find(h => h.featuredIn?.includes(rankingSlug)) ?? hotels[0]
  const rest = hotels.filter(h => h._id !== featured._id).slice(0, 9)

  return (
    <>
      {/* HERO */}
      <section
        className="page-hero"
        style={{ height: '55vh', background: 'linear-gradient(160deg, var(--dark-2) 0%, var(--dark) 100%)' }}
      >
        <div className="page-hero-content">
          <p className="page-eyebrow">{eyebrow}</p>
          <h1 className="page-title">{title.split(' ').slice(0, -1).join(' ')} <em>{title.split(' ').slice(-1)}</em></h1>
          <p className="page-sub">{subtitle}</p>
        </div>
      </section>

      <div className="rank-page-layout">

        {/* FEATURED #1 */}
        <div className="rank-featured">
          <div className="rank-featured-num">01</div>
          <div className="rank-featured-body">
            <div className="rank-featured-badge">Editor&apos;s Pick</div>
            {featured.country && (
              <div className="rank-featured-country">{featured.country.name}</div>
            )}
            <h2 className="rank-featured-name">{featured.name}</h2>
            {(featured.city || featured.region) && (
              <div className="rank-featured-location">
                {[featured.city?.name, featured.region?.name].filter(Boolean).join(' · ')}
              </div>
            )}
            {featured.description && (
              <p className="rank-featured-desc">{featured.description}</p>
            )}
            {featured.experiences && featured.experiences.length > 0 && (
              <div className="rank-exp-tags">
                {featured.experiences.map(exp => (
                  <Link key={exp} href={`/rankings/experience/${expToSlug(exp)}`} className="rank-exp-tag">
                    {exp}
                  </Link>
                ))}
              </div>
            )}
            {featured.review && (
              <Link href={`/reviews/${featured.review.slug}`} className="rank-review-link">
                Read Full Review →
              </Link>
            )}
          </div>
        </div>

        {/* DIVIDER CAPTION */}
        {rest.length > 0 && (
          <div className="rank-caption-divider">
            <div className="rank-caption-line" />
            <span className="rank-caption-text">Editor&apos;s Pick · The Rest, In No Particular Order</span>
            <div className="rank-caption-line" />
          </div>
        )}

        {/* ENTRIES 2–10 */}
        {rest.length > 0 && (
          <div className="rank-entries-list">
            {rest.map((hotel) => (
              <div key={hotel._id} className="rank-entry-item">
                <div className="rank-entry-meta">
                  {hotel.country && <span className="rank-entry-country">{hotel.country.name}</span>}
                  {hotel.review && (
                    <Link href={`/reviews/${hotel.review.slug}`} className="rank-entry-review-link">
                      Read Review →
                    </Link>
                  )}
                </div>
                <h3 className="rank-entry-name">{hotel.name}</h3>
                {(hotel.city || hotel.region) && (
                  <div className="rank-entry-location">
                    {[hotel.city?.name, hotel.region?.name].filter(Boolean).join(' · ')}
                  </div>
                )}
                {hotel.description && (
                  <p className="rank-entry-desc">{hotel.description}</p>
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
            ))}
          </div>
        )}

      </div>
    </>
  )
}
