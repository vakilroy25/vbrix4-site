import json
import os
import re
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
import dns.resolver
from email_validator import validate_email, EmailNotValidError
import resend

# Initialize Resend with API key from environment
resend.api_key = os.environ.get("RESEND_API_KEY")

def validate_email_format(email):
    """Validate email format using email-validator library"""
    try:
        valid = validate_email(email, check_deliverability=False)
        return True, valid.email
    except EmailNotValidError as e:
        return False, str(e)

def validate_email_mx(email):
    """Validate that email domain has MX records"""
    try:
        domain = email.split('@')[1]
        mx_records = dns.resolver.resolve(domain, 'MX')
        return len(mx_records) > 0
    except Exception:
        return False

def send_notification_email(name, email, message):
    """Send notification to hi@vbrix4.com"""
    try:
        params = {
            "from": "vBrix4 Website <hi@vbrix4.com>",
            "to": ["hi@vbrix4.com"],
            "subject": f"New contact form submission from {name}",
            "html": f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://vbrix4.com/logo.png" alt="vBrix4 Logo" style="width: 80px; height: 80px;" />
    </div>
    <h2 style="color: #00d4ff; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">New Contact Form Submission</h2>
    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 10px 0;"><strong>Name:</strong> {name}</p>
        <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:{email}" style="color: #00d4ff;">{email}</a></p>
        <p style="margin: 10px 0;"><strong>Message:</strong></p>
        <div style="background: white; padding: 15px; border-left: 4px solid #00d4ff; margin-top: 10px;">
            {message.replace(chr(10), '<br>')}
        </div>
    </div>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    <p style="text-align: center; color: #666; font-size: 12px;">Sent from vbrix4.com contact form</p>
</body>
</html>
            """,
            "reply_to": email
        }
        email_response = resend.Emails.send(params)
        return True, email_response
    except Exception as e:
        return False, str(e)

def send_auto_reply(name, email):
    """Send auto-reply to user"""
    try:
        # Escape name to prevent HTML injection
        safe_name = name.replace('<', '&lt;').replace('>', '&gt;')
        
        params = {
            "from": "vBrix4 Team <hi@vbrix4.com>",
            "to": [email],
            "subject": "Thank you for contacting vBrix4",
            "html": f"""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" style="padding-bottom: 30px;">
<img src="https://vbrix4.com/logo.png" alt="vBrix4 Logo" width="100" height="100" style="display: block;" />
</td>
</tr>
<tr>
<td>
<h2 style="color: #00d4ff; border-bottom: 2px solid #00d4ff; padding-bottom: 10px; margin-top: 0;">Thank you for reaching out!</h2>
</td>
</tr>
<tr>
<td>
<p style="font-size: 16px; margin: 20px 0;">Hi {safe_name},</p>
</td>
</tr>
<tr>
<td>
<p style="font-size: 16px; line-height: 1.8; margin: 20px 0;">We have received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you as soon as possible.</p>
</td>
</tr>
<tr>
<td>
<p style="font-size: 16px; line-height: 1.8; margin: 20px 0;">If you have any urgent questions in the meantime, feel free to use our chat support on the website.</p>
</td>
</tr>
<tr>
<td>
<table width="100%" cellpadding="20" cellspacing="0" border="0" style="background-color: #f0f8ff; border-left: 4px solid #00d4ff; margin: 30px 0;">
<tr>
<td>
<p style="margin: 0; font-size: 16px;"><strong>Best regards,</strong><br/>The vBrix4 Team</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<hr style="border: none; border-top: 1px solid #dddddd; margin: 30px 0;" />
</td>
</tr>
<tr>
<td align="center">
<p style="color: #666666; font-size: 12px; margin: 0;">This is an automated response from vbrix4.com</p>
</td>
</tr>
</table>
</body>
</html>""",
        }
        email_response = resend.Emails.send(params)
        return True, email_response
    except Exception as e:
        return False, str(e)

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle POST request from contact form"""
        try:
            # Read request body
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            
            # Parse form data
            form_data = parse_qs(body)
            
            # Extract fields (parse_qs returns lists)
            name = form_data.get('name', [''])[0].strip()
            email = form_data.get('email', [''])[0].strip()
            message = form_data.get('message', [''])[0].strip()
            honeypot = form_data.get('website', [''])[0]
            
            # Spam check - if honeypot is filled, reject silently
            if honeypot:
                self.send_json_response(200, {
                    "success": True,
                    "message": "Thank you for your message!"
                })
                return
            
            # Validate required fields
            if not name or not email or not message:
                self.send_json_response(400, {
                    "success": False,
                    "error": "All fields are required"
                })
                return
            
            # Validate email format
            valid_format, validated_email = validate_email_format(email)
            if not valid_format:
                self.send_json_response(400, {
                    "success": False,
                    "error": "Please enter a valid email address"
                })
                return
            
            # Validate email domain has MX records
            if not validate_email_mx(validated_email):
                self.send_json_response(400, {
                    "success": False,
                    "error": "Email domain does not appear to be valid"
                })
                return
            
            # Check if Resend API key is configured
            if not resend.api_key:
                self.send_json_response(500, {
                    "success": False,
                    "error": "Email service not configured"
                })
                return
            
            # Send notification email
            notification_sent, notification_result = send_notification_email(name, validated_email, message)
            if not notification_sent:
                self.send_json_response(500, {
                    "success": False,
                    "error": "Failed to send notification"
                })
                return
            
            # Send auto-reply
            reply_sent, reply_result = send_auto_reply(name, validated_email)
            if not reply_sent:
                # Log warning but don't fail the request
                print(f"Warning: Auto-reply failed: {reply_result}")
            
            # Success response
            self.send_json_response(200, {
                "success": True,
                "message": "Thank you for your message! We'll get back to you shortly."
            })
            
        except Exception as e:
            print(f"Error processing contact form: {str(e)}")
            self.send_json_response(500, {
                "success": False,
                "error": "An unexpected error occurred. Please try again."
            })
    
    def do_OPTIONS(self):
        """Handle CORS preflight request"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def send_json_response(self, status_code, data):
        """Helper to send JSON response"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

