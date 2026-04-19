import { defineField, defineType } from 'sanity'

const EXPERIENCE_OPTIONS = [
  'Beach', 'Safari', 'Ski', 'Overwater', 'Eco', 'Wellness',
  'Adults-Only', 'Honeymoon', 'Family', 'Heritage', 'City',
  'Desert', 'Surf', 'Wilderness', 'Wine Country', 'Boutique',
]

export const hotelSchema = defineType({
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'country', title: 'Country', type: 'reference', to: [{ type: 'country' }], validation: (r) => r.required() }),
    defineField({ name: 'region', title: 'Region', type: 'reference', to: [{ type: 'region' }] }),
    defineField({ name: 'city', title: 'City', type: 'reference', to: [{ type: 'city' }], validation: (r) => r.required() }),
    defineField({
      name: 'experiences',
      title: 'Experiences',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: EXPERIENCE_OPTIONS },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: '1–2 punchy, sensory sentences',
    }),
    defineField({
      name: 'featuredIn',
      title: 'Featured In (ranking slugs)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Slugs of ranking pages where this hotel is the editorial #1 (e.g. country-japan, experience-safari)',
    }),
    defineField({
      name: 'review',
      title: 'Full Review',
      type: 'reference',
      to: [{ type: 'review' }],
      description: 'Link to the full review page if one exists',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'country.name' },
  },
})
