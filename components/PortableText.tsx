import { PortableText as SanityPortableText } from '@portabletext/react'
import NextImage from 'next/image'
import { urlFor } from '@/sanity/image'

type PhotoGridItem = { url?: string; alt?: string; caption?: string }
type HighlightItem = { bold?: string; text: string }
type DiningItem = { name: string; cuisine?: string; description?: string; bestFor?: string }
type NtkItem = { label: string; value: string }
type ScoreItem = { category: string; score: number }

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p className="review-p">{children}</p>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="section-h">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="section-h" style={{ fontSize: '1.5rem' }}>{children}</h3>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <div className="pull-quote"><p>{children}</p></div>
    ),
    intro: ({ children }: { children?: React.ReactNode }) => (
      <p className="review-p" style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>{children}</p>
    ),
  },
  types: {
    image: ({ value }: { value: { asset?: { _ref: string }; caption?: string } }) => (
      <figure className="inline-photo">
        {value.asset && (
          <NextImage src={urlFor(value).width(1400).quality(90).url()} alt={value.caption || ''} width={1400} height={934} quality={90} style={{ width: '100%', height: 'auto', display: 'block' }} />
        )}
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),

    sectionHeader: ({ value }: { value: { label?: string; heading?: string; headingItalic?: string } }) => (
      <div className="review-section" style={{ marginBottom: '0.5rem' }}>
        {value.label && <div className="section-label">{value.label}</div>}
        {(value.heading || value.headingItalic) && (
          <h2 className="section-h">
            {value.heading}
            {value.headingItalic && <em>{value.headingItalic}</em>}
          </h2>
        )}
      </div>
    ),

    pullQuote: ({ value }: { value: { text: string; cite?: string } }) => (
      <div className="pull-quote">
        <p>{value.text}</p>
        {value.cite && <cite>{value.cite}</cite>}
      </div>
    ),

    photoGrid: ({ value }: { value: { layout: string; images: PhotoGridItem[] } }) => {
      const cls = value.layout === '2col' ? 'photo-2col'
        : value.layout === '3col' ? 'photo-3col'
        : value.layout === '4col' ? 'photo-4col'
        : 'photo-single'
      if (value.layout === 'single' && value.images?.[0]) {
        const img = value.images[0]
        return (
          <figure className="inline-photo">
            <NextImage src={img.url!} alt={img.alt || ''} width={1400} height={934} quality={90} style={{ width: '100%', height: 'auto', display: 'block' }} />
            {img.caption && <figcaption className="photo-caption">{img.caption}</figcaption>}
          </figure>
        )
      }
      const [w, h] = value.layout === '3col' ? [800, 800]
        : value.layout === '4col' ? [600, 800]
        : [900, 1200]
      return (
        <div className={cls}>
          {value.images?.map((img, i) => (
            <NextImage key={i} src={img.url!} alt={img.alt || ''} width={w} height={h} quality={90} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ))}
        </div>
      )
    },

    highlightBox: ({ value }: { value: { title?: string; items: HighlightItem[] } }) => (
      <div className="highlight-box">
        {value.title && <h4>{value.title}</h4>}
        <ul className="highlight-list">
          {value.items?.map((item, i) => (
            <li key={i}>
              {item.bold && <strong>{item.bold}</strong>}
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    ),

    diningGrid: ({ value }: { value: { items: DiningItem[] } }) => (
      <div className="dining-grid">
        {value.items?.map((item, i) => (
          <div key={i} className="dining-item">
            <div>
              <div className="dining-name">{item.name}</div>
              {item.cuisine && <div className="dining-cuisine">{item.cuisine}</div>}
            </div>
            <div>
              {item.description && <div className="dining-desc">{item.description}</div>}
              {item.bestFor && <div className="dining-best">Best for: {item.bestFor}</div>}
            </div>
          </div>
        ))}
      </div>
    ),

    noteBox: ({ value }: { value: { text: string; boldPrefix?: string } }) => (
      <div className="note-box">
        {value.boldPrefix && <strong>{value.boldPrefix} </strong>}
        {value.text}
      </div>
    ),

    ntkGrid: ({ value }: { value: { items: NtkItem[] } }) => (
      <div className="ntk-grid">
        {value.items?.map((item, i) => (
          <div key={i} className="ntk-item">
            <div className="ntk-label">{item.label}</div>
            <div className="ntk-value">{item.value}</div>
          </div>
        ))}
      </div>
    ),

    verdict: ({ value }: { value: { label?: string; title: string; text: string } }) => (
      <div className="verdict">
        <div className="verdict-label">{value.label || 'The Verdict'}</div>
        <div className="verdict-title">{value.title}</div>
        <p className="verdict-text">{value.text}</p>
      </div>
    ),

    tagRow: ({ value }: { value: { tags: string[] } }) => (
      <div className="tag-row">
        {value.tags?.map((tag, i) => (
          <span key={i} className="tag-chip">{tag}</span>
        ))}
      </div>
    ),

    collabFooter: ({ value }: { value: { name: string; photoUrl?: string; text: string; handle?: string; email?: string } }) => (
      <div className="collab-footer">
        {value.photoUrl && <img src={value.photoUrl} alt={value.name} />}
        <div className="collab-footer-text">
          <div className="collab-footer-name">{value.name}</div>
          {value.text}
          {value.handle && (
            <> Follow at <a href={`https://www.instagram.com/${value.handle.replace('@', '')}`} target="_blank" rel="noreferrer">{value.handle}</a> on Instagram.</>
          )}
        </div>
      </div>
    ),

    scoreBreakdown: ({ value }: { value: { title?: string; items: ScoreItem[] } }) => (
      <div className="score-breakdown">
        <div className="score-breakdown-title">{value.title || 'Score Breakdown'}</div>
        {value.items?.map((item, i) => (
          <div key={i} className="score-row">
            <span className="score-cat">{item.category}</span>
            <div className="score-bar-wrap">
              <span className="score-bar" style={{ width: `${item.score * 10}%` }} />
            </div>
            <span className="score-val">{item.score}</span>
          </div>
        ))}
      </div>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong style={{ color: 'var(--white)' }}>{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em style={{ color: 'var(--gold-light)' }}>{children}</em>,
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noreferrer"
        style={{ color: 'var(--gold)', borderBottom: '1px solid var(--gold-dark)' }}
      >{children}</a>
    ),
  },
}

export default function PortableText({ value }: { value: unknown[] }) {
  return <SanityPortableText value={value as Parameters<typeof SanityPortableText>[0]['value']} components={components} />
}
