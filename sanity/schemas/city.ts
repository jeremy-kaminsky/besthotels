import { defineField, defineType } from 'sanity'

export const citySchema = defineType({
  name: 'city',
  title: 'City',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({
      name: 'state',
      title: 'State / Region',
      type: 'reference',
      to: [{ type: 'state' }],
    }),
    defineField({
      name: 'country',
      title: 'Country (direct, if no state)',
      type: 'reference',
      to: [{ type: 'country' }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'state.name' },
  },
})
