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

  // ── Rest of Europe ──
  { name: 'Hotel Grande Bretagne', country: 'Greece', region: 'Attica', city: 'Athens', experiences: ['City','Heritage'], description: 'Acropolis views from the rooftop pool — Athens\'s grand dame since 1874, and still the city\'s only real option.', featuredIn: ['country-greece','city-athens'] },
  { name: 'Amanzoe', country: 'Greece', region: 'Peloponnese', city: 'Porto Heli', experiences: ['Beach','Wellness','Boutique'], description: 'An acropolis of Aman pavilions above the Aegean — 38 suites with private pools and a beach club down the hill.', featuredIn: ['region-peloponnese'] },
  { name: 'Canaves Oia Suites', country: 'Greece', region: 'South Aegean', city: 'Oia', experiences: ['Beach','Boutique','Honeymoon'], description: 'Whitewashed cave suites carved into Santorini\'s caldera cliff — Oia\'s original luxury address.', featuredIn: ['city-oia'] },
  { name: 'Grace Hotel Santorini, Auberge Resorts Collection', country: 'Greece', region: 'South Aegean', city: 'Imerovigli', experiences: ['Beach','Honeymoon','Boutique'], description: 'Perched on Santorini\'s highest cliff — 21 suites, a champagne bar, and the caldera sunset without Oia\'s crowds.', featuredIn: [] },
  { name: 'Belvedere Mykonos', country: 'Greece', region: 'South Aegean', city: 'Mykonos', experiences: ['Beach','Boutique','Adults-Only'], description: 'Mykonos Town\'s sleek design hotel — Matsuhisa restaurant and pool scenes that define the island\'s summer.', featuredIn: ['city-mykonos'] },
  { name: 'Cavo Tagoo Mykonos', country: 'Greece', region: 'South Aegean', city: 'Mykonos', experiences: ['Beach','Adults-Only','Honeymoon'], description: 'Infinity pool carved into the Mykonos rock with the Aegean as backdrop — the most-photographed hotel bar in the Cyclades.', featuredIn: [] },
  { name: 'Daios Cove', country: 'Greece', region: 'Crete', city: 'Agios Nikolaos', experiences: ['Beach','Family','Wellness'], description: 'A private cove on Crete\'s east coast — villa suites cascade down the hillside to a Blue Flag beach.', featuredIn: ['region-crete'] },
  { name: 'Mandarin Oriental Ritz, Madrid', country: 'Spain', region: 'Community of Madrid', city: 'Madrid', experiences: ['City','Heritage'], description: 'The 1910 Ritz reopened by Mandarin after a top-to-bottom restoration — Madrid\'s most serious address, reset.', featuredIn: ['country-spain','city-madrid'] },
  { name: 'Four Seasons Hotel Madrid', country: 'Spain', region: 'Community of Madrid', city: 'Madrid', experiences: ['City','Wellness'], description: 'Seven restored historic buildings knitted into one hotel at Centro Canalejas — Madrid\'s biggest luxury statement in a decade.', featuredIn: [] },
  { name: 'Hotel Arts Barcelona', country: 'Spain', region: 'Catalonia', city: 'Barcelona', experiences: ['City','Beach'], description: 'Ritz-Carlton\'s Barcelona tower on the marina — the city\'s only beachfront luxury hotel, with Enoteca by Paco Pérez inside.', featuredIn: ['city-barcelona'] },
  { name: 'Mandarin Oriental Barcelona', country: 'Spain', region: 'Catalonia', city: 'Barcelona', experiences: ['City','Wellness'], description: 'A former bank on Passeig de Gràcia reimagined by Patricia Urquiola — rooftop pool with a Gaudí skyline.', featuredIn: [] },
  { name: 'Finca Cortesin', country: 'Spain', region: 'Andalusia', city: 'Casares', experiences: ['Beach','Wellness','Family'], description: 'A 215-hectare estate on the Costa del Sol with a championship golf course — hosted the Solheim Cup and Europe\'s LPGA regulars.', featuredIn: ['region-andalusia'] },
  { name: 'Marbella Club Hotel', country: 'Spain', region: 'Andalusia', city: 'Marbella', experiences: ['Beach','Heritage','Wellness'], description: 'Prince Alfonso von Hohenlohe\'s 1954 beach club — the hotel that invented the Costa del Sol.', featuredIn: ['city-marbella'] },
  { name: 'Hotel Son Net', country: 'Spain', region: 'Balearic Islands', city: 'Puigpunyent', experiences: ['Heritage','Boutique','Wine Country'], description: 'A 17th-century Mallorcan finca in the Tramuntana mountains — 31 rooms, olive groves, and one of Spain\'s oldest private art collections.', featuredIn: [] },
  { name: 'Six Senses Ibiza', country: 'Spain', region: 'Balearic Islands', city: 'Ibiza', experiences: ['Beach','Wellness','Eco'], description: 'Ibiza\'s quiet north coast — carbon-neutral construction, a biodynamic farm, and Xavier Corberó-designed villas.', featuredIn: ['city-ibiza'] },
  { name: 'Hotel Metropole Monte-Carlo', country: 'Monaco', region: 'Monaco', city: 'Monte Carlo', experiences: ['City','Heritage','Wellness'], description: 'A Belle Époque palace steps from the Casino — Jacques Garcia design, Joël Robuchon kitchen.', featuredIn: ['country-monaco'] },
  { name: 'Hôtel de Paris Monte-Carlo', country: 'Monaco', region: 'Monaco', city: 'Monte Carlo', experiences: ['City','Heritage'], description: 'Across from the Casino since 1864 — Monte Carlo\'s signature address, reopened after a five-year restoration.', featuredIn: [] },
  { name: 'The Dolder Grand', country: 'Switzerland', region: 'Zurich', city: 'Zurich', experiences: ['City','Wellness','Heritage'], description: 'A fairy-tale castle above Zurich with a 4,000-square-meter spa and a Warhol over the reception desk.', featuredIn: ['country-switzerland','city-zurich'] },
  { name: 'Badrutt\'s Palace Hotel', country: 'Switzerland', region: 'Graubünden', city: 'St. Moritz', experiences: ['Ski','Heritage','Wellness'], description: 'The St. Moritz institution since 1896 — the hotel that essentially invented Alpine winter tourism.', featuredIn: ['city-st-moritz'] },
  { name: 'The Alpina Gstaad', country: 'Switzerland', region: 'Bern', city: 'Gstaad', experiences: ['Ski','Wellness','Family'], description: 'Gstaad\'s newest grand hotel — 56 rooms, a Six Senses spa, and a sushi restaurant good enough to draw Zurich in for dinner.', featuredIn: [] },
  { name: 'Gstaad Palace', country: 'Switzerland', region: 'Bern', city: 'Gstaad', experiences: ['Ski','Heritage'], description: 'The turreted silhouette Gstaad\'s silhouette belongs to — still family-owned after four generations of Scherzes.', featuredIn: [] },
  { name: 'Bürgenstock Resort Lake Lucerne', country: 'Switzerland', region: 'Nidwalden', city: 'Bürgenstock', experiences: ['Wellness','Heritage'], description: 'A clifftop village 1,500 feet above Lake Lucerne — Audrey Hepburn\'s favorite, now a four-hotel complex after a billion-franc redo.', featuredIn: [] },
  { name: 'Kulm Hotel St. Moritz', country: 'Switzerland', region: 'Graubünden', city: 'St. Moritz', experiences: ['Ski','Heritage'], description: 'The hotel that hosted the first Winter Olympics — and before that, invented the concept of winter tourism entirely.', featuredIn: [] },
  { name: 'Claridge\'s', country: 'United Kingdom', region: 'England', city: 'London', experiences: ['City','Heritage'], description: 'Mayfair\'s art deco anchor — the hotel the royal family uses as a spare dining room.', featuredIn: ['country-united-kingdom','city-london'] },
  { name: 'The Savoy', country: 'United Kingdom', region: 'England', city: 'London', experiences: ['City','Heritage'], description: 'Art deco on the Strand since 1889 — Churchill\'s cabinet room, Sinatra\'s stage, Monet\'s Thames view.', featuredIn: [] },
  { name: 'The Connaught', country: 'United Kingdom', region: 'England', city: 'London', experiences: ['City','Heritage'], description: 'Mayfair\'s discreet gentleman — Hélène Darroze\'s three Michelin stars and a cocktail bar named world\'s best three times.', featuredIn: [] },
  { name: 'The Berkeley', country: 'United Kingdom', region: 'England', city: 'London', experiences: ['City','Wellness'], description: 'Knightsbridge\'s modern palace — rooftop pool, Marcus Wareing in the kitchen, and fashion-week\'s favorite tea service.', featuredIn: [] },
  { name: 'The Peninsula London', country: 'United Kingdom', region: 'England', city: 'London', experiences: ['City','Wellness'], description: 'Peninsula\'s London debut at Hyde Park Corner — 190 rooms, the brand\'s signature service, and fleet of BMW 7 Series at the curb.', featuredIn: [] },
  { name: 'Gleneagles', country: 'United Kingdom', region: 'Scotland', city: 'Auchterarder', experiences: ['Heritage','Family','Wilderness'], description: 'An 850-acre Perthshire estate with three championship golf courses and falconry at breakfast — Scotland\'s grande dame.', featuredIn: ['region-scotland'] },
  { name: 'The Fife Arms', country: 'United Kingdom', region: 'Scotland', city: 'Braemar', experiences: ['Heritage','Boutique','Wilderness'], description: 'Iwan and Manuela Wirth\'s Highland gallery-inn — Picassos on the walls, Cairngorms out the window.', featuredIn: [] },
  { name: 'Belmond Le Manoir aux Quat\'Saisons', country: 'United Kingdom', region: 'England', city: 'Great Milton', experiences: ['Wine Country','Boutique','Heritage'], description: 'Raymond Blanc\'s Oxfordshire manor — two Michelin stars for 40 years running, and the gardens that supply them.', featuredIn: [] },
  { name: 'Chewton Glen', country: 'United Kingdom', region: 'England', city: 'New Milton', experiences: ['Wellness','Family','Heritage'], description: 'A 130-acre estate on the edge of the New Forest — English country house hotel-keeping at its most polished.', featuredIn: [] },
  { name: 'Belmond Reid\'s Palace', country: 'Portugal', region: 'Madeira', city: 'Funchal', experiences: ['Beach','Heritage'], description: 'A pink palace on a Madeira cliff since 1891 — Churchill\'s winter painting studio, and still serving tea on the same terrace.', featuredIn: ['country-portugal'] },
  { name: 'Six Senses Douro Valley', country: 'Portugal', region: 'Norte', city: 'Lamego', experiences: ['Wine Country','Wellness','Eco'], description: 'A 19th-century manor in Portugal\'s port wine country — Douro terraces, a Shiseido spa, and a sommelier who\'ll take you into his cellar.', featuredIn: ['region-norte'] },
  { name: 'Bela Vista Hotel & Spa', country: 'Portugal', region: 'Algarve', city: 'Praia da Rocha', experiences: ['Beach','Heritage','Boutique'], description: 'A 1918 Algarve mansion with its own stretch of sand — 38 rooms behind a blue-and-white azulejo façade.', featuredIn: ['region-algarve'] },
  { name: 'Four Seasons Hotel Ritz Lisbon', country: 'Portugal', region: 'Lisbon', city: 'Lisbon', experiences: ['City','Heritage'], description: '1950s modernist palace over Eduardo VII Park — the art collection alone is worth the stay.', featuredIn: ['city-lisbon'] },
  { name: 'Torel Palace Lisbon', country: 'Portugal', region: 'Lisbon', city: 'Lisbon', experiences: ['City','Boutique','Heritage'], description: 'A 19th-century palace on one of Lisbon\'s seven hills — 28 rooms, a rooftop pool, and views straight down to the Tagus.', featuredIn: [] },
  { name: 'Deplar Farm', country: 'Iceland', region: 'Northwestern Region', city: 'Fljót', experiences: ['Wilderness','Wellness','Boutique'], description: 'Eleanor Kennedy-owned farmhouse in Iceland\'s Troll Peninsula — heli-skiing, Atlantic salmon, and northern lights from the geothermal pool.', featuredIn: ['country-iceland','experience-wilderness'] },
  { name: 'The Retreat at Blue Lagoon Iceland', country: 'Iceland', region: 'Southern Peninsula', city: 'Grindavík', experiences: ['Wellness','Boutique'], description: 'Sixty suites embedded into a 800-year-old lava flow — private access to the Blue Lagoon after the day-trippers leave.', featuredIn: [] },
  { name: 'Hotel Rangá', country: 'Iceland', region: 'Southern Region', city: 'Hella', experiences: ['Wilderness','Boutique'], description: 'A log lodge with its own observatory — Iceland\'s south shore with glaciers, waterfalls, and guaranteed dark skies out the window.', featuredIn: [] },

  // ── Caribbean ──
  { name: 'Eden Rock - St Barths', country: 'Saint Barthélemy', region: 'Saint Barthélemy', city: 'Saint-Jean', experiences: ['Beach','Boutique','Heritage'], description: 'The island\'s original hotel — 37 rooms on a rocky promontory where the beach meets the Caribbean\'s most quietly exclusive address.', featuredIn: ['country-saint-barthelemy'] },
  { name: 'Cheval Blanc St-Barth Isle de France', country: 'Saint Barthélemy', region: 'Saint Barthélemy', city: 'Flamands', experiences: ['Beach','Wellness','Boutique'], description: 'LVMH\'s quiet Caribbean — Flamands Beach, a Guerlain spa, and service that seems to know what you want before you do.', featuredIn: [] },
  { name: 'Rosewood Le Guanahani', country: 'Saint Barthélemy', region: 'Saint Barthélemy', city: 'Grand Cul-de-Sac', experiences: ['Beach','Family','Wellness'], description: 'Sixteen acres on a St. Barts peninsula with two beaches — Rosewood\'s 2022 reinvention of the island\'s longtime family favorite.', featuredIn: [] },
  { name: 'Amanyara', country: 'Turks and Caicos', region: 'Providenciales', city: 'Providenciales', experiences: ['Beach','Wellness','Boutique'], description: 'Aman\'s Caribbean outpost on Providenciales\' wild northwest coast — 38 pavilions facing a reef-protected turquoise bay.', featuredIn: ['country-turks-and-caicos','experience-beach'] },
  { name: 'Como Parrot Cay', country: 'Turks and Caicos', region: 'Parrot Cay', city: 'Parrot Cay', experiences: ['Beach','Wellness','Boutique'], description: 'A private 1,000-acre island reachable only by boat — Bruce Willis and Keith Richards have both kept villas here.', featuredIn: [] },
  { name: 'The Shore Club Turks and Caicos', country: 'Turks and Caicos', region: 'Providenciales', city: 'Providenciales', experiences: ['Beach','Family'], description: 'The only resort on Long Bay Beach — miles of windswept shallows on the island\'s Atlantic-facing coast.', featuredIn: [] },
  { name: 'Belmond Cap Juluca', country: 'Anguilla', region: 'Anguilla', city: 'Maundays Bay', experiences: ['Beach','Honeymoon','Boutique'], description: 'Moorish-domed villas arc around Maundays Bay — Anguilla\'s most photographed stretch of powder-white.', featuredIn: ['country-anguilla'] },
  { name: 'Four Seasons Resort and Residences Anguilla', country: 'Anguilla', region: 'Anguilla', city: 'Barnes Bay', experiences: ['Beach','Wellness','Family'], description: 'Barnes Bay\'s cliff-to-sea property — the Caribbean\'s most architecturally ambitious Four Seasons.', featuredIn: [] },
  { name: 'Malliouhana, Auberge Resorts Collection', country: 'Anguilla', region: 'Anguilla', city: 'Meads Bay', experiences: ['Beach','Heritage'], description: 'The Anguilla classic since 1984, reborn under Auberge — perched above Meads Bay with the island\'s original serious kitchen.', featuredIn: [] },
  { name: 'Jade Mountain', country: 'Saint Lucia', region: 'Saint Lucia', city: 'Soufrière', experiences: ['Beach','Honeymoon','Boutique'], description: 'Open-walled sanctuaries facing the Pitons — no fourth wall, just the Caribbean pouring in.', featuredIn: ['country-saint-lucia','experience-honeymoon'] },
  { name: 'Ladera Resort', country: 'Saint Lucia', region: 'Saint Lucia', city: 'Soufrière', experiences: ['Beach','Boutique','Honeymoon'], description: 'Cantilevered over the ridge between Saint Lucia\'s twin Pitons — every suite is missing a wall, by design.', featuredIn: [] },
  { name: 'Sugar Beach, A Viceroy Resort', country: 'Saint Lucia', region: 'Saint Lucia', city: 'Soufrière', experiences: ['Beach','Wellness','Family'], description: 'The only resort set directly between the Pitons — 100 white cottages on Saint Lucia\'s most dramatic cove.', featuredIn: [] },
  { name: 'Round Hill Hotel and Villas', country: 'Jamaica', region: 'Saint James', city: 'Montego Bay', experiences: ['Beach','Heritage','Boutique'], description: 'Ralph Lauren-designed Jamaican escape since 1953 — a 110-acre peninsula where JFK and Jackie honeymooned.', featuredIn: ['country-jamaica'] },
  { name: 'GoldenEye', country: 'Jamaica', region: 'Saint Mary', city: 'Oracabessa', experiences: ['Beach','Heritage','Boutique'], description: 'Ian Fleming wrote every James Bond novel here — Chris Blackwell\'s Island Outpost preserved the estate as a hotel.', featuredIn: [] },
  { name: 'Jamaica Inn', country: 'Jamaica', region: 'Saint Ann', city: 'Ocho Rios', experiences: ['Beach','Heritage'], description: 'Forty-eight rooms, no TVs, no phones — Churchill painted here, Noël Coward lived next door, and nothing has changed since 1950.', featuredIn: [] },
  { name: 'Sandy Lane', country: 'Barbados', region: 'Saint James', city: 'Holetown', experiences: ['Beach','Heritage','Family'], description: 'Barbados\'s coral-stone classic on the west coast — Tiger Woods got married on the 18th hole.', featuredIn: ['country-barbados'] },
  { name: 'Cobblers Cove', country: 'Barbados', region: 'Saint Peter', city: 'Speightstown', experiences: ['Beach','Boutique'], description: 'An English country house on the Caribbean — 40 suites, all facing the sea, with the most serious kitchen on the island.', featuredIn: [] },
  { name: 'Hermitage Bay', country: 'Antigua and Barbuda', region: 'Antigua', city: 'Saint Mary\'s', experiences: ['Beach','Eco','Honeymoon'], description: 'All-inclusive the way it should be — 30 hillside cottages on a private Antiguan bay, accessible only by boat or jungle track.', featuredIn: ['country-antigua-and-barbuda'] },
  { name: 'Jumby Bay Island, An Oetker Collection Hotel', country: 'Antigua and Barbuda', region: 'Antigua', city: 'Long Island', experiences: ['Beach','Family','Boutique'], description: 'A private 300-acre island off Antigua reachable only by a Jumby Bay boat — Oetker-managed since 2014.', featuredIn: [] },
  { name: 'Nisbet Plantation Beach Club', country: 'Saint Kitts and Nevis', region: 'Nevis', city: 'Newcastle', experiences: ['Beach','Heritage'], description: 'A restored 1778 coconut plantation on Nevis\'s windward coast — the Caribbean before branding arrived.', featuredIn: ['country-saint-kitts-and-nevis'] },
  { name: 'Four Seasons Resort Nevis', country: 'Saint Kitts and Nevis', region: 'Nevis', city: 'Pinney\'s Beach', experiences: ['Beach','Family','Wellness'], description: 'Four Seasons\' Caribbean flagship on Pinney\'s Beach — Robert Trent Jones II course and the island\'s only real resort.', featuredIn: [] },
  { name: 'Secret Bay', country: 'Dominica', region: 'Saint John', city: 'Portsmouth', experiences: ['Beach','Eco','Wellness'], description: 'The Caribbean\'s best-kept secret — eight treehouse villas on a Dominica cliff, with no staff visible unless you ring the bell.', featuredIn: ['country-dominica','experience-eco'] },
  { name: 'The Ocean Club, A Four Seasons Resort, Bahamas', country: 'Bahamas', region: 'New Providence', city: 'Paradise Island', experiences: ['Beach','Family','Heritage'], description: 'Versailles-style gardens a Huntington Hartford built in the 1960s — the Bahamas\'s grande dame, now Four Seasons-run.', featuredIn: ['country-bahamas'] },
  { name: 'Kamalame Cay', country: 'Bahamas', region: 'Andros', city: 'Andros', experiences: ['Beach','Boutique','Eco'], description: 'A private 96-acre island off Andros — 20 villas, one kitchen, and the Bahamas\' quietest bonefishing flats.', featuredIn: [] },
  { name: 'Ani Private Resorts Dominican Republic', country: 'Dominican Republic', region: 'Samaná', city: 'Playa Rincón', experiences: ['Beach','Boutique','Family'], description: 'A private cliffside compound on the Samaná Peninsula — bookable in full or by villa, designed for generational travel.', featuredIn: ['country-dominican-republic'] },

  // ── US + Mexico ──
  { name: 'The Carlyle, A Rosewood Hotel', country: 'United States', region: 'New York', city: 'New York', experiences: ['City','Heritage'], description: 'Seventy-six East 76th Street since 1930 — JFK\'s pied-à-terre, Diana\'s Manhattan base, and still the quietest address on the Upper East Side.', featuredIn: ['country-united-states','city-new-york'] },
  { name: 'The Mark', country: 'United States', region: 'New York', city: 'New York', experiences: ['City','Heritage'], description: 'Jacques Grange-designed townhouse hotel on Madison and 77th — the Met Gala\'s unofficial green room.', featuredIn: [] },
  { name: 'Aman New York', country: 'United States', region: 'New York', city: 'New York', experiences: ['City','Wellness'], description: 'Aman\'s $2B transformation of the Crown Building on 57th and Fifth — 83 suites around a triple-height Japanese-style cedar atrium.', featuredIn: [] },
  { name: 'The Beverly Hills Hotel', country: 'United States', region: 'California', city: 'Beverly Hills', experiences: ['City','Heritage'], description: 'The Pink Palace since 1912 — bungalows once kept by Elizabeth Taylor and Howard Hughes, and the Polo Lounge where Hollywood still does its deals.', featuredIn: ['region-california'] },
  { name: 'Hotel Bel-Air', country: 'United States', region: 'California', city: 'Los Angeles', experiences: ['City','Heritage','Wellness'], description: 'Twelve acres of hidden gardens in Bel Air — Grace Kelly\'s favorite, with a swan lake and a La Prairie spa.', featuredIn: [] },
  { name: 'Shutters on the Beach', country: 'United States', region: 'California', city: 'Santa Monica', experiences: ['Beach','City'], description: 'The only actual beachfront hotel in Santa Monica — Cape Cod shingle and an ocean at the door.', featuredIn: [] },
  { name: 'Amangiri', country: 'United States', region: 'Utah', city: 'Canyon Point', experiences: ['Desert','Wellness','Wilderness','Adults-Only'], description: 'Six hundred acres of Utah canyon outside Page — Aman carved into sandstone, the desert as your backyard.', featuredIn: ['experience-desert','experience-wilderness','region-utah'] },
  { name: 'The Little Nell', country: 'United States', region: 'Colorado', city: 'Aspen', experiences: ['Ski','Wellness','Wine Country'], description: 'Ski-in, ski-out at the gondola base in Aspen — one of only six five-star, five-diamond hotels in America.', featuredIn: ['city-aspen'] },
  { name: 'The St. Regis Aspen Resort', country: 'United States', region: 'Colorado', city: 'Aspen', experiences: ['Ski','Wellness','Family'], description: 'Aspen\'s largest luxury resort at the base of Lift 1A — the bar still carries the town\'s deepest champagne list.', featuredIn: [] },
  { name: 'Auberge du Soleil', country: 'United States', region: 'California', city: 'Rutherford', experiences: ['Wine Country','Wellness','Boutique'], description: 'Napa\'s original luxury hotel, high on a hill in Rutherford — an olive grove, a Michelin kitchen, and Cabernet country at your feet.', featuredIn: ['experience-wine-country'] },
  { name: 'Meadowood Napa Valley', country: 'United States', region: 'California', city: 'St. Helena', experiences: ['Wine Country','Wellness','Family'], description: 'A 250-acre Napa estate with its own croquet lawns — being rebuilt after 2020\'s fires, but the Cabernet cellar survives.', featuredIn: [] },
  { name: 'Post Ranch Inn', country: 'United States', region: 'California', city: 'Big Sur', experiences: ['Wellness','Wilderness','Adults-Only'], description: 'Big Sur\'s cliff-edge sanctuary — tree houses and ocean houses a thousand feet above the Pacific.', featuredIn: [] },
  { name: 'The Resort at Pelican Hill', country: 'United States', region: 'California', city: 'Newport Coast', experiences: ['Beach','Wellness','Family'], description: 'Palladian bungalows on a 500-acre Newport Coast bluff — two Tom Fazio courses and a 136-foot circular pool.', featuredIn: [] },
  { name: 'The Cloister at Sea Island', country: 'United States', region: 'Georgia', city: 'Sea Island', experiences: ['Beach','Family','Heritage'], description: 'Georgia\'s barrier island classic since 1928 — the only resort in North America with the Forbes five-star, five-diamond, and AAA five-diamond trifecta for 11 years running.', featuredIn: ['region-georgia'] },
  { name: 'The Ritz-Carlton Maui, Kapalua', country: 'United States', region: 'Hawaii', city: 'Maui', experiences: ['Beach','Family','Wellness'], description: 'Northwest Maui\'s 54-acre resort above D.T. Fleming Beach — Kapalua\'s two championship courses next door.', featuredIn: ['region-hawaii'] },
  { name: 'Four Seasons Resort Hualalai', country: 'United States', region: 'Hawaii', city: 'Kailua-Kona', experiences: ['Beach','Family','Wellness'], description: 'The Big Island\'s north-facing flagship — a Jack Nicklaus course, seven pools, and a Pacific reef at the snorkel desk.', featuredIn: [] },
  { name: 'Montage Kapalua Bay', country: 'United States', region: 'Hawaii', city: 'Maui', experiences: ['Beach','Family','Wellness'], description: 'Residential-style suites above Kapalua Bay — Maui\'s quiet northwest with the island\'s best snorkeling at the foot of the lawn.', featuredIn: [] },
  { name: 'Mauna Lani, Auberge Resorts Collection', country: 'United States', region: 'Hawaii', city: 'Kohala Coast', experiences: ['Beach','Wellness','Family'], description: 'Auberge\'s reinvention of the Big Island\'s Kohala Coast icon — set in a 3,200-acre black-lava kipuka with pre-contact fishponds intact.', featuredIn: [] },
  { name: 'The Langham, Boston', country: 'United States', region: 'Massachusetts', city: 'Boston', experiences: ['City','Heritage'], description: 'The former Federal Reserve building in Post Office Square — Boston\'s most architecturally serious hotel.', featuredIn: ['city-boston'] },
  { name: 'The Setai Miami Beach', country: 'United States', region: 'Florida', city: 'Miami Beach', experiences: ['Beach','City','Wellness'], description: 'An art deco hotel and 40-story glass tower on Collins Avenue — Miami Beach\'s most restrained luxury address.', featuredIn: ['city-miami-beach'] },
  { name: 'Faena Hotel Miami Beach', country: 'United States', region: 'Florida', city: 'Miami Beach', experiences: ['Beach','City'], description: 'Alan Faena\'s theatrical oceanfront — a Damien Hirst gold mammoth in the pool area and Baz Luhrmann suites inside.', featuredIn: [] },
  { name: 'The Surf Club, Four Seasons Hotel at the Surf Club', country: 'United States', region: 'Florida', city: 'Surfside', experiences: ['Beach','Heritage'], description: 'Richard Meier towers grafted onto a 1930 Surfside beach club — Thomas Keller runs the kitchen.', featuredIn: [] },
  { name: 'The Breakers Palm Beach', country: 'United States', region: 'Florida', city: 'Palm Beach', experiences: ['Beach','Heritage','Family'], description: 'Henry Flagler\'s 1926 Italian Renaissance palace on Palm Beach — still family-owned, still the standard.', featuredIn: [] },
  { name: 'Esperanza, An Auberge Resort', country: 'Mexico', region: 'Baja California Sur', city: 'Cabo San Lucas', experiences: ['Beach','Wellness','Boutique'], description: 'A private cove at the tip of Baja — 60 suites and casitas with outdoor showers and Sea of Cortez whale spotting from the terrace.', featuredIn: ['country-mexico','city-cabo-san-lucas'] },
  { name: 'One&Only Palmilla', country: 'Mexico', region: 'Baja California Sur', city: 'San José del Cabo', experiences: ['Beach','Family','Wellness'], description: 'The Sea of Cortez classic since 1956 — 174 rooms on a swimmable stretch of beach rare to Los Cabos.', featuredIn: [] },
  { name: 'Las Ventanas al Paraíso, A Rosewood Resort', country: 'Mexico', region: 'Baja California Sur', city: 'San José del Cabo', experiences: ['Beach','Wellness','Honeymoon'], description: 'The Corridor\'s original luxury resort — white adobe suites and butler-drawn tequila baths.', featuredIn: [] },
  { name: 'Rosewood Mayakoba', country: 'Mexico', region: 'Quintana Roo', city: 'Playa del Carmen', experiences: ['Beach','Wellness','Family'], description: 'Lagoon suites with private boat docks — Mayakoba\'s freshwater jungle resort connected by water taxi.', featuredIn: ['region-quintana-roo'] },
  { name: 'Azulik Tulum', country: 'Mexico', region: 'Quintana Roo', city: 'Tulum', experiences: ['Beach','Eco','Adults-Only'], description: 'Treehouse villas on the Tulum jungle beach — no electricity in rooms, no children, no shoes.', featuredIn: ['city-tulum'] },
  { name: 'Nayara Tented Camp', country: 'Mexico', region: 'Quintana Roo', city: 'Tulum', experiences: ['Beach','Eco','Boutique'], description: 'Canvas suites in the Tulum jungle with cenotes a short walk from bed — barefoot luxury with proper plumbing.', featuredIn: [] },
  { name: 'Hotel Matilda', country: 'Mexico', region: 'Guanajuato', city: 'San Miguel de Allende', experiences: ['Heritage','City','Boutique'], description: 'A modernist art hotel in San Miguel\'s colonial center — Bruce Nauman in the lobby, Mexico\'s design-hotel benchmark.', featuredIn: ['city-san-miguel-de-allende'] },
  { name: 'Casa Polanco', country: 'Mexico', region: 'Mexico City', city: 'Mexico City', experiences: ['City','Boutique','Heritage'], description: 'A 1940s mansion on Mexico City\'s Lincoln Park — 19 rooms in Polanco\'s quietest corner.', featuredIn: ['city-mexico-city'] },
  { name: 'Four Seasons Hotel Mexico City', country: 'Mexico', region: 'Mexico City', city: 'Mexico City', experiences: ['City','Heritage'], description: 'A neocolonial courtyard hotel on Paseo de la Reforma — Mexico City\'s longtime diplomatic favorite.', featuredIn: [] },
  { name: 'Chablé Yucatán', country: 'Mexico', region: 'Yucatán', city: 'Chocholá', experiences: ['Wellness','Eco','Heritage'], description: 'A restored hacienda around its own cenote — spa, hammocks, and a Mayan ceremony included with every stay.', featuredIn: ['region-yucatan'] },
]

// ─── COUNTRY CONTINENTS ───────────────────────────────────────────────────────
const COUNTRY_CONTINENTS: Record<string, string> = {
  'Italy': 'Europe', 'France': 'Europe', 'Greece': 'Europe', 'Spain': 'Europe',
  'Portugal': 'Europe', 'Switzerland': 'Europe', 'Austria': 'Europe', 'Germany': 'Europe',
  'United Kingdom': 'Europe', 'Iceland': 'Europe', 'Monaco': 'Europe',
  'Japan': 'Asia', 'Thailand': 'Asia', 'Indonesia': 'Asia', 'Maldives': 'Asia',
  'India': 'Asia', 'Sri Lanka': 'Asia', 'Vietnam': 'Asia', 'Bhutan': 'Asia',
  'UAE': 'Middle East', 'Saudi Arabia': 'Middle East', 'Jordan': 'Middle East', 'Oman': 'Middle East',
  'Morocco': 'Africa', 'Kenya': 'Africa', 'Tanzania': 'Africa', 'South Africa': 'Africa',
  'Rwanda': 'Africa', 'Botswana': 'Africa', 'Namibia': 'Africa', 'Seychelles': 'Africa',
  'United States': 'North America', 'Mexico': 'North America', 'Canada': 'North America',
  'Costa Rica': 'North America', 'Belize': 'North America',
  'Caribbean': 'Caribbean', 'Dominican Republic': 'Caribbean',
  'Saint Barthélemy': 'Caribbean', 'Turks and Caicos': 'Caribbean', 'Anguilla': 'Caribbean',
  'Saint Lucia': 'Caribbean', 'Jamaica': 'Caribbean', 'Barbados': 'Caribbean',
  'Antigua and Barbuda': 'Caribbean', 'Saint Kitts and Nevis': 'Caribbean',
  'Dominica': 'Caribbean', 'Bahamas': 'Caribbean',
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
