import Link from 'next/link'
import { resolveHeroImage } from '@/lib/heroImages'

interface ReviewCardProps {
  slug: string
  hotelName: string
  regionLabel?: string
  locationLabel?: string
  score?: number
  excerpt?: string
  heroImageUrl?: string
  featured?: boolean
}

export default function ReviewCard({
  slug,
  hotelName,
  regionLabel,
  locationLabel,
  score,
  excerpt,
  heroImageUrl,
  featured,
}: ReviewCardProps) {
  const fallback = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85&auto=format&fit=crop'
  const img = resolveHeroImage(slug, heroImageUrl) || fallback

  return (
    <Link
      href={`/reviews/${slug}`}
      className={`review-card${featured ? ' featured' : ''}`}
      style={{ backgroundImage: `url('${img}')` }}
    >
      <div className="review-overlay" />
      {score && (
        <div className="review-score">
          {score} <span>/ 10</span>
        </div>
      )}
      <div className="review-info">
        {regionLabel && <div className="review-region">{regionLabel}</div>}
        <div className="review-name">{hotelName}</div>
        {locationLabel && <div className="review-location">{locationLabel}</div>}
        {excerpt && <div className="review-excerpt">{excerpt}</div>}
      </div>
    </Link>
  )
}
