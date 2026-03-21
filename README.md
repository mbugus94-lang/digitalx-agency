# DigitalX Agency

<p align="center">
  <strong>Premium Digital Marketing Agency Website</strong><br>
  <em>Modern, responsive, and SEO-optimized web presence</em>
</p>

---

## 🚀 Quick Start

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

```bash
# Run accessibility audit (requires Lighthouse CLI)
npx lighthouse http://localhost:3000 --output=html

# Validate HTML
npx html-validate index.html
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/mbugus94-lang">David Gakere</a>
</p>
