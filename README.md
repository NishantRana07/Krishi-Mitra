# 🌾 Krishi Niti AI - Intelligent Agricultural Platform

[![Built for Appwrite Sites Hackathon](https://img.shields.io/badge/Hackathon-Appwrite%20Sites-FF5A5F?style=for-the-badge)](https://appwrite.io)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

## 🚀 Overview

**Krishi Niti AI** revolutionizes agricultural intelligence by transforming one-way farmer dashboards into a **proactive, two-way communication system**. Instead of farmers checking for problems, the platform actively monitors crops and alerts farmers before issues arise.

This hackathon project combines **AI automation, real-time monitoring, and personalized insights** to empower farmers through technology.

## 🌟 Key Features

### 1. **Smart Crop Onboarding**
- Register unlimited crops based on soil pH, location, and land area
- AI-powered crop validation using Gemini APIs
- Intelligent crop recommendations suited for specific conditions
- Support for both dropdown selection and custom text input

### 2. **Dynamic Multi-Crop Management**
- Manage multiple crops simultaneously
- Track individual crop health, growth stages, and parameters
- Real-time crop status monitoring
- Detailed crop analytics and insights

### 3. **Automated Monitoring & Alerts**
- Continuous monitoring of:
  - Soil health (moisture, pH levels)
  - Temperature variations
  - Weather conditions
  - Disease indicators
  - Pest risks
- Severity-based alerts (Info, Warning, Critical)
- Email notifications via NodeMailer integration
- Proactive anomaly detection

### 4. **Market Intelligence**
- Real-time market price tracking for registered crops
- Price trend analysis (up/down/stable)
- Best time to sell recommendations
- Market forecasts and insights
- Profit maximization strategies

### 5. **AI-Powered Insights**
- Gemini AI integration with fallback API keys
- Crop validation and verification
- Personalized recommendations
- Natural language processing for farmer queries

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 16.0 with App Router
- **Language**: TypeScript
- **AI/ML**: Google Gemini 2.0 Flash
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: Local Storage (client-side)
- **Email**: NodeMailer (ready for integration)
- **Validation**: Zod schemas

### Project Structure
```
app/
├── api/
│   ├── recommendations/     # Crop recommendations API
│   ├── validate-crop/       # Crop validation API
│   ├── monitor-crops/       # Automated monitoring API
│   └── market-prices/       # Market intelligence API
├── dashboard/
│   ├── crops/              # Multi-crop management
│   ├── alerts/             # Alert monitoring dashboard
│   ├── market/             # Market prices dashboard
│   ├── recommendations/    # AI recommendations
│   └── ...                 # Other features
lib/
├── storage.ts              # Data models & storage
└── email.ts                # Email notification templates
```

## 🎯 Why It Matters

**Traditional Problem**: Farmers must constantly check dashboards for issues, leading to delayed responses and crop losses.

**Our Solution**: The platform acts on behalf of farmers by:
- Detecting problems before they become critical
- Sending automated alerts via email
- Providing actionable recommendations
- Offering market insights for better selling decisions

**Impact**: Farmers can focus on farming while AI handles monitoring and alerts.

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "Agri Sense"

# Install dependencies
npm install

# Install nodemailer for email notifications
npm install nodemailer @types/nodemailer

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file:

```env
# Gemini API Keys (fallback keys already configured in code)
GOOGLE_GENERATIVE_AI_API_KEY=your_primary_key_here

# Email Configuration (for NodeMailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 📱 Features Walkthrough

### 1. Crop Onboarding
1. Navigate to **My Crops**
2. Click **Add New Crop**
3. Select from common crops or enter custom name
4. AI validates crop authenticity and suitability
5. Enter planting details and land area
6. System provides crop-specific recommendations

### 2. Automated Monitoring
1. Go to **Alerts & Monitoring**
2. Click **Run Monitoring**
3. AI analyzes all registered crops
4. Detects anomalies in soil, weather, temperature
5. Generates severity-based alerts
6. Sends email notifications for critical issues

### 3. Market Intelligence
1. Visit **Market Prices**
2. Click **Refresh Prices**
3. View real-time prices for your crops
4. See price trends and forecasts
5. Get recommendations on best selling time

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, intuitive interface
- **Responsive**: Works on desktop, tablet, and mobile
- **Color-Coded Alerts**: Visual severity indicators
- **Real-time Updates**: Live data synchronization
- **Accessibility**: WCAG compliant components

## 🔐 Data Management

### Storage Strategy
- **Client-side**: Local Storage for fast access
- **Data Models**: TypeScript interfaces for type safety
- **Persistence**: Automatic save on all operations
- **Scalability**: Ready for backend integration

### Data Models
- `FarmerProfile`: User information and preferences
- `Crop`: Individual crop details and status
- `Alert`: Monitoring alerts and notifications
- `MonitoringData`: Historical monitoring records
- `MarketPrice`: Price tracking and trends

## 🚀 Deployment

### For Appwrite Sites Hackathon

```bash
# Build for production
npm run build

# Deploy to Appwrite Sites
# Follow Appwrite deployment guidelines
```

### Vercel Deployment

```bash
# Deploy to Vercel
vercel --prod
```

## 🎯 Hackathon Goals Achieved

✅ **Innovation**: Two-way proactive communication system  
✅ **AI Integration**: Multiple Gemini AI endpoints  
✅ **User Impact**: Direct farmer empowerment  
✅ **Scalability**: Multi-crop support  
✅ **Automation**: Hands-free monitoring  
✅ **Real-world Value**: Market intelligence  

## 🔮 Future Enhancements

- [ ] Backend integration with Appwrite
- [ ] Real weather API integration
- [ ] SMS notifications alongside email
- [ ] Mobile app (React Native)
- [ ] Satellite imagery analysis
- [ ] Community marketplace
- [ ] Multi-language support
- [ ] Voice commands (regional languages)

## 🤝 Contributing

This is a hackathon project built for the **Appwrite Sites Hackathon**. Contributions, suggestions, and feedback are welcome!

## 📄 License

MIT License - Built with ❤️ for farmers

## 🏆 Hackathon Submission

**Project**: Krishi Niti AI  
**Category**: Appwrite Sites Hackathon  
**Goal**: Revolutionize agricultural intelligence through proactive AI-driven insights

---

**Built by**: [Your Name]  
**For**: Appwrite Sites Hackathon 2024  
**Powered by**: Next.js, Gemini AI, Appwrite