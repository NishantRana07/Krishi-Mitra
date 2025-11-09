# 🔑 API Configuration Guide

## Current API Setup

Your AgriSense platform uses **two separate services**:

### 1. **Sentinel Hub** - Satellite Imagery (NDVI)
- **Purpose**: Actual satellite imagery for crop health monitoring
- **API Key**: `PLAKeb42329c08224b81b664676232355430`
- **Used For**: 
  - NDVI (Normalized Difference Vegetation Index)
  - Crop health visualization
  - Vegetation stress detection
  - Satellite imagery analysis

### 2. **OpenWeather API** - Weather Data
- **Purpose**: Weather conditions, temperature, humidity, rainfall
- **API Key**: Not yet configured
- **Used For**:
  - Temperature monitoring
  - Humidity tracking
  - Rainfall data
  - Heat stress calculations
  - Soil moisture estimation (weather-based)

---

## 📝 Environment Variables Setup

Create a `.env.local` file in your project root:

```env
# Sentinel Hub API (for satellite NDVI imagery)
SENTINEL_HUB_CLIENT_ID=PLAKeb42329c08224b81b664676232355430
SENTINEL_HUB_CLIENT_SECRET=your_secret_here
SENTINEL_HUB_INSTANCE_ID=your_instance_id_here

# OpenWeather API (for weather data)
OPENWEATHER_API_KEY=your_openweather_key_here

# Other APIs
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key_here
MANDI_API_KEY=your_mandi_key_here
```

---

## 🛰️ Sentinel Hub Configuration

### What You Have:
✅ **Client ID**: `PLAKeb42329c08224b81b664676232355430`

### What You Need:
1. **Client Secret** - Get from Sentinel Hub dashboard
2. **Instance ID** (optional) - For specific configurations

### How to Get Missing Credentials:

1. **Visit**: https://apps.sentinel-hub.com/dashboard/
2. **Login** with your account
3. **Go to**: User Settings → OAuth clients
4. **Find your client**: `PLAKeb42329c08224b81b664676232355430`
5. **Copy**:
   - Client Secret
   - Instance ID (if needed)

### Sentinel Hub Features:
- ✅ **Actual satellite imagery** from Sentinel-2
- ✅ **10m resolution** images
- ✅ **True NDVI** calculation from NIR and Red bands
- ✅ **Updated every 5 days** (Sentinel-2 revisit time)
- ✅ **30-day historical** data
- ✅ **Cloud filtering** (max 30% cloud coverage)

---

## ☁️ OpenWeather API Configuration

### Get Your Free API Key:

1. **Visit**: https://openweathermap.org/api
2. **Sign up** for free account
3. **Go to**: API keys section
4. **Generate** new API key
5. **Copy** and add to `.env.local`

### Free Tier Limits:
- ✅ **1,000 calls/day**
- ✅ **60 calls/minute**
- ✅ **Current weather data**
- ✅ **5-day forecast**
- ✅ **Historical data** (paid)

### What We Use It For:
```typescript
// Temperature & Humidity
GET /data/2.5/weather?lat={lat}&lon={lon}&appid={key}

// Returns:
{
  "main": {
    "temp": 298.15,      // Temperature (Kelvin)
    "humidity": 65,      // Humidity (%)
    "pressure": 1013     // Pressure (hPa)
  },
  "clouds": {
    "all": 20            // Cloud coverage (%)
  },
  "rain": {
    "1h": 2.5            // Rainfall last hour (mm)
  }
}
```

---

## 🔄 How the System Works

### NDVI Data Flow:

```
User Request
    ↓
getNDVIData(lat, lon)
    ↓
Try Sentinel Hub (if configured)
    ├─ Success → Return actual satellite NDVI
    └─ Fail → Fallback to weather-based estimation
        ↓
    OpenWeather API
        ↓
    Estimate NDVI from cloud cover & temperature
        ↓
    Return estimated NDVI
```

### Weather Data Flow:

```
User Request
    ↓
getHeatStressData(lat, lon)
getSoilMoistureData(lat, lon)
getSatelliteWeatherData(lat, lon)
    ↓
OpenWeather API
    ↓
Calculate:
- Heat Index
- Soil Moisture Estimate
- Rainfall Probability
    ↓
Return Data
```

---

## 🎯 Current Implementation Status

### ✅ Configured:
- Sentinel Hub Client ID
- Fallback weather estimation
- API error handling
- Automatic fallback system

### ⚠️ Needs Configuration:
- Sentinel Hub Client Secret
- Sentinel Hub Instance ID
- OpenWeather API Key

### 🔄 How It Works Now:

**Without Full Configuration:**
```
NDVI → Weather-based estimation (works but less accurate)
Soil Moisture → Weather-based estimation
Heat Stress → Weather-based estimation
Weather Data → Weather-based estimation
```

**With Full Configuration:**
```
NDVI → Actual Sentinel-2 satellite imagery ✨
Soil Moisture → Weather data + estimation
Heat Stress → Actual temperature & humidity
Weather Data → Real-time weather conditions
```

---

## 📊 API Usage & Costs

### Sentinel Hub:
```
Free Tier:
- 30,000 processing units/month
- ~3,000 NDVI requests/month
- Perfect for testing & small farms

Paid Plans:
- $0.0012 per processing unit
- Scales with usage
```

### OpenWeather:
```
Free Tier:
- 1,000 calls/day
- ~30,000 calls/month
- Perfect for AgriSense

Paid Plans:
- $0.0015 per call (beyond free tier)
- Professional: $40/month (100,000 calls)
```

---

## 🚀 Quick Setup Steps

### Step 1: Create `.env.local`
```bash
# In project root
touch .env.local
```

### Step 2: Add Sentinel Hub Credentials
```env
SENTINEL_HUB_CLIENT_ID=PLAKeb42329c08224b81b664676232355430
SENTINEL_HUB_CLIENT_SECRET=get_from_dashboard
```

### Step 3: Add OpenWeather Key
```env
OPENWEATHER_API_KEY=get_from_openweathermap
```

### Step 4: Restart Dev Server
```bash
npm run dev
```

### Step 5: Test
```bash
# Visit
http://localhost:3000/dashboard/satellite

# Click "Refresh Data"
```

---

## 🔍 Troubleshooting

### Issue: "Sentinel Hub credentials not configured"
**Solution**: Add `SENTINEL_HUB_CLIENT_SECRET` to `.env.local`

### Issue: "Weather data unavailable"
**Solution**: Add `OPENWEATHER_API_KEY` to `.env.local`

### Issue: "NDVI showing estimated data"
**Cause**: Sentinel Hub not fully configured
**Solution**: Add both Client ID and Secret

### Issue: "API rate limit exceeded"
**Cause**: Too many requests
**Solution**: 
- Implement caching (already done - 1 hour cache)
- Upgrade to paid tier
- Reduce refresh frequency

---

## 📈 Recommended Configuration

### For Development:
```env
# Use free tiers
SENTINEL_HUB_CLIENT_ID=PLAKeb42329c08224b81b664676232355430
SENTINEL_HUB_CLIENT_SECRET=your_secret
OPENWEATHER_API_KEY=your_free_key
```

### For Production:
```env
# Consider paid tiers for reliability
SENTINEL_HUB_CLIENT_ID=PLAKeb42329c08224b81b664676232355430
SENTINEL_HUB_CLIENT_SECRET=your_secret
SENTINEL_HUB_INSTANCE_ID=your_instance
OPENWEATHER_API_KEY=your_paid_key
```

---

## 🎉 Summary

### What You're Using:

1. **Sentinel Hub** (`PLAKeb42329c08224b81b664676232355430`)
   - For: Satellite NDVI imagery
   - Status: Client ID configured ✅
   - Needs: Client Secret ⚠️

2. **OpenWeather API** (separate service)
   - For: Weather data (temp, humidity, rain)
   - Status: Not configured ⚠️
   - Needs: API Key

### Next Steps:

1. ✅ Get Sentinel Hub Client Secret
2. ✅ Get OpenWeather API Key
3. ✅ Add both to `.env.local`
4. ✅ Restart server
5. ✅ Test satellite view

**Your satellite features will work even better with full configuration! 🛰️**
