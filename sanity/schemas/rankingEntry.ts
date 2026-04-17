import { defineField, defineType } from 'sanity'

export const rankingEntrySchema = defineType({
  name: 'rankingEntry',
  title: 'Ranking Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'rankingList',
      title: 'Ranking List',
      type: 'reference',
      to: [{ type: 'rankingList' }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'rank', title: 'Rank Position', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'hotelName', title: 'Hotel Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'regionTag', title: 'Region Tag', type: 'string', description: 'e.g. "Maldives"' }),
    defineField({ name: 'location', title: 'Location', type: 'string', description: 'e.g. "North Malé Atoll, Maldives"' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 4 }),
    defineField({ name: 'imageUrl', title: 'Image URL (external)', type: 'url' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'isEditorsPick', title: "Is Editor's Pick?", type: 'boolean' }),
    defineField({ name: 'score', title: 'Score', type: 'number' }),
    defineField({
      name: 'linkedReview',
      title: 'Linked Review',
      type: 'reference',
      to: [{ type: 'review' }],
    }),
    // Location references for filtering
    defineField({ name: 'country', title: 'Country', type: 'reference', to: [{ type: 'country' }] }),
    defineField({ name: 'state', title: 'State / Region', type: 'reference', to: [{ type: 'state' }] }),
    defineField({ name: 'city', title: 'City', type: 'reference', to: [{ type: 'city' }] }),
    defineField({ name: 'experiences', title: 'Experiences', type: 'array', of: [{ type: 'reference', to: [{ type: 'experience' }] }] }),
  ],
  orderings: [{ title: 'Rank', name: 'rankAsc', by: [{ field: 'rank', direction: 'asc' }] }],
  preview: {
    select: { title: 'hotelName', subtitle: 'rankingList.title', description: 'rank' },
    prepare({ title, subtitle, description }) {
      return { title: `#${description} ${title}`, subtitle }
    },
  },
})
