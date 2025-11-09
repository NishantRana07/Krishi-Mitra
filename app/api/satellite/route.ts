import { type NextRequest, NextResponse } from "next/server"
import {
  getSatelliteInsights,
  detectCropType,
  detectBoundaryChanges,
  getNDVIData,
  getSoilMoistureData,
  getHeatStressData,
} from "@/lib/satellite-api"

export async function POST(request: NextRequest) {
  try {
    const { lat, lon, type, polygonId } = await request.json()

    if (!lat || !lon) {
      return NextResponse.json({ error: "Latitude and longitude required" }, { status: 400 })
    }

    let data

    switch (type) {
      case "ndvi":
        data = await getNDVIData(lat, lon, polygonId)
        break
      case "soil-moisture":
        data = await getSoilMoistureData(lat, lon)
        break
      case "heat-stress":
        data = await getHeatStressData(lat, lon)
        break
      case "crop-detection":
        data = await detectCropType(lat, lon)
        break
      case "boundary-check":
        if (!polygonId) {
          return NextResponse.json({ error: "Polygon ID required for boundary check" }, { status: 400 })
        }
        data = await detectBoundaryChanges(polygonId)
        break
      case "full":
      default:
        data = await getSatelliteInsights(lat, lon)
        break
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
      source: "Satellite API (OpenWeather + Simulated Sentinel Data)",
    })
  } catch (error: any) {
    console.error("Satellite API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch satellite data",
        message: error.message,
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = parseFloat(searchParams.get("lat") || "0")
  const lon = parseFloat(searchParams.get("lon") || "0")
  const type = searchParams.get("type") || "full"

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude and longitude required" }, { status: 400 })
  }

  try {
    let data

    switch (type) {
      case "ndvi":
        data = await getNDVIData(lat, lon)
        break
      case "soil-moisture":
        data = await getSoilMoistureData(lat, lon)
        break
      case "heat-stress":
        data = await getHeatStressData(lat, lon)
        break
      default:
        data = await getSatelliteInsights(lat, lon)
        break
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch satellite data",
        message: error.message,
      },
      { status: 500 }
    )
  }
}
