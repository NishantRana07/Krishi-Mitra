"use client"

import { Sparkles, Zap, Target, Activity, TrendingUp, Shield, CloudRain, Leaf, Bug, MessageSquare } from "lucide-react"

export function MarqueeFeatures() {
  const features = [
    { icon: Sparkles, text: "AI-Powered Analysis", color: "text-purple-600" },
    { icon: Zap, text: "Real-Time IoT Sensors", color: "text-yellow-600" },
    { icon: Target, text: "95% Accuracy", color: "text-red-600" },
    { icon: Activity, text: "Live Monitoring", color: "text-blue-600" },
    { icon: TrendingUp, text: "Yield Prediction", color: "text-green-600" },
    { icon: Shield, text: "Disease Detection", color: "text-orange-600" },
    { icon: CloudRain, text: "Weather Forecasts", color: "text-cyan-600" },
    { icon: Leaf, text: "Soil Analysis", color: "text-emerald-600" },
  ]

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...features, ...features].map((feature, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-3 mx-8 px-6 py-3 bg-white/20 backdrop-blur rounded-full"
          >
            <feature.icon className={`w-5 h-5 ${feature.color} bg-white rounded-full p-1`} />
            <span className="text-white font-semibold text-lg">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarqueeTechnologies() {
  const technologies = [
    "Gemini AI",
    "IoT Sensors",
    "Weather API",
    "Mandi Price API",
    "Next.js",
    "Tailwind CSS",
    "Real-Time Data",
    "Machine Learning",
    "Computer Vision",
    "Multilingual Support",
  ]

  return (
    <div className="relative overflow-hidden bg-gray-900 py-4">
      <div className="flex animate-marquee-reverse whitespace-nowrap">
        {[...technologies, ...technologies, ...technologies].map((tech, index) => (
          <div
            key={index}
            className="inline-flex items-center mx-6 px-5 py-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg"
          >
            <span className="text-white font-bold text-sm uppercase tracking-wider">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarqueeStats() {
  const stats = [
    { value: "10,000+", label: "Active Farmers" },
    { value: "50,000+", label: "Crops Monitored" },
    { value: "95%", label: "AI Accuracy" },
    { value: "500+", label: "Districts Covered" },
    { value: "24/7", label: "Support Available" },
    { value: "100+", label: "Commodities Tracked" },
  ]

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 py-8 border-y border-gray-200 dark:border-gray-800">
      <div className="flex animate-marquee-fast whitespace-nowrap">
        {[...stats, ...stats].map((stat, index) => (
          <div
            key={index}
            className="inline-flex flex-col items-center mx-12 px-8 py-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-xl elevation-1"
          >
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 mb-1">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function EyeCatchingBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-12">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur rounded-full">
          <span className="text-white text-sm font-bold uppercase tracking-widest">🚀 Limited Time Offer</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 animate-pulse-slow">
          <span className="font-extrabold italic">Start FREE</span> for{" "}
          <span className="text-yellow-300 font-black underline decoration-wavy">7 Days!</span>
        </h2>
        <p className="text-xl md:text-2xl text-white/90 font-light mb-6">
          No credit card required • Cancel anytime • Full access to all features
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-lg hover:scale-105 transition-transform shadow-2xl ripple">
            Claim Your Free Trial →
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/10 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
