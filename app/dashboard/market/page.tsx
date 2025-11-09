"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus, RefreshCw, Loader2, DollarSign } from "lucide-react"
import { getAllCrops, getFarmerProfile, saveMarketPrice, type MarketPrice } from "@/lib/storage"
import { toast } from "sonner"

export default function MarketPage() {
  const [prices, setPrices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [marketSummary, setMarketSummary] = useState("")
  const [recommendations, setRecommendations] = useState("")
  const crops = getAllCrops()
  const farmerProfile = getFarmerProfile()

  useEffect(() => {
    if (crops.length > 0) {
      fetchMarketPrices()
    }
  }, [])

  const fetchMarketPrices = async () => {
    if (crops.length === 0) {
      toast.error("Please add crops first to view market prices")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/market-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crops: crops.map((c) => ({ name: c.name, landArea: c.landArea })),
          location: farmerProfile?.location,
          state: farmerProfile?.state,
          district: farmerProfile?.district,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Handle new API response structure with real Mandi data
        if (result.data.prices && Array.isArray(result.data.prices)) {
          setPrices(result.data.prices)
        }
        
        if (result.data.analysis) {
          setMarketSummary(result.data.analysis.marketSummary || "")
          setRecommendations(result.data.analysis.recommendations || "")
        }

        toast.success("Market prices updated successfully")
      }
    } catch (error) {
      console.error("Market price error:", error)
      toast.error("Failed to fetch market prices")
    } finally {
      setIsLoading(false)
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "down":
        return <TrendingDown className="w-5 h-5 text-red-600" />
      default:
        return <Minus className="w-5 h-5 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-50 border-green-200"
      case "down":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Market Intelligence</h1>
          <p className="text-muted-foreground">
            Real-time market prices and insights for your registered crops
          </p>
        </div>

        <Button onClick={fetchMarketPrices} disabled={isLoading} className="gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Refresh Prices
            </>
          )}
        </Button>
      </div>

      {marketSummary && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Market Summary
          </h3>
          <p className="text-muted-foreground">{marketSummary}</p>
        </Card>
      )}

      {recommendations && (
        <Card className="p-6 bg-green-50 border-green-200">
          <h3 className="font-bold text-lg mb-2">Recommendations</h3>
          <p className="text-muted-foreground">{recommendations}</p>
        </Card>
      )}

      {prices.length > 0 ? (
        <div className="space-y-8">
          {prices.map((cropData: any, idx: number) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{cropData.cropName}</h2>
                {cropData.trends && (
                  <div className="text-sm text-muted-foreground">
                    Avg: ₹{cropData.trends.averagePrice?.toFixed(0)} | {cropData.trends.totalMarkets} markets
                  </div>
                )}
              </div>

              {/* Real Mandi Prices */}
              {cropData.realPrices && cropData.realPrices.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cropData.realPrices.slice(0, 6).map((price: any, priceIdx: number) => (
                    <Card key={priceIdx} className="p-5 hover:shadow-lg transition-all hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{price.market}</h3>
                          <p className="text-xs text-muted-foreground">
                            {price.district}, {price.state}
                          </p>
                        </div>
                        {getTrendIcon(price.minPrice < price.maxPrice ? "up" : "stable")}
                      </div>

                      <div className="space-y-2">
                        {price.variety && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Variety: </span>
                            <span className="font-medium">{price.variety}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-2 py-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Min</p>
                            <p className="font-bold text-red-600">₹{price.minPrice}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Modal</p>
                            <p className="font-bold text-emerald-600 text-lg">₹{price.price}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Max</p>
                            <p className="font-bold text-green-600">₹{price.maxPrice}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t text-xs text-muted-foreground">
                          {new Date(price.date).toLocaleDateString()}
                          {price.grade && ` • Grade: ${price.grade}`}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center text-muted-foreground">
                  No market data available for {cropData.cropName}
                </Card>
              )}

              {/* Best Markets Summary */}
              {cropData.trends && cropData.trends.bestMarkets && cropData.trends.bestMarkets.length > 0 && (
                <Card className="p-4 bg-green-50 border-green-200">
                  <h4 className="font-semibold text-sm mb-2 text-green-900">🏆 Best Markets to Sell</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {cropData.trends.bestMarkets.slice(0, 3).map((market: any, i: number) => (
                      <div key={i} className="text-sm">
                        <span className="font-medium">{market.market}</span>
                        <span className="text-green-700"> - ₹{market.modalPrice.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <DollarSign className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No market data available</h3>
          <p className="text-muted-foreground mb-6">
            {crops.length === 0
              ? "Add crops first to view market prices"
              : "Click 'Refresh Prices' to fetch the latest market data"}
          </p>
          {crops.length > 0 && (
            <Button onClick={fetchMarketPrices} disabled={isLoading} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Fetch Market Prices
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}
