import { groq } from 'next-sanity'

export const ALL_RANKING_LISTS_QUERY = groq`
  *[_type == "rankingList"] | order(sortOrder asc) {
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    description,
    heroImageUrl,
    heroImage,
    propertyCount,
    updatedLabel,
    countryCount,
    region,
    experience,
    country->{ name, "slug": slug.current },
    state->{ name, "slug": slug.current },
    city->{ name, "slug": slug.current },
    experiences[]->{ name, "slug": slug.current }
  }
`

export const RANKING_LIST_BY_SLUG_QUERY = groq`
  *[_type == "rankingList" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    description,
    heroImageUrl,
    heroImage,
    propertyCount,
    updatedLabel,
    countryCount,
    methodology
  }
`

export const RANKING_ENTRIES_BY_LIST_QUERY = groq`
  *[_type == "rankingEntry" && rankingList->slug.current == $slug] | order(rank asc) {
    _id,
    rank,
    hotelName,
    regionTag,
    location,
    excerpt,
    imageUrl,
    image,
    tags,
    isEditorsPick,
    score,
    linkedReview->{ "slug": slug.current, hotelName },
    country->{ name, "slug": slug.current },
    state->{ name, "slug": slug.current },
    city->{ name, "slug": slug.current },
    experiences[]->{ name, "slug": slug.current }
  }
`
