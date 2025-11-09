export interface FarmerProfile {
  name: string
  email: string
  location: string
  state?: string
  district?: string
  latitude: number
  longitude: number
  soilPH: number
  soilMoisture: number
  currentCrop: string
  landArea: number
  createdAt: string
  language?: string
}

export interface Crop {
  id: string
  name: string
  plantedDate: string
  expectedHarvestDate: string
  landArea: number
  soilPH: number
  currentStage: "planted" | "growing" | "flowering" | "harvesting" | "harvested"
  healthStatus: "healthy" | "warning" | "critical"
  lastWatered?: string
  lastFertilized?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface MonitoringData {
  cropId: string
  timestamp: string
  soilMoisture: number
  soilPH: number
  temperature: number
  humidity: number
  rainfall: number
  alerts: Alert[]
}

export interface Alert {
  id: string
  cropId: string
  type: "soil_moisture" | "soil_ph" | "temperature" | "weather" | "disease" | "pest" | "market"
  severity: "info" | "warning" | "critical"
  message: string
  timestamp: string
  resolved: boolean
  emailSent: boolean
}

export interface MarketPrice {
  cropName: string
  price: number
  unit: string
  market: string
  date: string
  trend: "up" | "down" | "stable"
}

export const storageKeys = {
  FARMER_PROFILE: "agrisense_farmer_profile",
  CROPS: "agrisense_crops",
  MONITORING_DATA: "agrisense_monitoring_data",
  ALERTS: "agrisense_alerts",
  MARKET_PRICES: "agrisense_market_prices",
  SOIL_DATA: "agrisense_soil_data",
  CROP_DATA: "agrisense_crop_data",
  ONBOARDING_COMPLETE: "agrisense_onboarding_complete",
}

export const getFarmerProfile = (): FarmerProfile | null => {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(storageKeys.FARMER_PROFILE)
  return data ? JSON.parse(data) : null
}

export const saveFarmerProfile = (profile: FarmerProfile) => {
  if (typeof window === "undefined") return
  localStorage.setItem(storageKeys.FARMER_PROFILE, JSON.stringify(profile))
}

export const isOnboardingComplete = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem(storageKeys.ONBOARDING_COMPLETE) === "true"
}

export const setOnboardingComplete = () => {
  if (typeof window === "undefined") return
  localStorage.setItem(storageKeys.ONBOARDING_COMPLETE, "true")
}

export const clearFarmerData = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem(storageKeys.FARMER_PROFILE)
  localStorage.removeItem(storageKeys.SOIL_DATA)
  localStorage.removeItem(storageKeys.CROP_DATA)
  localStorage.removeItem(storageKeys.ONBOARDING_COMPLETE)
  localStorage.removeItem(storageKeys.CROPS)
  localStorage.removeItem(storageKeys.MONITORING_DATA)
  localStorage.removeItem(storageKeys.ALERTS)
  localStorage.removeItem(storageKeys.MARKET_PRICES)
}

// Crop Management Functions
export const getAllCrops = (): Crop[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(storageKeys.CROPS)
  return data ? JSON.parse(data) : []
}

export const getCrop = (id: string): Crop | null => {
  const crops = getAllCrops()
  return crops.find((crop) => crop.id === id) || null
}

export const saveCrop = (crop: Crop) => {
  if (typeof window === "undefined") return
  const crops = getAllCrops()
  const existingIndex = crops.findIndex((c) => c.id === crop.id)

  if (existingIndex >= 0) {
    crops[existingIndex] = { ...crop, updatedAt: new Date().toISOString() }
  } else {
    crops.push(crop)
  }

  localStorage.setItem(storageKeys.CROPS, JSON.stringify(crops))
}

export const deleteCrop = (id: string) => {
  if (typeof window === "undefined") return
  const crops = getAllCrops()
  const filtered = crops.filter((crop) => crop.id !== id)
  localStorage.setItem(storageKeys.CROPS, JSON.stringify(filtered))
}

// Alert Management Functions
export const getAllAlerts = (): Alert[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(storageKeys.ALERTS)
  return data ? JSON.parse(data) : []
}

export const getUnresolvedAlerts = (): Alert[] => {
  return getAllAlerts().filter((alert) => !alert.resolved)
}

export const saveAlert = (alert: Alert) => {
  if (typeof window === "undefined") return
  const alerts = getAllAlerts()
  alerts.push(alert)
  localStorage.setItem(storageKeys.ALERTS, JSON.stringify(alerts))
}

export const resolveAlert = (id: string) => {
  if (typeof window === "undefined") return
  const alerts = getAllAlerts()
  const updated = alerts.map((alert) => (alert.id === id ? { ...alert, resolved: true } : alert))
  localStorage.setItem(storageKeys.ALERTS, JSON.stringify(updated))
}

export const markAlertEmailSent = (id: string) => {
  if (typeof window === "undefined") return
  const alerts = getAllAlerts()
  const updated = alerts.map((alert) => (alert.id === id ? { ...alert, emailSent: true } : alert))
  localStorage.setItem(storageKeys.ALERTS, JSON.stringify(updated))
}

// Monitoring Data Functions
export const saveMonitoringData = (data: MonitoringData) => {
  if (typeof window === "undefined") return
  const allData = getAllMonitoringData()
  allData.push(data)
  // Keep only last 100 entries per crop
  const filtered = allData.slice(-100)
  localStorage.setItem(storageKeys.MONITORING_DATA, JSON.stringify(filtered))
}

export const getAllMonitoringData = (): MonitoringData[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(storageKeys.MONITORING_DATA)
  return data ? JSON.parse(data) : []
}

export const getMonitoringDataForCrop = (cropId: string): MonitoringData[] => {
  return getAllMonitoringData().filter((data) => data.cropId === cropId)
}

// Market Price Functions
export const getAllMarketPrices = (): MarketPrice[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(storageKeys.MARKET_PRICES)
  return data ? JSON.parse(data) : []
}

export const saveMarketPrice = (price: MarketPrice) => {
  if (typeof window === "undefined") return
  const prices = getAllMarketPrices()
  prices.push(price)
  // Keep only last 50 entries
  const filtered = prices.slice(-50)
  localStorage.setItem(storageKeys.MARKET_PRICES, JSON.stringify(filtered))
}

export const getMarketPriceForCrop = (cropName: string): MarketPrice | null => {
  const prices = getAllMarketPrices()
  const cropPrices = prices.filter((p) => p.cropName.toLowerCase() === cropName.toLowerCase())
  return cropPrices.length > 0 ? cropPrices[cropPrices.length - 1] : null
}
