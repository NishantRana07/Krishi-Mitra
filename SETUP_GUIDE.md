# 🚀 Quick Setup Guide - Krishi Niti AI

## Prerequisites Checklist
- [ ] Node.js 18 or higher installed
- [ ] npm or yarn package manager
- [ ] Code editor (VS Code recommended)
- [ ] Gmail account (for email notifications)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Email Service (Optional but Recommended)

```bash
npm install nodemailer @types/nodemailer
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Primary Gemini API Key (Optional - fallback keys are already configured)
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here

# Email Configuration for Notifications
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Getting Gmail App Password:**
1. Go to Google Account Settings
2. Security → 2-Step Verification
3. App Passwords → Generate new password
4. Copy and paste into `.env.local`

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## First-Time User Flow

### 1. Complete Onboarding
- Enter your name and email
- Provide location details
- Input soil pH and moisture levels
- Select initial crop
- Specify land area

### 2. Add Your Crops
- Navigate to **My Crops**
- Click **Add New Crop**
- Select crop from dropdown or enter custom name
- AI will validate the crop
- Fill in planting details
- Save crop

### 3. Run Monitoring
- Go to **Alerts & Monitoring**
- Click **Run Monitoring**
- System analyzes all crops
- View generated alerts
- Resolve alerts as needed

### 4. Check Market Prices
- Visit **Market Prices**
- Click **Refresh Prices**
- View real-time market data
- Check price trends
- Get selling recommendations

## API Keys Configuration

### Gemini API Keys (Already Configured)
The system has **3 fallback API keys** pre-configured:
1. `AIzaSyCtdtZeXamaI15dMGjZ7k5_NSIUcDlwdP0`
2. `AIzaSyB2OilxGNCq3z5QPYDaAtZr72ZaAfnz-Co`
3. `AIzaSyAkOdC-zHvo_c2lcEAmhwEV_V3ryIPchHs`

If one fails, the system automatically tries the next one.

### Adding Your Own API Key
1. Get a free Gemini API key from [Google AI Studio](https://ai.google.dev/)
2. Add to `.env.local` as `GOOGLE_GENERATIVE_AI_API_KEY`
3. This becomes the primary key with fallbacks as backup

## Email Notifications Setup

### Current Status
Email templates are ready in `lib/email.ts`. To activate:

1. **Install NodeMailer** (if not done):
   ```bash
   npm install nodemailer @types/nodemailer
   ```

2. **Update `lib/email.ts`** - Uncomment the nodemailer implementation:
   ```typescript
   import nodemailer from 'nodemailer'
   
   const transporter = nodemailer.createTransport({
     host: process.env.EMAIL_HOST,
     port: parseInt(process.env.EMAIL_PORT || '587'),
     secure: false,
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS,
     },
   })
   
   await transporter.sendMail({ ...emailData, to: recipientEmail })
   ```

3. **Configure `.env.local`** with your email credentials

## Testing the Features

### Test Crop Validation
1. Add a crop with name "Wheat"
2. System should validate and show scientific name
3. Check pH suitability and recommendations

### Test Monitoring
1. Add 2-3 crops
2. Run monitoring
3. Should generate alerts based on conditions
4. Check alert severity levels

### Test Market Prices
1. Ensure crops are added
2. Refresh market prices
3. View price trends
4. Check recommendations

## Troubleshooting

### Issue: API Key Errors
**Solution**: The system has fallback keys. If all fail, check internet connection.

### Issue: Email Not Sending
**Solution**: 
- Verify Gmail app password is correct
- Check 2-step verification is enabled
- Ensure `.env.local` has correct credentials

### Issue: Crops Not Saving
**Solution**: 
- Check browser console for errors
- Clear browser cache and localStorage
- Refresh the page

### Issue: Validation Not Working
**Solution**: 
- Wait a few seconds for AI response
- Check network tab for API calls
- Fallback validation will still work

## Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Appwrite Sites
Follow Appwrite deployment documentation for Next.js apps.

## Support & Documentation

- **Main README**: See `README.md` for full documentation
- **API Documentation**: Check `/app/api/` folders for endpoint details
- **Component Library**: shadcn/ui components in `/components/ui/`

## Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter

# Installation
npm install          # Install all dependencies
npm install nodemailer @types/nodemailer  # Add email support
```

## Next Steps

1. ✅ Complete onboarding
2. ✅ Add your first crop
3. ✅ Run monitoring
4. ✅ Check market prices
5. ✅ Explore AI recommendations
6. ✅ Test disease detection
7. ✅ Chat with AI assistant

---

**Need Help?** Check the main README.md or create an issue on GitHub.

**Ready to Deploy?** Follow the deployment section in README.md.
