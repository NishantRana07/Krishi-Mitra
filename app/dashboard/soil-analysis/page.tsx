"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Droplets, Plus, Loader2, CheckCircle2, AlertCircle, Leaf } from "lucide-react"
import { getFarmerProfile } from "@/lib/storage"

export default function SoilAnalysisPage() {
  const farmerProfile = getFarmerProfile()
  const [formData, setFormData] = useState({
    location: farmerProfile?.location || "",
    ph: "",
    moisture: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    organicMatter: "",
    texture: "Loamy",
  })

  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.ph || !formData.moisture) {
      alert("Please enter at least pH and moisture values")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/soil-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error("Error analyzing soil:", error)
      alert("Failed to analyze soil. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Soil Analysis</h1>
        <p className="text-muted-foreground">Analyze your soil health and get recommendations</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Enter Soil Test Data</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="location">Field Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Field A, North Section"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ph">pH Level *</Label>
                <Input
                  id="ph"
                  name="ph"
                  type="number"
                  step="0.1"
                  placeholder="6.8"
                  value={formData.ph}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="moisture">Moisture (%) *</Label>
                <Input
                  id="moisture"
                  name="moisture"
                  type="number"
                  placeholder="45"
                  value={formData.moisture}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nitrogen">Nitrogen (ppm)</Label>
                <Input
                  id="nitrogen"
                  name="nitrogen"
                  type="number"
                  placeholder="120"
                  value={formData.nitrogen}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="phosphorus">Phosphorus (ppm)</Label>
                <Input
                  id="phosphorus"
                  name="phosphorus"
                  type="number"
                  placeholder="35"
                  value={formData.phosphorus}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="potassium">Potassium (ppm)</Label>
                <Input
                  id="potassium"
                  name="potassium"
                  type="number"
                  placeholder="180"
                  value={formData.potassium}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="organicMatter">Organic Matter (%)</Label>
                <Input
                  id="organicMatter"
                  name="organicMatter"
                  type="number"
                  step="0.1"
                  placeholder="2.5"
                  value={formData.organicMatter}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="texture">Soil Texture</Label>
              <Select value={formData.texture} onValueChange={(value) => setFormData(prev => ({ ...prev, texture: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Loamy">Loamy</SelectItem>
                  <SelectItem value="Sandy">Sandy</SelectItem>
                  <SelectItem value="Clay">Clay</SelectItem>
                  <SelectItem value="Silty">Silty</SelectItem>
                  <SelectItem value="Sandy Loam">Sandy Loam</SelectItem>
                  <SelectItem value="Clay Loam">Clay Loam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Droplets className="w-4 h-4" />
                  Analyze Soil with AI
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <Card className="p-6">
            <div className="space-y-6">
              {/* Overall Health */}
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-primary" />
                  Soil Health Report
                </h2>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Overall Health</p>
                    <p className="text-2xl font-bold text-primary">{analysis.overallHealth}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{analysis.healthScore}/100</p>
                    <p className="text-xs text-muted-foreground">Health Score</p>
                  </div>
                </div>
              </div>

              {/* pH Analysis */}
              <div className="border-t pt-4">
                <div className="flex items-start gap-2 mb-2">
                  {analysis.phAnalysis.status === "Optimal" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">pH Level: {analysis.phAnalysis.status}</p>
                    <p className="text-sm text-muted-foreground mt-1">{analysis.phAnalysis.recommendation}</p>
                  </div>
                </div>
              </div>

              {/* Moisture Analysis */}
              <div className="border-t pt-4">
                <div className="flex items-start gap-2 mb-2">
                  {analysis.moistureAnalysis.status === "Optimal" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">Moisture: {analysis.moistureAnalysis.status}</p>
                    <p className="text-sm text-muted-foreground mt-1">{analysis.moistureAnalysis.recommendation}</p>
                  </div>
                </div>
              </div>

              {/* Nutrients */}
              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Nutrient Levels</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nitrogen (N)</span>
                    <span className="font-semibold text-primary">{analysis.nutrientAnalysis.nitrogen.level}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{analysis.nutrientAnalysis.nitrogen.recommendation}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phosphorus (P)</span>
                    <span className="font-semibold text-primary">{analysis.nutrientAnalysis.phosphorus.level}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{analysis.nutrientAnalysis.phosphorus.recommendation}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Potassium (K)</span>
                    <span className="font-semibold text-primary">{analysis.nutrientAnalysis.potassium.level}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{analysis.nutrientAnalysis.potassium.recommendation}</p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Key Recommendations</p>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Crops */}
              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Recommended Crops</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.bestCrops.map((crop: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Warnings */}
              {analysis.warnings && analysis.warnings.length > 0 && (
                <div className="border-t pt-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Warnings
                    </p>
                    <ul className="space-y-1">
                      {analysis.warnings.map((warning: string, idx: number) => (
                        <li key={idx} className="text-sm text-yellow-800">• {warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!analysis && !loading && (
          <Card className="p-6 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Droplets className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">No Analysis Yet</p>
              <p className="text-muted-foreground">
                Enter your soil test data and click "Analyze Soil with AI" to get detailed insights
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
