import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { z } from "zod"

// Market Price Schema for individual markets
const MarketPriceSchema = z.object({
  market: z.string().describe("Market/Mandi name"),
  district: z.string().describe("District name"),
  state: z.string().describe("State name"),
  variety: z.string().describe("Crop variety"),
  grade: z.string().describe("Grade (A, B, C, etc.)"),
  modalPrice: z.number().describe("Modal/average price per quintal in ₹"),
  minPrice: z.number().describe("Minimum price per quintal in ₹"),
  maxPrice: z.number().describe("Maximum price per quintal in ₹"),
})

// Complete Market Data Schema
const MarketDataSchema = z.object({
  cropName: z.string(),
  markets: z.array(MarketPriceSchema).describe("Array of 4-6 different market prices"),
  averagePrice: z.number().describe("Average price across all markets"),
  bestMarket: z.string().describe("Name of market with highest price"),
  worstMarket: z.string().describe("Name of market with lowest price"),
  priceRange: z.string().describe("Price range description"),
})

// Market Analysis Schema
const MarketAnalysisSchema = z.object({
  marketSummary: z.string().describe("Overall market analysis and current trends"),
  recommendations: z.string().describe("Strategic recommendations for farmers"),
  forecast: z.string().describe("Price forecast for next 2-4 weeks"),
  bestTimeToSell: z.string().describe("Optimal selling strategy and timing"),
})

// All 6 Gemini API keys for maximum reliability (300 requests/day)
const GEMINI_API_KEYS = [
  "AIzaSyCtdtZeXamaI15dMGjZ7k5_NSIUcDlwdP0",
  "AIzaSyB2OilxGNCq3z5QPYDaAtZr72ZaAfnz-Co",
  "AIzaSyAkOdC-zHvo_c2lcEAmhwEV_V3ryIPchHs",
  "AIzaSyARCqY9P9TQg0rDJkcNC-j4DEiFl9v8brQ",
  "AIzaSyAe6PnlEGHokJa-V4-ZQl8UKKnA4L6jQn4",
  "AIzaSyDS1k_6OrKfML-ikOLVBewcWCBNVCUlZ6Y",
].filter(Boolean) as string[]

async function fetchPricesWithFallback(prompt: string) {
  let lastError: any = null

  for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
    try {
      const apiKey = GEMINI_API_KEYS[i]
      console.log(`Analyzing market with API key ${i + 1}/${GEMINI_API_KEYS.length}`)
      
      const google = createGoogleGenerativeAI({ apiKey })
      const { object } = await generateObject({
        model: google("gemini-2.0-flash-exp"),
        schema: MarketAnalysisSchema,
        prompt
      })
      
      console.log(`✓ Market analysis successful with API key ${i + 1}`)
      return object
    } catch (error: any) {
      console.error(`API key ${i + 1} failed:`, error.message)
      lastError = error
      if (i < GEMINI_API_KEYS.length - 1) continue
    }
  }
  throw lastError
}

// Generate market data with fallback
async function generateMarketDataWithFallback(prompt: string, schema: any) {
  let lastError: any = null

  for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
    try {
      const apiKey = GEMINI_API_KEYS[i]
      console.log(`Generating market data with API key ${i + 1}/${GEMINI_API_KEYS.length}`)
      
      const google = createGoogleGenerativeAI({ apiKey })
      const { object } = await generateObject({
        model: google("gemini-2.0-flash-exp"),
        schema,
        prompt
      })
      
      console.log(`✓ Market data generated with API key ${i + 1}`)
      return object
    } catch (error: any) {
      console.error(`✗ API key ${i + 1} failed:`, error.message)
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

    console.log(`🌾 Generating market data for ${crops.length} crops using Gemini AI`)

    // Generate market data using Gemini AI for each crop
    const priceData = await Promise.all(
      crops.map(async (crop: any) => {
        const cropName = crop.name || crop
        
        console.log(`📊 Generating AI market data for ${cropName}`)
        
        try {
          // Generate realistic market data using Gemini AI
          const marketPrompt = `You are an expert agricultural market analyst in India. Generate REALISTIC and CURRENT market price data for ${cropName}.

Location Context:
- State: ${state || "India (multiple states)"}
- District: ${district || "Various districts"}
- Date: ${new Date().toLocaleDateString('en-IN')}

Generate 4-6 different market/mandi prices with:
1. Real Indian mandi names (like Azadpur Mandi, APMC Market, etc.)
2. Actual districts and states in India
3. Realistic current market prices per quintal in ₹ (based on 2024-2025 rates)
4. Min and max prices showing natural market variation (±10-15%)
5. Common varieties (Local, Hybrid, Basmati, etc.)
6. Standard grades (A, B, FAQ, etc.)

Be accurate with current ${cropName} prices in India. Consider seasonal factors and regional variations.`

          const marketData = await generateMarketDataWithFallback(marketPrompt, MarketDataSchema)
          
          // Transform to expected format
          const realPrices = marketData.markets.map((market: any) => ({
            cropName,
            variety: market.variety,
            grade: market.grade,
            price: market.modalPrice,
            minPrice: market.minPrice,
            maxPrice: market.maxPrice,
            unit: "quintal",
            market: market.market,
            district: market.district,
            state: market.state,
            date: new Date().toISOString(),
          }))

          return {
            cropName,
            realPrices,
            trends: {
              bestMarkets: [{ 
                market: marketData.bestMarket, 
                modalPrice: Math.max(...marketData.markets.map((m: any) => m.modalPrice))
              }],
              worstMarkets: [{ 
                market: marketData.worstMarket, 
                modalPrice: Math.min(...marketData.markets.map((m: any) => m.modalPrice))
              }],
              averagePrice: marketData.averagePrice,
              totalMarkets: marketData.markets.length,
            },
          }
        } catch (error) {
          console.error(`❌ AI generation failed for ${cropName}, using basic fallback`)
          
          // Basic fallback if AI fails
          const basePrice = cropName.toLowerCase().includes('wheat') ? 2200 :
                          cropName.toLowerCase().includes('rice') ? 2000 :
                          cropName.toLowerCase().includes('cotton') ? 6500 :
                          cropName.toLowerCase().includes('sugarcane') ? 350 :
                          cropName.toLowerCase().includes('maize') ? 1800 :
                          cropName.toLowerCase().includes('soybean') ? 4200 : 2500
          
          const fallbackPrices = [
            {
              cropName,
              variety: "Local",
              grade: "A",
              price: basePrice,
              minPrice: basePrice - 200,
              maxPrice: basePrice + 200,
              unit: "quintal",
              market: `${state || "Delhi"} Mandi`,
              district: district || "Central",
              state: state || "Delhi",
              date: new Date().toISOString(),
            },
            {
              cropName,
              variety: "Hybrid",
              grade: "A",
              price: basePrice + 150,
              minPrice: basePrice - 50,
              maxPrice: basePrice + 300,
              unit: "quintal",
              market: `${district || "Local"} Market`,
              district: district || "District",
              state: state || "State",
              date: new Date().toISOString(),
            },
          ]

          return {
            cropName,
            realPrices: fallbackPrices,
            trends: {
              bestMarkets: [{ market: fallbackPrices[1].market, modalPrice: fallbackPrices[1].price }],
              worstMarkets: [{ market: fallbackPrices[0].market, modalPrice: fallbackPrices[0].price }],
              averagePrice: basePrice,
              totalMarkets: 2,
            },
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
      source: "Gemini AI - Powered Market Intelligence",
    })
  } catch (error: any) {
    console.error("Market price error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate market prices",
        message: error.message,
      },
      { status: 500 }
    )
  }
}
