# vBrix4 Website

Official hi-tech website for vBrix4 - the AI workflow and agent platform for semiconductor verification

## 🚀 Modern React Application

This website has been completely redesigned with a modern, hi-tech aesthetic featuring:

- **Animated Block Background**: Fixed background with floating blocks and neural network connections that stays in place while you scroll
- **Gradient Text Effects**: Electric blue and cyber purple gradients throughout
- **Glassmorphism Design**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Scroll-triggered animations using Framer Motion
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Professional UI/UX**: Modern button effects, hover states, and micro-interactions

## 🎨 Design Features

### Color Palette
- **Primary**: Electric Blue (#00d4ff), Cyber Purple (#a855f7)
- **Background**: Deep Dark (#0a0e1a, #050810)
- **Accents**: Neon Green (#00ff88), Magenta (#ff0080)

### Typography
- **Font**: Space Grotesk (300, 500, 700, 900 weights)
- Modern, tech-forward appearance

### Key Components
1. **Hero Section**: Large gradient brand name with animated cycling words
2. **About Section**: Glassmorphism card with feature badges
3. **Demo Sections**: Three alternating sections (text/video layout)
4. **Contact Form**: Redesigned with glassmorphism and smooth animations
5. **Fixed Background**: Animated blocks representing visual programming

## 🛠️ Tech Stack

- **Framework**: React 18.3
- **Build Tool**: Vite 5.2 (super fast)
- **Animations**: Framer Motion 11
- **Deployment**: Vercel
- **Backend**: Python Serverless Functions
- **Email**: Resend API

## 📦 Project Structure

```
vbrix4-site/
├── src/
│   ├── components/
│   │   ├── Background.jsx         # Animated blocks background
│   │   ├── Header.jsx             # Sticky navigation
│   │   ├── Hero.jsx               # Hero with animated words
│   │   ├── About.jsx              # About section
│   │   ├── DemoSections.jsx       # Demo sections wrapper
│   │   ├── ExampleSection.jsx     # Reusable demo component
│   │   ├── Capabilities.jsx       # Platform capabilities grid
│   │   ├── ContactForm.jsx        # Contact form with API
│   │   ├── Footer.jsx             # Footer
│   │   └── *.css                  # Component styles
│   ├── styles/
│   │   └── globals.css            # Global styles & utilities
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # App styles
│   └── main.jsx                   # Entry point
├── api/
│   └── contact.py                 # Serverless contact endpoint
├── index.html                     # HTML template with chat bubble
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── vercel.json                    # Vercel deployment config
└── requirements.txt               # Python dependencies
```

## 🚀 Development

### Prerequisites
- Node.js 18+ (for React)
- Python 3.9+ (for API)
- npm or yarn

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Opens at http://localhost:5173

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

### Environment Variables

For the contact form to work, you need:

```bash
RESEND_API_KEY=re_your_api_key_here
```

See the **Contact Form Setup** section below for details.

## 📧 Contact Form Setup

The contact form uses a custom Python serverless backend deployed on Vercel with Resend for email delivery.

### Setup Instructions

#### 1. Resend Setup

1. **Sign up for Resend**: Go to [resend.com](https://resend.com) and create an account (free tier: 100 emails/day)

2. **Add your domain**:
   - In Resend dashboard, go to **Domains** → **Add Domain**
   - Enter `vbrix4.com`
   - Add the DNS records Resend provides to your domain's DNS settings:
     - SPF record (TXT)
     - DKIM records (TXT)
     - DMARC record (TXT, optional but recommended)
   - Wait for verification (usually takes a few minutes)

3. **Generate API Key**:
   - Go to **API Keys** → **Create API Key**
   - Give it a name like "vBrix4 Website"
   - Copy the API key (starts with `re_`)
   - Keep it safe - you'll need it for Vercel

#### 2. Vercel Deployment

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy the site**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Link to existing project or create new one
   - Accept default settings

4. **Add Environment Variable**:
   - Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
   - Go to **Settings** → **Environment Variables**
   - Add variable:
     - Name: `RESEND_API_KEY`
     - Value: Your Resend API key (from step 1.3)
     - Environments: Select all (Production, Preview, Development)
   - Click **Save**

5. **Redeploy to apply environment variable**:
   ```bash
   vercel --prod
   ```

#### 3. Test the Contact Form

1. Visit your deployed site
2. Fill out the contact form
3. Submit and verify:
   - Form is replaced with success message (stays on same page)
   - You receive notification email at hi@vbrix4.com
   - User receives auto-reply from hi@vbrix4.com

### Features

- ✅ Email format validation (regex + email-validator library)
- ✅ DNS/MX record validation (checks domain has mail servers)
- ✅ Spam honeypot protection
- ✅ Notification email to hi@vbrix4.com with message details
- ✅ Auto-reply to user from hi@vbrix4.com
- ✅ Success message shown inline (no page redirect)
- ✅ CORS enabled for API endpoint
- ✅ Glassmorphism design with smooth animations

## 🎯 Key Features

### 1. Hero Section
- Large "vBrix4" brand name with gradient text and glow effect
- Animated cycling words (workflows, agents, orchestration, ...) that fade in/out
- Clear value proposition
- Call-to-action buttons with hover effects

### 2. About Section
- Glassmorphism card design
- Three paragraphs explaining vBrix4
- Feature badges with hover effects
- Scroll-triggered animations

### 3. Demo Sections
- Three alternating layouts (text left/right, image right/left)
- Illustration images in glassmorphism frames
- Smooth entrance animations
- Responsive design for mobile

### 4. Capabilities Grid
- Ten-item scannable grid of platform capabilities
- Glassmorphism cards with hover lift
- Collapses to a single column on mobile

### 5. Contact Form
- Glassmorphism design with frosted glass effect
- Glowing borders on focus
- Animated submit button with loading state
- Success message with scale-in animation
- Maintains API functionality from original site

### 6. Fixed Background
- Animated floating blocks (representing visual programming)
- Neural network-style connections between blocks
- Subtle glow effects suggesting AI processing
- Stays fixed while content scrolls
- Low opacity to not distract from content

### 7. Header & Footer
- Sticky header with blur effect on scroll
- Smooth scroll navigation
- Gradient underline on hover
- Clean, minimal footer

## 🎨 Customization

### Changing Colors

Edit `/src/styles/globals.css`:

```css
:root {
  --bg-primary: #0a0e1a;
  --electric-blue: #00d4ff;
  --cyber-purple: #a855f7;
  /* ... more colors */
}
```

### Changing Animated Words

Edit `/src/components/Hero.jsx`:

```javascript
const words = ['workflows', 'agents', 'automation', 'orchestration', 'integration', 'debug', 'coverage', 'reuse'];
```

### Updating Video IDs

Edit `/src/components/DemoSections.jsx`:

```javascript
videoId="YOUR_YOUTUBE_VIDEO_ID"
```

### Adjusting Animation Speed

Edit component files or use Framer Motion props:

```javascript
transition={{ duration: 0.8, delay: 0.2 }}
```

## 📱 Responsive Design

The site is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 968px
- Desktop: > 968px

## 🔒 Security Features

- Honeypot field for spam prevention
- Email validation (format + DNS/MX check)
- Serverless functions (no exposed backend)
- Environment variables for API keys
- CORS protection

## 🚀 Performance

- Vite for lightning-fast builds
- Code splitting for optimal loading
- Lazy loading for heavy components
- Optimized animations (60fps)
- Minimal bundle size

## 📄 License

© 2025 vBrix4. All rights reserved.

## 🙋 Support

Use the chat bubble in the corner for quick support, or fill out the contact form.

---

Built with ❤️ using React, Vite, and Framer Motion
