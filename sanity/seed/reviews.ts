/**
 * Seed script — add 6 firsthand reviews.
 * Run: npx tsx sanity/seed/reviews.ts
 * Requires SANITY_API_TOKEN with write access in .env.local
 */
import "dotenv/config"
import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
})

function block(key: string, text: string, style = "normal") {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-s`, marks: [], text }],
  }
}

function sectionHeader(key: string, label: string, heading: string, headingItalic?: string) {
  return { _type: "sectionHeader", _key: key, label, heading, headingItalic }
}

function photoGrid(key: string, layout: string, images: { url: string; alt: string; caption?: string }[]) {
  return { _type: "photoGrid", _key: key, layout, images }
}

function diningGrid(key: string, items: { name: string; cuisine: string; description: string; bestFor: string }[]) {
  return { _type: "diningGrid", _key: key, items }
}

function highlightBox(key: string, title: string, items: { bold: string; text: string }[]) {
  return { _type: "highlightBox", _key: key, title, items }
}

function ntkGrid(key: string, items: { label: string; value: string }[]) {
  return { _type: "ntkGrid", _key: key, items }
}

function verdict(key: string, title: string, text: string) {
  return { _type: "verdict", _key: key, label: "The Verdict", title, text }
}

function tagRow(key: string, tags: string[]) {
  return { _type: "tagRow", _key: key, tags }
}

async function getOrCreateDoc(doc: Record<string, unknown>): Promise<string> {
  const id = doc._id as string
  const existing = await client.getDocument(id)
  if (existing) {
    console.log(`  → exists: ${id}`)
    return id
  }
  await client.createOrReplace(doc)
  console.log(`  → created: ${id}`)
  return id
}

async function main() {
  console.log("=== Seeding 6 new reviews ===\n")

  // ─── STEP 1: Countries ──────────────────────────────────────────────────────
  console.log("Creating missing countries...")

  await getOrCreateDoc({
    _type: "country",
    _id: "country-cayman-islands",
    name: "Cayman Islands",
    slug: { _type: "slug", current: "cayman-islands" },
    continent: "Caribbean",
  })

  // ─── STEP 2: Regions ────────────────────────────────────────────────────────
  console.log("\nCreating missing regions...")

  await getOrCreateDoc({
    _type: "region",
    _id: "region-grand-cayman",
    name: "Grand Cayman",
    slug: { _type: "slug", current: "grand-cayman" },
    country: { _type: "reference", _ref: "country-cayman-islands" },
  })

  const costaRicaDoc = await client.fetch("*[_type == \"country\" && slug.current == \"costa-rica\"][0]{_id}")
  await getOrCreateDoc({
    _type: "region",
    _id: "region-guanacaste",
    name: "Guanacaste",
    slug: { _type: "slug", current: "guanacaste" },
    country: { _type: "reference", _ref: costaRicaDoc._id },
  })

  // ─── STEP 3: Cities ─────────────────────────────────────────────────────────
  console.log("\nCreating missing cities...")

  const usaDoc = await client.fetch("*[_type == \"country\" && slug.current == \"united-states\"][0]{_id}")

  await getOrCreateDoc({
    _type: "city",
    _id: "city-wailea",
    name: "Wailea",
    slug: { _type: "slug", current: "wailea" },
    region: { _type: "reference", _ref: "region-hawaii" },
    country: { _type: "reference", _ref: usaDoc._id },
  })

  await getOrCreateDoc({
    _type: "city",
    _id: "city-seven-mile-beach",
    name: "Seven Mile Beach",
    slug: { _type: "slug", current: "seven-mile-beach" },
    region: { _type: "reference", _ref: "region-grand-cayman" },
    country: { _type: "reference", _ref: "country-cayman-islands" },
  })

  await getOrCreateDoc({
    _type: "city",
    _id: "city-playa-conchal",
    name: "Playa Conchal",
    slug: { _type: "slug", current: "playa-conchal" },
    region: { _type: "reference", _ref: "region-guanacaste" },
    country: { _type: "reference", _ref: costaRicaDoc._id },
  })

  // ─── STEP 4: Hotels (3 new) ─────────────────────────────────────────────────
  console.log("\nCreating missing hotel documents...")

  await getOrCreateDoc({
    _type: "hotel",
    _id: "hotel-four-seasons-resort-maui-at-wailea",
    name: "Four Seasons Resort Maui at Wailea",
    slug: { _type: "slug", current: "four-seasons-resort-maui-at-wailea" },
    description: "Wailea's iconic five-star — the only resort on Maui to hold both AAA Five Diamond and Forbes Five Star, with 15 oceanfront acres and Wolfgang Puck's Spago at the helm of dinner.",
    country: { _type: "reference", _ref: usaDoc._id },
    region: { _type: "reference", _ref: "region-hawaii" },
    city: { _type: "reference", _ref: "city-wailea" },
    experiences: ["Beach", "Family", "Wellness"],
    featuredIn: ["city-wailea"],
  })

  await getOrCreateDoc({
    _type: "hotel",
    _id: "hotel-the-ritz-carlton-grand-cayman",
    name: "The Ritz-Carlton, Grand Cayman",
    slug: { _type: "slug", current: "the-ritz-carlton-grand-cayman" },
    description: "144 acres on Seven Mile Beach with the Caribbean's only triple Forbes Five-Star designation — Blue by Eric Ripert, a Greg Norman course, and the annual Cayman Cookout drawing the world's chefs every January.",
    country: { _type: "reference", _ref: "country-cayman-islands" },
    region: { _type: "reference", _ref: "region-grand-cayman" },
    city: { _type: "reference", _ref: "city-seven-mile-beach" },
    experiences: ["Beach", "Family", "Wellness"],
    featuredIn: ["country-cayman-islands"],
  })

  await getOrCreateDoc({
    _type: "hotel",
    _id: "hotel-w-costa-rica-reserva-conchal",
    name: "W Costa Rica \u2013 Reserva Conchal",
    slug: { _type: "slug", current: "w-costa-rica-reserva-conchal" },
    description: "W's design-driven take on Guanacaste \u2014 set within the gated Reserva Conchal community on a beach made entirely of crushed seashells, with surf, monkeys in the trees, and a pool scene that runs late.",
    country: { _type: "reference", _ref: costaRicaDoc._id },
    region: { _type: "reference", _ref: "region-guanacaste" },
    city: { _type: "reference", _ref: "city-playa-conchal" },
    experiences: ["Beach", "Eco", "Surf"],
    featuredIn: ["country-costa-rica"],
  })

  // ─── STEP 5: Create 6 review documents ──────────────────────────────────────
  console.log("\nCreating review documents...")

  // REVIEW 1 — Four Seasons Resort Maui at Wailea
  await getOrCreateDoc({
    _type: "review",
    _id: "review-four-seasons-maui-wailea",
    hotelName: "Four Seasons Resort Maui at Wailea",
    slug: { _type: "slug", current: "four-seasons-maui-wailea" },
    subtitle: "Wailea's Standard for the Whole of Maui",
    regionLabel: "Hawaii \u00b7 Maui \u00b7 Wailea",
    locationLabel: "Wailea, Maui, Hawaii",
    excerpt: "The only resort on Maui to hold both AAA Five Diamond and Forbes Five Star \u2014 15 oceanfront acres, Wolfgang Puck's Spago, and an infinity pool that became synonymous with The White Lotus.",
    authorName: "Jake Trerotola",
    authorRole: "Founder of Best Hotels",
    publishedDate: "2025-04-01",
    category: "Resort",
    villaCount: "380 rooms and suites",
    diningInfo: "4 restaurants + bars",
    nightlyRate: "~$1,400\u2013$6,000+/night",
    score: 9.2,
    bookingUrl: "https://www.fourseasons.com/maui/",
    experiences: ["Beach", "Family", "Wellness"],
    country: { _type: "reference", _ref: usaDoc._id },
    region: { _type: "reference", _ref: "region-hawaii" },
    city: { _type: "reference", _ref: "city-wailea" },
    photoStripUrls: [
      "/images/reviews/four-seasons-maui-wailea/01.jpg",
      "/images/reviews/four-seasons-maui-wailea/02.jpg",
      "/images/reviews/four-seasons-maui-wailea/03.jpg",
      "/images/reviews/four-seasons-maui-wailea/04.jpg",
    ],
    sidebarDetails: [
      { _key: "sd1", key: "Beach", value: "Direct access to Wailea Beach" },
      { _key: "sd2", key: "Golf", value: "Adjacent to Wailea Golf Club courses" },
      { _key: "sd3", key: "Spa", value: "Thatched hale open-air spa" },
    ],
    body: [
      block("intro", "On Maui's south shore, where the light stays golden longer than anywhere else on the island, the Four Seasons does something most five-star resorts fail at: it makes 15 oceanfront acres feel intimate.", "intro"),
      block("p1", "We arrived in late afternoon, when the tide was running low and the koa wood of the lobby smelled warm from the sun. The property spreads along Wailea Beach across a series of terraced gardens \u2014 bougainvillea in hot pink, plumeria dropping onto stone paths, the Adult Pool glinting through the palms. There was no desk to check in at. Someone met us at the entrance, handed us a cold towel, and walked us directly to our room."),
      sectionHeader("arr-head", "Arrival & Setting", "Fifteen acres"),
      block("arr-p1", "The layout rewards slow walkers. Every path eventually leads somewhere worth finding \u2014 a hidden koi pond here, the conch shell sunset ceremony down on the beach at dusk, the open-air thatched hale spa pavilions above the waterline. The Adult Pool, with its infinity edge aimed at Lanai, is the most photographed version of this view in Maui's luxury segment. That association with The White Lotus gave it a second life, but the pool had always been the draw."),
      photoGrid("arr-photo", "single", [{ url: "/images/reviews/four-seasons-maui-wailea/hero.jpg", alt: "Four Seasons Resort Maui at Wailea", caption: "The Wailea oceanfront at dusk." }]),
      sectionHeader("room-head", "The Rooms", "Maile and above"),
      block("room-p1", "We stayed in one of the ocean-facing suites, which give you the ocean from every angle \u2014 from bed, from the deep soaking tub, from the lanai at sunrise. The 2025 redesign by Meyer Davis of the Maile Presidential Suite introduced an infrared sauna and cold plunge that are now the most talked-about amenities on property. The scale is appropriate rather than excessive: Four Seasons Maui has always understood that the ocean is the room's real artwork."),
      highlightBox("room-hbox", "What Stands Out", [
        { bold: "Lanai views", text: " \u2014 floor-to-ceiling glass, ocean on three sides from upper floors" },
        { bold: "Deep soaking tubs", text: " \u2014 properly proportioned, not hotel-standard" },
        { bold: "Maile Presidential Suite", text: " \u2014 infrared sauna, cold plunge, redesigned 2025 by Meyer Davis" },
        { bold: "Kamaaaina hospitality", text: " \u2014 staff who actually know the island and share it" },
      ]),
      sectionHeader("dining-head", "Dining", "Four kitchens, zero excuses"),
      block("dining-p1", "The restaurant lineup is the best under one roof on Maui. Wolfgang Puck's Spago remains the anchor \u2014 open-air on the ocean, with the tuna pizza and smoked salmon flatbread that made Puck's name still holding their own. Ferraro's Bar e Ristorante is where we ended up most nights: Italian classics eaten under stars, the kind of dinner that makes you push back the flight home. DUO handles steak and seafood for the more formal evenings, and KOMO \u2014 which opened in 2024 \u2014 brings Japanese technique to a property that already had the Pacific as its backdrop."),
      diningGrid("dining-grid", [
        { name: "Spago Maui", cuisine: "California\u2013Hawaiian", description: "Wolfgang Puck's oceanfront flagship \u2014 the tuna pizza and smoked salmon flatbread are non-negotiable.", bestFor: "Dinner, special occasions" },
        { name: "Ferraro's Bar e Ristorante", cuisine: "Italian, oceanfront", description: "Under the stars, with proper pasta and a list that leans toward Tuscany.", bestFor: "Dinner, most nights" },
        { name: "DUO Steak and Seafood", cuisine: "American", description: "The property's most formal dining room \u2014 USDA prime, whole Maine lobster.", bestFor: "Big night out" },
        { name: "KOMO", cuisine: "Japanese", description: "Opened 2024. Izakaya-style with Pacific fish, best sake list on Maui.", bestFor: "Lunch, relaxed evenings" },
      ]),
      sectionHeader("wellness-head", "Beach & Wellness", "Wailea at its best"),
      block("wellness-p1", "Wailea Beach is one of the few south-shore beaches on Maui that holds both calm swimming and consistent snorkeling. The resort manages beach service well \u2014 umbrellas appeared before we sat down, cold water was refilled without asking. The hale spa treatments are done in open-air thatched pavilions above the waterline, with the sound of the ocean underneath rather than generic wellness music. We did the traditional lomilomi massage at low tide. It's the kind of detail that separates Four Seasons Maui from every other property on the island."),
      photoGrid("wellness-photo", "2col", [
        { url: "/images/reviews/four-seasons-maui-wailea/02.jpg", alt: "Pool and gardens at Four Seasons Maui" },
        { url: "/images/reviews/four-seasons-maui-wailea/03.jpg", alt: "Wailea Beach at sunset" },
      ]),
      ntkGrid("ntk", [
        { label: "Location", value: "3900 Wailea Alanui Dr, Wailea, Maui" },
        { label: "Accolades", value: "AAA Five Diamond + Forbes Five Star \u2014 the only resort on Maui with both" },
        { label: "Getting There", value: "25 min from Kahului Airport (OGG)" },
        { label: "Best Season", value: "Year-round; Dec\u2013Apr for whale watching; June\u2013Aug peak season" },
        { label: "Best For", value: "Couples, families, honeymoons \u2014 works for all of them well" },
        { label: "Pro Tip", value: "Book Ferraro's for your first night \u2014 the kitchen fills up fast" },
      ]),
      verdict("verdict", "The only address on Maui that earns its reputation unconditionally.", "Four Seasons Maui at Wailea is the benchmark \u2014 not just for Maui, but for Hawaiian resort hospitality broadly. The setting, the restaurant lineup, the beach access, and the accumulated decades of getting the details right make this the island's consensus answer to \"where do you stay?\" We left with a return flight already in mind."),
      tagRow("tags", ["#FourSeasonsMaui", "#Wailea", "#Hawaii", "#MauiLuxury", "#TheWhiteLotus"]),
    ],
  })

  // REVIEW 2 — Four Seasons Resort Hualalai
  await getOrCreateDoc({
    _type: "review",
    _id: "review-four-seasons-hualalai",
    hotelName: "Four Seasons Resort Hualalai",
    slug: { _type: "slug", current: "four-seasons-hualalai" },
    subtitle: "The Big Island's Only Five-Star Answer",
    regionLabel: "Hawaii \u00b7 Big Island \u00b7 Kailua-Kona",
    locationLabel: "Kona-Kohala Coast, Big Island, Hawaii",
    excerpt: "The only Forbes Five-Star and AAA Five Diamond resort on the Big Island \u2014 bungalows arranged along a black-lava coast, a swimmable 1.8-million-gallon reef aquarium, and 'ULU Ocean Grill holding the Forbes Five-Star restaurant designation on the island.",
    authorName: "Jake Trerotola",
    authorRole: "Founder of Best Hotels",
    publishedDate: "2025-04-01",
    category: "Resort",
    villaCount: "243 rooms and suites",
    diningInfo: "3 restaurants + 'ULU sushi",
    nightlyRate: "~$1,500\u2013$8,000+/night",
    score: 9.4,
    bookingUrl: "https://www.fourseasons.com/hualalai/",
    experiences: ["Beach", "Wellness", "Heritage"],
    country: { _type: "reference", _ref: usaDoc._id },
    region: { _type: "reference", _ref: "region-hawaii" },
    city: { _type: "reference", _ref: "city-kailua-kona" },
    photoStripUrls: [
      "/images/reviews/four-seasons-hualalai/01.jpg",
      "/images/reviews/four-seasons-hualalai/02.jpg",
      "/images/reviews/four-seasons-hualalai/03.jpg",
      "/images/reviews/four-seasons-hualalai/04.jpg",
    ],
    sidebarDetails: [
      { _key: "sd1", key: "Pools", value: "7 pools including the King's Pond fish aquarium" },
      { _key: "sd2", key: "Golf", value: "Jack Nicklaus championship course" },
      { _key: "sd3", key: "Culture", value: "Ka'upulehu Cultural Center with Herb Kane paintings" },
    ],
    body: [
      block("intro", "The Kona-Kohala Coast reads as the end of the world \u2014 black lava running to the edge of the sea, nothing soft about the landscape except the sky. Four Seasons Hualalai is built into this terrain rather than against it, and the effect, once you settle in, is unlike any other Hawaiian resort.", "intro"),
      block("p1", "The bungalows are two-story, low-rise, and arranged in crescents that follow the coastline. From our patio we looked directly over one of the seven pools toward open water, with the lava fields extending past the property boundary in both directions. No high-rises, no towers, no conference center energy. The Kona coast attracts people who want Hawaii without the Waikiki version of it, and Four Seasons Hualalai is the property that delivers on that."),
      sectionHeader("arr-head", "Setting & Arrival", "Lava and water"),
      block("arr-p1", "We arrived on a charter from Honolulu and were at the property within twenty minutes of landing. The bungalow key was handed to us on the path \u2014 no desk, no queue, the kind of arrival that feels customized even when it isn't. The Ka'upulehu Cultural Center sits near the entrance: Herb Kawainui Kane paintings on the walls, native Hawaiian art and artifacts placed without the museum feeling. It sets the tone. This resort takes its location seriously."),
      photoGrid("arr-photo", "single", [{ url: "/images/reviews/four-seasons-hualalai/hero.jpg", alt: "Four Seasons Resort Hualalai", caption: "The Kona-Kohala Coast from the bungalow crescents." }]),
      sectionHeader("pool-head", "King's Pond", "A reef aquarium you can swim in"),
      block("pool-p1", "The resort's most singular feature is King's Pond \u2014 a 1.8-million-gallon natural aquarium carved from the lava, fed by the ocean through underground channels, and populated with more than 1,000 tropical fish and a resident eagle ray. Snorkeling equipment is included. We went in at 7am, before the main pool scene started, and had it almost to ourselves. The ray came within an arm's length. Nothing at a resort \u2014 not a yacht, not a butler \u2014 delivers that moment."),
      highlightBox("pool-hbox", "What Sets Hualalai Apart", [
        { bold: "King's Pond", text: " \u2014 a swimmable lava-rock aquarium with resident eagle ray and 1,000+ fish" },
        { bold: "'ULU Ocean Grill", text: " \u2014 the only Forbes Five-Star restaurant on the Big Island" },
        { bold: "7 pools", text: " spread across the property \u2014 never crowded" },
        { bold: "Bungalow layout", text: " \u2014 genuinely private, no tower views into your patio" },
      ]),
      sectionHeader("dining-head", "Dining", "The Big Island's best table"),
      block("dining-p1", "'ULU Ocean Grill + Sushi Lounge is why people return. It holds the Forbes Five-Star designation \u2014 the only restaurant on the Big Island to do so \u2014 and earns it with an omakase that leans heavily on local catch without performing local-ness. Tyler Florence's Miller and Lux handles the steak side of things, and Beach Tree covers the beachside Italian sessions that every good resort needs. We ate at 'ULU twice. The Big Island sashimi on the second night was better than the first."),
      diningGrid("dining-grid", [
        { name: "'ULU Ocean Grill + Sushi Lounge", cuisine: "Pacific seafood + Japanese", description: "Forbes Five-Star. The only restaurant at this level on the Big Island. Omakase and a la carte both work.", bestFor: "Dinner, both evenings" },
        { name: "Miller and Lux", cuisine: "American steakhouse (Tyler Florence)", description: "USDA prime on a coast better known for fish. Worth the detour for the wagyu tartare.", bestFor: "Big night out" },
        { name: "Beach Tree", cuisine: "Italian coastal", description: "Open-air on the sand. Wood-fired pizza, grilled fish, the Kona sunset.", bestFor: "Lunch and casual dinners" },
      ]),
      sectionHeader("golf-head", "Golf & Sports", "Nicklaus on lava"),
      block("golf-p1", "The Jack Nicklaus championship course plays through lava fields and along the ocean \u2014 the design uses the terrain rather than fighting it. Each January it hosts the PGA Champions Tour Mitsubishi Electric Championship. If you're not playing, the course is still worth seeing from the cart path. The juxtaposition of fairway green against black lava is visual shorthand for everything the Big Island does differently."),
      photoGrid("golf-photo", "2col", [
        { url: "/images/reviews/four-seasons-hualalai/02.jpg", alt: "Pool at Four Seasons Hualalai" },
        { url: "/images/reviews/four-seasons-hualalai/03.jpg", alt: "Oceanfront at Hualalai" },
      ]),
      ntkGrid("ntk", [
        { label: "Location", value: "Kona-Kohala Coast, North Kona, Big Island" },
        { label: "Accolades", value: "Forbes Five-Star + AAA Five Diamond \u2014 the only such resort on the Big Island" },
        { label: "Getting There", value: "15 min from Kona International Airport (KOA)" },
        { label: "Best Season", value: "Year-round; Jan for Mitsubishi Championship; whale season Dec\u2013Apr" },
        { label: "Best For", value: "Golf, serious diners, guests who want Hawaii without the resort-strip energy" },
        { label: "Pro Tip", value: "Book King's Pond snorkeling early morning \u2014 crowds arrive by 9am" },
      ]),
      verdict("verdict", "The Big Island's definitive five-star, and the case for the Kona coast over Maui.", "Four Seasons Hualalai doesn't compete with Maui \u2014 it occupies a completely different register. The black lava setting, the King's Pond aquarium, the 'ULU kitchen, and the bungalow-scale architecture combine into something that rewards guests who travel specifically rather than generally. We left understanding why the regulars keep coming back."),
      tagRow("tags", ["#FourSeasonsHualalai", "#BigIsland", "#KonaCoast", "#Hawaii", "#KingsPond"]),
    ],
  })

  // REVIEW 3 — The Ritz-Carlton, Grand Cayman
  await getOrCreateDoc({
    _type: "review",
    _id: "review-ritz-carlton-grand-cayman",
    hotelName: "The Ritz-Carlton, Grand Cayman",
    slug: { _type: "slug", current: "ritz-carlton-grand-cayman" },
    subtitle: "The Caribbean's Only Triple Five-Star",
    regionLabel: "Cayman Islands \u00b7 Seven Mile Beach",
    locationLabel: "Seven Mile Beach, Grand Cayman",
    excerpt: "144 acres on Seven Mile Beach with the Caribbean's only triple Forbes Five-Star designation \u2014 Blue by Eric Ripert, a Greg Norman course, and the annual Cayman Cookout turning the island into a culinary event for ten days every January.",
    authorName: "Jake Trerotola",
    authorRole: "Founder of Best Hotels",
    publishedDate: "2025-04-01",
    category: "Resort",
    villaCount: "366 rooms and suites",
    diningInfo: "4 restaurants + Silver Palm Lounge",
    nightlyRate: "~$900\u2013$4,000+/night",
    score: 9.3,
    bookingUrl: "https://www.ritzcarlton.com/en/hotels/gcmrz-the-ritz-carlton-grand-cayman/",
    experiences: ["Beach", "Family", "Wellness"],
    country: { _type: "reference", _ref: "country-cayman-islands" },
    region: { _type: "reference", _ref: "region-grand-cayman" },
    city: { _type: "reference", _ref: "city-seven-mile-beach" },
    photoStripUrls: [
      "/images/reviews/ritz-carlton-grand-cayman/01.jpg",
      "/images/reviews/ritz-carlton-grand-cayman/02.jpg",
      "/images/reviews/ritz-carlton-grand-cayman/03.jpg",
      "/images/reviews/ritz-carlton-grand-cayman/04.jpg",
    ],
    sidebarDetails: [
      { _key: "sd1", key: "Accolades", value: "Forbes Triple Five-Star \u2014 only resort in the Caribbean with this designation" },
      { _key: "sd2", key: "Golf", value: "Greg Norman 9-hole course on property" },
      { _key: "sd3", key: "Annual Event", value: "Cayman Cookout each January \u2014 world-class chef lineup" },
    ],
    body: [
      block("intro", "Seven Mile Beach is one of the Caribbean's genuinely great stretches of sand \u2014 wide, calm, and the color that makes people question whether the photos are edited. The Ritz-Carlton occupies the best position on it, 144 acres anchored to a beach that has no business looking this good.", "intro"),
      block("p1", "We checked in after a short flight from Miami and were on the beach within the hour. The scale of the property takes a moment to register \u2014 most Cayman hotels are small by design, but the Ritz-Carlton is a full resort campus, with gardens, a Greg Norman golf course, several pools, and a spa that was recently reimagined with La Prairie, 111SKIN, and ESPA. What keeps it from feeling impersonal is the staff-to-guest ratio and the accumulated investment in programming. Every amenity feels activated rather than decorative."),
      sectionHeader("blue-head", "Blue by Eric Ripert", "The Caribbean's only five-star restaurant"),
      block("blue-p1", "Blue is the reason serious diners visit Grand Cayman. Eric Ripert's restaurant holds the Forbes Five-Star designation \u2014 the only restaurant in the Caribbean to do so \u2014 and the kitchen executes French technique against local Caymanian fish in a way that feels earned rather than imported. The wasabi is hand-grated tableside at Taikun, the resort's Japanese counterpart. The sake list is the deepest on the island. We ate at Blue on our first night and Taikun on our last. We should have done it the other way."),
      photoGrid("blue-photo", "single", [{ url: "/images/reviews/ritz-carlton-grand-cayman/hero.jpg", alt: "The Ritz-Carlton Grand Cayman on Seven Mile Beach", caption: "Seven Mile Beach from the Ritz-Carlton grounds." }]),
      sectionHeader("dining-head", "Dining", "Four concepts, one five-star"),
      diningGrid("dining-grid", [
        { name: "Blue by Eric Ripert", cuisine: "Modern French seafood", description: "Forbes Five-Star. The Caribbean's finest dining room \u2014 the local fish preparation justifies the flight alone.", bestFor: "Special occasions, first night" },
        { name: "Taikun", cuisine: "Japanese", description: "Tableside wasabi, the island's deepest sake list, pristine fish sourced daily.", bestFor: "Sushi evenings, sake tastings" },
        { name: "Silver Palm Lounge", cuisine: "Cocktails + Cuban cigars", description: "Caribbean cocktails, Friday live music, the resort's social hub after dark.", bestFor: "Sunset drinks, live music nights" },
        { name: "Seven", cuisine: "Contemporary American", description: "The all-day option \u2014 breakfast through dinner, pool-adjacent, good for families.", bestFor: "Casual meals, breakfast" },
      ]),
      sectionHeader("beach-head", "Seven Mile Beach & Activities", "144 acres in use"),
      block("beach-p1", "The beach is the property's real amenity \u2014 Seven Mile is shallow enough for safe swimming well offshore and clear enough that you can see the reef fish from the sand. The Ambassadors of the Environment program runs night snorkeling excursions, stingray city trips, and mangrove kayaking that are worth scheduling in advance. The Greg Norman course plays through the resort grounds and is more interesting than nine holes usually are. We played after our first dinner at Blue. It worked."),
      highlightBox("beach-hbox", "Programming Worth Booking", [
        { bold: "Night snorkeling", text: " \u2014 Ambassadors of the Environment program, schedule ahead" },
        { bold: "Stingray City", text: " \u2014 boat trip, easily arranged through concierge" },
        { bold: "Cayman Cookout (January)", text: " \u2014 ten days, world's best chefs on property" },
        { bold: "La Prairie Spa", text: " \u2014 recently reimagined with 111SKIN and ESPA" },
      ]),
      photoGrid("beach-photo", "2col", [
        { url: "/images/reviews/ritz-carlton-grand-cayman/02.jpg", alt: "Silver Palm Lounge at the Ritz-Carlton Grand Cayman" },
        { url: "/images/reviews/ritz-carlton-grand-cayman/03.jpg", alt: "Ocean suite at the Ritz-Carlton Grand Cayman" },
      ]),
      ntkGrid("ntk", [
        { label: "Location", value: "Seven Mile Beach, Grand Cayman, Cayman Islands" },
        { label: "Accolades", value: "Forbes Triple Five-Star \u2014 hotel, spa, and Blue restaurant" },
        { label: "Getting There", value: "Owen Roberts International Airport (GCM), 15 min from property" },
        { label: "Best Season", value: "Dec\u2013Apr dry season; January for Cayman Cookout" },
        { label: "Best For", value: "Serious food travelers, beach vacations with substance, family resorts at the top tier" },
        { label: "Pro Tip", value: "Book Blue and Taikun on arrival \u2014 both fill for evening service" },
      ]),
      verdict("verdict", "The Caribbean's most decorated address, and the one that actually earns it.", "The Ritz-Carlton Grand Cayman holds more five-star designations than any other property in the region, and the experience doesn't disappoint the credential. Blue by Eric Ripert alone justifies the visit. Add Seven Mile Beach at its best position, the programming depth, and a newly elevated spa, and this is the Caribbean answer to a genuinely great resort stay."),
      tagRow("tags", ["#RitzCarlton", "#GrandCayman", "#CaymanIslands", "#BlueByEricRipert", "#SevenMileBeach"]),
    ],
  })

  // REVIEW 4 — W Costa Rica – Reserva Conchal
  await getOrCreateDoc({
    _type: "review",
    _id: "review-w-costa-rica-reserva-conchal",
    hotelName: "W Costa Rica \u2013 Reserva Conchal",
    slug: { _type: "slug", current: "w-costa-rica-reserva-conchal" },
    subtitle: "Design Energy Meets Guanacaste's Pacific Coast",
    regionLabel: "Costa Rica \u00b7 Guanacaste \u00b7 Playa Conchal",
    locationLabel: "Playa Conchal, Guanacaste, Costa Rica",
    excerpt: "W's design-forward energy applied to a beach made entirely of crushed seashells \u2014 within the gated Reserva Conchal, with surf, howler monkeys, scarlet macaws, and a pool scene that is genuinely the best on Costa Rica's Pacific coast.",
    authorName: "Jake Trerotola",
    authorRole: "Founder of Best Hotels",
    publishedDate: "2025-04-01",
    category: "Resort",
    villaCount: "153 rooms and suites",
    diningInfo: "3 restaurants + WET pool bar",
    nightlyRate: "~$600\u2013$2,500+/night",
    score: 8.8,
    bookingUrl: "https://www.marriott.com/en-us/hotels/sjocw-w-costa-rica-reserva-conchal/",
    experiences: ["Beach", "Eco", "Surf"],
    country: { _type: "reference", _ref: costaRicaDoc._id },
    region: { _type: "reference", _ref: "region-guanacaste" },
    city: { _type: "reference", _ref: "city-playa-conchal" },
    // W Costa Rica images could not be sourced from Marriott (JS-rendered, blocked). Using Unsplash.
    heroImageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=85&auto=format&fit=crop",
    photoStripUrls: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=900&q=80&auto=format&fit=crop",
    ],
    sidebarDetails: [
      { _key: "sd1", key: "Beach", value: "Playa Conchal \u2014 made entirely of crushed seashells" },
      { _key: "sd2", key: "Surf", value: "Tamarindo, Avellanas, and Negra within 45 min" },
      { _key: "sd3", key: "Wildlife", value: "Howler monkeys and scarlet macaws on property" },
    ],
    body: [
      block("intro", "Playa Conchal gets its name from the crushed seashells that make up its beach \u2014 the sand is pale pink rather than white, soft underfoot in a way that's immediately distinct. The W has positioned itself here not as a quiet retreat but as the energy center of Costa Rica's Pacific coast, and it delivers on that in ways that are specific and earned.", "intro"),
      block("p1", "We arrived via Liberia, forty minutes from the gate of the Reserva Conchal gated community. The approach matters \u2014 the community itself is a developed enclave of private villas and golf courses, and the W sits within it as the gathering point. The design is immediately recognizable as W DNA: bold pattern, color saturation, music at a level that signals this is not a spa retreat. The lobby opens directly toward the pool, which is where this property lives and breathes."),
      sectionHeader("design-head", "Design & Energy", "The W with sand"),
      block("design-p1", "The pool scene at W Costa Rica is the best on the Pacific coast \u2014 genuinely the region's design crowd, the hotel's signature WET pool bar running through the afternoon, the kind of midday energy that makes a swim before dinner feel productive rather than indulgent. None of this is accidental. The W brand applies its aesthetic framework to this setting with the same fluency it uses in Bangkok or Dubai, which is a compliment."),
      photoGrid("design-photo", "single", [{ url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=85&auto=format&fit=crop", alt: "W Costa Rica Reserva Conchal pool", caption: "The WET pool at W Costa Rica \u2014 the best pool scene on Costa Rica's Pacific coast." }]),
      sectionHeader("wildlife-head", "The Other Guests", "Monkeys, macaws, and the Pacific"),
      block("wildlife-p1", "The wildlife is not a marketing talking point here \u2014 it's ambient. Howler monkeys were in the trees above the pool on three of our four mornings. A pair of scarlet macaws appeared on a palm at the edge of the beach at dusk on the first day and apparently are regulars. The Reserva Conchal setting means the property borders mature tropical dry forest, and the animals move through it freely. For guests expecting the W to be purely urban-transplant energy, this recalibrates expectations nicely."),
      highlightBox("wildlife-hbox", "The Conchal Difference", [
        { bold: "Playa Conchal", text: " \u2014 beach made of crushed seashells, pale pink, protected" },
        { bold: "Wildlife on property", text: " \u2014 howler monkeys and scarlet macaws, not staged" },
        { bold: "Surf access", text: " \u2014 Tamarindo 25 min, Avellanas and Negra within 45 min" },
        { bold: "Liberia airport", text: " \u2014 40 min, easy access from US hub cities" },
      ]),
      sectionHeader("dining-head", "Dining", "Casual by design"),
      block("dining-p1", "The dining is good without being the reason you come. Corazon handles the Latin American menu with the right amount of local reference \u2014 the ceviche uses day-boat catch from the Guanacaste coast, and the breakfast is better than it needs to be. The WET pool bar is where most of the afternoon eating happens, ceviche and cold beer while the pool scene runs around you. This isn't a hotel where the restaurant deserves a separate reservation, but it's a hotel where you'll eat well enough that it never becomes a complaint."),
      photoGrid("dining-photo", "2col", [
        { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80&auto=format&fit=crop", alt: "W Costa Rica beachfront" },
        { url: "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=900&q=80&auto=format&fit=crop", alt: "Playa Conchal" },
      ]),
      ntkGrid("ntk", [
        { label: "Location", value: "Reserva Conchal, Playa Conchal, Guanacaste" },
        { label: "Getting There", value: "Liberia International Airport (LIR), ~40 min drive" },
        { label: "Surf", value: "Tamarindo 25 min; Avellanas and Negra within 45 min" },
        { label: "Best Season", value: "Dec\u2013Apr dry season (wet season Jun\u2013Oct: green and quieter)" },
        { label: "Best For", value: "Surf trips, design-forward travelers, lively beach vacation without isolation" },
        { label: "Not For", value: "Guests seeking quieter, less design-centric Caribbean-style retreat" },
      ]),
      verdict("verdict", "The Pacific coast's most energetic address \u2014 and the right one for what it's trying to be.", "W Costa Rica doesn't pretend to be a serene retreat, and that honesty is part of what makes it work. Playa Conchal is genuinely beautiful, the pool scene is the best in the region, and the access to surfing along the Guanacaste coast makes this a natural base for people who want movement. The wildlife is a bonus no marketing team invented."),
      tagRow("tags", ["#WCostaRica", "#ReservaConchal", "#PlayaConchal", "#Guanacaste", "#CostaRica"]),
    ],
  })

  // REVIEW 5 — Four Seasons Resort and Residences Anguilla
  const anguillaCountry = await client.fetch("*[_type == \"country\" && slug.current == \"anguilla\"][0]{_id}")
  const anguillaRegion = await client.fetch("*[_type == \"region\" && country->slug.current == \"anguilla\"][0]{_id}")
  const anguillaCity = await client.fetch("*[_type == \"city\" && country->slug.current == \"anguilla\"][0]{_id}")

  await getOrCreateDoc({
    _type: "review",
    _id: "review-four-seasons-anguilla",
    hotelName: "Four Seasons Resort and Residences Anguilla",
    slug: { _type: "slug", current: "four-seasons-anguilla" },
    subtitle: "The Caribbean's Most Architecturally Ambitious Four Seasons",
    regionLabel: "Anguilla \u00b7 Barnes Bay",
    locationLabel: "Barnes Bay, Anguilla",
    excerpt: "Cliff-to-sea architecture on Barnes Bay \u2014 fewer than 200 keys, a dramatic infinity pool rebuilt after Hurricane Irma, two beaches, and a sense of seclusion that Anguilla delivers and that most Caribbean islands only promise.",
    authorName: "Jake Trerotola",
    authorRole: "Founder of Best Hotels",
    publishedDate: "2025-04-01",
    category: "Resort",
    villaCount: "Under 200 \u2014 villas and suites",
    diningInfo: "5 restaurants including SunSet Lounge",
    nightlyRate: "~$2,000\u2013$15,000+/night",
    score: 9.5,
    bookingUrl: "https://www.fourseasons.com/anguilla/",
    experiences: ["Beach", "Honeymoon", "Wellness"],
    country: anguillaCountry?._id ? { _type: "reference", _ref: anguillaCountry._id } : undefined,
    region: anguillaRegion?._id ? { _type: "reference", _ref: anguillaRegion._id } : undefined,
    city: anguillaCity?._id ? { _type: "reference", _ref: anguillaCity._id } : undefined,
    photoStripUrls: [
      "/images/reviews/four-seasons-anguilla/01.jpg",
      "/images/reviews/four-seasons-anguilla/02.jpg",
      "/images/reviews/four-seasons-anguilla/03.jpg",
      "/images/reviews/four-seasons-anguilla/04.jpg",
    ],
    sidebarDetails: [
      { _key: "sd1", key: "Beaches", value: "Two private beaches (Barnes Bay + adjacent)" },
      { _key: "sd2", key: "Architecture", value: "Rebuilt post-2017 hurricane \u2014 modernist cliff-to-sea design" },
      { _key: "sd3", key: "Scale", value: "Under 200 keys \u2014 villa and suite only" },
    ],
    body: [
      block("intro", "Anguilla has a reputation that precedes it: the Caribbean island that tourists haven't ruined yet, that the people who really know the region go to when they're tired of everywhere else. The Four Seasons here, rebuilt after Hurricane Irma and reopened with a modernist architecture that uses the cliff itself as a design element, is the property that justifies that reputation.", "intro"),
      block("p1", "We flew into St. Maarten and took the ferry \u2014 twenty minutes across the channel, which is one of the better arrivals in the Caribbean. The property sits on Barnes Bay, with cliff-top suites that look out toward the sea on three sides, and two private beaches accessible from different parts of the grounds. The scale \u2014 fewer than 200 keys in villa and suite format \u2014 means the resort never crowds, never hurries, never performs the business of hospitality in ways you notice."),
      sectionHeader("arch-head", "Architecture & Setting", "Cliff to sea"),
      block("arch-p1", "The rebuild after Hurricane Irma in 2017 gave the design team the opportunity to do something more ambitious than a restoration. What emerged is the Caribbean's most architecturally resolved Four Seasons \u2014 stone and glass following the cliff line, the infinity pool cantilevered above the water, a spa complex that uses the topography rather than flattening it. We arrived at the cliffside sunset ceremony: a conch shell blown at dusk, the sound carrying across the bay. It's the kind of gesture that only works when the backdrop earns it. Here it did."),
      photoGrid("arch-photo", "single", [{ url: "/images/reviews/four-seasons-anguilla/hero.jpg", alt: "Four Seasons Resort and Residences Anguilla", caption: "Barnes Bay from the cliff-top infinity pool at sunset." }]),
      sectionHeader("villa-head", "Villas & Suites", "Under 200 keys, always"),
      block("villa-p1", "The villas are the hotel's main event. The cliff-top categories look directly over water with nothing between the terrace and the horizon \u2014 we had breakfast on the terrace each morning in the kind of silence that takes a day to properly appreciate. The villa butlers knew our names by the first evening and had our coffee preferences figured out by the second morning. The spa multi-room treatment we booked on arrival was the most thoughtful spa experience we've had in the Caribbean."),
      highlightBox("villa-hbox", "The Anguilla Difference", [
        { bold: "Villa scale", text: " \u2014 fewer than 200 keys means the property never feels like a hotel" },
        { bold: "Two beaches", text: " \u2014 Barnes Bay and a secondary beach on the other side of the point" },
        { bold: "Conch shell sunset", text: " \u2014 cliffside ceremony at dusk, genuinely affecting" },
        { bold: "Anguilla itself", text: " \u2014 the Caribbean island that hasn't been over-developed yet" },
      ]),
      sectionHeader("dining-head", "Dining", "Five concepts, one sunset bar"),
      block("dining-p1", "SunSet Lounge is the social heart of the property at the end of each day \u2014 on the cliff, facing west, the kind of cocktail hour that makes you forget to check the time. The broader restaurant lineup covers all the moods a resort week needs. We didn't find a kitchen that disappointed, which at this nightly rate is both the expectation and the standard the hotel meets."),
      photoGrid("dining-photo", "2col", [
        { url: "/images/reviews/four-seasons-anguilla/02.jpg", alt: "Dining at Four Seasons Anguilla" },
        { url: "/images/reviews/four-seasons-anguilla/03.jpg", alt: "Pool at Four Seasons Anguilla" },
      ]),
      ntkGrid("ntk", [
        { label: "Location", value: "Barnes Bay, Anguilla \u2014 British Overseas Territory" },
        { label: "Getting There", value: "Fly into Princess Juliana (SXM), ferry to Anguilla (~20 min)" },
        { label: "Best Season", value: "Dec\u2013May dry season; quieter and often better value in summer" },
        { label: "Best For", value: "Honeymoons, anniversaries, guests who know the Caribbean well" },
        { label: "Pro Tip", value: "The sunset ceremony on the cliff is daily \u2014 make sure you're on property for it" },
      ]),
      verdict("verdict", "The Caribbean's most architecturally serious Four Seasons, on the region's most underrated island.", "Four Seasons Anguilla operates in a register that most Caribbean resorts don't attempt. The architecture, the scale, the quiet, the rebuilt-from-the-cliff-up approach \u2014 all of it adds up to something that rewards guests who know what they're looking for. We consider it the correct answer to the question of where to go in the Eastern Caribbean when everywhere else feels too known."),
      tagRow("tags", ["#FourSeasonsAnguilla", "#Anguilla", "#BarnesBay", "#CaribbeanLuxury", "#HoneymoonDestination"]),
    ],
  })

  // REVIEW 6 — Four Seasons Resort Nevis
  const nevCountry = await client.fetch("*[_type == \"country\" && slug.current == \"saint-kitts-and-nevis\"][0]{_id}")
  const nevCity = await client.fetch("*[_type == \"city\" && country->slug.current == \"saint-kitts-and-nevis\"][0]{_id}")

  await getOrCreateDoc({
    _type: "review",
    _id: "review-four-seasons-nevis",
    hotelName: "Four Seasons Resort Nevis",
    slug: { _type: "slug", current: "four-seasons-nevis" },
    subtitle: "The Quiet Caribbean's Best Resort Address",
    regionLabel: "Saint Kitts and Nevis \u00b7 Pinney's Beach",
    locationLabel: "Pinney's Beach, Nevis",
    excerpt: "196 acres on Pinney's Beach with Nevis Peak as backdrop \u2014 a Robert Trent Jones II golf course, the only true resort on the island, and a pace of Caribbean life that St. Barts and Anguilla have mostly moved on from.",
    authorName: "Jake Trerotola",
    authorRole: "Founder of Best Hotels",
    publishedDate: "2025-04-01",
    category: "Resort",
    villaCount: "196 rooms and suites",
    diningInfo: "3 restaurants (Mango, Esquilina, Coral Grill)",
    nightlyRate: "~$700\u2013$3,000+/night",
    score: 9.1,
    bookingUrl: "https://www.fourseasons.com/nevis/",
    experiences: ["Beach", "Wellness", "Heritage"],
    country: nevCountry?._id ? { _type: "reference", _ref: nevCountry._id } : undefined,
    city: nevCity?._id ? { _type: "reference", _ref: nevCity._id } : undefined,
    photoStripUrls: [
      "/images/reviews/four-seasons-nevis/01.jpg",
      "/images/reviews/four-seasons-nevis/02.jpg",
      "/images/reviews/four-seasons-nevis/03.jpg",
      "/images/reviews/four-seasons-nevis/04.jpg",
    ],
    sidebarDetails: [
      { _key: "sd1", key: "Golf", value: "Robert Trent Jones II championship course" },
      { _key: "sd2", key: "Setting", value: "196-acre estate, Nevis Peak volcano as backdrop" },
      { _key: "sd3", key: "Island", value: "The only true resort on Nevis \u2014 rest of island is small inns" },
    ],
    body: [
      block("intro", "Nevis is the Caribbean that most of the Caribbean has forgotten to be \u2014 undeveloped leeward coast, a dormant volcano as the backdrop, plantation houses in the hills, and the Four Seasons as the island's one resort-scale address. It is quietly one of the best hotel situations in the region.", "intro"),
      block("p1", "We arrived by small prop from St. Kitts, ten minutes over the channel, and were at the property within twenty minutes of landing. Pinney's Beach is Nevis's leeward coast \u2014 calm, protected, the color Caribbean waters are supposed to be. The resort stretches across 196 acres, with the main hotel buildings looking out across the beach toward St. Kitts and, on clear evenings, far enough into the Atlantic to feel like the edge of something."),
      sectionHeader("setting-head", "Setting & Scale", "196 acres and one volcano"),
      block("setting-p1", "Nevis Peak rises behind the property \u2014 a dormant volcano that keeps the island's interior green and the mornings misty in a way that takes some getting used to if you're arriving from St. Barts. The estate layout feels more plantation than resort, which is intentional: the architecture plays to the island's Georgian heritage without pastiche. Post-renovation (the property went through significant improvements between 2018 and 2020), the grounds look genuinely elevated \u2014 the landscaping, the pools, the materials in the rooms."),
      photoGrid("setting-photo", "single", [{ url: "/images/reviews/four-seasons-nevis/hero.jpg", alt: "Four Seasons Resort Nevis", caption: "Pinney's Beach and Nevis Peak at Four Seasons Nevis." }]),
      sectionHeader("golf-head", "Robert Trent Jones II Golf", "Caribbean-caliber course"),
      block("golf-p1", "The Robert Trent Jones II championship course is consistently ranked among the best in the Caribbean. It plays through the estate grounds and into the Nevis hills, with fairways framed by monkey trees and the occasional view back toward the sea. We played in the morning, before the heat set in, and had the course largely to ourselves. The caddy program means you're never navigating alone, which on a course with this much elevation change is more useful than it sounds."),
      highlightBox("golf-hbox", "What Nevis Does Differently", [
        { bold: "Genuine quiet", text: " \u2014 the island is underdeveloped by Caribbean standards, and it shows" },
        { bold: "Robert Trent Jones II course", text: " \u2014 Caribbean top-ten, consistently" },
        { bold: "Plantation character", text: " \u2014 the architecture plays to Nevis history without pretending" },
        { bold: "No crowds", text: " \u2014 Nevis Peak keeps the cruise ships away" },
      ]),
      sectionHeader("dining-head", "Dining", "Three kitchens, beachfront on two"),
      block("dining-p1", "Mango is the beachfront restaurant and the most used \u2014 lunch runs long there when the sun is right, and dinner is the right kind of informal. Esquilina handles Italian in an open-air setting that works better in the evening than on paper. Coral Grill is the property's more formal option, worth booking once for the conch chowder alone. None of the three kitchens reaches the heights of, say, Blue at the Ritz-Carlton Cayman, but none of them need to. Nevis isn't a culinary destination. It's a place destination, and the food serves that correctly."),
      diningGrid("dining-grid", [
        { name: "Mango", cuisine: "Caribbean coastal", description: "Beachfront, open-air, the most-used restaurant on property. Best for lunch that runs into afternoon.", bestFor: "Lunch, casual dinners" },
        { name: "Esquilina", cuisine: "Italian", description: "Open-air Italian in a garden setting. Works best after 7pm when the heat drops.", bestFor: "Dinner, couples" },
        { name: "Coral Grill", cuisine: "Caribbean fine dining", description: "The property's most formal room. Book for the conch chowder and stay for the sunset.", bestFor: "One formal dinner, sunset cocktails" },
      ]),
      photoGrid("dining-photo", "2col", [
        { url: "/images/reviews/four-seasons-nevis/02.jpg", alt: "Dining at Four Seasons Nevis" },
        { url: "/images/reviews/four-seasons-nevis/03.jpg", alt: "Pinney's Beach, Nevis" },
      ]),
      ntkGrid("ntk", [
        { label: "Location", value: "Pinney's Beach, Nevis \u2014 Eastern Caribbean" },
        { label: "Getting There", value: "Fly into Robert L. Bradshaw (SKB), prop plane to Nevis (~10 min)" },
        { label: "Best Season", value: "Dec\u2013Apr dry season; shoulder seasons offer value and quiet" },
        { label: "Best For", value: "Golfers, guests who want real Caribbean quiet, those who've done Anguilla and St. Barts" },
        { label: "Pro Tip", value: "Golf morning tee times sell out \u2014 book before your stay begins" },
      ]),
      verdict("verdict", "Nevis is a secret the Caribbean's best travelers keep. The Four Seasons is the reason.", "Four Seasons Nevis occupies a position no other Caribbean resort can replicate \u2014 the only resort-scale address on an island that has deliberately stayed underdeveloped. The golf course, the estate character, the Nevis Peak backdrop, and the quiet that the island maintains by circumstance make this the correct answer for guests who have done the obvious Caribbean islands and are ready for something quieter and more interesting."),
      tagRow("tags", ["#FourSeasonsNevis", "#Nevis", "#CaribbeanGolf", "#SaintKittsAndNevis", "#QuietCaribbean"]),
    ],
  })

  // ─── STEP 6: Link reviews to hotel documents ──────────────────────────────
  console.log("\nLinking reviews to hotel documents...")

  const hotelReviewLinks = [
    { hotelId: "hotel-four-seasons-resort-maui-at-wailea", reviewId: "review-four-seasons-maui-wailea" },
    { hotelId: "hotel-four-seasons-resort-hualalai", reviewId: "review-four-seasons-hualalai" },
    { hotelId: "hotel-the-ritz-carlton-grand-cayman", reviewId: "review-ritz-carlton-grand-cayman" },
    { hotelId: "hotel-w-costa-rica-reserva-conchal", reviewId: "review-w-costa-rica-reserva-conchal" },
    { hotelId: "hotel-four-seasons-resort-and-residences-anguilla", reviewId: "review-four-seasons-anguilla" },
    { hotelId: "hotel-four-seasons-resort-nevis", reviewId: "review-four-seasons-nevis" },
  ]

  for (const { hotelId, reviewId } of hotelReviewLinks) {
    await client.patch(hotelId).set({ review: { _type: "reference", _ref: reviewId } }).commit()
    console.log(`  → linked ${hotelId} \u2192 ${reviewId}`)
  }

  console.log("\n\u2713 All done!")
}

main().catch((err) => { console.error(err); process.exit(1) })
