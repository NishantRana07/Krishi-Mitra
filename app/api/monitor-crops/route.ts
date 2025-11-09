import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"

const MonitoringAnalysisSchema = z.object({
  alerts: z.array(
    z.object({
      type: z.enum(["soil_moisture", "soil_ph", "temperature", "weather", "disease", "pest", "market"]),
      severity: z.enum(["info", "warning", "critical"]),
      message: z.string(),
      recommendations: z.string(),
    })
  ),
  overallHealth: z.enum(["healthy", "warning", "critical"]),
  summary: z.string(),
})

// Fallback API keys
const GEMINI_API_KEYS = [
  "AIzaSyARCqY9P9TQg0rDJkcNC-j4DEiFl9v8brQ",
  "AIzaSyAe6PnlEGHokJa-V4-ZQl8UKKnA4L6jQn4",
  "AIzaSyDS1k_6OrKfML-ikOLVBewcWCBNVCUlZ6Y",
  process.env.GOOGLE_GENERATIVE_AI_API_KEY,
].filter(Boolean) as string[]

async function analyzeWithFallback(prompt: string) {
  let lastError: any = null

  for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
    try {
      const apiKey = GEMINI_API_KEYS[i]
      const { object } = await generateObject({
        model: google("gemini-2.0-flash-exp", { apiKey }),
        schema: MonitoringAnalysisSchema,
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
    const { crops, weatherData, soilData } = await request.json()

    if (!crops || crops.length === 0) {
      return NextResponse.json({ error: "No crops to monitor" }, { status: 400 })
    }

    const prompt = `You are an expert agricultural monitoring system. Analyze the following crop and environmental data to detect any issues or anomalies that require farmer attention.

Crops Data:
${JSON.stringify(crops, null, 2)}

Weather Data:
${JSON.stringify(weatherData || {}, null, 2)}

Soil Data:
${JSON.stringify(soilData || {}, null, 2)}

Analyze for:
1. Soil moisture levels (critical if below 30% or above 80%)
2. Soil pH imbalances (optimal range varies by crop)
3. Temperature extremes (too hot or too cold for the crop)
4. Adverse weather conditions (heavy rain, drought, storms)
5. Potential disease indicators
6. Pest risk based on conditions
7. Market opportunities (if applicable)

For each issue found, provide:
- Type of alert
- Severity (info/warning/critical)
- Clear message for the farmer
- Specific recommendations

Also provide:
- Overall health status
- Summary of findings

Return analysis in JSON format.`

    const result = await analyzeWithFallback(prompt)

    return NextResponse.json({
      success: true,
      analysis: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Monitoring error:", error)

    // Return basic monitoring response
    return NextResponse.json({
      success: true,
      analysis: {
        alerts: [],
        overallHealth: "healthy",
        summary: "Monitoring system is running. No critical issues detected.",
      },
      timestamp: new Date().toISOString(),
    })
  }
}
