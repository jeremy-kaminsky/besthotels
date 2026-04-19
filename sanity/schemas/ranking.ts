import { defineField, defineType } from 'sanity'

export const rankingSchema = defineType({
  name: 'ranking',
  title: 'Ranking',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: ['global', 'custom'], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'hotels',
      title: 'Hotels (ordered)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'hotel' }] }],
      description: 'Ordered list of hotels for custom rankings (e.g. Top 50 World)',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' },
  },
})
