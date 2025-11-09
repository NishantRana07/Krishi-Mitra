/**
 * Mandi API Service
 * Integrates with Indian Government's Market Price API
 * Provides real-time commodity prices from various mandis across India
 */

const MANDI_API_BASE = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"
const MANDI_API_KEY = process.env.MANDI_API_KEY || "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b"

export interface MandiPrice {
  state: string
  district: string
  market: string
  commodity: string
  variety: string
  grade: string
  arrival_date: string
  min_price: string
  max_price: string
  modal_price: string
}

export interface MandiApiResponse {
  total: number
  count: number
  offset: number
  limit: number
  records: MandiPrice[]
}

export interface MandiFilters {
  state?: string
  district?: string
  market?: string
  commodity?: string
  variety?: string
  grade?: string
  limit?: number
  offset?: number
}

/**
 * Fetch current market prices from Mandi API
 */
export async function fetchMandiPrices(filters: MandiFilters = {}): Promise<MandiApiResponse> {
  const params = new URLSearchParams({
    "api-key": MANDI_API_KEY,
    format: "json",
    limit: (filters.limit || 100).toString(),
    offset: (filters.offset || 0).toString(),
  })

  // Add filters if provided
  if (filters.state) params.append("filters[state.keyword]", filters.state)
  if (filters.district) params.append("filters[district]", filters.district)
  if (filters.market) params.append("filters[market]", filters.market)
  if (filters.commodity) params.append("filters[commodity]", filters.commodity)
  if (filters.variety) params.append("filters[variety]", filters.variety)
  if (filters.grade) params.append("filters[grade]", filters.grade)

  const url = `${MANDI_API_BASE}?${params.toString()}`

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Mandi API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data as MandiApiResponse
  } catch (error) {
    console.error("Error fetching Mandi prices:", error)
    throw error
  }
}

/**
 * Get prices for a specific commodity across multiple markets
 */
export async function getCommodityPrices(commodity: string, state?: string, district?: string) {
  return fetchMandiPrices({
    commodity,
    state,
    district,
    limit: 50,
  })
}

/**
 * Get all available commodities in a specific market
 */
export async function getMarketCommodities(market: string, state?: string) {
  return fetchMandiPrices({
    market,
    state,
    limit: 100,
  })
}

/**
 * Get price trends for a commodity (best, average, worst markets)
 */
export async function getCommodityTrends(commodity: string, state?: string) {
  const data = await fetchMandiPrices({
    commodity,
    state,
    limit: 100,
  })

  const prices = data.records.map((record) => ({
    market: record.market,
    district: record.district,
    minPrice: parseFloat(record.min_price) || 0,
    maxPrice: parseFloat(record.max_price) || 0,
    modalPrice: parseFloat(record.modal_price) || 0,
    date: record.arrival_date,
  }))

  // Sort by modal price
  prices.sort((a, b) => b.modalPrice - a.modalPrice)

  return {
    bestMarkets: prices.slice(0, 5),
    worstMarkets: prices.slice(-5).reverse(),
    averagePrice: prices.reduce((sum, p) => sum + p.modalPrice, 0) / prices.length,
    totalMarkets: prices.length,
  }
}

/**
 * Search for markets by location
 */
export async function searchMarkets(state: string, district?: string) {
  const data = await fetchMandiPrices({
    state,
    district,
    limit: 100,
  })

  // Get unique markets
  const markets = [...new Set(data.records.map((r) => r.market))]
  return markets
}

/**
 * Get popular commodities (most traded)
 */
export async function getPopularCommodities(state?: string, limit = 20) {
  const data = await fetchMandiPrices({
    state,
    limit: 500,
  })

  // Count commodity occurrences
  const commodityCounts = data.records.reduce(
    (acc, record) => {
      acc[record.commodity] = (acc[record.commodity] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // Sort by count
  const sorted = Object.entries(commodityCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([commodity, count]) => ({ commodity, count }))

  return sorted
}

/**
 * Calculate profit potential for a crop
 */
export async function calculateProfitPotential(
  commodity: string,
  state: string,
  estimatedYield: number // in quintals
) {
  const trends = await getCommodityTrends(commodity, state)

  return {
    bestCaseRevenue: trends.bestMarkets[0]?.modalPrice * estimatedYield || 0,
    averageCaseRevenue: trends.averagePrice * estimatedYield,
    worstCaseRevenue: trends.worstMarkets[0]?.modalPrice * estimatedYield || 0,
    recommendedMarkets: trends.bestMarkets.slice(0, 3),
    priceRange: {
      min: trends.worstMarkets[0]?.modalPrice || 0,
      max: trends.bestMarkets[0]?.modalPrice || 0,
      average: trends.averagePrice,
    },
  }
}

/**
 * Get price comparison between markets
 */
export async function compareMarkets(commodity: string, markets: string[], state?: string) {
  const allPrices = await fetchMandiPrices({
    commodity,
    state,
    limit: 200,
  })

  const comparison = markets.map((market) => {
    const marketPrices = allPrices.records.filter((r) => r.market === market)
    if (marketPrices.length === 0) return null

    const avgPrice =
      marketPrices.reduce((sum, r) => sum + parseFloat(r.modal_price || "0"), 0) / marketPrices.length

    return {
      market,
      averagePrice: avgPrice,
      records: marketPrices.length,
      latestPrice: marketPrices[0]?.modal_price,
      date: marketPrices[0]?.arrival_date,
    }
  })

  return comparison.filter(Boolean)
}

/**
 * Get state-wise price summary
 */
export async function getStatePriceSummary(commodity: string) {
  const data = await fetchMandiPrices({
    commodity,
    limit: 500,
  })

  const stateGroups = data.records.reduce(
    (acc, record) => {
      if (!acc[record.state]) {
        acc[record.state] = []
      }
      acc[record.state].push(parseFloat(record.modal_price || "0"))
      return acc
    },
    {} as Record<string, number[]>
  )

  const summary = Object.entries(stateGroups).map(([state, prices]) => ({
    state,
    averagePrice: prices.reduce((sum, p) => sum + p, 0) / prices.length,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    markets: prices.length,
  }))

  return summary.sort((a, b) => b.averagePrice - a.averagePrice)
}
