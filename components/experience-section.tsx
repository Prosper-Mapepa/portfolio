"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useRef, useState } from "react"
import { Building2, GraduationCap, FolderKanban, Award, Calendar, MapPin, ExternalLink } from "lucide-react"
import { ProjectsSection } from "@/components/projects-section"

const experience = [
  {
    type: "work",
    title: "Slate Technolutions CRM Assistant",
    company: "Central Michigan University",
    period: "May 2025 - Present",
    location: "Mount Pleasant, MI",
    description: "",
    achievements: [
      "Provide front-end user support for faculty, staff, and students using the Technolutions-Slate CRM system.",
      "Monitor and manage data imports and feeds to ensure accuracy and reliability.",
      "Create, audit, and maintain user accounts to ensure proper secure access and functionality.",
      "Develop and update end-user documentation to support effective system use.",
      "Troubleshoot and resolve technical issues related to Slate and related processes.",
      "Collaborate with team leads to complete projects and implement system improvements.",
    ],
    technologies: ["Slate CRM", "User Support", "Data Management", "User Accounts", "Documentation", "Technical Support"]
  },
  {
    type: "work",
    title: "Lead Front-end Software Engineer",
    company: "SOFTRITE",
    period: "Aug 2024 - Dec 2024",
    location: "Remote",
    description: "Leading front-end development initiatives with focus on secure software design and world-class payroll system development.",
    achievements: [
      "Designed and created secure software using JavaScript, ReactJS, NextJS",
      "Developed an efficient Payroll System of uncompromising world-class standards and ethics",
      "Collaborated with team members and handled complex coding practises",
      "Implemented software security testing and debugging processes",
      "Fixed and improved existing software systems"
    ],
    technologies: ["JavaScript", "ReactJS", "NextJS", "Agile Development", "Software Security", "Payroll System Development"]
  },
  {
    type: "work",
    title: "Secure Full-Stack Software Engineer",
    company: "GrowthSense Ltd",
    period: "Jan 2023 - Dec 2024",
    location: "Cambridge, United Kingdom (Remote)",
    description: "Led security initiatives and developed secure FinTech solutions with blockchain integration, focusing on cloud-native applications and secure payment systems.",
    achievements: [
      "Educated and mentored developers on secure coding practices, increasing adoption of security guidelines across engineering teams",
      "Conducted architecture reviews for cloud-native apps (AWS, Docker, Kubernetes) to identify attack vectors and enforce defense-in-depth strategies",
      "Built multi-currency wallet systems with Stellar blockchain, integrating KYC, AML checks, and secure transaction flows",
      "Developed Toll Payment and QR-code-based payment solutions, embedding PIN-based authentication and secure API endpoints",
      "Implemented encryption-at-rest and in-transit, protecting sensitive user financial and identity data"
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "Stellar Blockchain", "KYC/AML", "API Security", "Encryption", "Cloud Security"]
  },
  {
    type: "work",
    title: "Software Engineer",
    company: "GrowthSense Ltd",
    period: "Oct 2021 - Dec 2022",
    location: "Cambridge, United Kingdom (Remote)",
    description: "Designed and deployed secure document automation tools and enterprise applications with comprehensive security measures.",
    achievements: [
      "Programming using languages such as JavaScript, React, NestJS, and PostgreSQL",
      "Strengthened an artist promotion site with responsive design, efficient state management using object-oriented practices, and phishing awareness",
      "Enhanced scalable eCommerce platforms with secure payment gateways, analyzing data structures for insider threat mitigation using Splunk",
      "Executed full SDLC, performing penetration testing and deploying secure solutions"
    ],
    technologies: ["React", "Node.js", "NestJS", "PostgreSQL", "RBAC", "SDLC Security"]
  },
  {
    type: "work",
    title: "Junior Software Engineer",
    company: "GrowthSense Ltd",
    period: "Jan 2020 - Sep 2021",
    location: "Cambridge, United Kingdom (Remote)",
    description: "Assisted in embedding security into development workflows and contributed to secure coding practices across the organization.",
    achievements: [
      "Assisted in embedding security into development workflows, including input validation, authentication checks, and secure data handling",
      "Contributed to code reviews and design discussions, gaining exposure to threat modeling, secure design principles, and OWASP Top 10 risks",
      "Developed unit and integration tests to improve code reliability and prevent security regressions",
      "Reduced potential vulnerabilities early in the SDLC through proactive security measures"
    ],
    technologies: ["Security Testing", "Threat Modeling", "OWASP Top 10", "Unit Testing", "Integration Testing", "Secure Coding"]
  }
]

const education = [
  {
    type: "education",
    title: "MBA in Cybersecurity",
    company: "Central Michigan University",
    period: "2025 - 2026",
    location: "Mount Pleasant, MI",
    description: "Pursuing advanced degree in cybersecurity with focus on business applications and strategic security management. Completed LeaderShape Institute Leadership Program.",
    achievements: [
      "Current GPA: 3.9/4.0",
      "Completed LeaderShape Institute Leadership Program, developing skills in vision-driven and collaborative leadership",
      "Relevant Coursework: Cybersecurity Analysis, Cybercrime Forensics, and Managing Security and Privacy in the Cloud",
      "Focus on cybersecurity strategy and management",
      "Business applications of security frameworks"
    ],
    technologies: ["Cybersecurity Analysis", "Cybercrime Forensics", "Cloud Security", "Risk Management", "Business Security", "Strategic Planning"]
  },
  {
    type: "education",
    title: "Bachelor of Technology (Honors) in Information Security and Assurance",
    company: "Harare Institute of Technology",
    period: "Aug 2015 - Oct 2019",
    location: "Harare, Zimbabwe",
    description: "Comprehensive information security education with focus on cybersecurity, threat analysis, and secure system design.",
    achievements: [
      "Graduated with Honors",
      "Specialized in information security and cybersecurity",
      "Completed capstone project on secure payment systems",
      "Active member of cybersecurity student organization"
    ],
    technologies: ["Java", "Python", "Data Structures", "Algorithms", "Information Security", "Cybersecurity"]
  }
]

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("projects")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const checkHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#projects") {
        setActiveTab("projects")
      }
    }
    checkHash()
    window.addEventListener("hashchange", checkHash)
    return () => window.removeEventListener("hashchange", checkHash)
  }, [])

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

  const renderItem = (item: any, index: number) => (
    <div
      key={`${item.type}-${index}`}
      className={`transition-all duration-1000 delay-${index * 200} ${
        isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
      <Card className="hover:shadow-xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm overflow-hidden group mb-4">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-3 gap-4 p-4">
            {/* Left column - Icon and type */}
            <div className="flex flex-col items-center lg:items-start space-y-3">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                item.type === "work"
                  ? "bg-gradient-to-br from-[#1A2E66] to-[#2A4A9A] text-white"
                  : "bg-gradient-to-br from-emerald-600 to-teal-600 text-white"
              } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.type === "work" ? <Building2 className="h-7 w-7" /> : <GraduationCap className="h-7 w-7" />}
              </div>

              <div className="text-center lg:text-left">
                <Badge
                  variant="outline"
                  className={`${
                    item.type === "work"
                      ? "border-[#1A2E66] text-[#1A2E66] hover:bg-[#1A2E66] hover:text-white"
                      : "border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                  } transition-all duration-300`}
                >
                  {item.type === "work" ? "Work Experience" : "Education"}
                </Badge>
              </div>
            </div>

            {/* Middle column - Content */}
            <div className="lg:col-span-2 space-y-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-[#1A2E66] transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">{item.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base">
                {item.description}
              </p>

              {/* Achievements */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-[#1A2E66]" />
                  Key Achievements
                </h4>
                <ul className="space-y-1">
                  {item.achievements.map((achievement: string, achievementIndex: number) => (
                    <li key={achievementIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#1A2E66] rounded-full mt-2 flex-shrink-0"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech: string) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs hover:scale-105 transition-transform duration-300 cursor-default"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <section ref={sectionRef} id="experience" className="py-12">
      <div id="projects" className="scroll-mt-24" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-8 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">Experience & Education</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My professional journey in secure software development and cybersecurity
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 h-14">
            <TabsTrigger
              value="projects"
              className="text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-[#1A2E66] data-[state=active]:shadow-md transition-all duration-300 rounded-lg"
            >
              <FolderKanban className="h-4 w-4 mr-2" />
              Featured Projects
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-[#1A2E66] data-[state=active]:shadow-md transition-all duration-300 rounded-lg"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Work Experience
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-[#1A2E66] data-[state=active]:shadow-md transition-all duration-300 rounded-lg"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Education
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="space-y-3 mt-0">
            {experience.map((item, index) => renderItem(item, index))}
          </TabsContent>

          <TabsContent value="education" className="space-y-3 mt-0">
            {education.map((item, index) => renderItem(item, index))}
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            <ProjectsSection embedded />
          </TabsContent>
        </Tabs>

        {/* Call to action */}
        {/* <div className={`text-center mt-8 transition-all duration-1000 delay-800 ${
          isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
        }`}>
          <Card className="inline-block p-5 bg-gradient-to-r from-[#1A2E66]/5 to-[#2A4A9A]/5 border border-[#1A2E66]/20">
            <CardContent className="p-0">
              <p className="text-lg text-muted-foreground mb-3">
                Looking for a security-focused developer for your next project?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[#1A2E66] font-semibold hover:text-[#2A4A9A] transition-colors duration-300"
              >
                Let's discuss how I can help
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </section>
  )
}
