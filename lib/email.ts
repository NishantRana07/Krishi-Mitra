import type { Alert, Crop, MarketPrice } from "./storage"

export interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export interface EmailData {
  to: string
  subject: string
  html: string
}

// Email templates
export const createAlertEmail = (alert: Alert, crop: Crop, farmerName: string): EmailData => {
  const severityColor = {
    info: "#3b82f6",
    warning: "#f59e0b",
    critical: "#ef4444",
  }[alert.severity]

  const severityText = {
    info: "Information",
    warning: "Warning",
    critical: "Critical Alert",
  }[alert.severity]

  return {
    to: "",
    subject: `${severityText}: ${crop.name} - ${alert.message}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
    .alert-box { background: ${severityColor}15; border-left: 4px solid ${severityColor}; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .alert-title { color: ${severityColor}; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
    .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .crop-info { background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
    .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌾 Krishi Niti AI Alert</h1>
      <p>Proactive Agricultural Intelligence System</p>
    </div>
    <div class="content">
      <p>Dear ${farmerName},</p>
      
      <div class="alert-box">
        <div class="alert-title">${severityText}</div>
        <p><strong>${alert.message}</strong></p>
      </div>

      <div class="crop-info">
        <h3>Crop Details:</h3>
        <p><strong>Crop:</strong> ${crop.name}</p>
        <p><strong>Land Area:</strong> ${crop.landArea} hectares</p>
        <p><strong>Current Stage:</strong> ${crop.currentStage}</p>
        <p><strong>Health Status:</strong> ${crop.healthStatus}</p>
        <p><strong>Alert Time:</strong> ${new Date(alert.timestamp).toLocaleString()}</p>
      </div>

      <h3>Recommended Actions:</h3>
      ${getRecommendedActions(alert)}

      <a href="https://your-app-url.com/dashboard" class="button">View Dashboard</a>

      <div class="footer">
        <p>This is an automated alert from Krishi Niti AI</p>
        <p>Built for Appwrite Sites Hackathon</p>
        <p>Empowering farmers through AI-driven insights</p>
      </div>
    </div>
  </div>
</body>
</html>
    `,
  }
}

export const createMarketPriceEmail = (
  prices: MarketPrice[],
  farmerName: string,
  crops: Crop[]
): EmailData => {
  const priceRows = prices
    .map(
      (price) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${price.cropName}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">₹${price.price}/${price.unit}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
        <span style="color: ${price.trend === "up" ? "#10b981" : price.trend === "down" ? "#ef4444" : "#6b7280"}">
          ${price.trend === "up" ? "↑" : price.trend === "down" ? "↓" : "→"} ${price.trend}
        </span>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${price.market}</td>
    </tr>
  `
    )
    .join("")

  return {
    to: "",
    subject: "Market Price Update - Your Crops",
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
    .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: bold; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Market Intelligence Update</h1>
      <p>Real-time crop prices for your registered crops</p>
    </div>
    <div class="content">
      <p>Dear ${farmerName},</p>
      <p>Here are the latest market prices for your crops:</p>

      <table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Price</th>
            <th>Trend</th>
            <th>Market</th>
          </tr>
        </thead>
        <tbody>
          ${priceRows}
        </tbody>
      </table>

      <p><strong>Tip:</strong> Consider selling when prices are trending upward to maximize your profit!</p>

      <div class="footer">
        <p>Krishi Niti AI - Market Intelligence</p>
        <p>Helping farmers make smarter selling decisions</p>
      </div>
    </div>
  </div>
</body>
</html>
    `,
  }
}

function getRecommendedActions(alert: Alert): string {
  const actions: Record<string, string> = {
    soil_moisture: `
      <ul>
        <li>Check irrigation system immediately</li>
        <li>Water the crop if moisture is below optimal level</li>
        <li>Monitor soil moisture levels daily</li>
        <li>Consider installing drip irrigation for better water management</li>
      </ul>
    `,
    soil_ph: `
      <ul>
        <li>Test soil pH using a soil testing kit</li>
        <li>Add lime to increase pH if too acidic</li>
        <li>Add sulfur to decrease pH if too alkaline</li>
        <li>Consult with agricultural expert for proper amendments</li>
      </ul>
    `,
    temperature: `
      <ul>
        <li>Monitor temperature fluctuations closely</li>
        <li>Provide shade nets if temperature is too high</li>
        <li>Consider mulching to regulate soil temperature</li>
        <li>Adjust irrigation schedule based on temperature</li>
      </ul>
    `,
    weather: `
      <ul>
        <li>Prepare for upcoming weather conditions</li>
        <li>Secure crops if strong winds are expected</li>
        <li>Ensure proper drainage for heavy rainfall</li>
        <li>Harvest early if severe weather is predicted</li>
      </ul>
    `,
    disease: `
      <ul>
        <li>Inspect crops for visible signs of disease</li>
        <li>Remove and destroy infected plants</li>
        <li>Apply appropriate fungicides or pesticides</li>
        <li>Improve air circulation around plants</li>
        <li>Contact agricultural extension officer for guidance</li>
      </ul>
    `,
    pest: `
      <ul>
        <li>Identify the pest species affecting your crop</li>
        <li>Use appropriate pest control methods</li>
        <li>Consider biological pest control options</li>
        <li>Monitor pest population regularly</li>
        <li>Maintain field hygiene to prevent infestation</li>
      </ul>
    `,
    market: `
      <ul>
        <li>Review current market prices</li>
        <li>Consider selling if prices are favorable</li>
        <li>Store produce properly if waiting for better prices</li>
        <li>Connect with local buyers and traders</li>
      </ul>
    `,
  }

  return actions[alert.type] || "<p>Please check your dashboard for more details.</p>"
}

// Send email function
export async function sendEmail(emailData: EmailData, recipientEmail: string): Promise<boolean> {
  try {
    // Check if nodemailer is available and configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("📧 Email Configuration Missing - Email Preview:", {
        to: recipientEmail,
        subject: emailData.subject,
        preview: emailData.html.substring(0, 100) + "...",
      })
      console.log("ℹ️  To enable email sending:")
      console.log("   1. Install: npm install nodemailer @types/nodemailer")
      console.log("   2. Configure EMAIL_USER and EMAIL_PASS in .env.local")
      console.log("   3. Uncomment nodemailer code in lib/email.ts")
      return true // Return true to not break the flow
    }

    // TODO: Uncomment this block after installing nodemailer
    /*
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
    */

    // For now, just log
    console.log("📧 Email would be sent to:", recipientEmail)
    console.log("📝 Subject:", emailData.subject)
    return true
  } catch (error) {
    console.error("❌ Error sending email:", error)
    return false
  }
}
