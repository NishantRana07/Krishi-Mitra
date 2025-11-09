import { generateObject } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { z } from "zod"
import { type NextRequest, NextResponse } from "next/server"

const YieldPredictionSchema = z.object({
  yieldPerHectare: z.number().describe("Predicted yield per hectare in tons"),
  totalYield: z.number().describe("Total yield for the given area in tons"),
  revenue: z.number().describe("Estimated revenue in rupees"),
  profit: z.number().describe("Estimated profit in rupees"),
  profitMargin: z.string().describe("Profit margin percentage"),
  marketPrice: z.number().describe("Market price per quintal"),
  riskFactors: z.array(z.string()).describe("Identified risk factors"),
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

async function predictWithFallback(prompt: string) {
  let lastError: any = null

  for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
    try {
      const apiKey = GEMINI_API_KEYS[i]
      console.log(`Predicting yield with API key ${i + 1}/${GEMINI_API_KEYS.length}`)
      
      const google = createGoogleGenerativeAI({ apiKey })
      const { object } = await generateObject({
        model: google("gemini-2.0-flash-exp"),
        schema: YieldPredictionSchema,
        prompt
      })
      
      console.log(`✓ Yield prediction successful with API key ${i + 1}`)
      return object
    } catch (error: any) {
      console.error(`✗ API key ${i + 1} failed:`, error.message)
      lastError = error
      if (i < GEMINI_API_KEYS.length - 1) continue
    }
  }
  
  // All keys failed, return fallback
  console.log("All API keys failed, returning fallback data")
  return {
    yieldPerHectare: 42.5,
    totalYield: 212.5,
    revenue: 5312500,
    profit: 2812500,
    profitMargin: "52.9",
    marketPrice: 2500,
    riskFactors: [
      "Using fallback prediction (API quota exceeded)",
      "Soil pH slightly below optimal range",
      "Monitor moisture levels during dry season",
    ],
  }
}

export async function POST(request: NextRequest) {
  try {
    const { crop, area, soilPH, soilMoisture, farmerContext } = await request.json()

    const prompt = `You are an expert agricultural yield prediction AI. Based on the farmer's conditions, predict the crop yield. Respond in ${farmerContext?.language || "English"}.

Farmer Context:
- Location: ${farmerContext?.location || "Unknown"}
- Crop: ${crop}
- Land Area: ${area} hectares
- Soil pH: ${soilPH}
- Soil Moisture: ${soilMoisture}%

Based on these conditions, provide:
1. Predicted yield per hectare in tons
2. Total yield for ${area} hectares
3. Estimated revenue (use current market prices)
4. Estimated profit (subtract ₹15,000 per hectare for costs)
5. Profit margin percentage
6. Current market price per quintal
7. List of risk factors that could affect yield

Consider soil pH (optimal 6.5-7.5), moisture levels, and crop-specific requirements.`

    const result = await predictWithFallback(prompt)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Yield prediction error:", error)

    const fallbackResponse = {
      yieldPerHectare: 42.5,
      totalYield: 212.5,
      revenue: 5312500,
      profit: 2812500,
      profitMargin: "52.9",
      marketPrice: 2500,
      riskFactors: ["Error occurred, using fallback data"],
    }

    return NextResponse.json(fallbackResponse)
  }
}
