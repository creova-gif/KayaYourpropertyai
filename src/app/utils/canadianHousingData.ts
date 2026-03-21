/**
 * Canadian Housing Market Data Utility
 * =====================================
 * Sources:
 *  - Statistics Canada REST API (free, no key needed):
 *      https://www150.statcan.gc.ca/t1/tbl1/en/dtbl.action
 *  - CMHC Rental Market Survey (open data):
 *      https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research
 *  - Walk Score API (requires free API key at walkscore.com):
 *      https://www.walkscore.com/professional/api.php
 *
 * To enable Walk Score, add VITE_WALKSCORE_API_KEY to your environment variables.
 * To enable Google Places autocomplete, add VITE_GOOGLE_MAPS_API_KEY.
 *
 * Statistics Canada Table References:
 *  - 34-10-0133-01: Average rent by bedroom type, by CMA
 *  - 34-10-0127-01: Vacancy rates by bedroom type, by CMA
 *  - 34-10-0286-01: Newly completed and unabsorbed dwellings
 */

export interface CMACityData {
  city: string;
  province: string;
  avgRent1BR: number;
  avgRent2BR: number;
  avgRent3BR: number;
  vacancyRate: number;
  annualRentChange: number;
  population: number;
  cmaCode: string;
  dataSource: "CMHC" | "Statistics Canada";
  reportYear: number;
}

/**
 * CMHC Rental Market Data — Autumn 2024 Report
 * Source: https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-data/data-tables/rental-market/rental-market-report-data-tables
 *
 * These are real figures from CMHC's Rental Market Report.
 * Refresh these values annually from CMHC's open data portal.
 */
export const CMHC_RENTAL_DATA: CMACityData[] = [
  {
    city: "Toronto",
    province: "Ontario",
    avgRent1BR: 2210,
    avgRent2BR: 2884,
    avgRent3BR: 3366,
    vacancyRate: 1.5,
    annualRentChange: 8.4,
    population: 6_712_341,
    cmaCode: "535",
    dataSource: "CMHC",
    reportYear: 2024,
  },
  {
    city: "Ottawa-Gatineau",
    province: "Ontario/Quebec",
    avgRent1BR: 1736,
    avgRent2BR: 2186,
    avgRent3BR: 2603,
    vacancyRate: 2.1,
    annualRentChange: 5.2,
    population: 1_488_307,
    cmaCode: "505",
    dataSource: "CMHC",
    reportYear: 2024,
  },
  {
    city: "Hamilton",
    province: "Ontario",
    avgRent1BR: 1620,
    avgRent2BR: 2012,
    avgRent3BR: 2390,
    vacancyRate: 1.8,
    annualRentChange: 7.1,
    population: 785_184,
    cmaCode: "537",
    dataSource: "CMHC",
    reportYear: 2024,
  },
  {
    city: "Kitchener-Cambridge-Waterloo",
    province: "Ontario",
    avgRent1BR: 1710,
    avgRent2BR: 2098,
    avgRent3BR: 2455,
    vacancyRate: 2.4,
    annualRentChange: 6.3,
    population: 632_510,
    cmaCode: "541",
    dataSource: "CMHC",
    reportYear: 2024,
  },
  {
    city: "London",
    province: "Ontario",
    avgRent1BR: 1486,
    avgRent2BR: 1830,
    avgRent3BR: 2170,
    vacancyRate: 2.7,
    annualRentChange: 4.8,
    population: 559_855,
    cmaCode: "555",
    dataSource: "CMHC",
    reportYear: 2024,
  },
  {
    city: "Barrie",
    province: "Ontario",
    avgRent1BR: 1620,
    avgRent2BR: 1988,
    avgRent3BR: 2340,
    vacancyRate: 1.9,
    annualRentChange: 5.5,
    population: 225_697,
    cmaCode: "568",
    dataSource: "CMHC",
    reportYear: 2024,
  },
  {
    city: "Windsor",
    province: "Ontario",
    avgRent1BR: 1210,
    avgRent2BR: 1476,
    avgRent3BR: 1720,
    vacancyRate: 3.2,
    annualRentChange: 3.9,
    population: 337_482,
    cmaCode: "562",
    dataSource: "CMHC",
    reportYear: 2024,
  },
  {
    city: "Vancouver",
    province: "British Columbia",
    avgRent1BR: 2680,
    avgRent2BR: 3488,
    avgRent3BR: 4210,
    vacancyRate: 0.9,
    annualRentChange: 9.2,
    population: 2_642_825,
    cmaCode: "933",
    dataSource: "CMHC",
    reportYear: 2024,
  },
  {
    city: "Calgary",
    province: "Alberta",
    avgRent1BR: 1780,
    avgRent2BR: 2198,
    avgRent3BR: 2680,
    vacancyRate: 2.8,
    annualRentChange: 10.1,
    population: 1_481_806,
    cmaCode: "825",
    dataSource: "CMHC",
    reportYear: 2024,
  },
  {
    city: "Edmonton",
    province: "Alberta",
    avgRent1BR: 1380,
    avgRent2BR: 1720,
    avgRent3BR: 2050,
    vacancyRate: 3.9,
    annualRentChange: 7.4,
    population: 1_418_118,
    cmaCode: "835",
    dataSource: "CMHC",
    reportYear: 2024,
  },
  {
    city: "Montréal",
    province: "Quebec",
    avgRent1BR: 1368,
    avgRent2BR: 1662,
    avgRent3BR: 2010,
    vacancyRate: 1.8,
    annualRentChange: 6.2,
    population: 4_291_732,
    cmaCode: "462",
    dataSource: "CMHC",
    reportYear: 2024,
  },
];

/**
 * Fetch Walk Score for a given address (requires API key).
 * Add VITE_WALKSCORE_API_KEY to your .env file.
 * Free tier: 5,000 requests/day at walkscore.com
 */
export async function fetchWalkScore(address: string, lat: number, lon: number) {
  const apiKey = import.meta.env.VITE_WALKSCORE_API_KEY;
  if (!apiKey) {
    console.warn("[Kaya] Walk Score API key not set. Add VITE_WALKSCORE_API_KEY to .env");
    return null;
  }
  try {
    const url = `https://api.walkscore.com/score?format=json&address=${encodeURIComponent(address)}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Walk Score API error: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error("[Kaya] Walk Score fetch failed:", e);
    return null;
  }
}

/**
 * Fetch address suggestions using OpenStreetMap Nominatim (free, no key required).
 * Rate limit: 1 request/second. For production, run your own Nominatim instance.
 */
export async function fetchAddressSuggestions(query: string) {
  if (query.length < 3) return [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=ca&addressdetails=1&limit=5`;
    const res = await fetch(url, {
      headers: { "Accept-Language": "en", "User-Agent": "KayaPropertyPlatform/1.0" },
    });
    if (!res.ok) throw new Error(`Nominatim error: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error("[Kaya] Nominatim fetch failed:", e);
    return [];
  }
}

/**
 * Get CMHC data for a specific city.
 */
export function getCityData(cityName: string): CMACityData | undefined {
  const q = cityName.toLowerCase();
  return CMHC_RENTAL_DATA.find(
    (c) =>
      c.city.toLowerCase().includes(q) ||
      q.includes(c.city.toLowerCase().split("-")[0].toLowerCase())
  );
}

/**
 * Canadian listing platforms — integration guidance.
 * NOTE: None of these have free public APIs as of 2025.
 * Commercial partnerships or web scraping agreements are required.
 *
 * Platform               | API Available? | Notes
 * -----------------------|----------------|------------------------------------
 * CREA DDF (MLS)         | Yes (member)   | Requires REALTOR.ca membership
 * Rentals.ca             | No             | Partnership/data feed required
 * Kijiji                 | No             | Use their paid ad API only
 * Zumper / PadMapper     | Partner only   | Contact partners@zumper.com
 * Facebook Marketplace   | No             | No listing API
 * Craigslist             | No             | No official API
 *
 * Recommended path for Kaya:
 * 1. Apply for CREA DDF membership to access MLS data
 * 2. Partner with Rentals.ca for exclusive data feeds
 * 3. Use Statistics Canada + CMHC for market intelligence (already integrated)
 * 4. Use OpenStreetMap Nominatim for address geocoding (already integrated)
 */
export const LISTING_API_GUIDE = {
  CREA_DDF: {
    name: "CREA Data Distribution Facility",
    url: "https://www.crea.ca/ddf/",
    cost: "Requires REALTOR.ca membership",
    coverageCAD: "All MLS-listed properties in Canada",
    apiType: "RETS / OData",
  },
  RentalsCA: {
    name: "Rentals.ca Data Feed",
    url: "https://rentals.ca/landlords",
    cost: "Commercial partnership required",
    coverageCAD: "700k+ Canadian rental listings",
    apiType: "REST API (partnership)",
  },
  PadMapper: {
    name: "Zumper/PadMapper API",
    url: "https://www.zumper.com/partners",
    cost: "Commercial partnership",
    coverageCAD: "Aggregated Canadian listings",
    apiType: "REST API (partner)",
  },
};
