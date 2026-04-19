import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { ALL_REVIEWS_QUERY } from '@/sanity/queries/reviews'
import NewsletterForm from '@/components/NewsletterForm'

export default async function HomePage() {
  let reviews: {
    slug: string; hotelName: string; regionLabel?: string; locationLabel?: string;
    heroImageUrl?: string; score?: number; excerpt?: string
  }[] = []
  try {
    reviews = await client.fetch(ALL_REVIEWS_QUERY)
  } catch {
    // Sanity not configured yet — renders with placeholder content
  }

  const featuredReviews = reviews.slice(0, 5)

  const placeholderCards = [
    { name: 'Hanging Gardens of Bali', loc: 'Ubud · Indonesia', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=85&auto=format&fit=crop' },
    { name: 'Katikies Santorini', loc: 'Oia · Greece', img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1400&q=85&auto=format&fit=crop' },
    { name: 'Gili Lankanfushi', loc: 'Maldives', img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&q=85&auto=format&fit=crop' },
    { name: 'Burj Al Arab', loc: 'Dubai · UAE', img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1400&q=85&auto=format&fit=crop' },
    { name: 'Monastero Santa Rosa', loc: 'Amalfi Coast · Italy', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400&q=85&auto=format&fit=crop' },
  ]

  const displayCards = featuredReviews.length > 0
    ? featuredReviews.map((r, i) => ({ name: r.hotelName, loc: r.locationLabel || '', img: r.heroImageUrl || placeholderCards[i]?.img || '', slug: r.slug }))
    : placeholderCards.map((p, i) => ({ ...p, slug: '' }))

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow fu">Curated luxury travel · Est. 2020</p>
          <h1 className="hero-title-home fu">The World<br /><em>Awaits You</em></h1>
          <p className="hero-sub fu">
            We discover and share the world&apos;s most extraordinary hotels and resorts — through photography, drone footage, and visual storytelling for an audience of 700K+.
          </p>
          <div className="hero-meta-row fu">
            <div className="hero-meta-item">
              <div className="hero-meta-num">200<span style={{ fontSize: '0.9rem' }}>+</span></div>
              <div className="hero-meta-label">Hotels Reviewed</div>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <div className="hero-meta-num">60<span style={{ fontSize: '0.9rem' }}>+</span></div>
              <div className="hero-meta-label">Countries</div>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <div className="hero-meta-num">700K<span style={{ fontSize: '0.9rem' }}>+</span></div>
              <div className="hero-meta-label">Audience</div>
            </div>
          </div>
          <Link href="/reviews" className="hero-cta fu">Explore Featured Stays</Link>
        </div>
        <div className="hero-right">
          <div
            className="hero-img-main"
            style={{ backgroundImage: "url('https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2024/06/27/0835/MARPH-P0229-Restaurant-Pavillon-Terrace-Pool-Pergolas-Tables-Vegetation.jpg/MARPH-P0229-Restaurant-Pavillon-Terrace-Pool-Pergolas-Tables-Vegetation.16x9.jpg?imwidth=1920')" }}
          >
            <div className="photo-overlay" />
          </div>
          <div className="hero-img-split">
            <div style={{ backgroundImage: "url('https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2023/11/30/1141/MARPH-P0099-Park-Suite-King-Deluxe-Room.jpg/MARPH-P0099-Park-Suite-King-Deluxe-Room.16x9.jpg?imwidth=1920')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ backgroundImage: "url('https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2024/12/10/0450/MARPH-P0235-Entrance-Woman-Lobby-Check-In.jpg/MARPH-P0235-Entrance-Woman-Lobby-Check-In.16x9.jpg?imwidth=1920')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">Marrakech</div>
            <div className="hero-stat-label">Featured · Park Hyatt Marrakech</div>
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section className="press-section" style={{ padding: '3rem 3rem 2.5rem' }}>
        <p className="press-label">As Seen In</p>
        <div className="press-logos">
          <span className="press-logo">Axios</span>
          <span className="press-logo" style={{ fontSize: '1.1rem', lineHeight: '1.25' }}>
            Condé Nast<br /><span style={{ fontStyle: 'normal', fontSize: '0.7em', letterSpacing: '0.14em' }}>Traveler</span>
          </span>
          <span className="press-logo ss">HuffPost</span>
        </div>
      </section>

      {/* FEATURED STAYS */}
      <section id="stays">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Handpicked escapes</p>
            <h2 className="section-title">Featured <em>Stays</em></h2>
          </div>
          <Link href="/reviews" className="section-link">View All Reviews</Link>
        </div>
        <div className="stays-grid">
          {displayCards.map((card, i) => (
            <div
              key={i}
              className="stay-card"
              style={{ backgroundImage: `url('${card.img}')` }}
            >
              {card.slug ? (
                <Link href={`/reviews/${card.slug}`} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
              ) : null}
              <div className="stay-overlay" />
              <div className="stay-info">
                <div className="stay-name">{card.name}</div>
                <div className="stay-loc">{card.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div className="divider">
        <div className="divider-track">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="divider-copy" aria-hidden={copy === 1 ? true : undefined}>
              {['Bali · Indonesia', 'Santorini · Greece', 'Maldives · Indian Ocean', 'Amalfi Coast · Italy', 'Kyoto · Japan', 'Marrakech · Morocco', 'Cape Town · South Africa', 'Patagonia · Argentina'].map((item) => (
                <div key={item} className="div-item">
                  <div className="div-dot" />
                  <span className="div-text">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* GOLD DIVIDER */}
      <div style={{ margin: '0 3rem', height: '1px', background: 'rgba(201,169,110,0.15)' }} />

      {/* ABOUT */}
      <section id="about" style={{
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        gap: '4rem',
        padding: '4rem 3rem 5rem',
        alignItems: 'center',
      }}>
        {/* Circle photo column */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="circle-outer-ring" style={{ position: 'relative', width: 440, height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {/* Outer concentric ring */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.06)' }} />
            {/* Photo with gold ring */}
            <div className="circle-photo" style={{
              width: 340, height: 340,
              borderRadius: '50%',
              border: '1px solid rgba(201,169,110,0.25)',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
            }}>
              <Image
                src="/images/jeremy-kaminsky.png"
                alt="Jeremy Kaminsky"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              />
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="about-content">
          <p className="section-eyebrow">Leadership</p>
          <blockquote className="about-quote">&quot;Best Hotels represents the highest standard in luxury hospitality coverage. We don&apos;t just review properties — we tell their stories the way they deserve to be told.&quot;</blockquote>
          <p className="about-text">
            Jeremy Kaminsky is the Owner and President of Best Hotels, acquired with a vision to expand its editorial footprint into the world&apos;s most prestigious luxury hospitality publication. Jeremy&apos;s background spans luxury real estate media and outdoor lifestyle publishing, where he&apos;s built an audience of over 700K across accounts including @LuxuryRealEstate and @GoneOutdoors.
          </p>
          <div className="about-sig">
            <div className="about-sig-line" />
            <div>
              <div className="about-sig-name">Jeremy Kaminsky</div>
              <div className="about-sig-role">Owner &amp; President, Best Hotels</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterForm />
    </>
  )
}
