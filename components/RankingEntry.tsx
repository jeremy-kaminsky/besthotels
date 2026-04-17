import Link from 'next/link'

interface RankingEntryProps {
  rank: number
  hotelName: string
  regionTag?: string
  location?: string
  excerpt?: string
  imageUrl?: string
  tags?: string[]
  isEditorsPick?: boolean
  linkedReviewSlug?: string
}

export default function RankingEntry({
  rank,
  hotelName,
  regionTag,
  location,
  excerpt,
  imageUrl,
  tags,
  isEditorsPick,
  linkedReviewSlug,
}: RankingEntryProps) {
  const fallback = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85&auto=format&fit=crop'
  const rankStr = String(rank).padStart(2, '0')
  const isTop3 = rank <= 3

  const inner = (
    <div className={`rank-entry${isTop3 ? ' top3' : ''}`}>
      <div className="rank-num-col">
        <span className="rank-num">{rankStr}</span>
      </div>
      <div className="entry-text">
        {isEditorsPick && <div className="top-pick">★ Editor&apos;s Pick</div>}
        {regionTag && <div className="entry-region">{regionTag}</div>}
        <div className="entry-name">{hotelName}</div>
        {location && <div className="entry-location">{location}</div>}
        {excerpt && <p className="entry-excerpt">{excerpt}</p>}
        {tags && tags.length > 0 && (
          <div className="entry-tags">
            {tags.map((t) => <span key={t} className="entry-tag">{t}</span>)}
          </div>
        )}
        {linkedReviewSlug && (
          <span className="entry-read">Read Full Review</span>
        )}
      </div>
      <div className="entry-photo">
        <img src={imageUrl || fallback} alt={hotelName} loading="lazy" />
      </div>
    </div>
  )

  if (linkedReviewSlug) {
    return <Link href={`/reviews/${linkedReviewSlug}`} style={{ display: 'contents' }}>{inner}</Link>
  }
  return inner
}
