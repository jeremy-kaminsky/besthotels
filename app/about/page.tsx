import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description: 'Jake Trerotola and the Best Hotels team have reviewed 200+ hotels across 60+ countries, building an audience of 700K+ travelers.',
}

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="page-hero"
        style={{
          height: 500,
          backgroundImage: "url('https://blog.italotreno.com/wp-content/uploads/2021/10/iStock-1215527379-1140x660.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center 50%',
        }}
      >
        <div className="page-hero-content">
          <p className="page-eyebrow">Our Story</p>
          <h1 className="page-title">About <em>Best Hotels</em></h1>
        </div>
      </section>

      {/* MISSION */}
      <section className="mission">
        <div className="mission-text">
          <div className="mission-eyebrow">Our Mission</div>
          <h2 className="mission-heading">Discovering the World&apos;s <em>Most Extraordinary Stays</em></h2>
          <div className="mission-body">
            <p>Best Hotels was built on a simple belief: that the right hotel can transform a trip from a holiday into a memory that lasts a lifetime. We travel to the world&apos;s most remarkable properties, document them with drone footage and editorial photography, and share firsthand reviews with our global community.</p>
            <p>We don&apos;t accept payment for coverage. Every review is based on an unsponsored stay. Our audience trusts us because we trust them with honesty.</p>
          </div>
        </div>
        <div
          className="mission-photo"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1400&q=85&auto=format&fit=crop')" }}
        />
      </section>

      {/* STATS */}
      <section className="stats-row">
        {[
          { num: '700K+', label: 'Global Audience', desc: 'Across Instagram, YouTube, and editorial' },
          { num: '200+', label: 'Hotels Reviewed', desc: 'Firsthand stays, no paid coverage' },
          { num: '60+', label: 'Countries', desc: 'From the Red Sea to Patagonia' },
          { num: '5+', label: 'Years', desc: 'Of consistent editorial publishing' },
        ].map(({ num, label, desc }) => (
          <div key={label} className="stat-item">
            <div className="stat-num">{num}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-desc">{desc}</div>
          </div>
        ))}
      </section>

      {/* FOUNDER */}
      <div style={{ padding: '4rem 3rem 0' }}>
        <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>The Team</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,2.6rem)', fontWeight: 300 }}>The People Behind <em>Best Hotels</em></h2>
      </div>

      {/* JEREMY */}
      <section className="circle-founder-section" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '4rem', padding: '4rem 3rem 5rem', alignItems: 'center' }}>
        <div className="circle-photo-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="circle-outer-ring" style={{ position: 'relative', width: 440, height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.06)' }} />
            <div className="circle-photo" style={{ width: 340, height: 340, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.25)', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              <Image src="/images/jeremy-kaminsky.png" alt="Jeremy Kaminsky" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
            </div>
          </div>
        </div>
        <div className="founder-content">
          <div className="founder-eyebrow">Owner &amp; President</div>
          <div className="founder-name">Jeremy Kaminsky</div>
          <div className="founder-title">Owner &amp; President of Best Hotels</div>
          <blockquote className="founder-quote">
            &quot;Best Hotels represents the highest standard in luxury hospitality coverage. We don&apos;t just review properties — we tell their stories the way they deserve to be told.&quot;
          </blockquote>
          <div className="founder-bio">
            <p>Jeremy Kaminsky is the Owner and President of Best Hotels. Under his leadership, the platform has evolved into a full editorial publication — one defined by firsthand stays, curated reviews, and the most authoritative ranking of luxury hotels in the world.</p>
          </div>
        </div>
      </section>

      {/* JAKE */}
      <section className="circle-founder-section" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem', padding: '4rem 3rem 5rem', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="founder-content">
          <div className="founder-eyebrow">Founder &amp; Creative Director</div>
          <div className="founder-name">Jake Trerotola</div>
          <div className="founder-title">Founder of Best Hotels</div>
          <blockquote className="founder-quote">
            &quot;I started Best Hotels because I genuinely believe the world&apos;s best hotels are underrepresented in editorial media. We fix that.&quot;
          </blockquote>
          <div className="founder-bio">
            <p>Jake&apos;s background spans luxury real estate media and outdoor lifestyle publishing, where he&apos;s built an audience of over 700K across accounts including @LuxuryRealEstate and @GoneOutdoors.</p>
          </div>
        </div>
        <div className="circle-photo-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="circle-outer-ring" style={{ position: 'relative', width: 440, height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.06)' }} />
            <div className="circle-photo" style={{ width: 340, height: 340, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.25)', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              <Image src="/images/jake-trerotola.png" alt="Jake Trerotola" fill style={{ objectFit: 'cover', objectPosition: 'center 40%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ padding: '5rem 3rem 0' }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>What We Do</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,2.6rem)', fontWeight: 300 }}>Three Pillars of <em>Best Hotels</em></h2>
        </div>
        <div className="pillars">
          <div className="pillar">
            <div className="pillar-icon">◈</div>
            <div className="pillar-label">Visual</div>
            <h3 className="pillar-title">Drone <em>Footage</em></h3>
            <p className="pillar-text">We capture hotels from perspectives most guests never see — aerial drone footage that reveals the full scale, setting, and beauty of each property.</p>
          </div>
          <div className="pillar">
            <div className="pillar-icon">◆</div>
            <div className="pillar-label">Visual</div>
            <h3 className="pillar-title">Editorial <em>Photography</em></h3>
            <p className="pillar-text">Every room, pool, restaurant, and view — documented with the care and quality that luxury properties deserve. Photography that makes you want to be there.</p>
          </div>
          <div className="pillar">
            <div className="pillar-icon">◇</div>
            <div className="pillar-label">Editorial</div>
            <h3 className="pillar-title">Written <em>Reviews</em></h3>
            <p className="pillar-text">Honest, detailed, firsthand reviews from actual stays. We cover everything: service, food, design, value, and what makes each property truly worth visiting.</p>
          </div>
        </div>
      </section>

      {/* PRESS */}
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
    </>
  )
}
