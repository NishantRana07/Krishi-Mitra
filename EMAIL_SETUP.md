# 📧 Email Notification Setup Guide

## Overview

Krishi Niti AI sends automated email notifications to farmers for:
- 🚨 Critical crop alerts
- ⚠️ Warning notifications
- 📊 Market price updates
- 💡 AI recommendations

## Quick Setup (5 minutes)

### Step 1: Install NodeMailer

```bash
npm install nodemailer @types/nodemailer
```

### Step 2: Get Gmail App Password

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/
   - Click on "Security" in the left sidebar

2. **Enable 2-Step Verification** (if not already enabled)
   - Under "Signing in to Google"
   - Click "2-Step Verification"
   - Follow the setup process

3. **Generate App Password**
   - Go back to Security settings
   - Under "Signing in to Google"
   - Click "App passwords"
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Enter name: "Krishi Niti AI"
   - Click "Generate"
   - **Copy the 16-character password** (you won't see it again!)

### Step 3: Configure Environment Variables

Open `.env.local` and update:

```env
# Replace with your Gmail address
EMAIL_USER=your-email@gmail.com

# Paste the 16-character app password from Step 2
EMAIL_PASS=abcd efgh ijkl mnop

# Update sender information
EMAIL_FROM_NAME=Krishi Niti AI
EMAIL_FROM_ADDRESS=your-email@gmail.com
```

### Step 4: Enable Email Sending in Code

Open `lib/email.ts` and uncomment the nodemailer implementation:

**Find this section (around line 252):**
```typescript
// TODO: Uncomment this block after installing nodemailer
/*
const nodemailer = require('nodemailer')
...
*/
```

**Uncomment it to:**
```typescript
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const mailOptions = {
  from: `${process.env.EMAIL_FROM_NAME || 'Krishi Niti AI'} <${process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_USER}>`,
  to: recipientEmail,
  subject: emailData.subject,
  html: emailData.html,
}

const info = await transporter.sendMail(mailOptions)
console.log('✅ Email sent successfully:', info.messageId)
return true
```

**Remove or comment out the fallback log:**
```typescript
// For now, just log
// console.log("📧 Email would be sent to:", recipientEmail)
// console.log("📝 Subject:", emailData.subject)
// return true
```

### Step 5: Test Email Sending

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Complete onboarding with your email address**

3. **Add a crop and run monitoring**
   - Go to "Alerts & Monitoring"
   - Click "Run Monitoring"
   - If alerts are generated, emails will be sent automatically

4. **Check your inbox!**

## Troubleshooting

### Issue: "Invalid login" error

**Solution:**
- Ensure 2-Step Verification is enabled
- Generate a new App Password
- Make sure you're using the App Password, not your regular Gmail password
- Remove any spaces from the App Password in `.env.local`

### Issue: "Connection timeout"

**Solution:**
- Check your internet connection
- Verify `EMAIL_HOST=smtp.gmail.com` and `EMAIL_PORT=587`
- Try setting `EMAIL_SECURE=false`

### Issue: Emails not sending

**Solution:**
- Check console logs for error messages
- Verify `.env.local` has correct credentials
- Ensure nodemailer is installed: `npm list nodemailer`
- Restart the development server

### Issue: Gmail blocking sign-in

**Solution:**
- Use App Password instead of regular password
- Check if "Less secure app access" is needed (usually not with App Passwords)
- Verify your Gmail account is active

## Email Templates

### 1. Alert Email
Sent when critical issues are detected:
- Crop details
- Alert severity (color-coded)
- Specific issue description
- Recommended actions
- Link to dashboard

### 2. Market Price Email
Sent with market updates:
- Price table for all crops
- Trend indicators (↑↓→)
- Price change percentages
- Selling recommendations
- Market summary

## Email Configuration Options

### Using Different Email Provider

If you want to use a different email provider (not Gmail):

**For Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

**For Yahoo:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

**For Custom SMTP:**
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-username
EMAIL_PASS=your-password
```

## Advanced Configuration

### Enable SSL/TLS

For secure connections:
```env
EMAIL_PORT=465
EMAIL_SECURE=true
```

### Custom Sender Name

```env
EMAIL_FROM_NAME=My Farm Assistant
EMAIL_FROM_ADDRESS=noreply@myfarm.com
```

### Testing with Mailtrap (Development)

For testing without sending real emails:

1. Sign up at https://mailtrap.io
2. Get your credentials
3. Update `.env.local`:
   ```env
   EMAIL_HOST=smtp.mailtrap.io
   EMAIL_PORT=2525
   EMAIL_USER=your-mailtrap-username
   EMAIL_PASS=your-mailtrap-password
   ```

## Security Best Practices

✅ **DO:**
- Use App Passwords, never your main password
- Keep `.env.local` in `.gitignore`
- Use environment variables for all credentials
- Enable 2-Step Verification on Gmail

❌ **DON'T:**
- Commit `.env.local` to Git
- Share your App Password
- Use your main Gmail password
- Hardcode credentials in code

## Email Sending Workflow

```
1. User completes onboarding with email
   ↓
2. System monitors crops automatically
   ↓
3. AI detects anomaly (e.g., low soil moisture)
   ↓
4. Alert created in system
   ↓
5. Email template generated with alert details
   ↓
6. NodeMailer sends email via Gmail SMTP
   ↓
7. Farmer receives email notification
   ↓
8. Farmer takes action before problem escalates
```

## Verification Checklist

- [ ] NodeMailer installed
- [ ] Gmail App Password generated
- [ ] `.env.local` configured with credentials
- [ ] Code uncommented in `lib/email.ts`
- [ ] Development server restarted
- [ ] Test email sent successfully
- [ ] Email received in inbox

## Support

If you encounter issues:
1. Check console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with a simple nodemailer script first
4. Check Gmail security settings

## Production Deployment

When deploying to production:
1. Add environment variables to your hosting platform
2. Use secure SMTP credentials
3. Consider using a dedicated email service (SendGrid, AWS SES, etc.)
4. Monitor email delivery rates
5. Implement email queuing for high volume

---

**Ready to send emails?** Follow the steps above and your farmers will receive proactive notifications! 📧✨
