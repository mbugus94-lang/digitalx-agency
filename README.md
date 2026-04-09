# DigitalX Agency (ReachIQ)

<p align="center">
  <strong>Premium Digital Marketing Agency Website</strong><br>
  <em>Modern, responsive, and SEO-optimized with Express API backend</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.6-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/Node.js-18+-yellow" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-orange" alt="Express">
</p>

---

## 🎬 Live Demo

### Architecture
The ReachIQ landing page is a comprehensive 1,096-line HTML5/CSS3 landing page featuring an animated hero section with gradient backgrounds, four core service offerings (AI Ad Management, Performance Creative, Conversion Systems, Growth Strategy), results showcase with case study metrics, tiered pricing (Starter $2,500/mo, Growth $5,000/mo, Enterprise Custom), and full conversion tracking integration with Meta Pixel and GA4.

📖 **[View Full Demo Guide](DEMO.md)** - Complete walkthrough with visual preview and feature breakdown

---

## ✨ Features

### Frontend
- 🎨 Modern landing page with animated hero section
- 📱 Fully responsive design
- 🔍 SEO-optimized meta tags and Open Graph
- 📊 Interactive pricing tiers
- 📈 Case study showcases with metrics
- 🏢 Service offerings showcase
- 📝 Contact form with validation
- 📊 Analytics tracking integration (Meta Pixel + GA4)

### Backend API
- 🚀 Express.js REST API server
- 📧 Lead capture with encrypted storage
- 📅 Consultation scheduling
- 🔐 Secure data encryption for PII
- 📊 Analytics dashboard
- ⏱️ Rate limiting protection
- 📧 Email notifications for new leads
- 🛡️ Security headers with Helmet

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mbugus94-lang/digitalx-agency.git
cd digitalx-agency

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Start the server
npm start
```

The site will be available at `http://localhost:3000`

### Development Mode

```bash
npm run dev
```

This starts the server with hot reload using nodemon.

---

## 📁 Project Structure

```
digitalx-agency/
├── server/
│   └── index.js           # Express API server
├── public/
│   └── index.html        # Landing page (auto-served)
├── __tests__/            # Test files
├── docs/                 # Documentation
├── index.html            # Landing page (root)
├── package.json          # Dependencies
├── .env.example          # Environment template
└── README.md             # This file
```

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Security:** Helmet, rate limiting, encryption
- **Email:** Nodemailer
- **Testing:** Jest, Supertest

---

## 📡 API Endpoints

### Health Check
```bash
GET /health
```
Response:
```json
{
  "status": "ok",
  "timestamp": "2026-04-09T00:00:00.000Z",
  "uptime": 3600,
  "version": "1.0.6",
  "stats": {
    "leads": 5,
    "contacts": 3,
    "analytics": 150
  }
}
```

### Get Pricing
```bash
GET /api/pricing
```
Response:
```json
{
  "tiers": [
    {
      "id": "starter",
      "name": "Starter",
      "price": 2500,
      "period": "month",
      "features": [...]
    },
    ...
  ]
}
```

### Submit Contact Form
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "budget": "5000-10000",
  "message": "I'm interested in your services...",
  "service": "ai-ads"
}
```

### Track Analytics Event
```bash
POST /api/track
Content-Type: application/json

{
  "event": "cta_click",
  "data": {" button: "Get Started" },
  "page": "/"
}
```

### Get Analytics Dashboard
```bash
GET /api/analytics
```

### Schedule Consultation
```bash
POST /api/schedule
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "preferredTime": "2026-04-15T10:00",
  "service": "ai-ads"
}
```

### Get Leads (Protected)
```bash
GET /api/leads
Headers: X-API-KEY: your-api-key
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3000) |
| `API_KEY` | Admin API key | Yes (for lead access) |
| `JWT_SECRET` | JWT session secret | No |
| `ENCRYPTION_KEY` | 32-byte hex key for PII encryption | Yes |
| `SMTP_HOST` | SMTP server host | No |
| `SMTP_PORT` | SMTP server port | No |
| `SMTP_USER` | SMTP username | No |
| `SMTP_PASS` | SMTP password | No |
| `EMAIL_FROM` | From email address | No |
| `NOTIFICATION_EMAIL` | Email to receive lead notifications | No |

---

## 🔐 Security Features

- **Helmet.js** - Secure HTTP headers
- **Rate Limiting** - 5 requests per 15 minutes on contact form
- **Input Validation** - Email format, required fields
- **Data Encryption** - AES-256-CBC encryption for PII (name, email, message)
- **CORS** - Cross-origin request handling
- **API Key Protection** - Leads endpoint requires authentication

---

## 🧪 Testing

```bash
npm test
```

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Change the port in .env
PORT=3001 npm start
```

**Dependencies not installing:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Email not sending:**
- Configure SMTP credentials in .env
- Check spam folder
- Use Ethereal Email for testing: https://ethereal.email

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/mbugus94-lang">David Gakere</a>
</p>
