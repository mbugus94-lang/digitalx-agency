const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Load env
require('dotenv').config();

// Generate a valid 32-byte key if not provided
function getEncryptionKey() {
  const key = process.env.ENCRYPTION_KEY;
  if (key && key.length === 64) {
    return Buffer.from(key, 'hex');
  }
  // Fallback to a static 32-byte key for development
  return crypto.scryptSync('development-key', 'salt', 32);
}

const ENCRYPTION_KEY = getEncryptionKey();

// In-memory storage
const leads = [];
const contacts = [];
const analytics = [];

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions. Please try again later.' }
});

// Encryption helpers using scrypt for key derivation
function encrypt(text) {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(ENCRYPTION_KEY, salt, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return salt.toString('hex') + ':' + iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  try {
    const [saltHex, ivHex, encryptedHex] = text.split(':');
    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const key = crypto.scryptSync(ENCRYPTION_KEY, salt, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (e) {
    return text; // fallback for non-encrypted data
  }
}

// Email transporter
let transporter;
try {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'test@ethereal.email',
      pass: process.env.SMTP_PASS || 'testpassword'
    }
  });
} catch (e) {
  console.log('Email not configured');
}

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    version: '1.0.6',
    stats: {
      leads: leads.length,
      contacts: contacts.length,
      analytics: analytics.length
    }
  });
});

// API Routes

// Get site analytics
app.get('/api/analytics', (req, res) => {
  res.json({
    visitors: analytics.filter(a => a.type === 'pageview').length,
    leads: leads.length,
    contacts: contacts.length,
    popularPages: getPopularPages()
  });
});

// Get pricing info
app.get('/api/pricing', (req, res) => {
  res.json({
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        price: 2500,
        period: 'month',
        features: [
          'AI Ad Management',
          'Performance Creative (5 assets)',
          'Conversion Systems Setup',
          'Monthly Strategy Call',
          'Email Support'
        ]
      },
      {
        id: 'growth',
        name: 'Growth',
        price: 5000,
        period: 'month',
        popular: true,
        features: [
          'Everything in Starter',
          'Performance Creative (15 assets)',
          'Advanced Conversion Optimization',
          'Weekly Strategy Calls',
          'Priority Support',
          'Monthly ROI Report'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 'custom',
        period: 'month',
        features: [
          'Everything in Growth',
          'Unlimited Performance Creative',
          'Dedicated Account Manager',
          'Real-time Dashboard Access',
          'Custom Integrations',
          'SLA Guarantee'
        ]
      }
    ]
  });
});

// Submit lead/contact form
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, company, budget, message, service } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    const lead = {
      id: crypto.randomUUID(),
      name: encrypt(name),
      email: encrypt(email),
      company: company ? encrypt(company) : null,
      budget: budget || null,
      message: encrypt(message),
      service: service || 'general',
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    
    leads.push(lead);
    
    // Send notification email
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"DigitalX Agency" <${process.env.EMAIL_FROM || 'noreply@digitalx-agency.com'}>`,
          to: process.env.NOTIFICATION_EMAIL || 'hello@digitalx-agency.com',
          subject: `New Lead: ${name} - ${service || 'General Inquiry'}`,
          html: `
            <h2>New Lead Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not specified'}</p>
            <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            <p><strong>Service Interest:</strong> ${service || 'General'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        });
      } catch (emailError) {
        console.log('Email notification skipped');
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry! We will be in touch within 24 hours.',
      leadId: lead.id
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit form. Please try again.' });
  }
});

// Track analytics event
app.post('/api/track', (req, res) => {
  const { event, data, page } = req.body;
  
  analytics.push({
    id: crypto.randomUUID(),
    event: event || 'unknown',
    data: data || {},
    page: page || req.headers.referer || 'unknown',
    timestamp: new Date().toISOString(),
    ip: req.ip
  });
  
  res.json({ success: true });
});

// Get leads (protected)
app.get('/api/leads', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY && process.env.NODE_ENV === 'production') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const decryptedLeads = leads.map(lead => ({
    ...lead,
    name: decrypt(lead.name),
    email: decrypt(lead.email),
    company: lead.company ? decrypt(lead.company) : null,
    message: decrypt(lead.message)
  }));
  
  res.json({ leads: decryptedLeads });
});

// Schedule consultation
app.post('/api/schedule', async (req, res) => {
  const { name, email, company, preferredTime, service } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const appointment = {
    id: crypto.randomUUID(),
    name, email, company, preferredTime, service,
    createdAt: new Date().toISOString(),
    status: 'scheduled'
  };
  
  contacts.push(appointment);
  
  res.status(201).json({
    success: true,
    message: 'Consultation scheduled! We will confirm shortly.',
    appointmentId: appointment.id
  });
});

// Utility functions
function getPopularPages() {
  const pageCounts = {};
  analytics.forEach(a => {
    if (a.page) {
      pageCounts[a.page] = (pageCounts[a.page] || 0) + 1;
    }
  });
  return Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([page, views]) => ({ page, views }));
}

// Fallback to root index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`[DigitalX Agency] Server running on port ${PORT}`);
  console.log(`[DigitalX Agency] Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
