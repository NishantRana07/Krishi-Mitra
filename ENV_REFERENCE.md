# 🔐 Environment Variables Reference

## Quick Copy-Paste Template

```env
# Gemini AI (Already configured with fallback keys)
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyCtdtZeXamaI15dMGjZ7k5_NSIUcDlwdP0

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM_NAME=Krishi Niti AI
EMAIL_FROM_ADDRESS=your-email@gmail.com

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Krishi Niti AI
NODE_ENV=development
DEBUG=false
```

## Variable Descriptions

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | No* | Primary Gemini API key | Uses fallback keys |
| `EMAIL_HOST` | Yes** | SMTP server hostname | smtp.gmail.com |
| `EMAIL_PORT` | Yes** | SMTP server port | 587 |
| `EMAIL_SECURE` | No | Use SSL/TLS | false |
| `EMAIL_USER` | Yes** | Email account username | - |
| `EMAIL_PASS` | Yes** | Email account password/app password | - |
| `EMAIL_FROM_NAME` | No | Sender display name | Krishi Niti AI |
| `EMAIL_FROM_ADDRESS` | No | Sender email address | Same as EMAIL_USER |
| `NEXT_PUBLIC_APP_URL` | No | Application URL for links | http://localhost:3000 |
| `NEXT_PUBLIC_APP_NAME` | No | Application name | Krishi Niti AI |
| `NODE_ENV` | No | Environment mode | development |
| `DEBUG` | No | Enable debug logging | false |

\* Not required because 3 fallback API keys are hardcoded  
\** Required only if you want to enable email notifications

## Pre-configured Values

### ✅ Gemini API Keys (Already Working!)

The following API keys are **already configured** in the code as fallbacks:

1. `AIzaSyCtdtZeXamaI15dMGjZ7k5_NSIUcDlwdP0`
2. `AIzaSyB2OilxGNCq3z5QPYDaAtZr72ZaAfnz-Co`
3. `AIzaSyAkOdC-zHvo_c2lcEAmhwEV_V3ryIPchHs`

**You don't need to configure anything for AI features to work!**

## What You Need to Configure

### For Basic Usage (AI Features)
✅ **Nothing!** The app works out of the box with pre-configured API keys.

### For Email Notifications
📧 **Required:**
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Gmail App Password (not your regular password)

📋 **Optional:**
- `EMAIL_FROM_NAME` - Customize sender name
- `EMAIL_HOST`, `EMAIL_PORT` - Only if using non-Gmail SMTP

## Getting Started Checklist

### Minimal Setup (5 seconds)
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] ✅ Done! AI features work immediately

### Full Setup with Email (5 minutes)
- [ ] Run `npm install nodemailer @types/nodemailer`
- [ ] Get Gmail App Password (see EMAIL_SETUP.md)
- [ ] Copy `.env.example` to `.env.local`
- [ ] Update `EMAIL_USER` and `EMAIL_PASS`
- [ ] Uncomment nodemailer code in `lib/email.ts`
- [ ] Restart server
- [ ] ✅ Email notifications enabled!

## Environment Files

| File | Purpose | Commit to Git? |
|------|---------|----------------|
| `.env.example` | Template for others | ✅ Yes |
| `.env.local` | Your actual credentials | ❌ **NO** |
| `.env.development.local` | Development overrides | ❌ **NO** |
| `.env.production.local` | Production overrides | ❌ **NO** |

## Security Notes

🔒 **Important:**
- `.env.local` is in `.gitignore` - never commit it!
- Use Gmail App Passwords, not your main password
- Keep API keys secure
- Don't share credentials in screenshots or logs

## Testing Configuration

### Check if environment variables are loaded:

Create a test file `test-env.js`:
```javascript
console.log('Gemini API Key:', process.env.GOOGLE_GENERATIVE_AI_API_KEY ? '✅ Set' : '❌ Not set')
console.log('Email User:', process.env.EMAIL_USER ? '✅ Set' : '❌ Not set')
console.log('Email Pass:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Not set')
```

Run: `node test-env.js`

### Verify in browser console:
```javascript
// Only NEXT_PUBLIC_ variables are available in browser
console.log(process.env.NEXT_PUBLIC_APP_URL)
console.log(process.env.NEXT_PUBLIC_APP_NAME)
```

## Common Issues

### Issue: Environment variables not loading

**Solution:**
1. Ensure file is named `.env.local` (not `.env.txt` or `.env`)
2. Restart development server after changes
3. Check for syntax errors (no spaces around `=`)
4. Verify file is in project root directory

### Issue: Email not sending

**Solution:**
1. Check `EMAIL_USER` and `EMAIL_PASS` are set
2. Verify you're using App Password, not regular password
3. Ensure nodemailer is installed
4. Check console for error messages

### Issue: API rate limits

**Solution:**
- The app automatically tries fallback keys
- If all 3 keys are rate-limited, wait a few minutes
- Add your own key as `GOOGLE_GENERATIVE_AI_API_KEY`

## Production Deployment

### Vercel
Add environment variables in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable
3. Redeploy

### Appwrite Sites
Add environment variables in Appwrite console:
1. Go to Project → Settings → Environment Variables
2. Add each variable
3. Redeploy

### Other Platforms
Consult your platform's documentation for adding environment variables.

## Quick Commands

```bash
# View current environment
npm run env

# Check if .env.local exists
ls -la .env.local

# Create from template
cp .env.example .env.local

# Edit environment file
nano .env.local
# or
code .env.local
```

---

**Need help?** Check `EMAIL_SETUP.md` for detailed email configuration guide.
