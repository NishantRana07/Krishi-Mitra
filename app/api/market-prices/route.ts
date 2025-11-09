import { type NextRequest, NextResponse } from "next/server"
import { generateObject, generateText } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"
import { fetchMandiPrices, getCommodityTrends, calculateProfitPotential } from "@/lib/mandi-api"

const MarketAnalysisSchema = z.object({
  marketSummary: z.string().describe("Overall market analysis and trends"),
  recommendations: z.string().describe("Strategic recommendations for farmers"),
  forecast: z.string().describe("Price forecast for next 2-4 weeks"),
  bestTimeToSell: z.string().describe("Optimal selling strategy"),
})

// Fallback API keys
const GEMINI_API_KEYS = [
  "AIzaSyARCqY9P9TQg0rDJkcNC-j4DEiFl9v8brQ",
  "AIzaSyAe6PnlEGHokJa-V4-ZQl8UKKnA4L6jQn4",
  "AIzaSyDS1k_6OrKfML-ikOLVBewcWCBNVCUlZ6Y",
].filter(Boolean) as string[]

async function fetchPricesWithFallback(prompt: string) {
  let lastError: any = null

  for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
    try {
      const apiKey = GEMINI_API_KEYS[i]
      const { object } = await generateObject({
        model: google("gemini-2.5-flash", { apiKey }),
        schema: MarketAnalysisSchema,
        prompt,
      })
      return object
    } catch (error: any) {
      console.error(`API key ${i + 1} failed:`, error.message)
      lastError = error
      if (i < GEMINI_API_KEYS.length - 1) continue
    }
  }
  throw lastError
}

export async function POST(request: NextRequest) {
  try {
    const { crops, location, state, district } = await request.json()

    if (!crops || crops.length === 0) {
      return NextResponse.json({ error: "No crops provided" }, { status: 400 })
    }

    // Fetch real market data from Mandi API for each crop
    const priceData = await Promise.all(
      crops.map(async (crop: any) => {
        const cropName = crop.name || crop
        
        try {
          // Get real market prices
          const mandiData = await fetchMandiPrices({
            commodity: cropName,
            state: state,
            district: district,
            limit: 20,
          })

          // Get trends analysis
          const trends = await getCommodityTrends(cropName, state)

          // Process real market data
          const prices = mandiData.records.map((record) => ({
            cropName: record.commodity,
            variety: record.variety,
            grade: record.grade,
            price: parseFloat(record.modal_price) || 0,
            minPrice: parseFloat(record.min_price) || 0,
            maxPrice: parseFloat(record.max_price) || 0,
            unit: "quintal",
            market: record.market,
            district: record.district,
            state: record.state,
            date: record.arrival_date,
          }))

          return {
            cropName,
            realPrices: prices,
            trends: {
              bestMarkets: trends.bestMarkets,
              worstMarkets: trends.worstMarkets,
              averagePrice: trends.averagePrice,
              totalMarkets: trends.totalMarkets,
            },
          }
        } catch (error) {
          console.error(`Error fetching data for ${cropName}:`, error)
          return {
            cropName,
            realPrices: [],
            trends: null,
            error: "Data not available",
          }
        }
      })
    )

    // Use Gemini AI for market analysis and recommendations
    const cropSummary = priceData
      .map((data) => {
        if (data.realPrices.length === 0) return `${data.cropName}: No data available`
        const avgPrice = data.trends?.averagePrice || 0
        const topMarket = data.realPrices[0]
        return `${data.cropName}: ₹${avgPrice.toFixed(0)}/quintal avg, Top market: ${topMarket.market} (₹${topMarket.price})`
      })
      .join("\n")

    const analysisPrompt = `You are an agricultural market analyst in India. Analyze this REAL market data and provide insights:

${cropSummary}

Location: ${state || "India"}, ${district || ""}
Date: ${new Date().toLocaleDateString()}

Based on this REAL market data, provide:
1. Market summary - What are the current trends?
2. Strategic recommendations - Should farmers sell now or wait?
3. Price forecast - What's expected in the next 2-4 weeks?
4. Best time to sell - Specific actionable advice

Be specific and practical. Use the actual prices shown above.`

    const analysis = await fetchPricesWithFallback(analysisPrompt)

    return NextResponse.json({
      success: true,
      data: {
        prices: priceData,
        analysis,
        location: {
          state: state || "All States",
          district: district || "All Districts",
        },
      },
      timestamp: new Date().toISOString(),
      source: "Government of India Mandi API + Gemini AI Analysis",
    })
  } catch (error: any) {
    console.error("Market price error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch market prices",
        message: error.message,
      },
      { status: 500 }
    )
  }
}

// GET endpoint for quick price checks
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const commodity = searchParams.get("commodity")
  const state = searchParams.get("state") || undefined
  const district = searchParams.get("district") || undefined

  if (!commodity) {
    return NextResponse.json({ error: "Commodity parameter required" }, { status: 400 })
  }

  try {
    const data = await fetchMandiPrices({
      commodity,
      state,
      district,
      limit: 50,
    })

    return NextResponse.json({
      success: true,
      data: data.records,
      total: data.total,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch prices",
        message: error.message,
      },
      { status: 500 }
    )
  }
}
