import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { REVIEW_BY_SLUG_QUERY, ALL_REVIEWS_QUERY } from '@/sanity/queries/reviews'
import PortableText from '@/components/PortableText'
import { urlFor } from '@/sanity/image'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  try {
    const reviews = await client.fetch(ALL_REVIEWS_QUERY)
    return reviews.map((r: { slug: string }) => ({ slug: r.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const review = await client.fetch(REVIEW_BY_SLUG_QUERY, { slug: params.slug })
    if (!review) return {}
    return {
      title: review.hotelName,
      description: review.excerpt || `Read our full review of ${review.hotelName}.`,
    }
  } catch {
    return {}
  }
}

export default async function ReviewPage({ params }: Props) {
  let review: {
    hotelName: string; slug: string; subtitle?: string; regionLabel?: string;
    locationLabel?: string; heroImageUrl?: string; heroImage?: object;
    photoStrip?: object[]; photoStripUrls?: string[]; authorName?: string; authorRole?: string;
    authorPhoto?: object; publishedDate?: string; updatedDate?: string;
    isCollaboration?: boolean; collaboratorName?: string; collaboratorHandle?: string;
    collaboratorPhoto?: object; body?: unknown[]; nightlyRate?: string;
    category?: string; villaCount?: string; diningInfo?: string; bookingUrl?: string;
    score?: number; sidebarDetails?: { key: string; value: string }[];
    relatedReviews?: {
      hotelName: string; slug: string; regionLabel?: string; locationLabel?: string;
      heroImageUrl?: string; heroImage?: object; score?: number
    }[]
  } | null = null

  try {
    review = await client.fetch(REVIEW_BY_SLUG_QUERY, { slug: params.slug })
  } catch {
    // not found
  }

  if (!review) return notFound()

  const heroUrl = review.heroImageUrl || (review.heroImage ? urlFor(review.heroImage).width(1800).url() : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=85&auto=format&fit=crop')
  const photoStripUrls = review.photoStripUrls || []
  const photoStrip = review.photoStrip || []
  const activeStrip = photoStripUrls.length > 0 ? 'urls' : photoStrip.length > 0 ? 'assets' : null
  const stripCount = photoStripUrls.length || photoStrip.length
  const stripCols = stripCount === 4 ? 'repeat(4,1fr)' : stripCount === 3 ? '2fr 1fr 1fr' : 'repeat(3,1fr)'

  return (
    <>
      {/* HERO */}
      <section className="review-hero">
        <Image src={heroUrl} alt={review.hotelName} fill priority quality={90} sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div className="hero-grad" />
        <div className="hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/reviews">Reviews</Link><span>/</span>
            {review.hotelName}
          </div>
          {review.regionLabel && <div className="hero-region">{review.regionLabel}</div>}
          <h1 className="hero-title">{review.hotelName}</h1>
          {review.subtitle && <div className="hero-subtitle">{review.subtitle}</div>}
          {review.locationLabel && <div className="hero-location">{review.locationLabel}</div>}
          <div className="hero-meta">
            <div className="author-block">
              {review.authorPhoto ? (
                <img className="author-avatar" src={urlFor(review.authorPhoto).width(84).height(84).url()} alt={review.authorName || ''} />
              ) : (
                <div className="author-avatar" style={{ background: 'rgba(201,169,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.55rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>JT</span>
                </div>
              )}
              <div>
                <div className="author-name">{review.authorName || 'Jake Trerotola'}</div>
                <div className="author-role">{review.authorRole || 'Founder of Best Hotels'}</div>
              </div>
            </div>
            {review.isCollaboration && review.collaboratorName && (
              <div className="collab-tag">In collaboration with {review.collaboratorName}</div>
            )}
            {review.publishedDate && (
              <div className="hero-date">
                {new Date(review.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      {activeStrip && (
        <div className="photo-strip" style={{ gridTemplateColumns: stripCols }}>
          {activeStrip === 'urls'
            ? photoStripUrls.map((url, i) => (
                <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
                  <Image src={url} alt="" fill sizes="25vw" quality={90} style={{ objectFit: 'cover' }} />
                </div>
              ))
            : (photoStrip as { asset?: object }[]).map((img, i) => (
                <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
                  <Image src={urlFor(img).width(900).quality(90).url()} alt="" fill sizes="25vw" quality={90} style={{ objectFit: 'cover' }} />
                </div>
              ))
          }
        </div>
      )}

      {/* ARTICLE */}
      <div className="article-layout">
        <article className="article-body">
          {review.body && review.body.length > 0 ? (
            <PortableText value={review.body} />
          ) : (
            <div className="review-section">
              <p className="review-p" style={{ color: 'var(--muted)' }}>Full review content is being added to the CMS.</p>
            </div>
          )}

          {/* Tags */}
          {review.score && (
            <div className="verdict">
              <div className="verdict-label">Our Verdict</div>
              <div className="verdict-title">{review.hotelName}</div>
              <div className="verdict-text">
                Overall Score: <span style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'var(--gold)' }}>{review.score}/10</span>
              </div>
            </div>
          )}

          {/* Related reviews */}
          {review.relatedReviews && review.relatedReviews.length > 0 && (
            <>
              <p className="section-label">Related Reviews</p>
              <div className="review-related-grid">
                {review.relatedReviews.map((r) => {
                  const img = r.heroImageUrl || (r.heroImage ? urlFor(r.heroImage).width(600).url() : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80')
                  return (
                    <Link key={r.slug} href={`/reviews/${r.slug}`} className="review-card" style={{ backgroundImage: `url('${img}')` }}>
                      <div className="review-overlay" />
                      <div className="review-info">
                        {r.regionLabel && <div className="review-region">{r.regionLabel}</div>}
                        <div className="review-name">{r.hotelName}</div>
                        {r.locationLabel && <div className="review-location">{r.locationLabel}</div>}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}
        </article>

        {/* SIDEBAR */}
        <aside className="article-sidebar">
          <div className="sidebar-sticky-rev">
            <div className="sidebar-block">
              <div className="sidebar-eyebrow">Reviewed Property</div>
              <div className="sidebar-hotel-name">{review.hotelName}</div>
              {review.locationLabel && <div className="sidebar-location">{review.locationLabel}</div>}
              {review.score && (
                <>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '3.5rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{review.score}</div>
                  <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.3rem', marginBottom: '1.5rem' }}>Overall Score / 10</div>
                </>
              )}
              {review.bookingUrl && (
                <a className="book-btn" href={review.bookingUrl} target="_blank" rel="noreferrer">
                  Check Availability
                </a>
              )}
              <a className="book-btn-outline" href="https://www.instagram.com/besthotels/" target="_blank" rel="noreferrer">
                Watch on Instagram
              </a>
            </div>

            <div className="sidebar-block">
              <div className="sidebar-eyebrow">Hotel Details</div>
              <ul className="info-list">
                {review.category && <li><span className="il-key">Category</span><span className="il-val">{review.category}</span></li>}
                {review.villaCount && <li><span className="il-key">Villas</span><span className="il-val">{review.villaCount}</span></li>}
                {review.diningInfo && <li><span className="il-key">Dining</span><span className="il-val">{review.diningInfo}</span></li>}
                {review.nightlyRate && <li><span className="il-key">Nightly Rate</span><span className="il-val">{review.nightlyRate}</span></li>}
                {review.sidebarDetails?.map((d, i) => (
                  <li key={i}><span className="il-key">{d.key}</span><span className="il-val">{d.value}</span></li>
                ))}
              </ul>
            </div>

            <div className="sidebar-block">
              <div className="sidebar-eyebrow">Reviewed By</div>
              <ul className="info-list">
                <li><span className="il-key">Author</span><span className="il-val">{review.authorName || 'Jake Trerotola'}</span></li>
                {review.publishedDate && (
                  <li>
                    <span className="il-key">Published</span>
                    <span className="il-val">{new Date(review.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </li>
                )}
                {review.updatedDate && (
                  <li>
                    <span className="il-key">Updated</span>
                    <span className="il-val">{new Date(review.updatedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
