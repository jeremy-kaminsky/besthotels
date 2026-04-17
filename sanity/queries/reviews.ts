import { groq } from 'next-sanity'

export const ALL_REVIEWS_QUERY = groq`
  *[_type == "review"] | order(publishedDate desc) {
    _id,
    hotelName,
    "slug": slug.current,
    subtitle,
    regionLabel,
    locationLabel,
    score,
    excerpt,
    heroImageUrl,
    heroImage,
    publishedDate,
    country->{ name, "slug": slug.current },
    state->{ name, "slug": slug.current },
    city->{ name, "slug": slug.current },
    experiences[]->{ name, "slug": slug.current }
  }
`

export const REVIEW_BY_SLUG_QUERY = groq`
  *[_type == "review" && slug.current == $slug][0] {
    _id,
    hotelName,
    "slug": slug.current,
    subtitle,
    regionLabel,
    locationLabel,
    score,
    excerpt,
    heroImageUrl,
    heroImage,
    photoStrip,
    photoStripUrls,
    authorName,
    authorRole,
    authorPhoto,
    publishedDate,
    updatedDate,
    isCollaboration,
    collaboratorName,
    collaboratorHandle,
    collaboratorPhoto,
    body,
    nightlyRate,
    category,
    villaCount,
    diningInfo,
    bookingUrl,
    sidebarDetails,
    country->{ name, "slug": slug.current },
    state->{ name, "slug": slug.current },
    city->{ name, "slug": slug.current },
    experiences[]->{ name, "slug": slug.current },
    relatedReviews[]->{ hotelName, "slug": slug.current, regionLabel, locationLabel, heroImageUrl, heroImage, score }
  }
`

export const REVIEWS_BY_COUNTRY_QUERY = groq`
  *[_type == "review" && country->slug.current == $countrySlug] | order(publishedDate desc) {
    _id,
    hotelName,
    "slug": slug.current,
    subtitle,
    regionLabel,
    locationLabel,
    score,
    excerpt,
    heroImageUrl,
    heroImage,
    country->{ name, "slug": slug.current },
    state->{ name, "slug": slug.current },
    city->{ name, "slug": slug.current },
    experiences[]->{ name, "slug": slug.current }
  }
`

export const REVIEWS_BY_STATE_QUERY = groq`
  *[_type == "review" && state->slug.current == $stateSlug] | order(publishedDate desc) {
    _id,
    hotelName,
    "slug": slug.current,
    subtitle,
    regionLabel,
    locationLabel,
    score,
    excerpt,
    heroImageUrl,
    heroImage,
    country->{ name, "slug": slug.current },
    state->{ name, "slug": slug.current },
    city->{ name, "slug": slug.current },
    experiences[]->{ name, "slug": slug.current }
  }
`

export const REVIEWS_BY_CITY_QUERY = groq`
  *[_type == "review" && city->slug.current == $citySlug] | order(publishedDate desc) {
    _id,
    hotelName,
    "slug": slug.current,
    subtitle,
    regionLabel,
    locationLabel,
    score,
    excerpt,
    heroImageUrl,
    heroImage,
    country->{ name, "slug": slug.current },
    state->{ name, "slug": slug.current },
    city->{ name, "slug": slug.current },
    experiences[]->{ name, "slug": slug.current }
  }
`

export const REVIEWS_BY_EXPERIENCE_QUERY = groq`
  *[_type == "review" && $expSlug in experiences[]->slug.current] | order(publishedDate desc) {
    _id,
    hotelName,
    "slug": slug.current,
    subtitle,
    regionLabel,
    locationLabel,
    score,
    excerpt,
    heroImageUrl,
    heroImage,
    country->{ name, "slug": slug.current },
    state->{ name, "slug": slug.current },
    city->{ name, "slug": slug.current },
    experiences[]->{ name, "slug": slug.current }
  }
`

export const ALL_FILTER_OPTIONS_QUERY = groq`
  {
    "countries": *[_type == "country"] | order(name asc) { _id, name, "slug": slug.current },
    "states": *[_type == "state"] | order(name asc) { _id, name, "slug": slug.current, country->{ _id, name, "slug": slug.current } },
    "cities": *[_type == "city"] | order(name asc) { _id, name, "slug": slug.current, state->{ _id, "slug": slug.current }, country->{ _id, "slug": slug.current } },
    "experiences": *[_type == "experience"] | order(name asc) { _id, name, "slug": slug.current, icon }
  }
`
