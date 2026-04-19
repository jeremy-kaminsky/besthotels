import { defineField, defineType } from 'sanity'

const CONTINENTS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Caribbean', 'Middle East']

export const countrySchema = defineType({
  name: 'country',
  title: 'Country',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({
      name: 'continent',
      title: 'Continent',
      type: 'string',
      options: { list: CONTINENTS },
      validation: (r) => r.required(),
    }),
  ],
})
