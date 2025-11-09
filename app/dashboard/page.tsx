"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
} from "lucide-react"
import { useEffect, useState } from "react"
import { getAllCrops, getUnresolvedAlerts, getFarmerProfile } from "@/lib/storage"

// Sample data for demonstration
const sampleWeather = {
  temp: 28,
  humidity: 65,
  rainfall: 12,
  windSpeed: 15,
  condition: "Partly Cloudy",
  location: "Punjab, India",
}

const sampleSoilData = {
  ph: 6.8,
  moisture: 45,
  nitrogen: 120,
  phosphorus: 35,
  potassium: 180,
  organicMatter: 2.5,
}

const sampleCrops = [
  { name: "Wheat", yield: "45 tons/ha", profit: "₹85,000", status: "Healthy" },
  { name: "Rice", yield: "38 tons/ha", profit: "₹72,000", status: "Needs Attention" },
  { name: "Corn", yield: "52 tons/ha", profit: "₹95,000", status: "Excellent" },
]

export default function Dashboard() {
  const [crops, setCrops] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])
  const farmerProfile = getFarmerProfile()

  useEffect(() => {
    setCrops(getAllCrops())
    setAlerts(getUnresolvedAlerts())
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome to Krishi Mitra
        </h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {farmerProfile?.location || sampleWeather.location}
        </p>
      </div>

      {/* New Feature Highlights */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <Sprout className="w-10 h-10 text-green-600" />
            <span className="text-3xl font-bold text-green-600">{crops.length}</span>
          </div>
          <h3 className="font-semibold text-lg mb-1">Registered Crops</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Multi-crop monitoring enabled
          </p>
          <Link href="/dashboard/crops">
            <Button variant="outline" size="sm" className="w-full">
              Manage Crops
            </Button>
          </Link>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <div className="flex items-center justify-between mb-4">
            <Bell className="w-10 h-10 text-red-600" />
            <span className="text-3xl font-bold text-red-600">{alerts.length}</span>
          </div>
          <h3 className="font-semibold text-lg mb-1">Active Alerts</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Automated monitoring & notifications
          </p>
          <Link href="/dashboard/alerts">
            <Button variant="outline" size="sm" className="w-full">
              View Alerts
            </Button>
          </Link>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">Live</span>
          </div>
          <h3 className="font-semibold text-lg mb-1">Market Prices</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Real-time price intelligence
          </p>
          <Link href="/dashboard/market">
            <Button variant="outline" size="sm" className="w-full">
              Check Prices
            </Button>
          </Link>
        </Card>
      </div>

      {/* Weather Section */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Temperature</p>
              <p className="text-3xl font-bold text-primary">{sampleWeather.temp}°C</p>
            </div>
            <Cloud className="w-12 h-12 text-accent opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Humidity</p>
              <p className="text-3xl font-bold text-primary">{sampleWeather.humidity}%</p>
            </div>
            <Droplets className="w-12 h-12 text-blue-400 opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Rainfall</p>
              <p className="text-3xl font-bold text-primary">{sampleWeather.rainfall}mm</p>
            </div>
            <Cloud className="w-12 h-12 text-blue-500 opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Wind Speed</p>
              <p className="text-3xl font-bold text-primary">{sampleWeather.windSpeed} km/h</p>
            </div>
            <Cloud className="w-12 h-12 text-secondary opacity-50" />
          </div>
        </Card>
      </div>

      {/* Soil Health */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Droplets className="w-6 h-6 text-primary" />
            Soil Health
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">pH Level</span>
              <span className="font-semibold text-primary">{sampleSoilData.ph}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Moisture</span>
              <span className="font-semibold text-primary">{sampleSoilData.moisture}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Nitrogen</span>
              <span className="font-semibold text-primary">{sampleSoilData.nitrogen} mg/kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Phosphorus</span>
              <span className="font-semibold text-primary">{sampleSoilData.phosphorus} mg/kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Potassium</span>
              <span className="font-semibold text-primary">{sampleSoilData.potassium} mg/kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Organic Matter</span>
              <span className="font-semibold text-primary">{sampleSoilData.organicMatter}%</span>
            </div>
          </div>
          <Link href="/dashboard/soil-analysis">
            <Button className="w-full mt-6">Analyze Soil</Button>
          </Link>
        </Card>

        {/* Current Crops */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-secondary" />
            Your Crops
          </h2>
          <div className="space-y-3">
            {sampleCrops.map((crop) => (
              <div key={crop.name} className="border-b border-border pb-3 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold">{crop.name}</span>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      crop.status === "Excellent"
                        ? "bg-green-100 text-green-800"
                        : crop.status === "Healthy"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {crop.status}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Yield: {crop.yield} | Profit: {crop.profit}
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/recommendations">
            <Button className="w-full mt-6">Get Recommendations</Button>
          </Link>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/dashboard/crops">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
            >
              <Sprout className="w-6 h-6" />
              <span>Add Crop</span>
            </Button>
          </Link>
          <Link href="/dashboard/alerts">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
            >
              <Bell className="w-6 h-6" />
              <span>Run Monitoring</span>
            </Button>
          </Link>
          <Link href="/dashboard/market">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
            >
              <DollarSign className="w-6 h-6" />
              <span>Market Prices</span>
            </Button>
          </Link>
          <Link href="/dashboard/chat">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
            >
              <MessageSquare className="w-6 h-6" />
              <span>Ask AI</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
