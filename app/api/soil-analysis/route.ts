import { NextRequest, NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"

// Gemini API keys with fallback
const GEMINI_API_KEYS = [
  "AIzaSyARCqY9P9TQg0rDJkcNC-j4DEiFl9v8brQ",
  "AIzaSyAe6PnlEGHokJa-V4-ZQl8UKKnA4L6jQn4",
  "AIzaSyDS1k_6OrKfML-ikOLVBewcWCBNVCUlZ6Y",
].filter(Boolean) as string[]

// Soil analysis result schema
const SoilAnalysisSchema = z.object({
  overallHealth: z.enum(["Excellent", "Good", "Fair", "Poor"]),
  healthScore: z.number().min(0).max(100),
  phAnalysis: z.object({
    status: z.enum(["Optimal", "Slightly Acidic", "Slightly Alkaline", "Too Acidic", "Too Alkaline"]),
    recommendation: z.string(),
  }),
  moistureAnalysis: z.object({
    status: z.enum(["Optimal", "Too Dry", "Too Wet", "Adequate", "Needs Attention"]),
    recommendation: z.string(),
  }),
  nutrientAnalysis: z.object({
    nitrogen: z.object({
      level: z.enum(["Low", "Medium", "High", "Optimal"]),
      recommendation: z.string(),
    }),
    phosphorus: z.object({
      level: z.enum(["Low", "Medium", "High", "Optimal"]),
      recommendation: z.string(),
    }),
    potassium: z.object({
      level: z.enum(["Low", "Medium", "High", "Optimal"]),
      recommendation: z.string(),
    }),
  }),
  organicMatter: z.object({
    level: z.enum(["Low", "Medium", "High", "Optimal"]),
    recommendation: z.string(),
  }),
  recommendations: z.array(z.string()),
  bestCrops: z.array(z.string()),
  warnings: z.array(z.string()),
})

// Generate with fallback API keys
async function generateWithFallback(prompt: string) {
  let lastError: Error | null = null

  for (const apiKey of GEMINI_API_KEYS) {
    try {
      const { object } = await generateObject({
        model: google("gemini-2.0-flash-exp", { apiKey }),
        schema: SoilAnalysisSchema,
        prompt,
      })
      return object
    } catch (error) {
      console.error(`API key failed, trying next...`, error)
      lastError = error as Error
      continue
    }
  }

  throw lastError || new Error("All API keys failed")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ph, moisture, nitrogen, phosphorus, potassium, organicMatter, texture, location } = body

    // Validate required fields
    if (!ph || !moisture) {
      return NextResponse.json(
        { error: "pH and moisture are required fields" },
        { status: 400 }
      )
    }

    const prompt = `You are an expert soil scientist and agronomist. Analyze the following soil test results and provide detailed recommendations.

Soil Test Results:
- pH Level: ${ph}
- Moisture: ${moisture}%
- Nitrogen (N): ${nitrogen || "Not tested"} ppm
- Phosphorus (P): ${phosphorus || "Not tested"} ppm
- Potassium (K): ${potassium || "Not tested"} ppm
- Organic Matter: ${organicMatter || "Not tested"}%
- Soil Texture: ${texture || "Unknown"}
- Location: ${location || "Not specified"}

Provide a comprehensive soil analysis including:
1. Overall soil health assessment (Excellent/Good/Fair/Poor) with a health score (0-100)
2. pH analysis with status and specific recommendations
3. Moisture analysis with status and irrigation recommendations
4. Nutrient analysis for N, P, K with levels and fertilizer recommendations
5. Organic matter assessment with improvement suggestions
6. List of 3-5 actionable recommendations to improve soil health
7. List of 4-6 crops best suited for this soil condition
8. Any warnings or concerns about the soil condition

Be specific, practical, and provide actionable advice for farmers.`

    const analysis = await generateWithFallback(prompt)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Soil analysis error:", error)

    // Fallback response with basic analysis
    const body = await request.json()
    const { ph, moisture, nitrogen, phosphorus, potassium, organicMatter } = body

    const phNum = parseFloat(ph) || 7
    const moistureNum = parseFloat(moisture) || 50
    const nNum = parseFloat(nitrogen) || 100
    const pNum = parseFloat(phosphorus) || 30
    const kNum = parseFloat(potassium) || 150

    // Basic analysis logic
    let healthScore = 70
    if (phNum >= 6.0 && phNum <= 7.5) healthScore += 10
    if (moistureNum >= 40 && moistureNum <= 60) healthScore += 10
    if (nNum >= 80) healthScore += 5
    if (pNum >= 25) healthScore += 5

    const phStatus =
      phNum < 5.5
        ? "Too Acidic"
        : phNum < 6.0
          ? "Slightly Acidic"
          : phNum <= 7.5
            ? "Optimal"
            : phNum <= 8.0
              ? "Slightly Alkaline"
              : "Too Alkaline"

    const moistureStatus =
      moistureNum < 30 ? "Too Dry" : moistureNum > 70 ? "Too Wet" : "Optimal"

    return NextResponse.json({
      overallHealth: healthScore >= 80 ? "Excellent" : healthScore >= 65 ? "Good" : healthScore >= 50 ? "Fair" : "Poor",
      healthScore,
      phAnalysis: {
        status: phStatus,
        recommendation:
          phStatus === "Optimal"
            ? "pH level is ideal for most crops. Maintain current practices."
            : phNum < 6.0
              ? "Add lime to raise pH. Apply 2-3 tons per hectare."
              : "Add sulfur or organic matter to lower pH.",
      },
      moistureAnalysis: {
        status: moistureStatus,
        recommendation:
          moistureStatus === "Optimal"
            ? "Moisture level is good. Continue regular irrigation schedule."
            : moistureNum < 30
              ? "Increase irrigation frequency. Consider drip irrigation."
              : "Reduce watering. Improve drainage.",
      },
      nutrientAnalysis: {
        nitrogen: {
          level: nNum < 60 ? "Low" : nNum < 120 ? "Medium" : "High",
          recommendation:
            nNum < 60
              ? "Apply nitrogen fertilizer (urea or ammonium sulfate) at 100-150 kg/ha."
              : "Nitrogen levels are adequate. Maintain with organic matter.",
        },
        phosphorus: {
          level: pNum < 20 ? "Low" : pNum < 40 ? "Medium" : "High",
          recommendation:
            pNum < 20
              ? "Apply phosphorus fertilizer (DAP or SSP) at 50-75 kg/ha."
              : "Phosphorus levels are sufficient.",
        },
        potassium: {
          level: kNum < 100 ? "Low" : kNum < 200 ? "Medium" : "High",
          recommendation:
            kNum < 100
              ? "Apply potassium fertilizer (MOP or SOP) at 50-100 kg/ha."
              : "Potassium levels are good.",
        },
      },
      organicMatter: {
        level: parseFloat(organicMatter || "2") < 2 ? "Low" : parseFloat(organicMatter || "2") < 4 ? "Medium" : "High",
        recommendation: "Add compost or farmyard manure to improve soil structure and fertility.",
      },
      recommendations: [
        "Test soil every 6 months to monitor changes",
        "Add organic compost to improve soil structure",
        "Practice crop rotation to maintain soil health",
        "Use mulching to retain moisture and prevent erosion",
        "Consider cover crops during off-season",
      ],
      bestCrops:
        phNum >= 6.0 && phNum <= 7.5
          ? ["Wheat", "Rice", "Corn", "Soybean", "Cotton", "Vegetables"]
          : phNum < 6.0
            ? ["Potato", "Blueberry", "Tea", "Rice", "Oats"]
            : ["Barley", "Beet", "Asparagus", "Spinach"],
      warnings:
        healthScore < 60
          ? ["Soil health needs immediate attention", "Consider professional soil testing", "Nutrient deficiencies detected"]
          : [],
    })
  }
}
