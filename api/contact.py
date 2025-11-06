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
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Message:</strong></p>
                <p>{message.replace(chr(10), '<br>')}</p>
                <hr>
                <p><small>Sent from vbrix4.com contact form</small></p>
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
        params = {
            "from": "vBrix4 Team <hi@vbrix4.com>",
            "to": [email],
            "subject": "Thank you for contacting vBrix4",
            "html": f"""
                <h2>Thank you for reaching out!</h2>
                <p>Hi {name},</p>
                <p>We've received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you as soon as possible.</p>
                <p>If you have any urgent questions in the meantime, feel free to use our chat support on the website.</p>
                <br>
                <p>Best regards,<br>The vBrix4 Team</p>
                <hr>
                <p><small>This is an automated response from vbrix4.com</small></p>
            """
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

