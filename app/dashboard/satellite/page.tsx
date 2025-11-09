"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Satellite,
  RefreshCw,
  MapPin,
  Droplets,
  Thermometer,
  Cloud,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Leaf,
  Zap,
  Eye,
  Activity,
} from "lucide-react"
import { getFarmerProfile } from "@/lib/storage"
import { toast } from "sonner"

export default function SatellitePage() {
  const [loading, setLoading] = useState(false)
  const [satelliteData, setSatelliteData] = useState<any>(null)
  const farmerProfile = getFarmerProfile()

  useEffect(() => {
    if (farmerProfile) {
      fetchSatelliteData()
    }
  }, [])

  const fetchSatelliteData = async () => {
    if (!farmerProfile) {
      toast.error("Please set up your farm profile first")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/satellite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: farmerProfile.latitude,
          lon: farmerProfile.longitude,
          type: "full",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSatelliteData(result.data)
        toast.success("Satellite data updated successfully")
      }
    } catch (error) {
      console.error("Error fetching satellite data:", error)
      toast.error("Failed to fetch satellite data")
    } finally {
      setLoading(false)
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 75) return "text-green-600 bg-green-100 dark:bg-green-900"
    if (score >= 50) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900"
    if (score >= 25) return "text-orange-600 bg-orange-100 dark:bg-orange-900"
    return "text-red-600 bg-red-100 dark:bg-red-900"
  }

  const getStressLevelColor = (level: string) => {
    switch (level) {
      case "none":
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "moderate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "high":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
      case "extreme":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Satellite className="w-10 h-10 text-blue-600" />
            🛰️ Satellite View
          </h1>
          <p className="text-muted-foreground">
            Real-time crop health monitoring powered by satellite imagery
          </p>
        </div>

        <Button onClick={fetchSatelliteData} disabled={loading} className="gap-2">
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </>
          )}
        </Button>
      </div>

      {/* Location Info */}
      {farmerProfile && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">Monitoring Location:</span>
            <span className="text-muted-foreground">
              {farmerProfile.location} ({farmerProfile.latitude.toFixed(4)}, {farmerProfile.longitude.toFixed(4)})
            </span>
          </div>
        </Card>
      )}

      {satelliteData ? (
        <>
          {/* Overall Health Score */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Overall Farm Health Score</h2>
                <p className="text-muted-foreground">Based on satellite analysis</p>
              </div>
              <div className="text-center">
                <div
                  className={`text-6xl font-black mb-2 ${getHealthColor(satelliteData.healthScore)}`}
                  style={{ WebkitTextStroke: "2px currentColor", WebkitTextFillColor: "transparent" }}
                >
                  {satelliteData.healthScore}
                </div>
                <Badge className={getHealthColor(satelliteData.healthScore)}>
                  {satelliteData.healthScore >= 75
                    ? "Excellent"
                    : satelliteData.healthScore >= 50
                      ? "Good"
                      : satelliteData.healthScore >= 25
                        ? "Fair"
                        : "Poor"}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Alerts */}
          {satelliteData.alerts && satelliteData.alerts.length > 0 && (
            <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Active Alerts
              </h3>
              <div className="space-y-2">
                {satelliteData.alerts.map((alert: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <span className="text-sm">{alert}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Main Satellite Data Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* NDVI Crop Health */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">NDVI Crop Health</h3>
                  <p className="text-xs text-muted-foreground">Vegetation Index Analysis</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">NDVI Value:</span>
                  <span className="font-bold text-2xl" style={{ color: satelliteData.ndvi.color }}>
                    {satelliteData.ndvi.value.toFixed(3)}
                  </span>
                </div>

                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${((satelliteData.ndvi.value + 1) / 2) * 100}%`,
                      backgroundColor: satelliteData.ndvi.color,
                    }}
                  ></div>
                </div>

                <Badge className="w-full justify-center py-2" style={{ backgroundColor: satelliteData.ndvi.color }}>
                  {satelliteData.ndvi.status.toUpperCase()}
                </Badge>

                <p className="text-sm text-muted-foreground">{satelliteData.ndvi.description}</p>

                <div className="pt-4 border-t">
                  <div className="text-xs text-muted-foreground mb-2">Color Legend:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span>Healthy (0.6-1.0)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                      <span>Moderate (0.4-0.6)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-600 rounded"></div>
                      <span>Stressed (0.2-0.4)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-600 rounded"></div>
                      <span>Critical (&lt;0.2)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Soil Moisture */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Soil Moisture</h3>
                  <p className="text-xs text-muted-foreground">Satellite Estimation</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Moisture Level:</span>
                  <span className="font-bold text-2xl text-blue-600">{satelliteData.soilMoisture.moisture.toFixed(1)}%</span>
                </div>

                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${satelliteData.soilMoisture.moisture}%` }}
                  ></div>
                </div>

                <Badge
                  className={`w-full justify-center py-2 ${
                    satelliteData.soilMoisture.status === "optimal"
                      ? "bg-green-100 text-green-700"
                      : satelliteData.soilMoisture.status === "dry"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {satelliteData.soilMoisture.status.toUpperCase()}
                </Badge>

                {satelliteData.soilMoisture.irrigation_needed && (
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-4 h-4 text-orange-600" />
                      <span className="font-semibold text-sm">Irrigation Recommended</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Soil moisture is below optimal levels. Consider irrigating soon.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t text-xs text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>Dry (&lt;30%)</span>
                    <span>Optimal (30-70%)</span>
                    <span>Wet (&gt;70%)</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Heat Stress */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <Thermometer className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Heat Stress Detection</h3>
                  <p className="text-xs text-muted-foreground">Thermal Analysis</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Temperature</div>
                    <div className="font-bold text-xl">{satelliteData.heatStress.temperature.toFixed(1)}°C</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Heat Index</div>
                    <div className="font-bold text-xl text-red-600">{satelliteData.heatStress.heat_index.toFixed(1)}°C</div>
                  </div>
                </div>

                <Badge className={`w-full justify-center py-2 ${getStressLevelColor(satelliteData.heatStress.stress_level)}`}>
                  {satelliteData.heatStress.stress_level.toUpperCase()} STRESS
                </Badge>

                <p className="text-sm font-medium">{satelliteData.heatStress.risk_description}</p>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground">Recommendations:</div>
                  {satelliteData.heatStress.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Satellite Weather */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Satellite Weather</h3>
                  <p className="text-xs text-muted-foreground">Cloud & Rainfall Data</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Cloud Coverage:</span>
                    <span className="font-bold">{satelliteData.weather.cloud_coverage}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-600 transition-all duration-500"
                      style={{ width: `${satelliteData.weather.cloud_coverage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Rainfall Probability:</span>
                    <span className="font-bold text-blue-600">{satelliteData.weather.rainfall_probability}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${satelliteData.weather.rainfall_probability}%` }}
                    ></div>
                  </div>
                </div>

                {satelliteData.weather.rainfall_amount > 0 && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-sm">
                        Expected Rainfall: {satelliteData.weather.rainfall_amount.toFixed(1)} mm
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Info Footer */}
          <Card className="p-4 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4" />
              <span>
                Last updated: {new Date(satelliteData.timestamp).toLocaleString()} | Source: {satelliteData.source || "OpenWeather Satellite API"}
              </span>
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-12 text-center">
          <Satellite className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No Satellite Data Available</h3>
          <p className="text-muted-foreground mb-6">
            Click "Refresh Data" to fetch the latest satellite insights for your farm
          </p>
          <Button onClick={fetchSatelliteData} disabled={loading} className="gap-2">
            <Eye className="w-4 h-4" />
            View Satellite Data
          </Button>
        </Card>
      )}
    </div>
  )
}
