import { defineField, defineType } from 'sanity'

export const rankingListSchema = defineType({
  name: 'rankingList',
  title: 'Ranking List',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'e.g. "Best Hotels · Global · 2026"' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImageUrl', title: 'Hero Image URL', type: 'url' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'propertyCount', title: 'Property Count Label', type: 'string', description: 'e.g. "50 Properties"' }),
    defineField({ name: 'updatedLabel', title: 'Updated Label', type: 'string', description: 'e.g. "Updated March 2026"' }),
    defineField({ name: 'countryCount', title: 'Country Count Label', type: 'string', description: 'e.g. "37 Countries"' }),
    defineField({ name: 'methodology', title: 'Methodology Note', type: 'text', rows: 4 }),
    defineField({
      name: 'region',
      title: 'Region (display label)',
      type: 'string',
      options: { list: ['World', 'United States', 'Europe', 'Asia', 'Africa', 'Middle East', 'Caribbean', 'Oceania', 'Americas'] },
    }),
    defineField({
      name: 'experience',
      title: 'Experience Type (display label)',
      type: 'string',
      options: { list: ['Beach', 'Ski', 'Safari', 'Wellness', 'Family', 'Adults Only', 'Honeymoon', 'City', 'Eco', 'Boutique', 'Overwater'] },
    }),
    defineField({ name: 'country', title: 'Filter: Country', type: 'reference', to: [{ type: 'country' }] }),
    defineField({ name: 'state', title: 'Filter: Region/State', type: 'reference', to: [{ type: 'state' }] }),
    defineField({ name: 'city', title: 'Filter: City', type: 'reference', to: [{ type: 'city' }] }),
    defineField({ name: 'experiences', title: 'Filter: Experiences', type: 'array', of: [{ type: 'reference', to: [{ type: 'experience' }] }] }),
    defineField({ name: 'sortOrder', title: 'Sort Order (for listings)', type: 'number' }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
