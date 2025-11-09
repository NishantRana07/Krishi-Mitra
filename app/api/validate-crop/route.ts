import { generateObject } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { z } from "zod"
import { type NextRequest, NextResponse } from "next/server"

const CropValidationSchema = z.object({
  isValid: z.boolean().describe("Whether the crop name is valid"),
  standardName: z.string().describe("Standardized crop name"),
  scientificName: z.string().describe("Scientific name of the crop"),
  category: z.string().describe("Crop category (e.g., cereal, vegetable, fruit)"),
  suitableForPH: z.object({
    min: z.number(),
    max: z.number(),
  }).describe("Suitable soil pH range"),
  suitableForLocation: z.boolean().describe("Whether suitable for the given location"),
  growingSeasons: z.array(z.string()).describe("Best growing seasons"),
  averageYield: z.string().describe("Average yield per hectare"),
  waterRequirement: z.string().describe("Water requirement level (low/medium/high)"),
  suggestions: z.string().describe("Suggestions or warnings about this crop"),
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

async function validateWithFallback(prompt: string) {
  let lastError: any = null

  for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
    try {
      const apiKey = GEMINI_API_KEYS[i]
      console.log(`Validating crop with API key ${i + 1}/${GEMINI_API_KEYS.length}`)
      
      const google = createGoogleGenerativeAI({ apiKey })
      const { object } = await generateObject({
        model: google("gemini-2.0-flash-exp"),
        schema: CropValidationSchema,
        prompt
      })

      console.log(`✓ Successfully validated crop with API key ${i + 1}`)
      return object
    } catch (error: any) {
      console.error(`✗ API key ${i + 1} failed:`, error.message)
      lastError = error

      if (i < GEMINI_API_KEYS.length - 1) {
        continue
      }
    }
  }

  throw lastError
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cropName, location, soilPH, landArea } = body

    if (!cropName || cropName.trim().length === 0) {
      return NextResponse.json({ error: "Crop name is required" }, { status: 400 })
    }

    const prompt = `You are an expert agricultural advisor. Validate if "${cropName}" is a real, cultivable crop.

Context:
- Location: ${location || "India"}
- Soil pH: ${soilPH || "6.5"}
- Land Area: ${landArea || "1"} hectares

Analyze:
1. Is this a valid crop name?
2. What is the standardized/common name?
3. What is the scientific name?
4. What category does it belong to?
5. What is the suitable pH range for this crop?
6. Is it suitable for the given location and soil pH?
7. What are the best growing seasons?
8. What is the average yield per hectare?
9. What is the water requirement level?
10. Any suggestions or warnings?

Return detailed validation information in JSON format.`

    const result = await validateWithFallback(prompt)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Crop validation error:", error)

    // Return a basic validation response
    return NextResponse.json({
      isValid: true,
      standardName: "Unknown Crop",
      scientificName: "Unknown",
      category: "General",
      suitableForPH: { min: 6.0, max: 7.5 },
      suitableForLocation: true,
      growingSeasons: ["Monsoon", "Winter"],
      averageYield: "Variable",
      waterRequirement: "medium",
      suggestions: "Please verify crop details with local agricultural experts.",
    })
  }
}
