import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { type NextRequest, NextResponse } from "next/server"

// All 6 Gemini API keys for maximum reliability (300 requests/day)
const GEMINI_API_KEYS = [
  "AIzaSyCtdtZeXamaI15dMGjZ7k5_NSIUcDlwdP0",
  "AIzaSyB2OilxGNCq3z5QPYDaAtZr72ZaAfnz-Co",
  "AIzaSyAkOdC-zHvo_c2lcEAmhwEV_V3ryIPchHs",
  "AIzaSyARCqY9P9TQg0rDJkcNC-j4DEiFl9v8brQ",
  "AIzaSyAe6PnlEGHokJa-V4-ZQl8UKKnA4L6jQn4",
  "AIzaSyDS1k_6OrKfML-ikOLVBewcWCBNVCUlZ6Y",
].filter(Boolean) as string[]

async function chatWithFallback(prompt: string) {
  let lastError: any = null

  for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
    try {
      const apiKey = GEMINI_API_KEYS[i]
      const google = createGoogleGenerativeAI({ apiKey })
      const { text } = await generateText({
        model: google("gemini-2.0-flash-exp"),
        prompt
      })
      return text
    } catch (error: any) {
      console.error(`Chat API key ${i + 1} failed:`, error.message)
      lastError = error
      if (i < GEMINI_API_KEYS.length - 1) continue
    }
  }
  throw lastError
}

export async function POST(request: NextRequest) {
  try {
    const { question, farmerContext } = await request.json()

    const prompt = `You are an expert agricultural advisor for farmers. Provide helpful, practical farming advice based on the farmer's specific context. Respond in ${farmerContext?.language || "English"}.

Farmer Context:
- Name: ${farmerContext?.name || "Farmer"}
- Current Crop: ${farmerContext?.crop || "Unknown"}
- Location: ${farmerContext?.location || "Unknown"}
- Soil pH: ${farmerContext?.soilPH || "Unknown"}
- Soil Moisture: ${farmerContext?.soilMoisture || "Unknown"}%

Farmer's Question: ${question}

Provide a concise, practical response (2-3 sentences) that is specific to their farm conditions and location. Focus on actionable advice.`

    const text = await chatWithFallback(prompt)
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Chat error:", error)

    return NextResponse.json({
      response:
        "I'm having trouble connecting to the AI service right now. Please try again in a moment, or check our recommendations page for general farming advice.",
    })
  }
}
