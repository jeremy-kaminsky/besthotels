/**
 * Seed script — populates Sanity with all content from the HTML source files.
 * Run: npx tsx sanity/seed/index.ts
 * Requires SANITY_API_TOKEN with write access in .env.local
 */
import * as dotenv from 'dotenv'
import { resolve } from 'path'
dotenv.config({ path: resolve(process.cwd(), '.env.local') })
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// ─── EXPERIENCES ───
const EXPERIENCES = [
  'Beach', 'Ski', 'Safari', 'Wellness', 'Family', 'Adults Only',
  'Honeymoon', 'City', 'Eco', 'Boutique', 'Overwater', 'Desert',
  'Wilderness', 'Heritage', 'Wine Country', 'Surf',
]

// ─── COUNTRIES (subset — expand as reviews are added) ───
const COUNTRIES = [
  { name: 'Saudi Arabia', parentRegion: 'Middle East' },
  { name: 'Caribbean', parentRegion: 'Caribbean' },
  { name: 'France', parentRegion: 'Europe' },
  { name: 'Maldives', parentRegion: 'Asia' },
  { name: 'Indonesia', parentRegion: 'Asia' },
  { name: 'Japan', parentRegion: 'Asia' },
  { name: 'Thailand', parentRegion: 'Asia' },
  { name: 'UAE', parentRegion: 'Middle East' },
  { name: 'Greece', parentRegion: 'Europe' },
  { name: 'Italy', parentRegion: 'Europe' },
  { name: 'Morocco', parentRegion: 'Africa' },
  { name: 'South Africa', parentRegion: 'Africa' },
  { name: 'Rwanda', parentRegion: 'Africa' },
  { name: 'Tanzania', parentRegion: 'Africa' },
  { name: 'Kenya', parentRegion: 'Africa' },
  { name: 'United States', parentRegion: 'Americas' },
  { name: 'Mexico', parentRegion: 'Americas' },
  { name: 'Costa Rica', parentRegion: 'Americas' },
  { name: 'France', parentRegion: 'Europe' },
  { name: 'Australia', parentRegion: 'Oceania' },
  { name: 'Fiji', parentRegion: 'Oceania' },
]

// ─── STATES (region within country) ───
const STATES_DATA = [
  { name: 'Red Sea', country: 'Saudi Arabia' },
  { name: 'AlUla', country: 'Saudi Arabia' },
  { name: 'St. Barthélemy', country: 'Caribbean' },
  { name: 'Dominica', country: 'Caribbean' },
  { name: 'Turks & Caicos', country: 'Caribbean' },
  { name: 'North Malé Atoll', country: 'Maldives' },
  { name: 'Baa Atoll', country: 'Maldives' },
  { name: 'Bali', country: 'Indonesia' },
  { name: 'Kyoto', country: 'Japan' },
  { name: 'Phuket', country: 'Thailand' },
  { name: 'Dubai', country: 'UAE' },
  { name: 'Cyclades', country: 'Greece' },
  { name: 'Amalfi Coast', country: 'Italy' },
  { name: 'Marrakech', country: 'Morocco' },
  { name: 'Sabi Sand', country: 'South Africa' },
  { name: 'Volcanoes NP', country: 'Rwanda' },
  { name: 'Hawaii', country: 'United States' },
  { name: 'California', country: 'United States' },
  { name: 'Africa', country: '' },
]

// ─── CITIES ───
const CITIES_DATA = [
  { name: 'Sheybarah Island', state: 'Red Sea', country: 'Saudi Arabia' },
  { name: 'Grand Cul de Sac', state: 'St. Barthélemy', country: 'Caribbean' },
  { name: 'Portsmouth', state: 'Dominica', country: 'Caribbean' },
  { name: 'Providenciales', state: 'Turks & Caicos', country: 'Caribbean' },
  { name: 'North Malé Atoll', state: 'North Malé Atoll', country: 'Maldives' },
  { name: 'Ubud', state: 'Bali', country: 'Indonesia' },
  { name: 'Kyoto', state: 'Kyoto', country: 'Japan' },
  { name: 'Phuket', state: 'Phuket', country: 'Thailand' },
  { name: 'Dubai', state: 'Dubai', country: 'UAE' },
  { name: 'Oia', state: 'Cyclades', country: 'Greece' },
  { name: 'Positano', state: 'Amalfi Coast', country: 'Italy' },
  { name: 'Marrakech', state: 'Marrakech', country: 'Morocco' },
  { name: 'Sabi Sand Reserve', state: 'Sabi Sand', country: 'South Africa' },
  { name: 'Bisate', state: 'Volcanoes NP', country: 'Rwanda' },
  { name: 'Kohala Coast', state: 'Hawaii', country: 'United States' },
  { name: 'Big Sur', state: 'California', country: 'United States' },
]

// ─── RANKING LISTS ───
const RANKING_LISTS = [
  {
    title: 'Top 50 Hotels in the World',
    slug: 'top-50-world',
    eyebrow: 'Best Hotels · Global · 2026',
    description: 'Our definitive global ranking of the world\'s finest hotels — from Maldivian overwater villas to Kyoto\'s secret gardens, African safari camps to Patagonian wilderness lodges.',
    heroImageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=2000&q=85&auto=format&fit=crop',
    propertyCount: '50 Properties',
    updatedLabel: 'Updated March 2026',
    countryCount: '37 Countries',
    methodology: 'Ranked by firsthand editorial scores across service, design, setting, dining, and value. Only properties personally visited by the Best Hotels team are eligible.',
    region: 'World',
    sortOrder: 1,
  },
  {
    title: 'Top 50 Hotels in the US',
    slug: 'top-50-us',
    eyebrow: 'Best Hotels · United States · 2026',
    description: 'From Hawaii\'s volcanic coastlines to Montana\'s wilderness lodges, Big Sur\'s clifftop retreats to Charleston\'s antebellum grandeur — the finest 50 properties across America.',
    heroImageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2000&q=85&auto=format&fit=crop',
    propertyCount: '50 Properties',
    updatedLabel: 'Updated March 2026',
    countryCount: 'United States',
    methodology: 'Ranked by firsthand editorial scores. Only US properties personally visited by the Best Hotels team are eligible.',
    region: 'United States',
    sortOrder: 2,
  },
  {
    title: 'Top 25 Beach Resorts in the World',
    slug: 'beach-resorts',
    eyebrow: 'Best Hotels · Beach · 2026',
    description: 'The world\'s finest beachfront escapes — from the powder-white sands of the Maldives to the dramatic black volcanic shores of Iceland.',
    heroImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&q=85&auto=format&fit=crop',
    propertyCount: '25 Properties',
    updatedLabel: 'Updated March 2026',
    countryCount: '18 Countries',
    methodology: 'Ranked by beach quality, water access, design, service, and overall setting. Only beachfront properties are eligible.',
    region: 'World',
    experience: 'Beach',
    sortOrder: 3,
  },
  {
    title: 'Top 25 Safari Lodges in Africa',
    slug: 'safari-lodges',
    eyebrow: 'Best Hotels · Safari · 2026',
    description: 'Twenty-five extraordinary wilderness camps and lodges across Sub-Saharan Africa — where game drives, conservation, and architectural excellence converge.',
    heroImageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=2000&q=85&auto=format&fit=crop',
    propertyCount: '25 Properties',
    updatedLabel: 'Updated March 2026',
    countryCount: '12 Countries',
    methodology: 'Ranked by wildlife encounter frequency, conservation practice, design, and culinary quality.',
    region: 'Africa',
    experience: 'Safari',
    sortOrder: 4,
  },
  {
    title: 'Top 25 Ski Resorts in the World',
    slug: 'ski-resorts',
    eyebrow: 'Best Hotels · Ski · 2026',
    description: 'The finest on-mountain hotels from the Swiss Alps to the Japanese powder bowls — where ski-in/ski-out access meets genuine luxury.',
    heroImageUrl: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=2000&q=85&auto=format&fit=crop',
    propertyCount: '25 Properties',
    updatedLabel: 'Updated December 2025',
    countryCount: '11 Countries',
    methodology: 'Ranked by slope access, alpine design, spa & wellness, dining, and overall mountain experience.',
    region: 'World',
    experience: 'Ski',
    sortOrder: 5,
  },
  {
    title: 'Top 25 Adults-Only Resorts',
    slug: 'adults-only',
    eyebrow: 'Best Hotels · Adults Only · 2026',
    description: 'No children, no noise — just extraordinary hotels for couples and adult travelers seeking genuine peace, privacy, and grown-up luxury.',
    heroImageUrl: 'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=2000&q=85&auto=format&fit=crop',
    propertyCount: '25 Properties',
    updatedLabel: 'Updated March 2026',
    countryCount: '15 Countries',
    methodology: 'Only strictly adults-only properties (18+) with verified policies are eligible.',
    region: 'World',
    experience: 'Adults Only',
    sortOrder: 6,
  },
  {
    title: 'Top 25 Honeymoon Hotels',
    slug: 'honeymoon',
    eyebrow: 'Best Hotels · Romance · 2026',
    description: 'The world\'s most romantic hotels for newlyweds and couples celebrating — from overwater bungalows to Tuscan hilltop estates.',
    heroImageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=2000&q=85&auto=format&fit=crop',
    propertyCount: '25 Properties',
    updatedLabel: 'Updated March 2026',
    countryCount: '20 Countries',
    methodology: 'Ranked by privacy, romance, couples\' amenities, setting, and overall experience for two.',
    region: 'World',
    experience: 'Honeymoon',
    sortOrder: 7,
  },
  {
    title: 'Top 25 Most Instagrammable Hotels',
    slug: 'instagrammable',
    eyebrow: 'Best Hotels · Visual · 2026',
    description: 'The most photographically extraordinary hotels in the world — places where the design, setting, and light conspire to produce images that stop feeds cold.',
    heroImageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=2000&q=85&auto=format&fit=crop',
    propertyCount: '25 Properties',
    updatedLabel: 'Updated March 2026',
    countryCount: '22 Countries',
    methodology: 'Ranked by visual distinction, photographic opportunity, unique design elements, and real-world photography results.',
    region: 'World',
    experience: 'Boutique',
    sortOrder: 8,
  },
  {
    title: 'Top 25 New Hotel Openings 2026',
    slug: 'new-openings-2026',
    eyebrow: 'Best Hotels · New · 2026',
    description: 'The most exciting new hotel openings of 2026 — from long-awaited debuts to surprise arrivals in unexpected destinations.',
    heroImageUrl: 'https://images.unsplash.com/photo-1559508551-44bff1de756b?w=2000&q=85&auto=format&fit=crop',
    propertyCount: '25 Properties',
    updatedLabel: 'Updated January 2026',
    countryCount: '18 Countries',
    methodology: 'Only properties that opened or opened to the public in 2026 are eligible.',
    region: 'World',
    sortOrder: 9,
  },
  {
    title: 'Top 25 Eco-Luxury Resorts',
    slug: 'eco-luxury',
    eyebrow: 'Best Hotels · Eco · 2026',
    description: 'Sustainability and extraordinary luxury — not a compromise, but a combination. Twenty-five resorts proving that caring for the planet makes the experience better.',
    heroImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=85&auto=format&fit=crop',
    propertyCount: '25 Properties',
    updatedLabel: 'Updated March 2026',
    countryCount: '16 Countries',
    methodology: 'Ranked by verified sustainability practices, conservation contributions, organic/local sourcing, and luxury quality.',
    region: 'World',
    experience: 'Eco',
    sortOrder: 10,
  },
]

// ─── RANKING ENTRIES for Top 50 World (top 10 shown) ───
const TOP50_WORLD_ENTRIES = [
  { rank: 1, hotelName: 'Gili Lankanfushi', regionTag: 'Maldives', location: 'North Malé Atoll, Maldives', excerpt: 'The standard by which all overwater resorts are judged. No shoes, no news, no children, no clocks. Private villa hosts, a lagoon so clear it looks like CGI, and a silence that resets something fundamental. The most complete barefoot luxury experience on earth.', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=85&auto=format&fit=crop', tags: ['Overwater', 'Adults Only', 'Barefoot Luxury'], isEditorsPick: true },
  { rank: 2, hotelName: 'Hanging Gardens of Bali', regionTag: 'Indonesia', location: 'Ubud, Bali', excerpt: 'Two infinity pools suspended above the Ayung River gorge. The most photographed hotel pool in the world — and in person it\'s even more extraordinary than the image.', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85&auto=format&fit=crop', tags: ['Infinity Pool', 'Jungle', 'Bali'] },
  { rank: 3, hotelName: 'Aman Kyoto', regionTag: 'Japan', location: 'Kyoto, Japan', excerpt: 'Hidden at the foot of Kyoto\'s northern mountains in a secret garden that took decades to restore. Stone lanterns, ancient maple trees, and an atmosphere of stillness that Aman has never reproduced anywhere else.', imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400&q=85&auto=format&fit=crop', tags: ['Secret Garden', 'Japan', 'Ryokan'] },
  { rank: 4, hotelName: 'Four Seasons Resort Hualalai', regionTag: 'USA', location: 'Kohala Coast, Hawaii', excerpt: 'Eight pools, manta ray snorkeling, and a cultural center that makes guests genuinely understand the land they\'re on. Ranked #1 hotel in the USA for 2026.', imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1400&q=85&auto=format&fit=crop', tags: ['Hawaii', 'Beach', '8 Pools'] },
  { rank: 5, hotelName: 'Singita Boulders Lodge', regionTag: 'South Africa', location: 'Sabi Sand, South Africa', excerpt: 'Glass-fronted suites opening onto the Sand River where elephants and leopards appear at dawn. The Sabi Sand Game Reserve has the highest leopard density on the African continent.', imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&q=85&auto=format&fit=crop', tags: ['Big Five', 'Safari', 'Leopards'] },
  { rank: 6, hotelName: 'Burj Al Arab', regionTag: 'UAE', location: 'Dubai, UAE', excerpt: 'The world\'s most recognized hotel silhouette delivers on every promise. Butler service from the moment you land, a helipad above the Arabian Gulf, and interiors so extravagant they\'ve become their own genre.', imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1400&q=85&auto=format&fit=crop', tags: ['Iconic', 'Butler Service', 'Dubai'] },
  { rank: 7, hotelName: 'Katikies Santorini', regionTag: 'Greece', location: 'Oia, Santorini, Greece', excerpt: 'Cascading white architecture against the deep blue caldera. The infinity pools seem to pour directly into the Aegean. The sunset view from Katikies is the one people describe for decades.', imageUrl: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1400&q=85&auto=format&fit=crop', tags: ['Caldera Views', 'Infinity Pool', 'Santorini'] },
  { rank: 8, hotelName: 'Amanpuri', regionTag: 'Thailand', location: 'Phuket, Thailand', excerpt: 'The original Aman — opened 1988 — and still the benchmark. Pavilion rooms in a coconut grove, a private beach where non-guests cannot go, and service so quiet it feels like telepathy.', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&auto=format&fit=crop', tags: ['Private Beach', 'Original Aman', 'Thailand'] },
  { rank: 9, hotelName: 'Bisate Lodge', regionTag: 'Rwanda', location: 'Volcanoes NP, Rwanda', excerpt: 'Six eco-villas on a volcanic cone above Rwanda\'s mountain gorilla forests. Wake to mist rising over the Virunga volcanoes, then spend a morning with a gorilla family in the forest below.', imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=85&auto=format&fit=crop', tags: ['Gorillas', 'Rwanda', 'Conservation'] },
  { rank: 10, hotelName: 'La Mamounia', regionTag: 'Morocco', location: 'Marrakech, Morocco', excerpt: 'Winston Churchill called it the most lovely spot in the whole world. Seventeen acres of roses, orange trees, and ancient olive groves within the medina walls.', imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=85&auto=format&fit=crop', tags: ['Palace', 'Churchill', 'Gardens', 'Legendary'] },
]

// ─── REVIEWS ───
function b(key: string, text: string) {
  return { _type: 'block', _key: key, style: 'normal', markDefs: [], children: [{ _type: 'span', _key: key + '-s', text, marks: [] }] }
}
function bIntro(key: string, text: string) {
  return { _type: 'block', _key: key, style: 'intro', markDefs: [], children: [{ _type: 'span', _key: key + '-s', text, marks: [] }] }
}
function secHead(key: string, label: string, heading: string, headingItalic?: string) {
  return { _type: 'sectionHeader', _key: key, label, heading, headingItalic }
}
function photoGrid(key: string, layout: string, images: { url: string; alt: string; caption?: string }[]) {
  return { _type: 'photoGrid', _key: key, layout, images }
}
function highlightBox(key: string, title: string, items: { bold?: string; text: string }[]) {
  return { _type: 'highlightBox', _key: key, title, items }
}
function diningGrid(key: string, items: { name: string; cuisine?: string; description?: string; bestFor?: string }[]) {
  return { _type: 'diningGrid', _key: key, items }
}
function noteBox(key: string, text: string, boldPrefix?: string) {
  return { _type: 'noteBox', _key: key, text, boldPrefix }
}
function ntkGrid(key: string, items: { label: string; value: string }[]) {
  return { _type: 'ntkGrid', _key: key, items }
}
function verdict(key: string, title: string, text: string) {
  return { _type: 'verdict', _key: key, label: 'The Verdict', title, text }
}
function tagRow(key: string, tags: string[]) {
  return { _type: 'tagRow', _key: key, tags }
}
function collabFooter(key: string, name: string, photoUrl: string, text: string, handle?: string) {
  return { _type: 'collabFooter', _key: key, name, photoUrl, text, handle }
}

const REVIEWS_DATA = [
  {
    hotelName: 'Shebara Resort',
    slug: 'shebara-resort-saudi-arabia',
    subtitle: 'The Future of Luxury Travel in the Red Sea',
    regionLabel: 'Saudi Arabia · Red Sea · Overwater Resort',
    locationLabel: 'Red Sea, Saudi Arabia',
    heroImageUrl: 'https://explorebesthotels.com/wp-content/uploads/2026/03/Shebara-Resort-Futuristic-Luxury.jpg',
    authorName: 'Andrea Persia',
    authorRole: 'Travel Content Creator & Travel Advisor',
    isCollaboration: true,
    collaboratorName: 'Andrea Persia',
    collaboratorHandle: '@_andreapersia_',
    publishedDate: '2026-01-15',
    updatedDate: '2026-03-15',
    nightlyRate: '~$2,500–$4,000+/night',
    category: 'Overwater Resort',
    villaCount: '73 total (overwater + beachfront)',
    diningInfo: '5 concepts + in-villa',
    bookingUrl: 'https://www.shebara.sa/en/',
    score: 9.4,
    excerpt: 'The most architecturally radical hotel in the Middle East — mirrored pods floating above a pristine Red Sea atoll that redefine what luxury hospitality can be.',
    experiences: ['Overwater', 'Adults Only', 'Beach'],
    country: 'Saudi Arabia',
    state: 'Red Sea',
    city: 'Sheybarah Island',
    photoStripUrls: [
      'https://explorebesthotels.com/wp-content/uploads/2026/03/luxury-overwater-villa-Red-Sea-private-pool-Shebara-resort.jpg',
      'https://explorebesthotels.com/wp-content/uploads/2026/03/Shebara-Resort-Futuristic-Luxury.jpg',
      'https://explorebesthotels.com/wp-content/uploads/2026/03/Luxury-resort-in-sadi-arabia.jpg',
      'https://explorebesthotels.com/wp-content/uploads/2026/03/Shebara-resort-exterior-futuristic-architecture.jpg',
    ],
    sidebarDetails: [
      { key: 'Alcohol', value: 'Not served' },
      { key: 'Pool', value: 'Main pool + private villa pools' },
      { key: 'Spa', value: 'Full spa + fitness + yoga' },
      { key: 'Arrival', value: 'Boat or seaplane' },
    ],
    body: [
      bIntro('intro', 'Some hotels impress, and some feel like they\'ve been placed here from another world. Shebara Resort in Saudi Arabia is firmly in the latter category.'),
      b('p2', 'Set on a remote island in Saudi Arabia\'s Red Sea, this ultra-luxury resort doesn\'t just raise the bar — it completely redefines what modern hospitality can look and feel like.'),
      secHead('arr-head', 'Arrival', 'Arriving at ', 'Shebara'),
      b('arr-p1', 'From the moment you arrive — whether by boat or seaplane — the experience is designed to build anticipation. Endless turquoise water surrounds you until, suddenly, the resort appears. Mirrored, futuristic orbs hover above the sea, creating one of the most visually striking hotel entrances in the world.'),
      photoGrid('arr-photo', 'single', [{ url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/Relaxing-at-Shebara-Resort-Saudi-Arabia-1.jpg', alt: 'Relaxing at Shebara Resort', caption: 'The arrival experience at Shebara is unlike anything else in luxury travel.' }]),
      secHead('design-head', 'Design & Architecture', 'Architecture that ', 'redefines luxury'),
      b('design-p1', 'The defining feature of Shebara Resort is its groundbreaking architecture. Each villa is crafted from mirrored stainless steel, reflecting the sky and sea in a way that blends innovation with nature. What could feel overly futuristic instead feels intentional — almost as if the resort disappears into its surroundings.'),
      b('design-p2', 'This balance between cutting-edge design and natural beauty is what sets Shebara apart from every other luxury resort in Saudi Arabia.'),
      photoGrid('design-photos', '2col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/Luxury-resort-in-sadi-arabia.jpg', alt: 'Shebara Resort exterior' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/Shebara-resort-exterior-futuristic-architecture.jpg', alt: 'Shebara futuristic architecture' },
      ]),
      secHead('villa-head', 'The Villas', 'Overwater luxury ', 'at its finest'),
      b('villa-p1', 'The villas feel far more livable than dramatic — which is a good thing. There are both overwater and beachfront options (73 villas total), with floor-to-ceiling glass and private infinity pools.'),
      highlightBox('villa-hbox', 'What Stands Out', [
        { bold: 'Extremely private', text: ' — no direct sightlines into other villas' },
        { bold: 'Feels calm, not overly "designed"', text: ' — rare for a resort this bold' },
        { bold: 'High-end finishes', text: ' + genuinely comfortable beds' },
        { bold: 'Private infinity pools', text: ' with direct Red Sea access' },
      ]),
      photoGrid('villa-photo', 'single', [{ url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/luxury-overwater-villa-Red-Sea-private-pool-Shebara-resort.jpg', alt: 'Overwater villa private pool at Shebara', caption: 'Overwater villa with private infinity pool, Shebara Resort.' }]),
      secHead('dining-head', 'Dining', 'Five dining concepts, ', 'zero compromises'),
      b('dining-p1', 'Shebara offers five distinct dining concepts, ranging from high-end tasting menus to relaxed beachside plates. In-villa dining is also available, which many guests use for private dinners or slower mornings.'),
      diningGrid('dining-grid', [
        { name: 'IKI.ROE', cuisine: 'Japanese–Peruvian', description: 'Sushi bar, robata grill, tasting-style menu. The standout experience at Shebara for elevated evening dining.', bestFor: 'Dinner, special occasions' },
        { name: 'Ariamare', cuisine: 'Mediterranean Coastal', description: 'Seafood, light pastas, Mediterranean flavors with a Red Sea view. Ideal for a slower evening.', bestFor: 'Dinner with a view' },
        { name: 'Lunara', cuisine: 'International Brasserie', description: 'All-day dining covering breakfast through dinner. The most flexible option — great for unhurried mornings.', bestFor: 'Breakfast, casual meals' },
        { name: 'Saria', cuisine: 'Middle Eastern Small Plates', description: 'Beachside setting with grilled dishes and regional flavors. The most relaxed of the five concepts.', bestFor: 'Lunch, daytime dining' },
        { name: 'Solera', cuisine: 'Lite Bites · Adults Only', description: 'Poolside snacks and the resort\'s creative non-alcoholic drinks program. Built around premium mocktails.', bestFor: 'Afternoon lounging, sunset drinks' },
      ]),
      noteBox('dining-note', 'Saudi resorts do not serve alcohol. Expect a focus on premium mocktails and curated non-alcoholic drinks — Solera is built around this concept and does it exceptionally well.', 'Important:'),
      photoGrid('dining-photos', '2col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/Shebara-resort-restaurant-oceanfront-dining-experience-edited-1.jpg', alt: 'Oceanfront dining at Shebara' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/elevated-dining-experience-Shebara-resort-Saudi-Arabia-1-edited.jpg', alt: 'Elevated dining at Shebara' },
      ]),
      secHead('water-head', 'Activities & The Water', 'The Red Sea ', 'at its most pristine'),
      b('water-p1', 'There\'s a full spa, fitness center, yoga, and water activities on offer. But this destination is perfect if what you want is a total disconnect — slow mornings, long swims, and spa afternoons.'),
      b('water-p2', 'The Red Sea here is exceptionally clear and largely untouched, with direct access to reefs right off the villas. Snorkeling and diving are available, but honestly, the biggest draw is how effortless it is to get into the water.'),
      photoGrid('water-photos', '3col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/Pool-Cabanas-Saudi-Arabia-edited.jpg', alt: 'Pool cabanas at Shebara' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/Luxury-resort-in-sadi-arabia-edited.jpg', alt: 'Shebara sunset' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/Shebara-resort-ocean-view-turquoise-water-Red-Sea-edited.jpg', alt: 'Red Sea views from Shebara' },
      ]),
      secHead('ntk-head', 'Need to Know', '', undefined),
      ntkGrid('ntk', [
        { label: 'Nightly Rate', value: '~$2,500–$4,000+ depending on villa and season' },
        { label: 'Minimum Stay', value: '2–3 nights recommended to fully experience the resort' },
        { label: 'Alcohol', value: 'Not served — premium mocktails and non-alcoholic drinks only' },
        { label: 'Getting There', value: 'Arrival by boat or seaplane from the mainland' },
        { label: 'Best For', value: 'Total privacy, design-forward travel, pristine water access' },
        { label: 'Pro Tip', value: 'Book early — villas fill fast and the experience rewards a longer stay' },
      ]),
      verdict('verdict', 'A next-generation luxury resort unlike anything else.', 'Shebara doesn\'t just impress — it redefines. The mirrored villas hovering over a pristine Red Sea, the thoughtful dining program, the total privacy, and the access to one of the world\'s least-touched stretches of water combine to create something genuinely unprecedented in luxury travel. Saudi Arabia\'s hospitality ambition is real, and Shebara is the proof.'),
      tagRow('tags', ['#Luxury Travel', '#Overwater Villa', '#Red Sea', '#Saudi Arabia', '#Shebara']),
      collabFooter('collab', 'Andrea Persia', 'https://explorebesthotels.com/wp-content/uploads/2026/03/Andrea-Persia-Travel-Creator.jpg', 'In collaboration with travel creator Andrea Persia.', '@_andreapersia_'),
      photoGrid('outro-photos', '2col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/Saudia-Arabia-Pool-At-Night-Glowing-edited.jpg', alt: 'Shebara pool at night' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2026/03/Shebara-Resort-Over-water-villas-edited-1.jpg', alt: 'Shebara overwater villas at night' },
      ]),
    ],
  },
  {
    hotelName: 'Secret Bay Dominica',
    slug: 'secret-bay-dominica',
    subtitle: 'Luxury Caribbean Villas on the Nature Island',
    regionLabel: 'Caribbean · Dominica · Eco-Luxury Resort',
    locationLabel: 'Dominica, Caribbean',
    heroImageUrl: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Secret-Bay-Dominica-scaled.jpg',
    authorName: 'Jake Trerotola',
    authorRole: 'Founder of Best Hotels',
    publishedDate: '2024-11-01',
    updatedDate: '2026-03-01',
    nightlyRate: 'From $1,800/night',
    category: 'Eco-Luxury Resort',
    villaCount: 'Clifftop & beachfront villas',
    diningInfo: 'Bwa Denn + Pavilion + private chef',
    bookingUrl: 'https://secretbay.dm/',
    score: 9.6,
    excerpt: 'Clifftop villas perched above a wild Caribbean bay on the Nature Island — the most sincere eco-luxury escape in the Caribbean.',
    experiences: ['Eco', 'Beach', 'Wellness', 'Honeymoon'],
    country: 'Caribbean',
    state: 'Dominica',
    city: 'Portsmouth',
    photoStripUrls: [
      'https://explorebesthotels.com/wp-content/uploads/2024/11/Secret-Bay-Dominica.jpg',
      'https://explorebesthotels.com/wp-content/uploads/2024/11/Breathtaking-Villas-at-Secret-Bay-Dominica.jpg',
      'https://explorebesthotels.com/wp-content/uploads/2024/11/Private-Plunge-Pool.png',
    ],
    sidebarDetails: [
      { key: 'Pool', value: 'Main pool + private villa plunge pools' },
      { key: 'Transport', value: 'Electric vehicles + funicular' },
      { key: 'Sister Property', value: 'Fort Young Hotel, Roseau' },
    ],
    body: [
      bIntro('intro', 'Secret Bay in Dominica is an eco-luxury resort nestled among lush rainforests and stunning clifftop villas. It offers a perfect blend of comfort, privacy, and breathtaking Caribbean beauty.'),
      secHead('arr-head', 'Arrival', 'Welcome to ', 'Paradise'),
      b('arr-p1', 'Arriving in Dominica, we stepped into a world of total serenity. Dominica — known as the "Nature Island of the Caribbean" — presented a stunning blend of lush landscapes and seclusion. No other Caribbean destination I\'ve been to matches this level of tranquility.'),
      b('arr-p2', 'Upon arrival at Secret Bay, the staff greeted us with refreshing lemongrass iced tea, which set the tone perfectly. After check-in, an electric vehicle brought us to our one-of-a-kind clifftop villa. For cliffside villas, the funicular offers another scenic route — a detail that feels both practical and theatrical at once.'),
      photoGrid('arr-photo', 'single', [{ url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Best-Hotels-Jake-Trerotola.png', alt: 'Jake Trerotola at Secret Bay Dominica', caption: 'Jake Trerotola at Secret Bay, Dominica.' }]),
      secHead('villa-head', 'The Villa', 'The Clifftop Zabuco ', 'Honeymoon Villa'),
      b('villa-p1', 'We stayed in the remarkable Clifftop Zabuco Honeymoon Villa II. The villa had a private plunge pool with an expansive deck and stunning views. Features included an outdoor shower, a shaded hammock sofa suspended beneath the villa, and a vast open terrace and lounge area — the ideal spot for morning coffee and sunset cocktails.'),
      b('villa-p2', 'Fun fact: "Zabuco" is the local term for "apricot" — a fitting name for a villa so deeply rooted in the natural world around it.'),
      photoGrid('villa-photos', '4col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Private-Plunge-Pool.png', alt: 'Private plunge pool' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Secret-Bay-Beautiful-Villa.png', alt: 'Secret Bay villa' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Dominica-Best-Resort-Rooms.png', alt: 'Villa views' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Caribbean-Resort-Room.png', alt: 'Caribbean resort room' },
      ]),
      secHead('dining-head', 'Dining', 'Morning Indulgence with ', 'Private Chef Sofiya'),
      b('dining-p1', 'One of the most unique aspects of our stay was the private breakfast experience with host and chef, Sofiya. From perfectly baked bread and fresh eggs to tropical fruits — each bite was a delightful taste of island living. Her warmth and attention to detail made breakfast the perfect start to every day.'),
      photoGrid('dining-photos1', '2col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Breakfast-in-Paradise-at-Secret-Bay.jpg', alt: 'Breakfast in paradise' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Fresh-Fruit-at-Secret-Bay.jpg', alt: 'Fresh fruit at Secret Bay' },
      ]),
      b('dining-p2', 'Each evening we made a point of enjoying Secret Bay\'s Pavilion — a new addition since our last visit. The outdoor lounge area, with panoramic views, was a beautiful spot to unwind while watching the sunset. The new Bwa Denn Restaurant presented exceptional Caribbean flavors. The Lobster Ravioli with coconut and turmeric sauce, crafted by Executive Chef Aurelien Bulgheroni, was a standout.'),
      photoGrid('dining-photos2', '3col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Fresh-Caribbean-Bread-1.jpg', alt: 'Caribbean bread' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Lobster-Ravioli-with-coconut-and-turmeric-sauce.png', alt: 'Lobster ravioli' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/IMG_1746.jpg', alt: 'Rooftop tapas' },
      ]),
      secHead('new-head', 'New Additions', 'How much Secret Bay ', 'has grown'),
      b('new-p1', 'We were thrilled to see how much the resort had evolved in three years. The new additions elevate it to a genuinely different tier of experience:'),
      highlightBox('new-hbox', 'What\'s New at Secret Bay', [
        { bold: 'The Pavilion', text: ' — rooftop tapas deck + Bwa Denn Restaurant on the main level' },
        { bold: 'Pool with deck bar', text: ' — a private oasis surrounded by the sounds of nature' },
        { bold: 'Open air fitness center', text: ' — for active guests seeking wellness and tranquility' },
        { bold: 'Homemade kombucha', text: ' — crafted on-site with green tea, light and refreshing' },
        { bold: 'Art gallery & boutique', text: ' — showcasing local Dominican artists and craftspeople' },
      ]),
      photoGrid('new-photos', '2col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Pool.jpg', alt: 'Secret Bay pool' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/IMG_20241106_112022_225.jpg', alt: 'Open air fitness center' },
      ]),
      secHead('art-head', 'Art & Culture', 'Fragments & Rust — ', 'Bwa Denn Art Gallery'),
      b('art-p1', 'A highlight we didn\'t expect: the new art gallery celebrating Dominican creativity. Work by local artists was displayed throughout, from paintings to sculpture to handcrafted jewelry.'),
      photoGrid('art-photos', '2col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/IMG_1897-1.jpg', alt: 'Aaron Hamilton artwork' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/IMG_1905-2.jpg', alt: 'Carol Sorhaindo sculpture' },
      ]),
      b('art-p2', 'Paintings by Aaron Hamilton · Tear Drop Sculpture by Carol Sorhaindo · Freshwater Pearl jewelry by Paula Bellot.'),
      secHead('turtle-head', 'A Special Moment', 'Sea Turtle ', 'Release'),
      b('turtle-p1', 'We were fortunate to witness a baby sea turtle release. High tides were threatening a nearby nest, so the turtles were carefully relocated — tiny creatures making their way to the water guided only by instinct. It was a quiet, magical reminder of the natural world Secret Bay works hard to protect.'),
      photoGrid('turtle-photos', '2col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Untitled-design-52.png', alt: 'Sea turtle release' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Untitled-design-51-1.png', alt: 'Baby sea turtles' },
      ]),
      secHead('sister-head', 'Sister Property', 'Fort Young Hotel, ', 'Roseau'),
      b('sister-p1', 'After checking out, we headed to Fort Young Hotel in Roseau — Secret Bay\'s sister property and a completely different kind of experience. More lively, more urban, with a scenic pool, hot tub, seaside restaurant, and a museum celebrating local artists. Outside the fitness room: a jersey signed by Thea LaFond, Dominica\'s first Olympic gold medalist.'),
      photoGrid('sister-photos', '2col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Caribbean-Hotel-Fort-Young.png', alt: 'Fort Young Hotel' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/11/Fort-Young-Hotel-in-Dominica.jpg', alt: 'Fort Young ocean view' },
      ]),
      secHead('ntk-head', 'Need to Know', '', undefined),
      ntkGrid('ntk', [
        { label: 'Category', value: 'Eco-luxury clifftop villa resort' },
        { label: 'Best For', value: 'Couples, honeymooners, anyone craving real seclusion' },
        { label: 'Getting There', value: 'Fly into Douglas-Charles Airport, Dominica. Short transfer to the resort.' },
        { label: 'Transport on Property', value: 'Electric vehicles + funicular for cliffside villas' },
        { label: 'Don\'t Miss', value: 'Private breakfast with your chef. Book it before you arrive.' },
        { label: 'Also Visit', value: 'Fort Young Hotel in Roseau — Secret Bay\'s sister property' },
      ]),
      verdict('verdict', 'The Caribbean\'s most sincere luxury escape.', 'Secret Bay doesn\'t compete with the Caribbean\'s flashier resorts — it quietly surpasses them. The combination of clifftop seclusion, private chef breakfasts, thoughtful new additions, and genuine eco-consciousness creates something rare: a luxury resort that feels like it belongs to the island it sits on. If you\'re planning a Caribbean escape, make it here.'),
      tagRow('tags', ['#Best Hotels Caribbean', '#Secret Bay Dominica', '#Eco Luxury', '#Caribbean']),
    ],
  },
  {
    hotelName: 'Le Sereno',
    slug: 'le-sereno-st-barthelemy',
    subtitle: 'The Chicest Hotel in the Caribbean',
    regionLabel: 'Caribbean · St. Barthélemy',
    locationLabel: 'Grand Cul de Sac, St. Barthélemy',
    heroImageUrl: 'https://explorebesthotels.com/wp-content/uploads/2024/06/Le-Sereno-Luxury-Hotel-Resort.jpg',
    authorName: 'Jake Trerotola',
    authorRole: 'Founder of Best Hotels',
    publishedDate: '2024-06-01',
    updatedDate: '2024-12-01',
    nightlyRate: 'From $1,400/night',
    category: 'Boutique Beach Hotel',
    villaCount: '39 suites',
    diningInfo: 'Il Sereno restaurant',
    bookingUrl: 'https://www.lesereno.com',
    score: 9.2,
    excerpt: 'The most effortlessly stylish hotel in the Caribbean — Christian Liaigre design, crystalline lagoon, and the particular ease that only St. Barths delivers.',
    experiences: ['Beach', 'Boutique', 'Adults Only', 'Honeymoon'],
    country: 'Caribbean',
    state: 'St. Barthélemy',
    city: 'Grand Cul de Sac',
    photoStripUrls: [
      'https://explorebesthotels.com/wp-content/uploads/2024/06/Le-Sereno-Luxury-Hotel.jpg',
      'https://explorebesthotels.com/wp-content/uploads/2024/06/Le-Sereno-Luxury-Hotel-Resort.jpg',
      'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=1400&q=85&auto=format&fit=crop',
    ],
    sidebarDetails: [
      { key: 'Beach', value: 'Grand Cul de Sac lagoon beach' },
      { key: 'Pool', value: 'Main pool + suite terraces' },
      { key: 'Style', value: 'Christian Liaigre design' },
    ],
    body: [
      bIntro('intro', 'St. Barthélemy has more excellent hotels per square kilometre than almost anywhere else on earth, which makes the continued supremacy of Le Sereno all the more remarkable. Designed by the late Christian Liaigre in 2004, the hotel has not been substantially redesigned since — and it doesn\'t need to be. The aesthetic is complete.'),
      secHead('setting-head', 'The Setting', 'A lagoon beach ', 'all to itself'),
      b('setting-p1', 'Thirty-nine suites face the calm lagoon at Grand Cul de Sac — one of the few beaches on St. Barths where the water is genuinely protected from Atlantic swell. The architecture is low-slung and horizontal, painted in warm whites and naturals, with teak detailing that has aged to exactly the right shade. Nothing shouts.'),
      b('setting-p2', 'The beach here is shallower and calmer than most on the island, which makes it particularly suited to morning swims and watersports. Windsurfers and kite-surfers use Grand Cul de Sac regularly, and watching them from a sun lounger with cold rosé is a very specific kind of perfect afternoon.'),
      photoGrid('setting-photos', '2col', [
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/06/Le-Sereno-Luxury-Hotel.jpg', alt: 'Le Sereno beachfront' },
        { url: 'https://explorebesthotels.com/wp-content/uploads/2024/06/Le-Sereno-Luxury-Hotel-Resort.jpg', alt: 'Le Sereno resort view' },
      ]),
      secHead('rooms-head', 'The Suites', 'Understated ', 'excellence'),
      b('rooms-p1', 'Every suite faces the sea. The interiors are Liaigre at his most restrained — dark wenge, raw concrete, linen the colour of sea salt — with none of the ornamental excess that dates so many Caribbean hotel rooms. There are no televisions facing the beach. That space is reserved for the view.'),
      b('rooms-p2', 'The suites range from junior suites at 590 sq ft to the three-bedroom Villa Sereno with its own private pool. For a couple, the Grand Deluxe Suite — with a terrace just metres above the waterline — is the right choice.'),
      secHead('dining-head', 'Dining', 'Il Sereno — the ', 'best lunch on the island'),
      b('dining-p1', 'Il Sereno, the restaurant, is the best in the hotel category on the island. Lunch is the main event — grilled fish, pasta, cold rosé, French island ease — and the setting, with tables on a deck above the water, is the kind of thing that makes you feel you\'ve arrived somewhere that does not try.'),
      b('dining-p2', 'Dinner is equally composed. The menu changes with the season and the catch, and the wine list is the kind that takes an hour to read properly. Service is French in the best sense: attentive but not intrusive, warm without being familiar.'),
      photoGrid('dining-photo', 'single', [{ url: 'https://explorebesthotels.com/wp-content/uploads/2024/06/Le-Sereno-Luxury-Hotel.jpg', alt: 'Il Sereno restaurant deck', caption: 'Lunch at Il Sereno — tables on the deck above the lagoon.' }]),
      secHead('ntk-head', 'Need to Know', '', undefined),
      ntkGrid('ntk', [
        { label: 'Best Time to Visit', value: 'December – April (peak season)' },
        { label: 'Nightly Rate', value: 'From $1,400/night in low season' },
        { label: 'Getting There', value: 'Fly to St. Martin (SXM), then 10-min flight or 45-min ferry to St. Barths' },
        { label: 'Best Suite', value: 'Grand Deluxe Suite — direct lagoon terrace, perfect for two' },
        { label: 'Don\'t Miss', value: 'Lunch at Il Sereno. Arrive at noon, leave at four.' },
        { label: 'Who It\'s For', value: 'Couples, style-conscious travelers, repeat St. Barths visitors' },
      ]),
      verdict('verdict', 'As effortlessly stylish as hotels get.', 'Le Sereno earns its reputation not through renovation cycles or social media moments, but through the sustained quality of a vision that hasn\'t been diluted. The design is right. The beach is right. The restaurant is right. It is one of the few Caribbean hotels where the whole is unambiguously greater than the sum of its parts.'),
      tagRow('tags', ['#Le Sereno', '#St Barths', '#Caribbean', '#Boutique Hotel', '#Luxury Travel']),
    ],
  },
]

async function seed() {
  console.log('🌱 Starting seed...\n')

  // 1. Experiences
  console.log('Creating experiences...')
  const expMap: Record<string, string> = {}
  for (const name of EXPERIENCES) {
    const doc = await client.createOrReplace({
      _type: 'experience',
      _id: `experience-${slug(name)}`,
      name,
      slug: { _type: 'slug', current: slug(name) },
    })
    expMap[name] = doc._id
    process.stdout.write('.')
  }
  console.log(' ✓')

  // 2. Countries
  console.log('Creating countries...')
  const countryMap: Record<string, string> = {}
  const seenCountries = new Set<string>()
  for (const c of COUNTRIES) {
    if (seenCountries.has(c.name)) continue
    seenCountries.add(c.name)
    const doc = await client.createOrReplace({
      _type: 'country',
      _id: `country-${slug(c.name)}`,
      name: c.name,
      slug: { _type: 'slug', current: slug(c.name) },
      parentRegion: c.parentRegion,
    })
    countryMap[c.name] = doc._id
    process.stdout.write('.')
  }
  console.log(' ✓')

  // 3. States
  console.log('Creating states/regions...')
  const stateMap: Record<string, string> = {}
  for (const s of STATES_DATA) {
    const cId = s.country ? countryMap[s.country] : undefined
    if (s.country && !cId) { console.warn(`No country found for state: ${s.name}`); continue }
    const doc = await client.createOrReplace({
      _type: 'state',
      _id: `state-${slug(s.country || 'global')}-${slug(s.name)}`,
      name: s.name,
      slug: { _type: 'slug', current: slug(s.name) },
      country: cId ? { _type: 'reference', _ref: cId } : undefined,
    })
    stateMap[`${s.country}:${s.name}`] = doc._id
    stateMap[slug(s.name)] = doc._id
    process.stdout.write('.')
  }
  console.log(' ✓')

  // 4. Cities
  console.log('Creating cities...')
  const cityMap: Record<string, string> = {}
  for (const c of CITIES_DATA) {
    const stateId = stateMap[`${c.country}:${c.state}`]
    const countryId = countryMap[c.country]
    const doc = await client.createOrReplace({
      _type: 'city',
      _id: `city-${slug(c.country)}-${slug(c.name)}`,
      name: c.name,
      slug: { _type: 'slug', current: slug(c.name) },
      state: stateId ? { _type: 'reference', _ref: stateId } : undefined,
      country: countryId ? { _type: 'reference', _ref: countryId } : undefined,
    })
    cityMap[`${c.country}:${c.name}`] = doc._id
    cityMap[c.name] = doc._id
    process.stdout.write('.')
  }
  console.log(' ✓')

  // 5. Ranking lists
  console.log('Creating ranking lists...')
  const ref = (id: string) => ({ _type: 'reference' as const, _ref: id })
  const expRef = (name: string, key: string) => expMap[name] ? [{ _key: key, ...ref(expMap[name]) }] : undefined
  const expRefs = (...pairs: [string, string][]) => {
    const out = pairs.flatMap(([name, key]) => expMap[name] ? [{ _key: key, ...ref(expMap[name]) }] : [])
    return out.length ? out : undefined
  }

  const RANKING_LIST_FILTER_REFS: Record<string, object> = {
    'top-50-us': {
      country: countryMap['United States'] ? ref(countryMap['United States']) : undefined,
    },
    'beach-resorts': {
      experiences: expRef('Beach', 'beach'),
    },
    'safari-lodges': {
      state: stateMap['africa'] ? ref(stateMap['africa']) : undefined,
      experiences: expRef('Safari', 'safari'),
    },
    'ski-resorts': {
      experiences: expRef('Ski', 'ski'),
    },
    'adults-only': {
      experiences: expRef('Adults Only', 'adults-only'),
    },
    'honeymoon': {
      experiences: expRef('Honeymoon', 'honeymoon'),
    },
    'instagrammable': {
      experiences: expRef('Boutique', 'boutique'),
    },
    'eco-luxury': {
      experiences: expRef('Eco', 'eco'),
    },
  }

  const listMap: Record<string, string> = {}
  for (const list of RANKING_LISTS) {
    const filterRefs = RANKING_LIST_FILTER_REFS[list.slug] || {}
    const doc = await client.createOrReplace({
      _type: 'rankingList',
      _id: `ranking-list-${list.slug}`,
      ...list,
      ...filterRefs,
      slug: { _type: 'slug', current: list.slug },
    })
    listMap[list.slug] = doc._id
    process.stdout.write('.')
  }
  console.log(' ✓')

  // 6. Ranking entries for Top 50 World
  console.log('Creating ranking entries (Top 50 World)...')
  for (const entry of TOP50_WORLD_ENTRIES) {
    await client.createOrReplace({
      _type: 'rankingEntry',
      _id: `ranking-entry-top50-world-${entry.rank}`,
      rankingList: { _type: 'reference', _ref: listMap['top-50-world'] },
      rank: entry.rank,
      hotelName: entry.hotelName,
      regionTag: entry.regionTag,
      location: entry.location,
      excerpt: entry.excerpt,
      imageUrl: entry.imageUrl,
      tags: entry.tags,
      isEditorsPick: (entry as { isEditorsPick?: boolean }).isEditorsPick || false,
    })
    process.stdout.write('.')
  }
  console.log(' ✓')

  // 7. Reviews
  console.log('Creating hotel reviews...')
  for (const r of REVIEWS_DATA) {
    const experienceRefs = r.experiences
      .filter(e => expMap[e])
      .map(e => ({ _type: 'reference', _ref: expMap[e], _key: slug(e) }))
    const countryRef = countryMap[r.country] ? { _type: 'reference', _ref: countryMap[r.country] } : undefined
    const stateRef = stateMap[`${r.country}:${r.state}`] ? { _type: 'reference', _ref: stateMap[`${r.country}:${r.state}`] } : undefined
    const cityRef = cityMap[r.city] ? { _type: 'reference', _ref: cityMap[r.city] } : undefined

    const rv = r as typeof r & { isCollaboration?: boolean; collaboratorName?: string; collaboratorHandle?: string; sidebarDetails?: { key: string; value: string }[] }
    await client.createOrReplace({
      _type: 'review',
      _id: `review-${r.slug}`,
      hotelName: r.hotelName,
      slug: { _type: 'slug', current: r.slug },
      subtitle: r.subtitle,
      regionLabel: r.regionLabel,
      locationLabel: r.locationLabel,
      heroImageUrl: r.heroImageUrl,
      authorName: r.authorName,
      authorRole: r.authorRole,
      isCollaboration: rv.isCollaboration || false,
      collaboratorName: rv.collaboratorName,
      collaboratorHandle: rv.collaboratorHandle,
      publishedDate: r.publishedDate,
      updatedDate: r.updatedDate,
      nightlyRate: r.nightlyRate,
      category: r.category,
      villaCount: r.villaCount,
      diningInfo: r.diningInfo,
      bookingUrl: r.bookingUrl,
      score: r.score,
      excerpt: r.excerpt,
      experiences: experienceRefs,
      country: countryRef,
      state: stateRef,
      city: cityRef,
      photoStripUrls: (r as typeof r & { photoStripUrls?: string[] }).photoStripUrls,
      sidebarDetails: rv.sidebarDetails?.map((d, i) => ({ ...d, _key: `sd-${i}` })),
      body: r.body.map((blk: Record<string, unknown>, i: number) => {
        if (blk._type === 'block') {
          return { ...blk, _key: blk._key || `block-${i}`, children: ((blk.children as Record<string, unknown>[] | undefined) || []).map((c, j) => ({ ...c, _key: (c._key as string) || `span-${i}-${j}`, marks: (c.marks as unknown[]) || [] })) }
        }
        return { ...blk, _key: blk._key || `block-${i}` }
      }),
    })
    process.stdout.write('.')
  }
  console.log(' ✓')

  console.log('\n✅ Seed complete!')
  console.log(`   ${EXPERIENCES.length} experiences`)
  console.log(`   ${[...seenCountries].length} countries`)
  console.log(`   ${STATES_DATA.length} states/regions`)
  console.log(`   ${CITIES_DATA.length} cities`)
  console.log(`   ${RANKING_LISTS.length} ranking lists`)
  console.log(`   ${TOP50_WORLD_ENTRIES.length} ranking entries`)
  console.log(`   ${REVIEWS_DATA.length} hotel reviews`)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
