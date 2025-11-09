# QR Code & Tracking Setup

This document explains the QR code generation and tracking system for vbrix4.com.

## Overview

The QR code system redirects scans through `vbrix4.com/qr` which tracks visits before redirecting to the homepage. This allows you to count QR code scans via Vercel Analytics and Google Analytics 4.

## Generated QR Codes

Two QR code variants have been generated in the `/public` directory:

1. **`qr-code-logo.png`** - QR code with your vBrix4 logo overlay
2. **`qr-code-scanme.png`** - QR code with a "SCAN ME" graphic overlay

Both codes:
- Point to: `https://vbrix4.com/qr`
- Are high resolution (1000x1000px) suitable for printing
- Have 30% logo overlay with white background for optimal scanability
- Use high error correction level (Level H) to ensure reliability

## How It Works

1. User scans QR code → Opens `https://vbrix4.com/qr`
2. The `/qr` route loads the `QRRedirect` component
3. Component fires tracking events to:
   - **Vercel Analytics** - Custom event `qr_scan`
   - **Google Analytics 4** - Event `qr_scan` (if configured)
4. After 100ms, user is redirected to the homepage (`/`)

## Viewing Scan Statistics

### Vercel Analytics (Already Working)

Your site already has Vercel Analytics installed. To view QR scan data:

1. Go to your Vercel dashboard
2. Navigate to your project → Analytics
3. Filter by path: `/qr` or search for the custom event `qr_scan`
4. You'll see visit counts and basic metrics

### Google Analytics 4 (Requires Setup)

To enable detailed GA4 tracking:

1. **Create a GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create a new GA4 property for vbrix4.com
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Update Your Site**
   - Open `index.html`
   - Find both occurrences of `GA4_MEASUREMENT_ID`
   - Replace with your actual measurement ID
   - Example: Change `'GA4_MEASUREMENT_ID'` to `'G-ABC123XYZ'`

3. **View QR Scan Data in GA4**
   - Go to Reports → Engagement → Events
   - Look for the `qr_scan` event
   - You'll see:
     - Total scans
     - Device types (mobile, desktop, tablet)
     - Geographic location
     - Time of day patterns
     - User demographics (if enabled)

## Regenerating QR Codes

If you need to regenerate the QR codes (e.g., after changing the URL):

```bash
npm run generate-qr
```

This will recreate both QR code variants in the `/public` directory.

## Technical Implementation

### Files Created/Modified

- **`scripts/generate-qr.js`** - QR code generator script
- **`src/components/QRRedirect.jsx`** - Redirect component with tracking
- **`src/App.jsx`** - Updated with React Router for `/qr` route
- **`index.html`** - Added GA4 tracking code
- **`package.json`** - Added `generate-qr` script

### Tracking Events

**Vercel Analytics Event:**
```javascript
track('qr_scan', {
  source: 'qr_code',
  timestamp: new Date().toISOString()
});
```

**Google Analytics 4 Event:**
```javascript
gtag('event', 'qr_scan', {
  event_category: 'engagement',
  event_label: 'QR Code Scan',
  value: 1
});
```

## Best Practices

1. **Print Quality**: Use the high-resolution PNG files directly for professional printing
2. **Testing**: Test both QR codes before mass distribution to ensure they scan properly
3. **Placement**: Consider different QR codes for different locations to track sources
4. **A/B Testing**: The logo vs "scan me" variants can help test which drives more engagement

## Troubleshooting

**QR code doesn't scan:**
- Ensure adequate lighting when scanning
- Make sure the printed size is at least 2x2 inches
- Test with multiple QR scanner apps

**Tracking not working:**
- Check browser console for JavaScript errors
- Verify Vercel Analytics is deployed (it should be, it's already in your package.json)
- For GA4, ensure your Measurement ID is correctly configured

**Need to change the destination URL:**
- Edit `scripts/generate-qr.js` and change the `QR_URL` constant
- Run `npm run generate-qr` to regenerate the codes

## Support

For issues or questions, refer to:
- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Google Analytics 4 Docs](https://support.google.com/analytics/answer/9304153)

