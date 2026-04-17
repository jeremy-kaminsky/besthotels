export interface Destination {
  region: string
  name: string
  slug: string
  imageUrl: string
  count: number
}

export const DESTINATIONS: Destination[] = [
  {
    region: 'Indian Ocean',
    name: 'Maldives',
    slug: 'maldives',
    imageUrl: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80&auto=format&fit=crop',
    count: 12,
  },
  {
    region: 'Caribbean',
    name: 'St. Barths',
    slug: 'st-barths',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80&auto=format&fit=crop',
    count: 8,
  },
  {
    region: 'Europe',
    name: 'Amalfi Coast',
    slug: 'amalfi-coast',
    imageUrl: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80&auto=format&fit=crop',
    count: 7,
  },
  {
    region: 'Africa',
    name: 'Safari Lodges',
    slug: 'safari',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80&auto=format&fit=crop',
    count: 9,
  },
  {
    region: 'Southeast Asia',
    name: 'Bali',
    slug: 'bali',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop',
    count: 6,
  },
  {
    region: 'Middle East',
    name: 'Dubai',
    slug: 'dubai',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop',
    count: 5,
  },
]
