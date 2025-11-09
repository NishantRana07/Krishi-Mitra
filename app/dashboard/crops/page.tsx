"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Leaf, Plus, Trash2, Edit, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { getAllCrops, saveCrop, deleteCrop, getFarmerProfile, type Crop } from "@/lib/storage"
import { toast } from "sonner"

const COMMON_CROPS = [
  "Wheat",
  "Rice",
  "Corn",
  "Soybean",
  "Cotton",
  "Sugarcane",
  "Potato",
  "Tomato",
  "Onion",
  "Chili",
  "Mango",
  "Banana",
]

export default function CropsPage() {
  const [crops, setCrops] = useState<Crop[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<any>(null)
  const farmerProfile = getFarmerProfile()

  const [formData, setFormData] = useState({
    name: "",
    plantedDate: "",
    expectedHarvestDate: "",
    landArea: "",
    soilPH: farmerProfile?.soilPH?.toString() || "6.5",
    currentStage: "planted" as const,
    notes: "",
  })

  useEffect(() => {
    loadCrops()
  }, [])

  const loadCrops = () => {
    const allCrops = getAllCrops()
    setCrops(allCrops)
  }

  const validateCrop = async (cropName: string) => {
    if (!cropName.trim()) return

    setIsValidating(true)
    setValidationResult(null)

    try {
      const response = await fetch("/api/validate-crop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cropName,
          location: farmerProfile?.location,
          soilPH: formData.soilPH,
          landArea: formData.landArea,
        }),
      })

      const result = await response.json()
      setValidationResult(result)

      if (result.isValid) {
        toast.success(`${result.standardName} is a valid crop!`)
        setFormData((prev) => ({ ...prev, name: result.standardName }))
      } else {
        toast.error("Invalid crop name. Please try again.")
      }
    } catch (error) {
      console.error("Validation error:", error)
      toast.error("Could not validate crop. Please try again.")
    } finally {
      setIsValidating(false)
    }
  }

  const handleAddCrop = async () => {
    if (!formData.name || !formData.plantedDate || !formData.landArea) {
      toast.error("Please fill in all required fields")
      return
    }

    const newCrop: Crop = {
      id: Date.now().toString(),
      name: formData.name,
      plantedDate: formData.plantedDate,
      expectedHarvestDate: formData.expectedHarvestDate,
      landArea: parseFloat(formData.landArea),
      soilPH: parseFloat(formData.soilPH),
      currentStage: formData.currentStage,
      healthStatus: "healthy",
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    saveCrop(newCrop)
    loadCrops()
    setIsAddDialogOpen(false)
    resetForm()
    toast.success(`${newCrop.name} added successfully!`)
  }

  const handleDeleteCrop = (id: string) => {
    if (confirm("Are you sure you want to delete this crop?")) {
      deleteCrop(id)
      loadCrops()
      toast.success("Crop deleted successfully")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      plantedDate: "",
      expectedHarvestDate: "",
      landArea: "",
      soilPH: farmerProfile?.soilPH?.toString() || "6.5",
      currentStage: "planted",
      notes: "",
    })
    setValidationResult(null)
  }

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "planted":
        return "text-blue-600 bg-blue-100"
      case "growing":
        return "text-green-600 bg-green-100"
      case "flowering":
        return "text-purple-600 bg-purple-100"
      case "harvesting":
        return "text-orange-600 bg-orange-100"
      case "harvested":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">My Crops</h1>
          <p className="text-muted-foreground">Manage and monitor all your registered crops</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Crop
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Crop</DialogTitle>
              <DialogDescription>
                Register a new crop for monitoring and AI-powered insights
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cropName">Crop Name *</Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.name}
                    onValueChange={(value) => {
                      setFormData({ ...formData, name: value })
                      validateCrop(value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMON_CROPS.map((crop) => (
                        <SelectItem key={crop} value={crop}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex-1">
                    <Input
                      id="cropName"
                      placeholder="Or type custom crop name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onBlur={(e) => validateCrop(e.target.value)}
                    />
                  </div>
                  {isValidating && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                </div>
              </div>

              {validationResult && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-start gap-3">
                    {validationResult.isValid ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1 space-y-2">
                      <p className="font-semibold text-sm">
                        {validationResult.standardName} ({validationResult.scientificName})
                      </p>
                      <p className="text-sm text-muted-foreground">{validationResult.suggestions}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-semibold">Category:</span> {validationResult.category}
                        </div>
                        <div>
                          <span className="font-semibold">Water Need:</span>{" "}
                          {validationResult.waterRequirement}
                        </div>
                        <div>
                          <span className="font-semibold">pH Range:</span>{" "}
                          {validationResult.suitableForPH?.min} - {validationResult.suitableForPH?.max}
                        </div>
                        <div>
                          <span className="font-semibold">Avg Yield:</span> {validationResult.averageYield}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plantedDate">Planted Date *</Label>
                  <Input
                    id="plantedDate"
                    type="date"
                    value={formData.plantedDate}
                    onChange={(e) => setFormData({ ...formData, plantedDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedHarvestDate">Expected Harvest Date</Label>
                  <Input
                    id="expectedHarvestDate"
                    type="date"
                    value={formData.expectedHarvestDate}
                    onChange={(e) => setFormData({ ...formData, expectedHarvestDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="landArea">Land Area (hectares) *</Label>
                  <Input
                    id="landArea"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 2.5"
                    value={formData.landArea}
                    onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilPH">Soil pH</Label>
                  <Input
                    id="soilPH"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 6.5"
                    value={formData.soilPH}
                    onChange={(e) => setFormData({ ...formData, soilPH: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentStage">Current Stage</Label>
                <Select
                  value={formData.currentStage}
                  onValueChange={(value: any) => setFormData({ ...formData, currentStage: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planted">Planted</SelectItem>
                    <SelectItem value="growing">Growing</SelectItem>
                    <SelectItem value="flowering">Flowering</SelectItem>
                    <SelectItem value="harvesting">Harvesting</SelectItem>
                    <SelectItem value="harvested">Harvested</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="Any additional information..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCrop}>Add Crop</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {crops.length === 0 ? (
        <Card className="p-12 text-center">
          <Leaf className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No crops registered yet</h3>
          <p className="text-muted-foreground mb-6">
            Start by adding your first crop to enable AI-powered monitoring and insights
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Your First Crop
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {crops.map((crop) => (
            <Card key={crop.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">{crop.name}</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCrop(crop.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Land Area</span>
                  <span className="font-semibold">{crop.landArea} ha</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Planted</span>
                  <span className="font-semibold">
                    {new Date(crop.plantedDate).toLocaleDateString()}
                  </span>
                </div>

                {crop.expectedHarvestDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Expected Harvest</span>
                    <span className="font-semibold">
                      {new Date(crop.expectedHarvestDate).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Stage</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStageColor(crop.currentStage)}`}>
                    {crop.currentStage}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Health</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getHealthStatusColor(crop.healthStatus)}`}
                  >
                    {crop.healthStatus}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Soil pH</span>
                  <span className="font-semibold">{crop.soilPH}</span>
                </div>

                {crop.notes && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground italic">{crop.notes}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
