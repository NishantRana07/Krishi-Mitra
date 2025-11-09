# 🌾 Mandi API Integration - Complete Guide

## ✅ What's Been Implemented

I've integrated the **Government of India's Mandi (Market) Price API** into your AgriSense project with real-time market data!

---

## 📁 Files Created/Modified

### 1. **`lib/mandi-api.ts`** - Core API Service
Complete TypeScript service with 10+ utility functions:

#### Main Functions:
- `fetchMandiPrices()` - Fetch prices with filters
- `getCommodityPrices()` - Get prices for specific commodity
- `getMarketCommodities()` - Get all commodities in a market
- `getCommodityTrends()` - Analyze best/worst markets
- `calculateProfitPotential()` - Calculate revenue potential
- `compareMarkets()` - Compare prices across markets
- `getStatePriceSummary()` - State-wise analysis
- `searchMarkets()` - Find markets by location
- `getPopularCommodities()` - Most traded commodities

### 2. **`app/api/market-prices/route.ts`** - Updated API Route
- **POST**: Fetch real Mandi data + Gemini AI analysis
- **GET**: Quick price lookup by commodity

**What Changed:**
- ❌ Removed: AI-generated mock prices
- ✅ Added: Real Government Mandi API data
- ✅ Kept: Gemini AI for market analysis & recommendations
- ✅ Added: State/district filtering
- ✅ Added: Trend analysis

### 3. **`app/dashboard/market-prices/page.tsx`** - Beautiful Dashboard
Full-featured market prices page with:
- Real-time search
- State/district filters
- Popular commodity quick-select
- Beautiful price cards with trends
- Min/Max/Modal price display
- Market location info
- Date stamps

---

## 🎯 How It Works

### Flow:
1. **User searches** for a commodity (e.g., "Wheat")
2. **Mandi API** fetches real prices from government database
3. **Trend analysis** calculates best/worst markets
4. **Gemini AI** analyzes the data and provides recommendations
5. **Dashboard** displays beautiful cards with all info

### Data Structure:
```typescript
{
  state: "Punjab",
  district: "Amritsar",
  market: "Amritsar",
  commodity: "Wheat",
  variety: "Desi",
  grade: "FAQ",
  arrival_date: "2024-11-09",
  min_price: "2400",
  max_price: "2600",
  modal_price: "2500"
}
```

---

## 🔑 API Configuration

### Environment Variable:
Add to your `.env.local`:
```env
MANDI_API_KEY=your_api_key_here
```

**Default Key** (for testing):
```
579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b
```
⚠️ This is a sample key with 10 records limit. Get your own key from:
https://data.gov.in/

---

## 🚀 Usage Examples

### 1. Dashboard Page
Visit: `/dashboard/market-prices`
- Search any commodity
- Filter by state/district
- See live prices from all mandis

### 2. API Endpoint (GET)
```bash
GET /api/market-prices?commodity=Wheat&state=Punjab&district=Amritsar
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "state": "Punjab",
      "market": "Amritsar",
      "commodity": "Wheat",
      "modal_price": "2500",
      "min_price": "2400",
      "max_price": "2600",
      "arrival_date": "2024-11-09"
    }
  ],
  "total": 50,
  "timestamp": "2024-11-09T10:00:00.000Z"
}
```

### 3. API Endpoint (POST)
```bash
POST /api/market-prices
Content-Type: application/json

{
  "crops": ["Wheat", "Rice"],
  "state": "Punjab",
  "district": "Amritsar"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "prices": [
      {
        "cropName": "Wheat",
        "realPrices": [...],
        "trends": {
          "bestMarkets": [...],
          "averagePrice": 2500,
          "totalMarkets": 15
        }
      }
    ],
    "analysis": {
      "marketSummary": "Wheat prices are stable...",
      "recommendations": "Good time to sell...",
      "forecast": "Prices expected to rise...",
      "bestTimeToSell": "Sell within 2 weeks"
    }
  },
  "source": "Government of India Mandi API + Gemini AI Analysis"
}
```

### 4. Programmatic Usage
```typescript
import { fetchMandiPrices, getCommodityTrends } from "@/lib/mandi-api"

// Get wheat prices in Punjab
const prices = await fetchMandiPrices({
  commodity: "Wheat",
  state: "Punjab",
  limit: 50
})

// Get trend analysis
const trends = await getCommodityTrends("Wheat", "Punjab")
console.log(trends.bestMarkets) // Top 5 markets
console.log(trends.averagePrice) // Average price
```

---

## 🎨 Dashboard Features

### Search & Filters
- **Commodity Search**: Type any crop name
- **State Filter**: Select from 14 major states
- **District Filter**: Enter specific district
- **Quick Select**: Click popular commodities

### Price Cards Display
Each card shows:
- ✅ Market name & location
- ✅ Commodity & variety
- ✅ Min/Max/Modal prices
- ✅ Price trend indicator (↑↓→)
- ✅ Grade information
- ✅ Arrival date
- ✅ Hover animations

### Visual Indicators
- 🟢 **Green Arrow**: Price increasing (>5%)
- 🔴 **Red Arrow**: Price decreasing (<-5%)
- ⚪ **Gray Line**: Stable prices

---

## 💡 Integration Points

### 1. Crop Recommendations
```typescript
// In recommendations API
const profitPotential = await calculateProfitPotential(
  "Wheat",
  "Punjab",
  100 // quintals
)

// Returns:
{
  bestCaseRevenue: 260000,
  averageCaseRevenue: 250000,
  worstCaseRevenue: 240000,
  recommendedMarkets: [...]
}
```

### 2. Price Alerts
```typescript
// Monitor price changes
const currentPrice = await getCommodityPrices("Wheat", "Punjab")
// Send alert if price crosses threshold
```

### 3. Market Comparison
```typescript
const comparison = await compareMarkets(
  "Wheat",
  ["Amritsar", "Ludhiana", "Patiala"],
  "Punjab"
)
// Shows which market has best price
```

---

## 📊 Available Commodities

### Cereals
Wheat, Rice, Maize, Bajra, Jowar, Ragi

### Pulses
Arhar (Tur), Moong, Urad, Gram, Masoor

### Oilseeds
Groundnut, Soyabean, Sunflower, Mustard, Cotton

### Cash Crops
Sugarcane, Cotton, Jute, Tobacco

### Vegetables
Potato, Onion, Tomato, Cabbage, Cauliflower

### Fruits
Mango, Banana, Apple, Grapes

---

## 🔥 Best Practices

### 1. Caching
```typescript
// API route uses Next.js caching
fetch(url, {
  next: { revalidate: 3600 } // Cache for 1 hour
})
```

### 2. Error Handling
```typescript
try {
  const data = await fetchMandiPrices({ commodity: "Wheat" })
} catch (error) {
  // Fallback to cached data or show error
}
```

### 3. Rate Limiting
- Sample API key: 10 records/request
- Production key: 100+ records/request
- Use pagination with `offset` and `limit`

---

## 🎯 Use Cases

### For Farmers
1. **Check Today's Prices**: See current mandi rates
2. **Find Best Market**: Compare prices across mandis
3. **Decide When to Sell**: AI recommendations
4. **Track Trends**: Monitor price movements

### For Your App
1. **Crop Recommendations**: Show profit potential
2. **Market Insights**: Display in dashboard
3. **Price Alerts**: Notify on price changes
4. **Historical Analysis**: Track price trends

---

## 🚀 Next Steps

### Enhancements You Can Add:

1. **Price Alerts**
   - Set target prices
   - Email/SMS notifications
   - Price drop/rise alerts

2. **Historical Charts**
   - Price trend graphs
   - Seasonal patterns
   - Year-over-year comparison

3. **Market Intelligence**
   - Demand forecasting
   - Supply analysis
   - Best selling times

4. **Location-Based**
   - Nearest mandi finder
   - Distance calculator
   - Transportation cost estimator

5. **Profit Calculator**
   - Input production cost
   - Calculate net profit
   - ROI analysis

---

## 📱 Mobile Optimization

The dashboard is fully responsive:
- ✅ Touch-friendly buttons
- ✅ Mobile-optimized cards
- ✅ Swipeable filters
- ✅ Readable on small screens

---

## 🎉 Summary

### What You Now Have:
✅ **Real Government Data** - Live mandi prices  
✅ **AI Analysis** - Gemini-powered insights  
✅ **Beautiful Dashboard** - User-friendly interface  
✅ **Comprehensive API** - 10+ utility functions  
✅ **State/District Filters** - Precise location targeting  
✅ **Trend Analysis** - Best/worst market identification  
✅ **Profit Calculations** - Revenue potential estimator  
✅ **Mobile Responsive** - Works on all devices  

### Impact:
🌾 Farmers can make **data-driven selling decisions**  
💰 Maximize profits by **finding best markets**  
📊 Real-time insights from **government sources**  
🤖 AI-powered **recommendations and forecasts**  

---

## 🔗 Quick Links

- **Dashboard**: `/dashboard/market-prices`
- **API Docs**: https://data.gov.in/
- **Get API Key**: https://data.gov.in/user/register

---

**Your AgriSense platform now has REAL market intelligence! 🚀**
