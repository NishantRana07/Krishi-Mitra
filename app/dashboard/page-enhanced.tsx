"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Cloud,
  Droplets,
  Leaf,
  TrendingUp,
  AlertCircle,
  MapPin,
  MessageSquare,
  Sprout,
  Bell,
  DollarSign,
  Satellite,
  Bug,
  BarChart3,
  Camera,
  Thermometer,
  Wind,
  Eye,
  Zap,
  Activity,
  CheckCircle,
} from "lucide-react"
import { useEffect, useState } from "react"
import { getAllCrops, getUnresolvedAlerts, getFarmerProfile } from "@/lib/storage"

export default function EnhancedDashboard() {
  const [crops, setCrops] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])
  const [satelliteData, setSatelliteData] = useState<any>(null)
  const [marketData, setMarketData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const farmerProfile = getFarmerProfile()

  useEffect(() => {
    setCrops(getAllCrops())
    setAlerts(getUnresolvedAlerts())
    
    // Load satellite and market data if profile exists
    if (farmerProfile) {
      loadDashboardData()
    }
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch satellite data
      if (farmerProfile) {
        const satResponse = await fetch("/api/satellite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lat: farmerProfile.latitude,
            lon: farmerProfile.longitude,
            type: "full",
          }),
        })
        const satData = await satResponse.json()
        if (satData.success) {
          setSatelliteData(satData.data)
        }

        // Fetch market data for crops
        if (crops.length > 0) {
          const marketResponse = await fetch("/api/market-prices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              crops: crops.map(c => c.name),
              state: farmerProfile.state,
              district: farmerProfile.district,
            }),
          })
          const marketResult = await marketResponse.json()
          if (marketResult.success) {
            setMarketData(marketResult.data)
          }
        }
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 75) return "text-green-600 bg-green-100"
    if (score >= 50) return "text-yellow-600 bg-yellow-100"
    if (score >= 25) return "text-orange-600 bg-orange-100"
    return "text-red-600 bg-red-100"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            🌾 Krishi Mitra Dashboard
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {farmerProfile?.location || "Set up your farm profile"}
          </p>
        </div>
        <Button onClick={loadDashboardData} disabled={loading} variant="outline">
          <Activity className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {/* Feature Highlights - 4 Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Satellite Health Score */}
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <Satellite className="w-8 h-8 text-blue-600" />
            {satelliteData ? (
              <span className={`text-3xl font-black ${getHealthColor(satelliteData.healthScore)}`}>
                {satelliteData.healthScore}
              </span>
            ) : (
              <span className="text-2xl font-bold text-gray-400">--</span>
            )}
          </div>
          <h3 className="font-semibold text-sm mb-1">Farm Health Score</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Satellite-powered analysis
          </p>
          <Link href="/dashboard/satellite">
            <Button variant="outline" size="sm" className="w-full text-xs h-8">
              <Eye className="w-3 h-3 mr-1" />
              View Satellite
            </Button>
          </Link>
        </Card>

        {/* Registered Crops */}
        <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200">
          <div className="flex items-center justify-between mb-3">
            <Sprout className="w-8 h-8 text-green-600" />
            <span className="text-3xl font-bold text-green-600">{crops.length}</span>
          </div>
          <h3 className="font-semibold text-sm mb-1">Registered Crops</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Multi-crop monitoring
          </p>
          <Link href="/dashboard/crops">
            <Button variant="outline" size="sm" className="w-full text-xs h-8">
              <Sprout className="w-3 h-3 mr-1" />
              Manage Crops
            </Button>
          </Link>
        </Card>

        {/* Active Alerts */}
        <Card className="p-5 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200">
          <div className="flex items-center justify-between mb-3">
            <Bell className="w-8 h-8 text-red-600" />
            <span className="text-3xl font-bold text-red-600">{alerts.length}</span>
          </div>
          <h3 className="font-semibold text-sm mb-1">Active Alerts</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Real-time monitoring
          </p>
          <Link href="/dashboard/alerts">
            <Button variant="outline" size="sm" className="w-full text-xs h-8">
              <AlertCircle className="w-3 h-3 mr-1" />
              View Alerts
            </Button>
          </Link>
        </Card>

        {/* Market Prices */}
        <Card className="p-5 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-amber-600" />
            <Badge className="bg-green-600 text-white text-xs">LIVE</Badge>
          </div>
          <h3 className="font-semibold text-sm mb-1">Market Prices</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Real-time mandi data
          </p>
          <Link href="/dashboard/market-prices">
            <Button variant="outline" size="sm" className="w-full text-xs h-8">
              <TrendingUp className="w-3 h-3 mr-1" />
              Check Prices
            </Button>
          </Link>
        </Card>
      </div>

      {/* Satellite Insights */}
      {satelliteData && (
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Satellite className="w-6 h-6 text-blue-600" />
              🛰️ Satellite Insights
            </h2>
            <Link href="/dashboard/satellite">
              <Button size="sm" variant="outline">View Details</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            {/* NDVI */}
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="text-xs font-semibold text-muted-foreground">NDVI Health</span>
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: satelliteData.ndvi.color }}>
                {satelliteData.ndvi.value.toFixed(2)}
              </div>
              <Badge className="text-xs" style={{ backgroundColor: satelliteData.ndvi.color }}>
                {satelliteData.ndvi.status}
              </Badge>
            </div>

            {/* Soil Moisture */}
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-semibold text-muted-foreground">Soil Moisture</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {satelliteData.soilMoisture.moisture.toFixed(0)}%
              </div>
              <Badge className={`text-xs ${
                satelliteData.soilMoisture.status === "optimal" ? "bg-green-100 text-green-700" :
                satelliteData.soilMoisture.status === "dry" ? "bg-orange-100 text-orange-700" :
                "bg-blue-100 text-blue-700"
              }`}>
                {satelliteData.soilMoisture.status}
              </Badge>
            </div>

            {/* Heat Stress */}
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-5 h-5 text-red-600" />
                <span className="text-xs font-semibold text-muted-foreground">Heat Stress</span>
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">
                {satelliteData.heatStress.temperature.toFixed(1)}°C
              </div>
              <Badge className={`text-xs ${
                satelliteData.heatStress.stress_level === "none" || satelliteData.heatStress.stress_level === "low" ? "bg-green-100 text-green-700" :
                satelliteData.heatStress.stress_level === "moderate" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              }`}>
                {satelliteData.heatStress.stress_level}
              </Badge>
            </div>

            {/* Weather */}
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="w-5 h-5 text-cyan-600" />
                <span className="text-xs font-semibold text-muted-foreground">Cloud Cover</span>
              </div>
              <div className="text-2xl font-bold text-cyan-600 mb-1">
                {satelliteData.weather.cloud_coverage}%
              </div>
              <Badge className="text-xs bg-cyan-100 text-cyan-700">
                Rain: {satelliteData.weather.rainfall_probability}%
              </Badge>
            </div>
          </div>

          {/* Alerts */}
          {satelliteData.alerts && satelliteData.alerts.length > 0 && (
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-sm">Active Alerts:</span>
              </div>
              <div className="space-y-1">
                {satelliteData.alerts.map((alert: string, i: number) => (
                  <div key={i} className="text-sm text-muted-foreground">{alert}</div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link href="/dashboard/soil-analysis">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-semibold">Soil Analysis</span>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/disease-detection">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bug className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-semibold">Disease Detect</span>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/recommendations">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-semibold">AI Recommend</span>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/yield-prediction">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-sm font-semibold">Yield Predict</span>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/market">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-semibold">Market Intel</span>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/chat">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-cyan-600" />
              </div>
              <span className="text-sm font-semibold">AI Assistant</span>
            </div>
          </Card>
        </Link>
      </div>

      {/* Features Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-600" />
            AI-Powered Features
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm">Gemini AI Chat Assistant</div>
                <div className="text-xs text-muted-foreground">24/7 multilingual farming advice</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm">Disease Detection</div>
                <div className="text-xs text-muted-foreground">AI-powered image analysis</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm">Crop Recommendations</div>
                <div className="text-xs text-muted-foreground">Personalized suggestions</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm">Yield Prediction</div>
                <div className="text-xs text-muted-foreground">Forecast your harvest</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Satellite className="w-6 h-6 text-blue-600" />
            Satellite & IoT Features
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm">NDVI Crop Health Monitoring</div>
                <div className="text-xs text-muted-foreground">Satellite-powered vegetation analysis</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm">Soil Moisture Estimation</div>
                <div className="text-xs text-muted-foreground">Satellite & IoT sensor data</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm">Heat Stress Detection</div>
                <div className="text-xs text-muted-foreground">Early warning system</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm">Real-Time Mandi Prices</div>
                <div className="text-xs text-muted-foreground">Government API integration</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Setup Prompt */}
      {!farmerProfile && (
        <Card className="p-8 text-center bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
          <Sprout className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-2xl font-bold mb-2">Complete Your Farm Profile</h3>
          <p className="text-muted-foreground mb-6">
            Set up your location and farm details to unlock all satellite and AI-powered features
          </p>
          <Link href="/dashboard/settings">
            <Button className="bg-green-600 hover:bg-green-700">
              <MapPin className="w-4 h-4 mr-2" />
              Set Up Profile
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
