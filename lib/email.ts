// Email service configuration
// Choose one of the following email services and configure it

// Option 1: EmailJS (Free tier available)
export const emailJSConfig = {
  serviceId: process.env.EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: process.env.EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  userId: process.env.EMAILJS_USER_ID || 'YOUR_USER_ID',
}

// Option 2: SendGrid (Free tier available)
export const sendGridConfig = {
  apiKey: process.env.SENDGRID_API_KEY || 'YOUR_SENDGRID_API_KEY',
  fromEmail: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
  toEmail: process.env.TO_EMAIL || 'mapep1p@cmich.edu',
}

// Option 3: Resend (Free tier available)
export const resendConfig = {
  apiKey: process.env.RESEND_API_KEY || 'YOUR_RESEND_API_KEY',
  fromEmail: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
  toEmail: process.env.TO_EMAIL || 'mapep1p@cmich.edu',
}

// Option 4: Nodemailer with Gmail (Free)
export const nodemailerConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER || 'your-email@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password',
  },
}

// Email template
export const createEmailTemplate = (data: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  return `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Sent from your portfolio website at ${new Date().toLocaleString()}
  `.trim()
}

// Email sending function (placeholder - implement based on your chosen service)
export const sendEmail = async (data: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  // For now, just log the email (replace with actual email sending)
  console.log('Email would be sent:', {
    to: 'mapep1p@cmich.edu',
    from: data.email,
    subject: `Portfolio Contact: ${data.subject}`,
    content: createEmailTemplate(data),
  })

  // TODO: Implement actual email sending based on your chosen service
  // Example implementations are provided below

  return { success: true }
}

/*
// Example: EmailJS implementation
export const sendEmailWithEmailJS = async (data: any) => {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: emailJSConfig.serviceId,
      template_id: emailJSConfig.templateId,
      user_id: emailJSConfig.userId,
      template_params: {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: 'mapep1p@cmich.edu'
      }
    })
  })
  
  return response.json()
}

// Example: SendGrid implementation
export const sendEmailWithSendGrid = async (data: any) => {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sendGridConfig.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: sendGridConfig.toEmail }],
          subject: `Portfolio Contact: ${data.subject}`,
        },
      ],
      from: { email: sendGridConfig.fromEmail },
      content: [
        {
          type: 'text/plain',
          value: createEmailTemplate(data),
        },
      ],
    }),
  })
  
  return response.json()
}
*/
