"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Leaf, Droplets, Bug, MessageSquare, TrendingUp, Shield, 
  CloudRain, Bell, Phone, Zap, Camera, TestTube, 
  CheckCircle2, ArrowRight, Star, Crown, Sparkles,
  BarChart3, AlertTriangle, Wind, Thermometer, MapPin,
  Sprout, Users, Clock, Download, Activity, Target, Gauge,
  Wifi, Globe, ChevronRight
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Material AppBar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 elevation-2">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">AgriSense</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600">Features</a>
            <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600">How It Works</a>
            <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600">Pricing</a>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard">
              <Button variant="outline" className="h-9 px-4 text-sm material-corner">Dashboard</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="h-9 px-4 text-sm bg-emerald-600 hover:bg-emerald-700 material-corner ripple">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Information Dense */}
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Content */}
            <div>
              <Badge className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 material-corner mb-3">
                <Sparkles className="w-3 h-3 mr-1" />
                AI + IoT Platform
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">
                Smart Farming with<br />
                <span className="text-emerald-600">Real-Time Intelligence</span>
              </h1>
              
              <p className="text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                AI-powered crop monitoring, disease detection, market prices, and weather forecasting - all in one platform. Built for Indian farmers with IoT sensors and Gemini AI.
              </p>
              
              <div className="flex gap-2 mb-6">
                <Link href="/dashboard">
                  <Button className="h-10 px-6 text-sm bg-emerald-600 hover:bg-emerald-700 material-corner ripple">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="h-10 px-6 text-sm material-corner">
                  <Camera className="mr-2 w-4 h-4" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 material-corner text-xs font-medium">
                  <Wifi className="w-3 h-3 inline mr-1" />
                  IoT Enabled
                </div>
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 material-corner text-xs font-medium">
                  <Globe className="w-3 h-3 inline mr-1" />
                  Multilingual
                </div>
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 material-corner text-xs font-medium">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Gemini AI
                </div>
              </div>
            </div>
            
            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="dense-card elevation-1 material-corner transition-elevation hover:elevation-2">
                <div className="text-3xl font-bold text-emerald-600 mb-1">10K+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Active Farmers</div>
              </Card>
              <Card className="dense-card elevation-1 material-corner transition-elevation hover:elevation-2">
                <div className="text-3xl font-bold text-emerald-600 mb-1">50K+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Crops Monitored</div>
              </Card>
              <Card className="dense-card elevation-1 material-corner transition-elevation hover:elevation-2">
                <div className="text-3xl font-bold text-emerald-600 mb-1">95%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">AI Accuracy</div>
              </Card>
              <Card className="dense-card elevation-1 material-corner transition-elevation hover:elevation-2">
                <div className="text-3xl font-bold text-emerald-600 mb-1">500+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Districts Covered</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Dense Grid */}
      <section id="features" className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <Badge className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 material-corner mb-2">
              <Zap className="w-3 h-3 mr-1" />
              Core Features
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Complete Farming Solution</h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* Feature 1 */}
            <Link href="/dashboard/soil-analysis">
              <Card className="dense-card elevation-1 material-corner transition-material hover:elevation-3 cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded flex items-center justify-center shrink-0">
                    <Droplets className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white group-hover:text-emerald-600">Soil Analysis</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">Real-time pH, moisture & nutrients via IoT sensors</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Feature 2 */}
            <Link href="/dashboard/disease-detection">
              <Card className="dense-card elevation-1 material-corner transition-material hover:elevation-3 cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center shrink-0">
                    <Bug className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white group-hover:text-red-600">Disease Detection</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">AI-powered crop disease identification & treatment</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Feature 3 */}
            <Link href="/dashboard/recommendations">
              <Card className="dense-card elevation-1 material-corner transition-material hover:elevation-3 cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white group-hover:text-blue-600">Smart Recommendations</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">Personalized crop & fertilizer suggestions</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Feature 4 */}
            <Link href="/dashboard/chat">
              <Card className="dense-card elevation-1 material-corner transition-material hover:elevation-3 cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white group-hover:text-purple-600">AI Assistant</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">24/7 multilingual farming advice via Gemini</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Feature 5 */}
            <Link href="/dashboard/yield-prediction">
              <Card className="dense-card elevation-1 material-corner transition-material hover:elevation-3 cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-600 rounded flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white group-hover:text-amber-600">Yield Prediction</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">Forecast harvest with AI analytics</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Feature 6 */}
            <Link href="/dashboard/alerts">
              <Card className="dense-card elevation-1 material-corner transition-material hover:elevation-3 cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white group-hover:text-orange-600">Smart Alerts</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">Weather & threat notifications via email/SMS</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Feature 7 */}
            <Link href="/dashboard/market-prices">
              <Card className="dense-card elevation-1 material-corner transition-material hover:elevation-3 cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white group-hover:text-green-600">Market Prices</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">Live mandi prices from Govt API</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Feature 8 */}
            <Link href="/dashboard">
              <Card className="dense-card elevation-1 material-corner transition-material hover:elevation-3 cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-cyan-600 rounded flex items-center justify-center shrink-0">
                    <CloudRain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white group-hover:text-cyan-600">Weather Forecast</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">7-day forecasts & rainfall alerts</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Compact */}
      <section id="how-it-works" className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <Badge className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 material-corner mb-2">
              <Target className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Get Started in 3 Steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="dense-section elevation-1 material-corner">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm">1</div>
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">Add Your Farm</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Enter location, soil details, and crops. Connect IoT sensors (optional) for real-time monitoring.
              </p>
            </Card>

            <Card className="dense-section elevation-1 material-corner">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm">2</div>
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">Monitor & Analyze</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Track soil health, weather, diseases. Upload crop photos for AI analysis. Get market prices.
              </p>
            </Card>

            <Card className="dense-section elevation-1 material-corner">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm">3</div>
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">Get AI Insights</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Receive predictions, alerts, recommendations. Chat with AI assistant in your language.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing - Compact */}
      <section id="pricing" className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-6 text-center">
            <Badge className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 material-corner mb-2">
              <Crown className="w-3 h-3 mr-1" />
              Premium Plan
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Unlock Advanced Features</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="dense-section elevation-2 material-corner">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Free Plan</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Perfect to get started</p>
                </div>
                <div className="text-3xl font-bold text-emerald-600">₹0</div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>All core features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>AI chat assistant</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Disease detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Market prices</span>
                </li>
              </ul>
              <Link href="/dashboard">
                <Button className="w-full mt-4 h-9 bg-emerald-600 hover:bg-emerald-700 material-corner">
                  Start Free
                </Button>
              </Link>
            </Card>

            <Card className="dense-section elevation-2 material-corner border-2 border-amber-500">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Premium</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">For serious farmers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">₹499</div>
                  <div className="text-xs text-gray-600">/month</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span><strong>Everything in Free</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Expert call support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Priority AI responses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <Button className="w-full mt-4 h-9 bg-amber-600 hover:bg-amber-700 material-corner">
                Try 7 Days Free
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - Compact */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">AgriSense</span>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/dashboard" className="hover:text-emerald-400">Dashboard</Link>
              <Link href="/dashboard/crops" className="hover:text-emerald-400">Crops</Link>
              <Link href="/dashboard/market-prices" className="hover:text-emerald-400">Market Prices</Link>
              <Link href="/dashboard/chat" className="hover:text-emerald-400">AI Assistant</Link>
            </div>
            
            <div className="flex gap-2">
              <Badge className="px-2 py-1 text-xs bg-emerald-600 text-white material-corner">AI-Powered</Badge>
              <Badge className="px-2 py-1 text-xs bg-blue-600 text-white material-corner">IoT Ready</Badge>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">
            <p><strong className="text-white">AgriSense</strong> - Smart Farming for Everyone | Built with Gemini AI + IoT</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
