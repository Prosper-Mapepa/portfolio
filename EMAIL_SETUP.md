# Email Setup Guide for Portfolio Contact Form

Your portfolio now has a functional contact form that can receive messages from users! Here's how to set it up to actually send emails.

## 🚀 Quick Setup Options

### Option 1: EmailJS (Recommended - Easiest)
1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your credentials and add them to your environment variables

### Option 2: SendGrid (Professional)
1. Sign up for [SendGrid](https://sendgrid.com/) (free tier available)
2. Create an API key
3. Verify your sender email
4. Add your API key to environment variables

### Option 3: Resend (Modern)
1. Sign up for [Resend](https://resend.com/) (free tier available)
2. Create an API key
3. Verify your domain
4. Add your API key to environment variables

## 📝 Environment Variables Setup

Create a `.env.local` file in your project root and add your email service credentials:

```env
# For EmailJS
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_USER_ID=your_user_id

# For SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=mapep1p@cmich.edu

# For Resend
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=mapep1p@cmich.edu

# For Gmail (Nodemailer)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

## 🔧 Implementation Steps

### Step 1: Choose Your Email Service
Decide which email service you want to use based on your needs:
- **EmailJS**: Easiest setup, good for beginners
- **SendGrid**: Professional, reliable, good for production
- **Resend**: Modern, developer-friendly
- **Gmail**: Free, but requires app password setup

### Step 2: Update the API Route
Edit `app/api/contact/route.ts` and uncomment the email service you want to use.

### Step 3: Test the Form
1. Start your development server: `pnpm dev`
2. Go to your contact form
3. Fill out and submit the form
4. Check your email (and console logs for debugging)

## 📧 EmailJS Setup (Step-by-Step)

### Step 1: Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. **Login to EmailJS dashboard**
2. **Go to "Email Services"** in the left sidebar
3. **Click "Add New Service"**
4. **Choose your email provider:**
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP**

5. **For Gmail setup:**
   - Click "Gmail"
   - Click "Connect Account"
   - Sign in with your Gmail account
   - Grant permissions to EmailJS

### Step 3: Create Email Template
1. **Go to "Email Templates"** in the left sidebar
2. **Click "Create New Template"**
3. **Use this template:**

```
Subject: Portfolio Contact: {{subject}}

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio website at {{timestamp}}
```

4. **Save the template**

### Step 4: Get Your Credentials
1. **Service ID:**
   - Go to "Email Services"
   - Copy the Service ID (looks like: `service_abc123`)

2. **Template ID:**
   - Go to "Email Templates"
   - Copy the Template ID (looks like: `template_xyz789`)

3. **User ID:**
   - Go to "Account" → "API Keys"
   - Copy your Public Key (looks like: `user_def456`)

### Step 5: Create Environment File
Create a file called `.env.local` in your project root with this content:

```env
# EmailJS Configuration
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_USER_ID=your_user_id_here
```

Replace the placeholder values with your actual credentials from Step 4.

### Step 6: Test Your Setup
1. **Restart your development server**: `pnpm dev`
2. **Fill out your contact form**
3. **Submit the form**
4. **Check your email inbox** - you should receive the message!

## 🔍 Testing

### Current Status
- ✅ Form validation works
- ✅ API endpoint is functional
- ✅ EmailJS integration is ready
- ✅ Messages will be sent to your email

### Test the Form
1. Fill out the contact form
2. Submit the form
3. Check your email inbox
4. Check browser console for any errors

## 🛠️ Troubleshooting

### Common Issues
1. **Form not submitting**: Check browser console for errors
2. **Emails not received**: Verify your EmailJS credentials
3. **Environment variables not working**: Restart your development server

### Debug Steps
1. Check browser console for errors
2. Check server console for API logs
3. Verify environment variables are loaded
4. Test EmailJS credentials in their dashboard

## 🚀 Production Deployment

When deploying to production:
1. Set up environment variables on your hosting platform
2. Configure your email service for production
3. Test the contact form thoroughly
4. Consider rate limiting to prevent spam

## 📞 Support

If you need help setting up any of these email services:
- EmailJS: [Documentation](https://www.emailjs.com/docs/)
- SendGrid: [Documentation](https://sendgrid.com/docs/)
- Resend: [Documentation](https://resend.com/docs)

Your contact form is now ready to receive real messages from users! 🎉
