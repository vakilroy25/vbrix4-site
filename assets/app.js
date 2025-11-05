document.getElementById('y').textContent = new Date().getFullYear();

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('contact-status');
const btn = document.getElementById('contact-submit');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending...';
    btn.disabled = true;

    const fd = new FormData(form);
    // Basic spam check: if honeypot has content, bail silently
    if (fd.get('website')) { statusEl.textContent = 'Sent.'; return; }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = 'Thanks! We’ll get back to you shortly.';
      } else {
        const data = await res.json().catch(() => ({}));
        statusEl.textContent = data?.errors?.[0]?.message || 'Send failed. Please try again.';
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please try again.';
    } finally {
      btn.disabled = false;
    }
  });
}
