import { defineField, defineType } from 'sanity'

export const countrySchema = defineType({
  name: 'country',
  title: 'Country',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'parentRegion', title: 'Parent Region', type: 'string', description: 'e.g. Caribbean, Asia, Africa' }),
  ],
})
