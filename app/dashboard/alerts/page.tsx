"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Mail,
  RefreshCw,
  Loader2,
} from "lucide-react"
import {
  getAllAlerts,
  getAllCrops,
  getFarmerProfile,
  resolveAlert,
  saveAlert,
  type Alert,
  type Crop,
} from "@/lib/storage"
import { toast } from "sonner"

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [crops, setCrops] = useState<Crop[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)
  const farmerProfile = getFarmerProfile()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setAlerts(getAllAlerts().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
    setCrops(getAllCrops())
  }

  const runMonitoring = async () => {
    if (crops.length === 0) {
      toast.error("Please add crops first to enable monitoring")
      return
    }

    setIsMonitoring(true)
    try {
      // Simulate weather and soil data
      const weatherData = {
        temperature: 25 + Math.random() * 10,
        humidity: 60 + Math.random() * 20,
        rainfall: Math.random() * 50,
      }

      const soilData = {
        moisture: 40 + Math.random() * 30,
        ph: farmerProfile?.soilPH || 6.5,
        temperature: 20 + Math.random() * 10,
      }

      const response = await fetch("/api/monitor-crops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crops: crops.map((c) => ({
            id: c.id,
            name: c.name,
            landArea: c.landArea,
            soilPH: c.soilPH,
            currentStage: c.currentStage,
            healthStatus: c.healthStatus,
          })),
          weatherData,
          soilData,
        }),
      })

      const result = await response.json()

      if (result.success && result.analysis.alerts.length > 0) {
        // Save new alerts
        result.analysis.alerts.forEach((alertData: any) => {
          const newAlert: Alert = {
            id: Date.now().toString() + Math.random(),
            cropId: crops[0].id, // In real implementation, match to specific crop
            type: alertData.type,
            severity: alertData.severity,
            message: alertData.message,
            timestamp: new Date().toISOString(),
            resolved: false,
            emailSent: false,
          }
          saveAlert(newAlert)
        })

        loadData()
        toast.success(`Monitoring complete! Found ${result.analysis.alerts.length} alerts`)
      } else {
        toast.success("Monitoring complete! All crops are healthy")
      }
    } catch (error) {
      console.error("Monitoring error:", error)
      toast.error("Monitoring failed. Please try again.")
    } finally {
      setIsMonitoring(false)
    }
  }

  const handleResolveAlert = (id: string) => {
    resolveAlert(id)
    loadData()
    toast.success("Alert marked as resolved")
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getTypeLabel = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const unresolvedAlerts = alerts.filter((a) => !a.resolved)
  const resolvedAlerts = alerts.filter((a) => a.resolved)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Alerts & Monitoring</h1>
          <p className="text-muted-foreground">
            Automated monitoring and proactive alerts for your crops
          </p>
        </div>

        <Button onClick={runMonitoring} disabled={isMonitoring} className="gap-2">
          {isMonitoring ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Monitoring...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Run Monitoring
            </>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Critical</p>
              <p className="text-2xl font-bold">
                {unresolvedAlerts.filter((a) => a.severity === "critical").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Warning</p>
              <p className="text-2xl font-bold">
                {unresolvedAlerts.filter((a) => a.severity === "warning").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Info</p>
              <p className="text-2xl font-bold">
                {unresolvedAlerts.filter((a) => a.severity === "info").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold">{resolvedAlerts.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Unresolved Alerts */}
      {unresolvedAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Active Alerts</h2>
          {unresolvedAlerts.map((alert) => {
            const crop = crops.find((c) => c.id === alert.cropId)
            return (
              <Card key={alert.id} className={`p-6 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{alert.message}</h3>
                        <Badge variant="outline">{getTypeLabel(alert.type)}</Badge>
                        {alert.emailSent && (
                          <Badge variant="outline" className="gap-1">
                            <Mail className="w-3 h-3" />
                            Email Sent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Crop: {crop?.name || "Unknown"} • {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleResolveAlert(alert.id)}>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Resolve
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-muted-foreground">Resolved Alerts</h2>
          {resolvedAlerts.slice(0, 5).map((alert) => {
            const crop = crops.find((c) => c.id === alert.cropId)
            return (
              <Card key={alert.id} className="p-6 opacity-60">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{alert.message}</h3>
                      <Badge variant="outline">{getTypeLabel(alert.type)}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Crop: {crop?.name || "Unknown"} • {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {alerts.length === 0 && (
        <Card className="p-12 text-center">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-xl font-semibold mb-2">No alerts yet</h3>
          <p className="text-muted-foreground mb-6">
            Run monitoring to check your crops for any issues or anomalies
          </p>
          <Button onClick={runMonitoring} disabled={isMonitoring} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Run First Monitoring
          </Button>
        </Card>
      )}
    </div>
  )
}
