"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Linkedin, Mail, Shield, Code, Zap, Award, Users, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "Secure Software Engineer crafting secure, scalable solutions for the digital world"

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const scrollToProjects = () => {
    window.location.hash = "#projects"
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E66]/5 via-background to-[#1A2E66]/10" />
      
      {/* Professional geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#1A2E66]/10 rounded-full animate-spin-slow opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#1A2E66]/8 rotate-45 animate-pulse-slow opacity-40"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-[#1A2E66]/8 to-transparent rounded-lg animate-float-slow opacity-50"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-gradient-to-l from-[#1A2E66]/8 to-transparent rounded-full animate-float-medium opacity-40"></div>
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#1A2E66]/20 rounded-full animate-float-slow shadow-lg shadow-[#1A2E66]/10 opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#1A2E66]/15 rounded-full animate-float-medium shadow-lg shadow-[#1A2E66]/8 opacity-50"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#1A2E66]/25 rounded-full animate-float-fast shadow-lg shadow-[#1A2E66]/15 opacity-40"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-[#1A2E66]/20 rounded-full animate-float-slow shadow-lg shadow-[#1A2E66]/10 opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 bg-[#1A2E66]/20 rounded-full animate-float-medium shadow-lg shadow-[#1A2E66]/8 opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Professional badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#1A2E66]/10 to-[#2A4A9A]/10 border border-[#1A2E66]/20 mb-4 animate-slide-in-down backdrop-blur-sm">
            <Shield className="h-4 w-4 text-[#1A2E66]" />
            <span className="text-sm font-semibold text-[#1A2E66]">Secure Software Engineer</span>
          </div>

          {/* Main heading with enhanced typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-3 text-balance animate-slide-in-left leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-[#1A2E66] via-[#2A4A9A] to-[#1A2E66] bg-clip-text text-transparent animate-gradient-x">
              Prosper Mapepa
            </span>
          </h1>

          {/* Enhanced subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto text-pretty min-h-[3rem] animate-slide-in-right animation-delay-300 leading-relaxed font-medium">
            {displayedText}
            <span className="animate-pulse text-[#1A2E66] ml-1">|</span>
          </p>

          {/* Professional highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 border border-[#1A2E66]/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
              <Award className="h-4 w-4 text-[#1A2E66]" />
              <span className="text-sm font-medium"><span className="animate-pulse text-green-700 font-extrabold mr-1">6+</span> Years Experience</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 border border-[#1A2E66]/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
              <Users className="h-4 w-4 text-[#1A2E66]" />
              <span className="text-sm font-medium">Endpoint & Network Security</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 border border-[#1A2E66]/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
              <TrendingUp className="h-4 w-4 text-[#1A2E66]" />
              <span className="text-sm font-medium">FinTech Innovation</span>
            </div>
          </div>

          {/* Enhanced skill badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 animate-fade-in-up animation-delay-500">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-[#1A2E66]/20 backdrop-blur-sm shadow-sm">
              <Shield className="h-4 w-4 text-[#1A2E66]" />
              <span className="text-sm font-medium">Security Engineering</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-[#1A2E66]/20 backdrop-blur-sm shadow-sm">
              <Code className="h-4 w-4 text-[#1A2E66]" />
              <span className="text-sm font-medium">Full-Stack Development</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-[#1A2E66]/20 backdrop-blur-sm shadow-sm">
              <Zap className="h-4 w-4 text-[#1A2E66]" />
              <span className="text-sm font-medium">Blockchain Solutions</span>
            </div>
          </div>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6 animate-fade-in-up animation-delay-600">
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="text-lg px-10 py-4 bg-gradient-to-r from-[#1A2E66] to-[#2A4A9A] hover:from-[#2A4A9A] hover:to-[#1A2E66] hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#1A2E66]/30 border-0 shadow-lg"
            >
              View My Work
              <ArrowDown className="ml-2 h-5 w-5 animate-bounce-subtle" />
            </Button>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                className="hover:scale-110 hover:rotate-12 transition-all duration-300 animation-delay-100 bg-background/60 backdrop-blur-sm border-[#1A2E66]/30 hover:border-[#1A2E66] hover:bg-[#1A2E66]/10 p-3 shadow-sm hover:shadow-md"
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
                className="hover:scale-110 hover:rotate-12 transition-all duration-300 animation-delay-200 bg-background/60 backdrop-blur-sm border-[#1A2E66]/30 hover:border-[#1A2E66] hover:bg-[#1A2E66]/10 p-3 shadow-sm hover:shadow-md"
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
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <button
          onClick={scrollToProjects}
          className="relative p-3 rounded-full bg-background/40 backdrop-blur-sm border border-[#1A2E66]/20 shadow-lg hover:bg-background/60 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer group"
        >
          <ArrowDown className="h-6 w-6 text-[#1A2E66] animate-pulse group-hover:animate-bounce" />
          <div className="absolute inset-0 rounded-full animate-ping bg-[#1A2E66]/20"></div>
        </button>
      </div>
    </section>
  )
}
