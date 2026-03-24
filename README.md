# DigitalX Agency

<p align="center">
  <strong>Premium Digital Marketing Agency Website</strong><br>
  <em>Modern, responsive, and SEO-optimized web presence</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.3-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Vercel-Ready-black?logo=vercel" alt="Vercel">
  <img src="https://img.shields.io/github/actions/workflow/status/mbugus94-lang/digitalx-agency/ci.yml" alt="CI Status">
</p>

---

## 🚀 Quick Start

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mbugus94-lang/digitalx-agency.git
cd digitalx-agency
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

```bash
# Clone the repository
git clone https://github.com/mbugus94-lang/digitalx-agency.git
cd digitalx-agency

# Install dependencies
npm install

# Start the development server
npm start
```

The site will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
digitalx-agency/
├── index.html          # Main landing page
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Server:** Static site served with `serve`
- **Deployment:** Optimized for Vercel

---

## 📦 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment
Simply upload the `index.html` file to any static hosting provider.

---

## 🔧 Customization

1. Edit `index.html` to update content
2. Modify styles within the `<style>` tags
3. Update meta tags for SEO
4. Replace placeholder images with actual assets

---

## 📝 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3000) |
| `GOOGLE_ANALYTICS_ID` | GA tracking ID | No |

---

## 🧪 Testing

This project includes comprehensive tests:

### Accessibility Tests
```bash
npm test
```

Tests ensure:
- Proper HTML lang attributes
- Alt text on images
- Semantic heading hierarchy
- Skip-to-content links

### SEO Tests
- Meta description and keywords
- Open Graph tags
- Canonical links

### Performance Tests
- Inline CSS to prevent render blocking

### HTML Validation
```bash
npm run lint
```

## 🔧 CI/CD

GitHub Actions runs on every push:
- HTML validation
- Accessibility tests
- Lighthouse performance audit
- Code formatting checks

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/mbugus94-lang">David Gakere</a>
</p>
