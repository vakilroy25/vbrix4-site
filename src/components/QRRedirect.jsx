import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { track } from '@vercel/analytics';

/**
 * QR Code redirect component
 * Tracks QR code scans via Vercel Analytics and Google Analytics (GA4)
 * then immediately redirects to the homepage
 */
function QRRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Track the QR scan event in Vercel Analytics
    track('qr_scan', {
      source: 'qr_code',
      timestamp: new Date().toISOString()
    });

    // Track in Google Analytics 4 (if available)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'qr_scan', {
        event_category: 'engagement',
        event_label: 'QR Code Scan',
        value: 1
      });
    }

    // Redirect to homepage after a brief moment (allows tracking to fire)
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#0a0e1a',
      color: '#fff',
      fontFamily: 'Space Grotesk, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Redirecting...</h2>
        <p>Thank you for scanning!</p>
      </div>
    </div>
  );
}

export default QRRedirect;

