import { defineField, defineType } from 'sanity'

export const reviewSchema = defineType({
  name: 'review',
  title: 'Hotel Review',
  type: 'document',
  fields: [
    defineField({ name: 'hotelName', title: 'Hotel Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'hotelName' }, validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'regionLabel', title: 'Region Label', type: 'string', description: 'e.g. "Middle East · Saudi Arabia"' }),
    defineField({ name: 'locationLabel', title: 'Location Label', type: 'string', description: 'e.g. "Red Sea, Saudi Arabia"' }),

    // Location references
    defineField({ name: 'country', title: 'Country', type: 'reference', to: [{ type: 'country' }] }),
    defineField({ name: 'state', title: 'State / Region', type: 'reference', to: [{ type: 'state' }] }),
    defineField({ name: 'city', title: 'City', type: 'reference', to: [{ type: 'city' }] }),
    defineField({ name: 'experiences', title: 'Experiences', type: 'array', of: [{ type: 'reference', to: [{ type: 'experience' }] }] }),

    // Media
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'photoStrip', title: 'Photo Strip', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'photoStripUrls', title: 'Photo Strip URLs (external)', type: 'array', of: [{ type: 'string' }] }),

    // Author
    defineField({ name: 'authorName', title: 'Author Name', type: 'string' }),
    defineField({ name: 'authorRole', title: 'Author Role', type: 'string' }),
    defineField({ name: 'authorPhoto', title: 'Author Photo', type: 'image', options: { hotspot: true } }),

    // Dates
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date' }),
    defineField({ name: 'updatedDate', title: 'Updated Date', type: 'date' }),

    // Collab
    defineField({ name: 'isCollaboration', title: 'Is Collaboration?', type: 'boolean' }),
    defineField({ name: 'collaboratorName', title: 'Collaborator Name', type: 'string' }),
    defineField({ name: 'collaboratorHandle', title: 'Collaborator Instagram Handle', type: 'string' }),
    defineField({ name: 'collaboratorPhoto', title: 'Collaborator Photo', type: 'image' }),

    // Content
    defineField({ name: 'body', title: 'Body Content', type: 'array', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true } },
    ]}),

    // Sidebar facts
    defineField({ name: 'nightlyRate', title: 'Nightly Rate', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'villaCount', title: 'Villa / Room Count', type: 'string' }),
    defineField({ name: 'diningInfo', title: 'Dining Info', type: 'string' }),
    defineField({ name: 'bookingUrl', title: 'Booking URL', type: 'url' }),

    // Score
    defineField({ name: 'score', title: 'Score (out of 10)', type: 'number' }),

    // Sidebar detail rows (key/value pairs beyond the basic fields)
    defineField({ name: 'sidebarDetails', title: 'Sidebar Details', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'key', title: 'Label', type: 'string' },
        { name: 'value', title: 'Value', type: 'string' },
      ],
      preview: { select: { title: 'key', subtitle: 'value' } },
    }]}),

    // Relations
    defineField({ name: 'relatedReviews', title: 'Related Reviews', type: 'array', of: [{ type: 'reference', to: [{ type: 'review' }] }] }),

    // SEO
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'heroImageUrl', title: 'Hero Image URL (external fallback)', type: 'url' }),
  ],
  preview: {
    select: { title: 'hotelName', subtitle: 'locationLabel', media: 'heroImage' },
  },
})
