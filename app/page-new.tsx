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
  PlayCircle, ChevronRight, Heart, Award, Globe, Wifi
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                AgriSense
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors">Stories</a>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="outline" className="hidden sm:inline-flex">Dashboard</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== 1️⃣ HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-green-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-green-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Decorative Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div className="inline-block animate-fade-in-down mb-6">
            <Badge className="px-6 py-2 text-sm bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Globe className="w-4 h-4 mr-2" />
              Built for Indian Farmers 🇮🇳 | Powered by Gemini AI + IoT
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 animate-fade-in-up">
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent animate-gradient leading-tight">
              Smart Farming.
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Real Insights.</span>
            <br />
            <span className="text-gray-900 dark:text-white">Better Yields.</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto animate-fade-in delay-200 leading-relaxed">
            AgriSense is your <span className="font-semibold text-emerald-600">AI-powered companion</span> that helps you make better farming decisions — from <span className="font-semibold">soil to market</span>.
          </p>

          {/* 3 Icon Ecosystem */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in delay-300">
            <div className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full shadow-lg">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900 dark:text-white">Soil</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full shadow-lg">
              <Sprout className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900 dark:text-white">Crop</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full shadow-lg">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-gray-900 dark:text-white">Market</span>
            </div>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in delay-500">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-10 py-7 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 group">
                Start Farming Smarter
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-300 hover:scale-105">
              <PlayCircle className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Farmers</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Crops Monitored</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Districts</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-emerald-600 rotate-90" />
        </div>
      </section>

      {/* ===== 2️⃣ MISSION / ABOUT SECTION ===== */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Our Mission
            </Badge>
            <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Empowering Farmers Through<br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Data and Intelligence
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              AgriSense connects <span className="font-semibold text-emerald-600">soil sensors</span>, <span className="font-semibold text-emerald-600">satellite insights</span>, and <span className="font-semibold text-emerald-600">AI</span> to bring farmers actionable intelligence — not just data. From predicting rainfall to detecting crop diseases, AgriSense is built to guide every step of the farming cycle.
            </p>
            <div className="mt-8">
              <a href="#features">
                <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  See How It Works
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">IoT-Powered</h3>
              <p className="text-gray-600 dark:text-gray-400">Real-time soil sensors (YL-69, DHT11, pH) for live data</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Gemini AI</h3>
              <p className="text-gray-600 dark:text-gray-400">Multilingual chat, crop advice, and disease detection</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Smart Alerts</h3>
              <p className="text-gray-600 dark:text-gray-400">Email/SMS notifications for weather, soil, and market changes</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3️⃣ KEY FEATURES GRID ===== */}
      <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Everything You Need to<br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Farm Smarter
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Soil Health */}
            <Card className="group p-8 border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-900 dark:to-emerald-950/20">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                🌱 Soil Health Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Get real-time soil pH, moisture, and nutrient insights using IoT sensors (YL-69, DHT11, Soil pH Sensor).
              </p>
            </Card>

            {/* Feature 2: Weather Intelligence */}
            <Card className="group p-8 border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CloudRain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                ☁️ Weather Intelligence
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                7-day forecasts, rainfall alerts, and humidity tracking for smarter irrigation.
              </p>
            </Card>

            {/* Feature 3: AI Crop Advisor */}
            <Card className="group p-8 border-2 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                🧠 AI Crop Advisor (Gemini)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Gemini AI recommends crops, predicts yield, and answers farmer queries via multilingual chat.
              </p>
            </Card>

            {/* Feature 4: Disease Detection */}
            <Card className="group p-8 border-2 hover:border-red-500 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-red-50/30 dark:from-gray-900 dark:to-red-950/20">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                📸 Disease Detection
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Upload crop images — Gemini Vision API detects issues and gives treatment suggestions with confidence score.
              </p>
            </Card>

            {/* Feature 5: Market Forecasts */}
            <Card className="group p-8 border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-900 dark:to-amber-950/20">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
                📈 Market Forecasts
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Integrated mandi price updates and profit predictions based on your region.
              </p>
            </Card>

            {/* Feature 6: Automated Alerts */}
            <Card className="group p-8 border-2 hover:border-orange-500 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-900 dark:to-orange-950/20">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                📩 Automated Alerts
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Real-time email/SMS alerts about soil issues, weather risks, or market changes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Continue in next message due to length... */}
      
      <div className="text-center py-20 bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500">More sections coming in the complete implementation...</p>
      </div>
    </div>
  )
}
