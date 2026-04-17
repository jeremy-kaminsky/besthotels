import { countrySchema } from './country'
import { stateSchema } from './state'
import { citySchema } from './city'
import { experienceSchema } from './experience'
import { reviewSchema } from './review'
import { rankingListSchema } from './rankingList'
import { rankingEntrySchema } from './rankingEntry'

export const schemaTypes = [
  countrySchema,
  stateSchema,
  citySchema,
  experienceSchema,
  reviewSchema,
  rankingListSchema,
  rankingEntrySchema,
]
