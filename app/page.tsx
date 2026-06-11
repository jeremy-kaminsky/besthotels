import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { ALL_REVIEWS_QUERY } from '@/sanity/queries/reviews'
import NewsletterForm from '@/components/NewsletterForm'
import { resolveHeroImage } from '@/lib/heroImages'

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

  const featuredReviews = reviews.slice(0, 6)

  const placeholderCards = [
    { name: 'Hanging Gardens of Bali', loc: 'Ubud · Indonesia', region: 'Indonesia', excerpt: 'A clifftop retreat above the Ayung River gorge, where every villa opens to the jungle canopy and infinity pools seem to dissolve into the valley below.', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=85&auto=format&fit=crop' },
    { name: 'Katikies Santorini', loc: 'Oia · Greece', region: 'Greece', excerpt: 'The definitive Santorini experience — cascading whitewash terraces, cerulean domes, and the most photographed sunset view in the Aegean.', img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1400&q=85&auto=format&fit=crop' },
    { name: 'Gili Lankanfushi', loc: 'Maldives', region: 'Maldives', excerpt: 'No shoes, no news, no clocks — this barefoot-luxury overwater resort sets the standard for sustainable indulgence in the Indian Ocean.', img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&q=85&auto=format&fit=crop' },
    { name: 'Burj Al Arab', loc: 'Dubai · UAE', region: 'UAE', excerpt: 'The world\'s most recognised hotel silhouette, rising from its own artificial island — a statement of architectural ambition that remains unmatched.', img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1400&q=85&auto=format&fit=crop' },
    { name: 'Monastero Santa Rosa', loc: 'Amalfi Coast · Italy', region: 'Italy', excerpt: 'A 17th-century monastery reimagined as an intimate clifftop hotel, with terraced gardens descending to the sea and some of the coast\'s finest cuisine.', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400&q=85&auto=format&fit=crop' },
    { name: 'Amanyara', loc: 'Turks & Caicos', region: 'Caribbean', excerpt: 'Aman\'s Caribbean flagship — a collection of pavilions set into pristine coral gardens, where the silence and clarity of the water is unlike anywhere else.', img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1400&q=85&auto=format&fit=crop' },
  ]

  const displayCards = featuredReviews.length > 0
    ? featuredReviews.map((r, i) => ({
        name: r.hotelName,
        loc: r.locationLabel || '',
        region: r.regionLabel || '',
        excerpt: r.excerpt || '',
        img: resolveHeroImage(r.slug, r.heroImageUrl) || placeholderCards[i]?.img || '',
        slug: r.slug,
      }))
    : placeholderCards.map((p) => ({ ...p, slug: '' }))

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
          <Link href="/reviews" className="hero-cta-btn fu">Explore Featured Stays</Link>
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

      {/* PRESS — FIX 2B: dark-3 background, more padding, dividers */}
      <section className="press-section">
        <p className="press-label">As Seen In</p>
        <div className="press-logos">
          <span className="press-logo">Axios</span>
          <span className="press-logo" style={{ fontSize: '1.1rem', lineHeight: '1.25' }}>
            Condé Nast<br /><span style={{ fontStyle: 'normal', fontSize: '0.7em', letterSpacing: '0.14em' }}>Traveler</span>
          </span>
          <span className="press-logo ss">HuffPost</span>
        </div>
      </section>

      {/* FEATURED STAYS — Editorial asymmetric layout */}
      <section id="stays" style={{ background: 'var(--dark)' }}>
        <div className="editorial-section-header">
          <div className="editorial-section-header-left">
            <div className="editorial-section-accent" />
            <div>
              <p className="editorial-section-eyebrow">Handpicked escapes</p>
              <h2 className="editorial-section-title">Featured <em>Stays</em></h2>
            </div>
          </div>
          <Link href="/reviews" className="section-link">View All Reviews</Link>
        </div>
        {displayCards.map((card, i) => (
          <div key={i} className={`editorial-card${i % 2 === 1 ? ' reversed' : ''}`}>
            <div className="editorial-card-img">
              <div
                className="editorial-card-img-inner"
                style={card.img ? { backgroundImage: `url(${card.img})` } : undefined}
              />
              {card.slug && (
                <Link href={`/reviews/${card.slug}`} style={{ position: 'absolute', inset: 0, zIndex: 2 }} />
              )}
            </div>
            <div className="editorial-card-body">
              {(card.region || card.loc) && (
                <p className="editorial-card-region">{card.region || card.loc.split('·').pop()?.trim()}</p>
              )}
              <h3 className="editorial-card-name">{card.name}</h3>
              {card.loc && <p className="editorial-card-location">{card.loc}</p>}
              {card.excerpt && <p className="editorial-card-excerpt">{card.excerpt}</p>}
              {card.slug ? (
                <Link href={`/reviews/${card.slug}`} className="editorial-card-link">Read Review</Link>
              ) : (
                <span className="editorial-card-link" style={{ opacity: 0.4, cursor: 'default' }}>Coming Soon</span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* TICKER — FIX 3: own band with padding, dark-3 bg, dividers */}
      <div className="divider">
        <div className="divider-track">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="divider-copy" aria-hidden={copy === 1 ? true : undefined}>
              {['Bali · Indonesia', 'Santorini · Greece', 'St. Barthélemy · Caribbean', 'Amalfi · Italy', 'Marrakech · Morocco', 'Kyoto · Japan', 'Maldives', 'Bora Bora · French Polynesia', 'Mykonos · Greece', 'Aspen · Colorado', 'Tulum · Mexico', 'Phuket · Thailand', 'Lake Como · Italy', 'Serengeti · Tanzania', 'Dubai · UAE', 'St. Moritz · Switzerland', 'Napa Valley · California', 'Ibiza · Spain', 'Queenstown · New Zealand', 'Seychelles'].map((item) => (
                <div key={item} className="div-item">
                  <div className="div-dot" />
                  <span className="div-text">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT — Jeremy */}
      <section id="about" style={{
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        gap: '4rem',
        padding: '5rem 3rem',
        alignItems: 'center',
        background: 'var(--dark-2)',
        borderTop: '1px solid rgba(184,160,130,0.08)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="circle-outer-ring" style={{ position: 'relative', width: 440, height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(184,160,130,0.06)' }} />
            <div className="circle-photo" style={{ width: 340, height: 340, borderRadius: '50%', border: '1px solid rgba(184,160,130,0.25)', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              <Image src="/images/jeremy-kaminsky.png" alt="Jeremy Kaminsky" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
            </div>
          </div>
        </div>
        <div className="about-content">
          <p className="section-eyebrow">Leadership</p>
          <blockquote className="about-quote">&quot;Best Hotels represents the highest standard in luxury hospitality coverage. We don&apos;t just review properties — we tell their stories the way they deserve to be told.&quot;</blockquote>
          <p className="about-text">
            Jeremy Kaminsky is the Owner and President of Best Hotels, acquired with a vision to expand its editorial footprint into the world&apos;s most prestigious luxury hospitality publication.
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

      {/* ABOUT — Jake */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '4rem',
        padding: '5rem 3rem',
        alignItems: 'center',
        background: 'var(--dark-2)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div className="about-content">
          <p className="section-eyebrow">Founder &amp; Creative Director</p>
          <blockquote className="about-quote">&quot;I started Best Hotels because I genuinely believe the world&apos;s best hotels are underrepresented in editorial media. We fix that.&quot;</blockquote>
          <p className="about-text">
            Jake&apos;s background spans luxury real estate media and outdoor lifestyle publishing, where he&apos;s built an audience of over 700K across accounts including @LuxuryRealEstate and @GoneOutdoors.
          </p>
          <div className="about-sig">
            <div className="about-sig-line" />
            <div>
              <div className="about-sig-name">Jake Trerotola</div>
              <div className="about-sig-role">Founder &amp; Creative Director, Best Hotels</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="circle-outer-ring" style={{ position: 'relative', width: 440, height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(184,160,130,0.06)' }} />
            <div className="circle-photo" style={{ width: 340, height: 340, borderRadius: '50%', border: '1px solid rgba(184,160,130,0.25)', overflow: 'hidden', position: 'relative', flexShrink: 0, backgroundColor: '#ffffff' }}>
              <Image src="/images/jake-trerotola.png" alt="Jake Trerotola" fill style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.1)', transformOrigin: 'center 30%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterForm />
    </>
  )
}
