# Setting Up EmailJS for Contact Form

This contact form uses EmailJS to send emails directly from the client-side without needing a backend server.

## Setup Instructions

1. **Create an EmailJS Account**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Verify your account through the email they send you

2. **Create an Email Service**
   - Go to the EmailJS dashboard
   - Click on "Email Services" in the left sidebar
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the instructions to connect your email account

3. **Create an Email Template**
   - Go to "Email Templates" in the left sidebar
   - Click "Create New Template"
   - Design your email template
   - Use the following variables in your template:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{message}}` - Message content
     - `{{to_name}}` - Your name (recipient)

4. **Get Your IDs and Keys**
   - Service ID: Found in the "Email Services" section
   - Template ID: Found in the "Email Templates" section
   - Public Key: Found in the "Account" section under "API Keys"

5. **Update Environment Variables**
   - Open the `.env.local` file in the root of your project
   - Replace the placeholder values with your actual IDs and keys:
     ```
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     ```

6. **Test the Form**
   - Start your development server
   - Fill out the contact form and submit
   - Check your email to see if you received the message

## Troubleshooting

- If emails aren't being sent, check the browser console for errors
- Verify that your EmailJS account is active and not in trial mode with limitations
- Make sure your email service is properly connected
- Check that your template variables match those used in the code
