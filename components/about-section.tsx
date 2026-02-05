"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"
import { Shield, Code, Database, Cloud, Lock, Zap, Award, Users, TrendingUp } from "lucide-react"

const skillCategories = [
  {
    category: "Security & Compliance",
    icon: Shield,
    skills: ["Penetration Testing", "Endpoint & Network Security", "NIST 800-53", "Threat Modeling", "OWASP Top 10", "Cybersecurity"]
  },
  {
    category: "Frontend Development",
    icon: Code,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux Toolkit"]
  },
  {
    category: "Backend & Infrastructure",
    icon: Database,
    skills: ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "RESTful APIs", "Python"]
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Microservices"]
  },
  {
    category: "Blockchain & FinTech",
    icon: Zap,
    skills: ["Stellar Blockchain", "FinTech Security", "Multi-currency Systems", "Payment Processing"]
  }
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section ref={sectionRef} id="about" className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 border-b border-gray-100 pb-14 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          I’m a Secure Full-Stack Software Engineer with over 6 years of experience building scalable, user-focused solutions across fintech, web, and mobile platforms. Now pursuing an MBA in Cybersecurity at Central Michigan University, I’m driven by a mission to develop systems that are not only innovative but also secure, efficient, and impactful. 
          </p>
        </div>

        {/* <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div
            className={`space-y-4 transition-all duration-1000 delay-200 ${isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative group">
              <img
                src="/me.jpg"
                alt="Prosper Mapepa - Application Security Engineer"
                className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto lg:mx-0 transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl group-hover:shadow-primary/10"
              />
            
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
              
      
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#1A2E66] to-[#2A4A9A] text-white px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-semibold">7+ Years Exp</span>
                </div>
              </div>
            </div>

           
            <div className="grid grid-cols-2 gap-3">
              <Card className="text-center p-3 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-[#1A2E66] mb-1">30%+</div>
                  <div className="text-sm text-muted-foreground">Vulnerability Reduction</div>
                </CardContent>
              </Card>
              <Card className="text-center p-3 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-[#1A2E66] mb-1">15+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div
            className={`space-y-4 transition-all duration-1000 delay-400 ${isVisible ? "animate-slide-in-right" : "opacity-0 translate-x-10"}`}
          >
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-3">Hello! I'm Prosper Mapepa</h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed text-lg">
                <p className="animate-fade-in-up animation-delay-600">
                  I'm an Secure Software Engineer with over 7 years of experience building secure, scalable
                  applications. Currently pursuing an MBA in Cybersecurity at Central Michigan University (GPA: 3.9), I
                  specialize in embedding security into the Software Development Life Cycle (SDLC) and developing innovative
                  FinTech solutions with blockchain integration.
                </p>
                <p className="animate-fade-in-up animation-delay-800">
                  At GrowthSense Ltd, I've led security initiatives that reduced high-risk vulnerabilities by 30%+ and
                  built multi-currency wallet systems with Stellar blockchain. My expertise spans from threat modeling and
                  secure code reviews to implementing comprehensive security frameworks that protect both businesses and end users.
                </p>
                <p className="animate-fade-in-up animation-delay-1000">
                  I'm passionate about secure coding practices, mentoring developers on application security, and staying
                  ahead of emerging cybersecurity threats. When I'm not securing applications, I contribute to open source
                  projects and share cybersecurity knowledge with the developer community.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Full-width Skills & Technologies section */}
        <div className="mt-12 ">
          <div className="space-y-3">
            <h4 className="text-3xl font-bold text-foreground text-center mb-6">Skills & Technologies</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillCategories.map((category, index) => (
                <Card key={category.category} className="hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${1200 + index * 100}ms` }}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <category.icon className="h-6 w-6 text-[#1A2E66]" />
                      <h5 className="font-semibold text-foreground text-lg">{category.category}</h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs hover:scale-110 hover:bg-[#1A2E66] hover:text-white transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
