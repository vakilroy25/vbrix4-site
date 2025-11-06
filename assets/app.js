document.getElementById('y').textContent = new Date().getFullYear();

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('contact-status');
const btn = document.getElementById('contact-submit');
const contactSection = document.getElementById('contact');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending...';
    btn.disabled = true;

    const fd = new FormData(form);
    // Basic spam check: if honeypot has content, bail silently
    if (fd.get('website')) {
      showSuccessMessage();
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: new URLSearchParams(fd),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showSuccessMessage();
      } else {
        statusEl.textContent = data.error || 'Send failed. Please try again.';
        btn.disabled = false;
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please try again.';
      btn.disabled = false;
    }
  });
}

function showSuccessMessage() {
  // Hide the form
  const formContainer = document.querySelector('.contact-form');
  if (formContainer) {
    formContainer.style.display = 'none';
  }
  
  // Show success message
  const successMsg = document.getElementById('contact-success');
  if (successMsg) {
    successMsg.style.display = 'block';
  }
}
