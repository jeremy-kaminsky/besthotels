/**
 * Seed script — new hotel-based data model.
 * Run: npx tsx sanity/seed/index.ts
 * Requires SANITY_API_TOKEN with write access in .env.local
 */
import 'dotenv/config'
import { createClient } from '@sanity/client'
import slugify from 'slugify'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

function slug(s: string) {
  return slugify(s, { lower: true, strict: true })
}

// ─── HOTEL DATA ──────────────────────────────────────────────────────────────

interface HotelInput {
  name: string
  country: string
  region: string
  city: string
  experiences: string[]
  description: string
  featuredIn: string[]
}

const HOTELS: HotelInput[] = [
  // ── Italy ──
  { name: 'Hotel Santa Caterina', country: 'Italy', region: 'Campania', city: 'Amalfi', experiences: ['Beach','Heritage','Boutique'], description: 'A cliffside villa hanging over the Amalfi coast — family-owned since 1880, with a seawater pool carved into the rock.', featuredIn: [] },
  { name: 'Le Sirenuse', country: 'Italy', region: 'Campania', city: 'Positano', experiences: ['Beach','Heritage','Boutique'], description: 'The pink palazzo that made Positano famous — Sirenuse has been the coast\'s defining address since the Sersale family opened it in 1951.', featuredIn: ['country-italy','city-positano'] },
  { name: 'Il San Pietro di Positano', country: 'Italy', region: 'Campania', city: 'Positano', experiences: ['Beach','Boutique','Heritage'], description: 'Built into the cliff with a private beach at the bottom of an elevator — Positano\'s most secluded grand hotel.', featuredIn: [] },
  { name: 'Borgo Santo Pietro', country: 'Italy', region: 'Tuscany', city: 'Chiusdino', experiences: ['Heritage','Wellness','Wine Country'], description: 'A restored 13th-century estate on 300 Tuscan acres — working farm, Michelin kitchen, and one of Europe\'s most acclaimed rural retreats.', featuredIn: ['region-tuscany','experience-wine-country'] },
  { name: 'Castello di Reschio', country: 'Italy', region: 'Umbria', city: 'Lisciano Niccone', experiences: ['Heritage','Wine Country','Boutique'], description: 'A thousand-year-old castle turned private estate — fifty farmhouses across 3,700 acres, designed by Count Benedikt Bolza.', featuredIn: ['region-umbria'] },
  { name: 'Hotel Splendido', country: 'Italy', region: 'Liguria', city: 'Portofino', experiences: ['Beach','Heritage','Boutique'], description: 'A 16th-century monastery turned grande dame — the Portofino hotel Hollywood has been escaping to since the 1950s.', featuredIn: ['city-portofino'] },
  { name: 'Grand Hotel Tremezzo', country: 'Italy', region: 'Lombardy', city: 'Lake Como', experiences: ['Heritage','Wellness','Boutique'], description: 'Art Nouveau palace on Como\'s shore with a floating pool on the lake itself — the view George Clooney chose as his neighbor.', featuredIn: ['city-lake-como'] },
  { name: 'Villa d\'Este', country: 'Italy', region: 'Lombardy', city: 'Lake Como', experiences: ['Heritage','Wellness'], description: 'A 16th-century cardinal\'s villa on Lake Como — 25 acres of formal gardens and the floating pool that launched a thousand imitators.', featuredIn: [] },
  { name: 'Passalacqua', country: 'Italy', region: 'Lombardy', city: 'Lake Como', experiences: ['Heritage','Boutique','Wellness'], description: 'An 18th-century villa on Como with only 24 keys — named the world\'s best hotel its first year open.', featuredIn: ['region-lombardy'] },
  { name: 'Aman Venice', country: 'Italy', region: 'Veneto', city: 'Venice', experiences: ['Heritage','City','Boutique'], description: 'A 16th-century palazzo on the Grand Canal with frescoed ceilings by Tiepolo — Aman\'s quietest urban address.', featuredIn: ['city-venice'] },
  { name: 'The Gritti Palace', country: 'Italy', region: 'Veneto', city: 'Venice', experiences: ['Heritage','City'], description: 'A 15th-century doge\'s palace on the Grand Canal — Hemingway\'s Venice anchor, and still the city\'s defining stay.', featuredIn: [] },
  { name: 'Hotel Cipriani, A Belmond Hotel', country: 'Italy', region: 'Veneto', city: 'Venice', experiences: ['Heritage','Wellness'], description: 'Olympic-sized saltwater pool, private gardens, and a shuttle boat to St. Mark\'s — the Giudecca escape from Venice\'s crowds.', featuredIn: [] },
  { name: 'J.K. Place Roma', country: 'Italy', region: 'Lazio', city: 'Rome', experiences: ['City','Boutique'], description: 'A 30-room townhouse between the Spanish Steps and Piazza del Popolo — Rome\'s most intimate luxury address.', featuredIn: ['city-rome'] },
  { name: 'Hotel de Russie', country: 'Italy', region: 'Lazio', city: 'Rome', experiences: ['City','Heritage'], description: 'A Valadier palazzo with a terraced secret garden — Rome\'s hotel of choice for film royalty and diplomats.', featuredIn: [] },
  { name: 'Bulgari Hotel Roma', country: 'Italy', region: 'Lazio', city: 'Rome', experiences: ['City','Wellness'], description: 'The jeweler\'s Roman flagship overlooks the Mausoleum of Augustus — 114 rooms wrapped in travertine and bronze.', featuredIn: [] },
  { name: 'Hotel de la Ville, A Rocco Forte Hotel', country: 'Italy', region: 'Lazio', city: 'Rome', experiences: ['City','Heritage'], description: 'Top of the Spanish Steps, with a rooftop bar aimed straight at St. Peter\'s dome — Rome theatrical in the best way.', featuredIn: [] },
  { name: 'Belmond Hotel Caruso', country: 'Italy', region: 'Campania', city: 'Ravello', experiences: ['Beach','Heritage'], description: 'An 11th-century palazzo 1,200 feet above the Amalfi coast — the infinity pool everyone has seen on Instagram.', featuredIn: [] },
  { name: 'Masseria Torre Maizza, A Rocco Forte Hotel', country: 'Italy', region: 'Puglia', city: 'Fasano', experiences: ['Beach','Heritage','Boutique'], description: 'A 16th-century fortified farmhouse in Puglia\'s olive groves — stone-walled suites and a nine-hole course on the property.', featuredIn: ['region-puglia'] },
  { name: 'Borgo Egnazia', country: 'Italy', region: 'Puglia', city: 'Savelletri', experiences: ['Beach','Wellness','Family'], description: 'A full Puglian borgo recreated from scratch — where Justin Timberlake got married and Madonna takes her summers.', featuredIn: [] },
  { name: 'Rosewood Castiglion del Bosco', country: 'Italy', region: 'Tuscany', city: 'Montalcino', experiences: ['Wine Country','Heritage','Family'], description: 'Massimo Ferragamo\'s 5,000-acre Val d\'Orcia estate — a private Brunello vineyard, a Tom Weiskopf course, and a medieval village as your front yard.', featuredIn: [] },
  { name: 'Il Sereno Lago di Como', country: 'Italy', region: 'Lombardy', city: 'Torno', experiences: ['Boutique','Wellness'], description: 'Patricia Urquiola-designed waterfront on Como\'s quieter shore — 30 suites and an infinity pool that reads as the lake itself.', featuredIn: [] },
  { name: 'Monastero Santa Rosa', country: 'Italy', region: 'Campania', city: 'Conca dei Marini', experiences: ['Beach','Heritage','Boutique'], description: 'A 17th-century clifftop convent on the Amalfi coast — 20 cloister rooms and a pool that seems to spill into the sea.', featuredIn: ['experience-beach'] },
  { name: 'Verdura Resort, A Rocco Forte Hotel', country: 'Italy', region: 'Sicily', city: 'Sciacca', experiences: ['Beach','Wellness','Family'], description: 'A 560-acre Sicilian coastal estate with three golf courses and a mile and a half of private shoreline.', featuredIn: ['region-sicily'] },
  { name: 'San Domenico Palace, A Four Seasons Hotel', country: 'Italy', region: 'Sicily', city: 'Taormina', experiences: ['Heritage','Beach'], description: 'The 14th-century monastery at the top of Taormina where The White Lotus filmed — Four Seasons took it over in 2021.', featuredIn: ['city-taormina'] },
  { name: 'Villa Igiea, A Rocco Forte Hotel', country: 'Italy', region: 'Sicily', city: 'Palermo', experiences: ['Heritage','City'], description: 'Art Nouveau palazzo on Palermo\'s bay, fully restored by Olga Polizzi — Sicily\'s capital finally has a hotel to match its history.', featuredIn: [] },

  // ── France ──
  { name: 'Ritz Paris', country: 'France', region: 'Île-de-France', city: 'Paris', experiences: ['City','Heritage'], description: 'Place Vendôme since 1898 — Hemingway\'s bar, Coco\'s apartment, and the hotel every other hotel is measured against.', featuredIn: ['country-france','city-paris'] },
  { name: 'Hôtel de Crillon, A Rosewood Hotel', country: 'France', region: 'Île-de-France', city: 'Paris', experiences: ['City','Heritage'], description: 'A Louis XV palace on Place de la Concorde — Karl Lagerfeld designed two suites before he died.', featuredIn: [] },
  { name: 'Le Bristol Paris', country: 'France', region: 'Île-de-France', city: 'Paris', experiences: ['City','Heritage','Wellness'], description: 'The Faubourg Saint-Honoré grande dame with a rooftop pool shaped like a yacht — and the cat, Fa-Raon, who rules the lobby.', featuredIn: [] },
  { name: 'Cheval Blanc Paris', country: 'France', region: 'Île-de-France', city: 'Paris', experiences: ['City','Wellness'], description: 'LVMH\'s Paris flagship above La Samaritaine — 72 suites, a Dior spa, and Seine views from every window.', featuredIn: [] },
  { name: 'Hôtel Plaza Athénée', country: 'France', region: 'Île-de-France', city: 'Paris', experiences: ['City','Heritage'], description: 'The red geraniums on Avenue Montaigne — couture row\'s haute address since 1913.', featuredIn: [] },
  { name: 'The Peninsula Paris', country: 'France', region: 'Île-de-France', city: 'Paris', experiences: ['City','Heritage','Wellness'], description: 'A Haussmann-era palace four blocks from the Arc de Triomphe — the rooftop terrace may be Paris\'s best dinner view.', featuredIn: [] },
  { name: 'Le Meurice', country: 'France', region: 'Île-de-France', city: 'Paris', experiences: ['City','Heritage'], description: 'Salvador Dalí lived here for a month a year for 30 years — the Tuileries palace has that effect.', featuredIn: [] },
  { name: 'Château de la Messardière', country: 'France', region: 'Provence-Alpes-Côte d\'Azur', city: 'Saint-Tropez', experiences: ['Beach','Heritage','Boutique'], description: 'A 19th-century château above Pampelonne — the only Airelles property in Saint-Tropez, and the one with the vineyard.', featuredIn: ['city-saint-tropez'] },
  { name: 'Hôtel du Cap-Eden-Roc', country: 'France', region: 'Provence-Alpes-Côte d\'Azur', city: 'Antibes', experiences: ['Beach','Heritage'], description: 'The Cap d\'Antibes legend — private cabanas cut into the rocks, and a guest list that has barely changed since F. Scott Fitzgerald.', featuredIn: ['region-provence-alpes-cote-d-azur'] },
  { name: 'Grand-Hôtel du Cap-Ferrat, A Four Seasons Hotel', country: 'France', region: 'Provence-Alpes-Côte d\'Azur', city: 'Saint-Jean-Cap-Ferrat', experiences: ['Beach','Heritage'], description: 'A Belle Époque palace on Cap Ferrat\'s peninsula — the Olympic seawater pool sits inches from the Mediterranean.', featuredIn: [] },
  { name: 'La Colombe d\'Or', country: 'France', region: 'Provence-Alpes-Côte d\'Azur', city: 'Saint-Paul-de-Vence', experiences: ['Heritage','Boutique'], description: 'Picasso, Matisse, and Chagall paid for meals in paintings — the walls are still hung with them.', featuredIn: [] },
  { name: 'La Réserve de Beaulieu', country: 'France', region: 'Provence-Alpes-Côte d\'Azur', city: 'Beaulieu-sur-Mer', experiences: ['Beach','Wellness','Boutique'], description: 'A pink Florentine palazzo on the Riviera\'s quieter stretch — 40 rooms, all with sea views.', featuredIn: [] },
  { name: 'Château de la Gaude', country: 'France', region: 'Provence-Alpes-Côte d\'Azur', city: 'Aix-en-Provence', experiences: ['Wine Country','Heritage','Boutique'], description: 'A 16th-century estate and working vineyard outside Aix — eleven rooms, Cézanne\'s Mont Sainte-Victoire out the window.', featuredIn: ['experience-wine-country'] },
  { name: 'Villa La Coste', country: 'France', region: 'Provence-Alpes-Côte d\'Azur', city: 'Le Puy-Sainte-Réparade', experiences: ['Wine Country','Wellness','Boutique'], description: 'An art and wine estate in the Luberon — Louise Bourgeois spiders in the olive grove, Richard Rogers\' visitor center, 28 villas.', featuredIn: [] },
  { name: 'Les Sources de Caudalie', country: 'France', region: 'Nouvelle-Aquitaine', city: 'Martillac', experiences: ['Wine Country','Wellness'], description: 'The hotel that invented vinotherapy — set in the vines of a Bordeaux grand cru, with a spa built around the grape.', featuredIn: ['region-nouvelle-aquitaine'] },
  { name: 'Airelles Gordes, La Bastide', country: 'France', region: 'Provence-Alpes-Côte d\'Azur', city: 'Gordes', experiences: ['Heritage','Boutique'], description: 'A 17th-century bastide at the edge of Provence\'s most photographed hilltop village — 40 rooms behind ochre walls.', featuredIn: [] },
  { name: 'Le Mas Candille', country: 'France', region: 'Provence-Alpes-Côte d\'Azur', city: 'Mougins', experiences: ['Wellness','Boutique'], description: 'A restored 18th-century mas in the hills above Cannes — a Shiseido spa and a Michelin kitchen, pine-scented and quiet.', featuredIn: [] },
  { name: 'Airelles Courchevel, Les Airelles', country: 'France', region: 'Auvergne-Rhône-Alpes', city: 'Courchevel', experiences: ['Ski','Family','Heritage'], description: 'Ski-in, ski-out at Courchevel 1850 — the Alpine palace the Russian oligarchs built a reputation on, now back in French hands.', featuredIn: ['experience-ski','city-courchevel'] },
  { name: 'Cheval Blanc Courchevel', country: 'France', region: 'Auvergne-Rhône-Alpes', city: 'Courchevel', experiences: ['Ski','Wellness'], description: 'LVMH\'s original Cheval Blanc — 36 rooms at the foot of the slopes, Dior spa, and a Yannick Alléno tasting menu.', featuredIn: [] },
  { name: 'Les Fermes de Marie', country: 'France', region: 'Auvergne-Rhône-Alpes', city: 'Megève', experiences: ['Ski','Wellness','Family'], description: 'A village of antique farmhouses reassembled in Megève — the Alpine idea of a hotel before the sterile palaces took over.', featuredIn: [] },
]

// ─── COUNTRY CONTINENTS ───────────────────────────────────────────────────────
const COUNTRY_CONTINENTS: Record<string, string> = {
  'Italy': 'Europe', 'France': 'Europe', 'Greece': 'Europe', 'Spain': 'Europe',
  'Portugal': 'Europe', 'Switzerland': 'Europe', 'Austria': 'Europe', 'Germany': 'Europe',
  'United Kingdom': 'Europe', 'Iceland': 'Europe',
  'Japan': 'Asia', 'Thailand': 'Asia', 'Indonesia': 'Asia', 'Maldives': 'Asia',
  'India': 'Asia', 'Sri Lanka': 'Asia', 'Vietnam': 'Asia', 'Bhutan': 'Asia',
  'UAE': 'Middle East', 'Saudi Arabia': 'Middle East', 'Jordan': 'Middle East', 'Oman': 'Middle East',
  'Morocco': 'Africa', 'Kenya': 'Africa', 'Tanzania': 'Africa', 'South Africa': 'Africa',
  'Rwanda': 'Africa', 'Botswana': 'Africa', 'Namibia': 'Africa', 'Seychelles': 'Africa',
  'United States': 'North America', 'Mexico': 'North America', 'Canada': 'North America',
  'Costa Rica': 'North America', 'Belize': 'North America',
  'Caribbean': 'Caribbean', 'Dominican Republic': 'Caribbean',
  'Brazil': 'South America', 'Peru': 'South America', 'Argentina': 'South America', 'Chile': 'South America',
  'Australia': 'Oceania', 'New Zealand': 'Oceania', 'Fiji': 'Oceania',
}

async function seed() {
  console.log('🌍 Best Hotels seed script\n')

  // Build unique sets
  const countriesSet = new Set<string>()
  const regionsSet = new Map<string, string>() // region name -> country name
  const citiesSet = new Map<string, { country: string; region: string }>() // city name -> {country, region}

  for (const h of HOTELS) {
    countriesSet.add(h.country)
    regionsSet.set(h.region, h.country)
    citiesSet.set(h.city, { country: h.country, region: h.region })
  }

  // 1. Countries
  process.stdout.write('Creating countries...')
  const countryMap: Record<string, string> = {}
  for (const name of countriesSet) {
    const s = slug(name)
    const id = `country-${s}`
    await client.createOrReplace({
      _type: 'country', _id: id,
      name,
      slug: { _type: 'slug', current: s },
      continent: COUNTRY_CONTINENTS[name] || 'Europe',
    })
    countryMap[name] = id
    process.stdout.write('.')
  }
  console.log(` ✓ (${countriesSet.size})`)

  // 2. Regions
  process.stdout.write('Creating regions...')
  const regionMap: Record<string, string> = {}
  for (const [name, countryName] of regionsSet) {
    const s = slug(name)
    const countryId = countryMap[countryName]
    const id = `region-${s}`
    await client.createOrReplace({
      _type: 'region', _id: id,
      name,
      slug: { _type: 'slug', current: s },
      country: { _type: 'reference', _ref: countryId },
    })
    regionMap[name] = id
    process.stdout.write('.')
  }
  console.log(` ✓ (${regionsSet.size})`)

  // 3. Cities
  process.stdout.write('Creating cities...')
  const cityMap: Record<string, string> = {}
  for (const [name, { country: countryName, region: regionName }] of citiesSet) {
    const s = slug(name)
    const countryId = countryMap[countryName]
    const regionId = regionMap[regionName]
    const id = `city-${s}`
    await client.createOrReplace({
      _type: 'city', _id: id,
      name,
      slug: { _type: 'slug', current: s },
      country: { _type: 'reference', _ref: countryId },
      region: { _type: 'reference', _ref: regionId },
    })
    cityMap[name] = id
    process.stdout.write('.')
  }
  console.log(` ✓ (${citiesSet.size})`)

  // 4. Hotels
  process.stdout.write('Creating hotels...')
  for (const h of HOTELS) {
    const s = slug(h.name)
    const id = `hotel-${s}`
    await client.createOrReplace({
      _type: 'hotel', _id: id,
      name: h.name,
      slug: { _type: 'slug', current: s },
      country: { _type: 'reference', _ref: countryMap[h.country] },
      region: { _type: 'reference', _ref: regionMap[h.region] },
      city: { _type: 'reference', _ref: cityMap[h.city] },
      experiences: h.experiences,
      description: h.description,
      featuredIn: h.featuredIn,
    })
    process.stdout.write('.')
  }
  console.log(` ✓ (${HOTELS.length})`)

  console.log(`\n✅ Seed complete!\n   ${countriesSet.size} countries\n   ${regionsSet.size} regions\n   ${citiesSet.size} cities\n   ${HOTELS.length} hotels`)
}

seed().catch(err => { console.error('❌ Seed failed:', err); process.exit(1) })
