import { groq } from 'next-sanity'

const HOTEL_FIELDS = groq`
  _id,
  name,
  "slug": slug.current,
  country->{ _id, name, "slug": slug.current, continent },
  region->{ _id, name, "slug": slug.current },
  city->{ _id, name, "slug": slug.current },
  experiences,
  description,
  featuredIn,
  review->{ "slug": slug.current, hotelName }
`

export const HOTELS_BY_COUNTRY_QUERY = groq`
  *[_type == "hotel" && country->slug.current == $slug] | order(name asc) { ${HOTEL_FIELDS} }
`

export const HOTELS_BY_REGION_QUERY = groq`
  *[_type == "hotel" && region->slug.current == $slug] | order(name asc) { ${HOTEL_FIELDS} }
`

export const HOTELS_BY_CITY_QUERY = groq`
  *[_type == "hotel" && city->slug.current == $slug] | order(name asc) { ${HOTEL_FIELDS} }
`

export const HOTELS_BY_EXPERIENCE_QUERY = groq`
  *[_type == "hotel" && $exp in experiences] | order(name asc) { ${HOTEL_FIELDS} }
`

export const HOTELS_BY_EXP_AND_COUNTRY_QUERY = groq`
  *[_type == "hotel" && $exp in experiences && country->slug.current == $country] | order(name asc) { ${HOTEL_FIELDS} }
`

export const HOTELS_BY_EXP_AND_CONTINENT_QUERY = groq`
  *[_type == "hotel" && $exp in experiences && country->continent == $continent] | order(name asc) { ${HOTEL_FIELDS} }
`

export const TOP50_RANKING_QUERY = groq`
  *[_type == "ranking" && slug.current == "top-50"][0] {
    title,
    description,
    hotels[]->{ ${HOTEL_FIELDS} }
  }
`

export const TOP25_BOUTIQUE_QUERY = groq`
  *[_type == "hotel" && "Boutique" in experiences] | order(length(featuredIn) desc, name asc) [0...25] { ${HOTEL_FIELDS} }
`

export const HOTEL_COUNT_BY_COUNTRY_QUERY = groq`
  *[_type == "country"] {
    "slug": slug.current, name,
    "count": count(*[_type == "hotel" && references(^._id)])
  }
`

export const HOTEL_COUNT_BY_REGION_QUERY = groq`
  *[_type == "region"] {
    "slug": slug.current, name,
    "count": count(*[_type == "hotel" && references(^._id)])
  }
`

export const HOTEL_COUNT_BY_CITY_QUERY = groq`
  *[_type == "city"] {
    "slug": slug.current, name,
    "count": count(*[_type == "hotel" && references(^._id)])
  }
`

export const ALL_HOTELS_SLIM_QUERY = groq`
  *[_type == "hotel"] {
    experiences,
    country->{ "slug": slug.current, continent }
  }
`

export const RANKINGS_INDEX_QUERY = groq`
{
  "countries": *[_type == "country"] | order(name asc) { "slug": slug.current, name, continent },
  "regions": *[_type == "region"] | order(name asc) { "slug": slug.current, name, "countrySlug": country->slug.current },
  "cities": *[_type == "city"] | order(name asc) { "slug": slug.current, name, "countrySlug": country->slug.current, "regionSlug": region->slug.current },
  "hotels": *[_type == "hotel"] {
    experiences,
    "countrySlug": country->slug.current,
    "regionSlug": region->slug.current,
    "citySlug": city->slug.current,
    "continent": country->continent
  }
}
`
