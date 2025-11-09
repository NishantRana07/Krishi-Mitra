"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  MapPin,
  Calendar,
  IndianRupee,
  BarChart3,
  RefreshCw,
  AlertCircle,
} from "lucide-react"

export default function MarketPricesPage() {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [priceData, setPriceData] = useState<any>(null)

  const indianStates = [
    "Andhra Pradesh", "Bihar", "Gujarat", "Haryana", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan",
    "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
  ]

  const popularCommodities = [
    "Wheat", "Rice", "Maize", "Bajra", "Jowar",
    "Arhar (Tur)", "Moong", "Urad", "Gram",
    "Cotton", "Groundnut", "Soyabean", "Sunflower",
    "Potato", "Onion", "Tomato"
  ]

  const fetchPrices = async (commodity: string) => {
    if (!commodity) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        commodity,
        ...(selectedState && { state: selectedState }),
        ...(selectedDistrict && { district: selectedDistrict }),
      })

      const response = await fetch(`/api/market-prices?${params}`)
      const result = await response.json()

      if (result.success) {
        setPriceData(result)
      }
    } catch (error) {
      console.error("Error fetching prices:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTrendIcon = (minPrice: number, maxPrice: number) => {
    const diff = maxPrice - minPrice
    const percentChange = (diff / minPrice) * 100

    if (percentChange > 5) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (percentChange < -5) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-600" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-green-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Live Mandi Prices
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time market prices from Government of India Mandi API
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Search Commodity</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search for crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchTerm) {
                      fetchPrices(searchTerm)
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">State</label>
              <Select value={selectedState || "all"} onValueChange={(value) => setSelectedState(value === "all" ? "" : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">District</label>
              <Input
                placeholder="Enter district"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Popular Commodities:</p>
            <div className="flex flex-wrap gap-2">
              {popularCommodities.map((commodity) => (
                <Badge
                  key={commodity}
                  variant="outline"
                  className="cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
                  onClick={() => {
                    setSearchTerm(commodity)
                    fetchPrices(commodity)
                  }}
                >
                  {commodity}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            onClick={() => searchTerm && fetchPrices(searchTerm)}
            disabled={loading || !searchTerm}
            className="mt-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search Prices
              </>
            )}
          </Button>
        </Card>

        {/* Results */}
        {priceData && priceData.data && (
          <div className="space-y-6">
            {/* Summary */}
            <Card className="p-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {priceData.data.length} Markets Found
                  </h2>
                  <p className="opacity-90">
                    Showing prices for {searchTerm} {selectedState && `in ${selectedState}`}
                  </p>
                </div>
                <BarChart3 className="w-12 h-12 opacity-80" />
              </div>
            </Card>

            {/* Price Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {priceData.data.map((record: any, index: number) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {record.market}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <MapPin className="w-3 h-3" />
                        {record.district}, {record.state}
                      </div>
                    </div>
                    {getTrendIcon(
                      parseFloat(record.min_price),
                      parseFloat(record.max_price)
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Commodity</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {record.commodity}
                        {record.variety && ` - ${record.variety}`}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Min</p>
                        <p className="font-bold text-red-600">
                          ₹{parseFloat(record.min_price).toFixed(0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Modal</p>
                        <p className="font-bold text-emerald-600 text-lg">
                          ₹{parseFloat(record.modal_price).toFixed(0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Max</p>
                        <p className="font-bold text-green-600">
                          ₹{parseFloat(record.max_price).toFixed(0)}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(record.arrival_date).toLocaleDateString()}
                      </div>
                      {record.grade && (
                        <Badge variant="outline" className="mt-2">
                          Grade: {record.grade}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {priceData.data.length === 0 && (
              <Card className="p-12 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">No Data Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No market prices found for "{searchTerm}" in the selected location.
                  <br />
                  Try a different commodity or location.
                </p>
              </Card>
            )}
          </div>
        )}

        {/* Empty State */}
        {!priceData && (
          <Card className="p-12 text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
            <h3 className="text-2xl font-bold mb-2">Search Market Prices</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enter a commodity name above to see live prices from mandis across India
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularCommodities.slice(0, 6).map((commodity) => (
                <Badge
                  key={commodity}
                  variant="outline"
                  className="cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors px-4 py-2"
                  onClick={() => {
                    setSearchTerm(commodity)
                    fetchPrices(commodity)
                  }}
                >
                  Try {commodity}
                </Badge>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
