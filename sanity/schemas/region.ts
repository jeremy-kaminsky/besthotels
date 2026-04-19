import { defineField, defineType } from 'sanity'

const CONTINENTS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Caribbean', 'Middle East']

export const regionSchema = defineType({
  name: 'region',
  title: 'Region',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: [{ type: 'country' }],
    }),
    defineField({
      name: 'continent',
      title: 'Continent (override)',
      type: 'string',
      options: { list: CONTINENTS },
      description: 'Only set if this region spans multiple countries or is continent-level',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'country.name' },
  },
})
