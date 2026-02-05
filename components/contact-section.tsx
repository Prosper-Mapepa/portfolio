"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Linkedin, Mail, MapPin, Send, Phone, Clock, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_r27rejl',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_i1lhxbd',
  userId: process.env.NEXT_PUBLIC_EMAILJS_USER_ID || 'sL51SrXZHF5dgY2XE',
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
      }

      // Validate required fields
      if (!data.name || !data.email || !data.subject || !data.message) {
        toast({
          title: "Error",
          description: "All fields are required.",
          variant: "destructive",
        })
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        toast({
          title: "Error",
          description: "Please enter a valid email address.",
          variant: "destructive",
        })
        return
      }

      // Send email using EmailJS from client-side
      const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.serviceId,
          template_id: EMAILJS_CONFIG.templateId,
          user_id: EMAILJS_CONFIG.userId,
          template_params: {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            timestamp: new Date().toLocaleString()
          }
        })
      })

      if (emailResponse.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you within 24 hours.",
        })
        ;(e.target as HTMLFormElement).reset()
      } else {
        const errorData = await emailResponse.text()
        console.error('EmailJS error:', errorData)
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast({
        title: "Error sending message",
        description: "Something went wrong. Please try again or contact me directly at mapep1p@cmich.edu",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="py-12 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-8 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss cybersecurity solutions? I'd love to hear from you and explore how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div
            className={`space-y-4 transition-all duration-1000 delay-200 ${isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-10"}`}
          >
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-3">Let's work together</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
                I'm always interested in new opportunities and challenging security projects. Whether you need
                application security consulting, secure development, or just want to discuss cybersecurity trends, 
                I'm here to help bring your vision to life with security-first development practices.
              </p>
            </div>

            {/* Contact information */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1A2E66]/10 to-[#2A4A9A]/10 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#1A2E66]/20 group-hover:to-[#2A4A9A]/20 group-hover:scale-110 transition-all duration-300">
                    <Mail className="h-6 w-6 text-[#1A2E66]" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-lg">Email</h4>
                  <p className="text-muted-foreground">mapep1p@cmich.edu</p>
                  <p className="text-sm text-muted-foreground">I'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1A2E66]/10 to-[#2A4A9A]/10 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#1A2E66]/20 group-hover:to-[#2A4A9A]/20 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="h-6 w-6 text-[#1A2E66]" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-lg">Location</h4>
                  <p className="text-muted-foreground">Mount Pleasant, MI</p>
                  <p className="text-sm text-muted-foreground">Open to remote work & relocation</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1A2E66]/10 to-[#2A4A9A]/10 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#1A2E66]/20 group-hover:to-[#2A4A9A]/20 group-hover:scale-110 transition-all duration-300">
                    <Clock className="h-6 w-6 text-[#1A2E66]" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-lg">Response Time</h4>
                  <p className="text-muted-foreground">Within 24 hours</p>
                  <p className="text-sm text-muted-foreground">Usually much faster!</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-lg">Connect with me</h4>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:scale-110 hover:rotate-12 hover:bg-[#1A2E66] hover:text-white transition-all duration-300 animation-delay-100 bg-transparent border-[#1A2E66]/30 hover:border-[#1A2E66] w-12 h-12"
                  asChild
                >
                  <a href="https://linkedin.com/in/prosper-geek" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:scale-110 hover:rotate-12 hover:bg-[#1A2E66] hover:text-white transition-all duration-300 animation-delay-200 bg-transparent border-[#1A2E66]/30 hover:border-[#1A2E66] w-12 h-12"
                  asChild
                >
                  <a href="mailto:mapep1p@cmich.edu">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced contact form */}
          <Card
            className={`hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-0 bg-card/60 backdrop-blur-sm ${isVisible ? "animate-slide-in-right animation-delay-400" : "opacity-0 translate-x-10"}`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1A2E66] to-[#2A4A9A] rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Send me a message</CardTitle>
                  <CardDescription className="text-base">I'll get back to you as soon as possible.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className={`transition-colors duration-200 font-medium ${focusedField === "name" ? "text-[#1A2E66]" : ""}`}
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-[#1A2E66]/10 border-[#1A2E66]/20 focus:border-[#1A2E66] h-12"
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className={`transition-colors duration-200 font-medium ${focusedField === "email" ? "text-[#1A2E66]" : ""}`}
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-[#1A2E66]/10 border-[#1A2E66]/20 focus:border-[#1A2E66] h-12"
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className={`transition-colors duration-200 font-medium ${focusedField === "subject" ? "text-[#1A2E66]" : ""}`}
                  >
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    required
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-[#1A2E66]/10 border-[#1A2E66]/20 focus:border-[#1A2E66] h-12"
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className={`transition-colors duration-200 font-medium ${focusedField === "message" ? "text-[#1A2E66]" : ""}`}
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project, security needs, or just say hello!"
                    rows={5}
                    required
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-[#1A2E66]/10 border-[#1A2E66]/20 focus:border-[#1A2E66] resize-none text-base"
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-[#1A2E66] to-[#2A4A9A] hover:from-[#2A4A9A] hover:to-[#1A2E66] hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-[#1A2E66]/30 border-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:translate-x-1" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
