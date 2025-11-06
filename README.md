# vbrix4-site

Official website for vBrix4 - AI co-pilot for Design Verification

## Contact Form Setup

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

### Local Development

To test locally:

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set environment variable:
   ```bash
   export RESEND_API_KEY=re_your_api_key_here
   ```

3. Run Vercel dev server:
   ```bash
   vercel dev
   ```

4. Open http://localhost:3000

### Features

- ✅ Email format validation (regex + email-validator library)
- ✅ DNS/MX record validation (checks domain has mail servers)
- ✅ Spam honeypot protection
- ✅ Notification email to hi@vbrix4.com with message details
- ✅ Auto-reply to user from hi@vbrix4.com
- ✅ Success message shown inline (no page redirect)
- ✅ CORS enabled for API endpoint

### Files Structure

```
.
├── api/
│   └── contact.py          # Python serverless function
├── assets/
│   ├── app.js              # Frontend JavaScript
│   └── style.css           # Styles
├── index.html              # Main page
├── vercel.json             # Vercel configuration
├── requirements.txt        # Python dependencies
└── env.example             # Environment variables template
```
