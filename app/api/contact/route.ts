import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // EmailJS configuration
    const emailJSConfig = {
      serviceId: process.env.EMAILJS_SERVICE_ID,
      templateId: process.env.EMAILJS_TEMPLATE_ID,
      userId: process.env.EMAILJS_USER_ID,
    }

    // Check if EmailJS is configured
    if (!emailJSConfig.serviceId || !emailJSConfig.templateId || !emailJSConfig.userId) {
      console.log('EmailJS not configured, logging message instead:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      })
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Message received! (EmailJS not configured - check console for message)' 
        },
        { status: 200 }
      )
    }

    // Send email using EmailJS
    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: emailJSConfig.serviceId,
        template_id: emailJSConfig.templateId,
        user_id: emailJSConfig.userId,
        template_params: {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          timestamp: new Date().toLocaleString()
        }
      })
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text()
      console.error('EmailJS error:', errorData)
      throw new Error('Failed to send email')
    }

    const result = await emailResponse.json()
    
    if (result.status === 200) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Message sent successfully! I\'ll get back to you within 24 hours.' 
        },
        { status: 200 }
      )
    } else {
      throw new Error('Email service error')
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
