"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Smartphone, Star, Calendar, Building2, ChevronLeft, ChevronRight, Monitor, Smartphone as PhoneIcon, X, Play, Pause, Video } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import projectsData from "@/data/projects.json"

interface ProjectsSectionProps {
  embedded?: boolean
}

export function ProjectsSection({ embedded = false }: ProjectsSectionProps) {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [activeSlides, setActiveSlides] = useState<{ [key: number]: 'mobile' | 'web' }>({})
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const hasVideos = (project: any) => project.videos?.length > 0

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, index])
          }
        },
        { threshold: 0.1 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  // Auto-rotation effect for images
  useEffect(() => {
    if (!isModalOpen || !isAutoRotating || !selectedProject) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const isHybrid = selectedProject.type === 'hybrid'
        const projectIndex = projectsData.findIndex(p => p === selectedProject)
        const currentSlide = activeSlides[projectIndex] || 'web'
        const images = getProjectImages(selectedProject, isHybrid ? currentSlide : selectedProject.type)
        return (prevIndex + 1) % images.length
      })
    }, 3000) // Rotate every 3 seconds

    return () => clearInterval(interval)
  }, [isModalOpen, isAutoRotating, selectedProject, activeSlides])

  const handleSlideChange = (projectIndex: number, slide: 'mobile' | 'web') => {
    setActiveSlides(prev => ({
      ...prev,
      [projectIndex]: slide
    }))
    setCurrentImageIndex(0) // Reset image index when switching platforms
  }

  const getProjectImage = (project: any, projectIndex: number) => {
    const isHybrid = project.type === 'hybrid'
    const currentSlide = activeSlides[projectIndex] || 'web' // Default to web instead of mobile
    const images = getProjectImages(project, isHybrid ? currentSlide : project.type)
    return images[0] || '/placeholder.svg'
  }

  const getProjectDescription = (project: any, projectIndex: number) => {
    if (project.type === 'hybrid') {
      const currentSlide = activeSlides[projectIndex] || 'web'
      return project[currentSlide].description
    }
    return project.description
  }

  const openProjectModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    setCurrentImageIndex(0)
    setSelectedVideoIndex(0)
  }

  const closeProjectModal = () => {
    if (videoRef.current) videoRef.current.pause()
    setIsModalOpen(false)
    setSelectedProject(null)
    setCurrentImageIndex(0)
    setSelectedVideoIndex(0)
  }

  const getProjectImages = (project: any, platform: 'mobile' | 'web') => {
    const imageMap: { [key: string]: string[] | { [key: string]: string[] } } = {
      'Multi-Currency Remittance System': [
        '/Multi-Currency Remittance System/Mobile/a.png',
        '/Multi-Currency Remittance System/Mobile/b.png',
        '/Multi-Currency Remittance System/Mobile/c.png',
        '/Multi-Currency Remittance System/Mobile/d.png',
        '/Multi-Currency Remittance System/Mobile/e.png',
        '/Multi-Currency Remittance System/Mobile/f.png'
      ],
      'Payrite Payroll System': [
        '/Payrite Payroll System/a.png',
        '/Payrite Payroll System/b.png',
        '/Payrite Payroll System/c.png',
        '/Payrite Payroll System/d.png',
        '/Payrite Payroll System/e.png',
        '/Payrite Payroll System/f.png'
      ],
      'Medical Reporting & Shift Scheduling Platform': {
        mobile: [
          '/Medical Reporting & Shift Scheduling Platform/Mobile/a.png',
          '/Medical Reporting & Shift Scheduling Platform/Mobile/b.png',
          '/Medical Reporting & Shift Scheduling Platform/Mobile/c.png',
          '/Medical Reporting & Shift Scheduling Platform/Mobile/d.png',
          '/Medical Reporting & Shift Scheduling Platform/Mobile/e.png',
          '/Medical Reporting & Shift Scheduling Platform/Mobile/f.png'
        ],
        web: [
          '/Medical Reporting & Shift Scheduling Platform/Web/a.png',
          '/Medical Reporting & Shift Scheduling Platform/Web/b.png'
        ]
      },
      'Rota and Leave Management System': {
        mobile: [
          '/Rota and Leave Management System/Mobile/a.png',
          '/Rota and Leave Management System/Mobile/b.png',
          '/Rota and Leave Management System/Mobile/c.png',
          '/Rota and Leave Management System/Mobile/d.png',
          '/Rota and Leave Management System/Mobile/e.png'
        ],
        web: [
          '/Rota and Leave Management System/Web/a.png',
          '/Rota and Leave Management System/Web/b.png'
        ]
      },
      'Local Remittance System': [
        '/Local Remittance System/a.png',
        '/Local Remittance System/b.png'
      ],
      'Blue Spotlight UK': [
        '/Blue Spotlight UK/a.png',
        '/Blue Spotlight UK/b.png',
        '/Blue Spotlight UK/c.png'
      ],
      'Fleet Management System': [
        '/Fleet Management System/a.png',
        '/Fleet Management System/b.png',
        '/Fleet Management System/c.png',
        '/Fleet Management System/d.png',
        '/Fleet Management System/e.png',
        '/Fleet Management System/f.png',
        '/Fleet Management System/g.png'
      ],
      'CMU Slate Student Orientation': [
        '/CMU Slate Student Documentation/a.png',
        '/CMU Slate Student Documentation/b.png',
        '/CMU Slate Student Documentation/c.png',
        '/CMU Slate Student Documentation/d.png',
        '/CMU Slate Student Documentation/e.png'
      ],
      'CMU Off-Campus Accommodation': [
        '/CMU Off-Campus Accomodation/a.png',
        '/CMU Off-Campus Accomodation/b.png',
        '/CMU Off-Campus Accomodation/c.png',
        '/CMU Off-Campus Accomodation/d.png'
      ],
      'CMU Student Perks': [
        '/CMU Student Perks/a.png',
        '/CMU Student Perks/b.png',
        '/CMU Student Perks/c.png',
        '/CMU Student Perks/d.png'
      ]
    }

    const images = imageMap[project.title]
    if (Array.isArray(images)) {
      return images
    } else if (images && typeof images === 'object') {
      return images[platform] || images.mobile || []
    }
    return [project.image || project.poster || '/placeholder.svg']
  }

  const nextImage = () => {
    if (!selectedProject) return
    const images = getProjectImages(selectedProject, selectedProject.type === 'hybrid' ? (activeSlides[projectsData.findIndex(p => p === selectedProject)] || 'mobile') : selectedProject.type)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    if (!selectedProject) return
    const images = getProjectImages(selectedProject, selectedProject.type === 'hybrid' ? (activeSlides[projectsData.findIndex(p => p === selectedProject)] || 'mobile') : selectedProject.type)
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const renderProjectCard = (project: any, index: number) => {
    const isHybrid = project.type === 'hybrid'
    const currentSlide = activeSlides[index] || 'mobile'
    const isVisible = visibleCards.includes(index)

  return (
            <Card
              key={index}
        ref={(el) => {
          cardRefs.current[index] = el
        }}
        className={`group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden hover:-translate-y-2 border-0 bg-card/60 backdrop-blur-sm cursor-pointer ${
          isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
        onClick={() => openProjectModal(project)}
            >
              <div className="relative overflow-hidden">
          {/* Project Image (static image on cards; videos play in modal only) */}
          <div className="relative">
            <img
              src={getProjectImage(project, index)}
              alt={project.title}
              className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-110"
            />
            
            {/* Platform Type Badge */}
            <div className="absolute top-4 left-4">
              <Badge 
                variant="secondary" 
                className={`${
                  project.type === 'mobile' 
                    ? 'bg-blue-500/20 text-blue-600 border-blue-500/30' 
                    : project.type === 'web'
                    ? 'bg-green-500/20 text-green-600 border-green-500/30'
                    : 'bg-purple-500/20 text-purple-600 border-purple-500/30'
                } backdrop-blur-sm`}
              >
                {project.type === 'mobile' && <PhoneIcon className="h-3 w-3 mr-1" />}
                {project.type === 'web' && <Monitor className="h-3 w-3 mr-1" />}
                {project.type === 'hybrid' && <Smartphone className="h-3 w-3 mr-1" />}
                {project.type === 'mobile' ? 'Mobile App' : project.type === 'web' ? 'Web App' : 'Mobile & Web'}
              </Badge>
            </div>

            {/* Slider Controls for Hybrid Projects */}
            {isHybrid && (
              <div className="absolute top-4 right-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Button
                  size="sm"
                  variant="outline"
                  className={`h-8 w-8 p-0 ${
                    currentSlide === 'mobile' 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-white/20 text-white border-white/30 hover:bg-white hover:text-black'
                  } transition-all duration-300`}
                  onClick={() => handleSlideChange(index, 'mobile')}
                >
                  <PhoneIcon className="h-4 w-4" />
                </Button>
                    <Button
                      size="sm"
                  variant="outline"
                  className={`h-8 w-8 p-0 ${
                    currentSlide === 'web' 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'bg-white/20 text-white border-white/30 hover:bg-white hover:text-black'
                  } transition-all duration-300`}
                  onClick={() => handleSlideChange(index, 'web')}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Image Count or Video Badge */}
            <div className="absolute bottom-4 right-4">
              <Badge 
                variant="secondary" 
                className="bg-black/60 text-white border-black/30 backdrop-blur-sm"
              >
                {hasVideos(project) ? (
                  <><Video className="h-3 w-3 mr-1" /> Video{project.videos.length > 1 ? 's' : ''}</>
                ) : (
                  `${getProjectImages(project, isHybrid ? currentSlide : project.type).length} images`
                )}
              </Badge>
            </div>

            {/* Video projects: play icon on hover to indicate video in modal */}
            {hasVideos(project) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors duration-300 pointer-events-none">
                <div className="rounded-full bg-white/90 p-4 shadow-xl scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <Play className="h-10 w-10 text-[#1A2E66] fill-[#1A2E66] ml-1" />
                </div>
              </div>
            )}

            {/* Click to view overlay (hidden for video projects - we show play instead) */}
            {!hasVideos(project) && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-2">
                    <ExternalLink className="h-6 w-6" />
                  </div>
                  <p className="font-semibold">View </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Project highlights overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-lg">Key Features</h4>
              <div className="flex flex-wrap gap-2">
                {project.highlights?.map((highlight: string, highlightIndex: number) => (
                  <Badge
                    key={highlightIndex}
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 hover:bg-white hover:text-black transition-all duration-300"
                  >
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Professional corner accent */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-[#1A2E66]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <CardHeader className="group-hover:bg-[#1A2E66]/5 transition-colors duration-300 p-4">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-xl group-hover:text-[#1A2E66] transition-colors duration-300 leading-tight">
              {project.title}
            </CardTitle>
            <Star className="h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>
          
          <CardDescription className="text-muted-foreground leading-relaxed text-base">
            {getProjectDescription(project, index)}
          </CardDescription>
          
          {/* Project metadata */}
          {(project.period || project.company) && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 pt-2 border-t border-border/50">
              {project.period && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{project.period}</span>
                </div>
              )}
              {project.company && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{project.company}</span>
                </div>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <h5 className="text-base font-bold text-foreground text-[#1A2E66]">Technologies Used</h5>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, techIndex: number) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-sm bg-[#1A2E66]/10 text-[#1A2E66] border-[#1A2E66]/30 hover:bg-[#1A2E66] hover:text-white hover:scale-110 transition-all duration-300 cursor-default font-medium px-3 py-1"
                  style={{ transitionDelay: `${techIndex * 50}ms` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            {/* Quick links on card - stop propagation so links open without triggering modal */}
            {(project.liveUrl || project.appStoreUrl || project.playStoreUrl) && (
              <div className="flex flex-wrap gap-2 pt-3 border-t border-border/50" onClick={(e) => e.stopPropagation()}>
                {project.liveUrl && (
                  <Button size="sm" asChild className="h-9 px-4 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#1A2E66] to-[#2A4A9A] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Monitor className="h-3.5 w-3 mr-1.5" />
                      Live
                    </a>
                  </Button>
                )}
                {project.appStoreUrl && (
                  <Button size="sm" variant="outline" asChild className="h-9 px-4 text-xs font-semibold rounded-xl border-2 border-[#1A2E66]/40 hover:bg-[#1A2E66] hover:text-white hover:border-[#1A2E66] hover:scale-105 hover:shadow-md transition-all duration-300">
                    <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer">
                      <Smartphone className="h-3.5 w-3 mr-1.5" />
                      App Store
                    </a>
                  </Button>
                )}
                {project.playStoreUrl && (
                  <Button size="sm" variant="outline" asChild className="h-9 px-4 text-xs font-semibold rounded-xl border-2 border-[#1A2E66]/40 hover:bg-[#1A2E66] hover:text-white hover:border-[#1A2E66] hover:scale-105 hover:shadow-md transition-all duration-300">
                    <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
                      <Smartphone className="h-3.5 w-3 mr-1.5" />
                      Play Store
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderProjectModal = () => {
    if (!selectedProject) return null

    const isHybrid = selectedProject.type === 'hybrid'
    const projectIndex = projectsData.findIndex(p => p === selectedProject)
    const currentSlide = activeSlides[projectIndex] || 'web'
    const images = getProjectImages(selectedProject, isHybrid ? currentSlide : selectedProject.type)
    const currentImage = images[currentImageIndex]

    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="!max-w-[95vw] !w-[95vw] max-h-[95vh] overflow-y-auto" style={{ maxWidth: '95vw', width: '95vw' }}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {selectedProject.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8 w-full">
            {/* Top Section - Project Images/Media or Video */}
            <div className="flex flex-col items-center w-full">
              {hasVideos(selectedProject) ? (
                <div className="w-full max-w-6xl space-y-6">
                  {/* Video tab switcher when multiple videos */}
                  {selectedProject.videos.length > 1 && (
                    <div className="flex justify-center">
                      <div className="inline-flex bg-muted/60 p-1.5 rounded-xl shadow-inner border border-border/50">
                        {selectedProject.videos.map((v: { label: string; src: string; type?: string }, i: number) => (
                          <Button
                            key={v.src}
                            size="lg"
                            variant={selectedVideoIndex === i ? "default" : "ghost"}
                            className={`rounded-lg font-medium transition-all duration-300 ${
                              selectedVideoIndex === i
                                ? "bg-gradient-to-r from-[#1A2E66] to-[#2A4A9A] text-white shadow-md"
                                : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                            }`}
                            onClick={() => {
                              if (videoRef.current) videoRef.current.pause()
                              setSelectedVideoIndex(i)
                            }}
                          >
                            {v.type === "mobile" && <PhoneIcon className="h-4 w-4 mr-2" />}
                            {v.type === "web" && <Monitor className="h-4 w-4 mr-2" />}
                            {v.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Video player - frameless, large, light background */}
                  {(() => {
                    const currentVideo = selectedProject.videos[selectedVideoIndex]
                    const isMobileVideo = currentVideo.type === "mobile"
                    return (
                      <div className="flex justify-center w-full">
                        <div
                          className={`flex items-center justify-center w-full rounded-xl overflow-hidden bg-muted/20 ${
                            isMobileVideo ? "max-w-[420px] max-h-[85vh]" : "max-w-6xl aspect-video max-h-[85vh]"
                          }`}
                        >
                          <video
                            ref={videoRef}
                            key={currentVideo.src}
                            src={encodeURI(currentVideo.src)}
                            controls
                            playsInline
                            preload="auto"
                            autoPlay
                            muted
                            loop
                            className={`w-full h-full object-contain ${
                              isMobileVideo ? "max-h-[85vh] aspect-[9/19]" : "aspect-video"
                            }`}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    )
                  })()}
                  <p className="text-center text-sm text-muted-foreground">
                    {selectedProject.videos[selectedVideoIndex].label}
                    <span className="block text-xs mt-1 text-muted-foreground/80">Videos autoplay muted — use controls to unmute</span>
                  </p>
                </div>
              ) : isHybrid ? (
                <div className="space-y-6 w-full">
                                     {/* Slider Controls */}
                   <div className="flex justify-center mb-8">
                     <div className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-200">
                       <Button
                         size="lg"
                         variant={currentSlide === 'mobile' ? 'default' : 'ghost'}
                         className={`${
                           currentSlide === 'mobile' 
                             ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                             : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                         } px-6 py-2 text-base font-medium rounded-xl transition-all duration-300`}
                         onClick={() => handleSlideChange(projectIndex, 'mobile')}
                       >
                         <PhoneIcon className="h-4 w-4 mr-2" />
                         Mobile App
                       </Button>
                       <Button
                         size="lg"
                         variant={currentSlide === 'web' ? 'default' : 'ghost'}
                         className={`${
                           currentSlide === 'web' 
                             ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg' 
                             : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                         } px-6 py-2 text-base font-medium rounded-xl transition-all duration-300`}
                         onClick={() => handleSlideChange(projectIndex, 'web')}
                       >
                         <Monitor className="h-4 w-4 mr-2" />
                         Web App
                       </Button>
                     </div>
                   </div>

                  {/* Device Frame with Image Gallery */}
                  <div className="flex justify-center">
                    {currentSlide === 'mobile' ? (
                      <div className="relative">
                        <div className="w-80 h-[700px] bg-black rounded-2xl p-1 shadow-lg">
                          <div className="w-full h-full rounded-xl overflow-hidden relative group">
                            <img
                              src={currentImage}
                              alt={`${selectedProject.title} - Mobile - Image ${currentImageIndex + 1}`}
                              className="w-full h-full object-cover object-center"
                            />
                            
                            {/* Image Navigation */}
                            {images.length > 1 && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="absolute top-4 left-4 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  onClick={prevImage}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="absolute top-4 right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  onClick={nextImage}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="absolute top-4 left-1/2 transform -translate-x-1/2 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                                >
                                  {isAutoRotating ? (
                                    <Pause className="h-4 w-4" />
                                  ) : (
                                    <Play className="h-4 w-4" />
                                  )}
                                </Button>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  {currentImageIndex + 1} / {images.length}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="w-full max-w-[900px] h-[450px] bg-gray-800 rounded-xl p-1 shadow-lg">
                          <div className="w-full h-full bg-white rounded overflow-hidden relative group">
                            <img
                              src={currentImage}
                              alt={`${selectedProject.title} - Web - Image ${currentImageIndex + 1}`}
                              className="w-full h-full object-contain"
                            />
                            
                            {/* Image Navigation */}
                            {images.length > 1 && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="absolute top-4 left-4 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  onClick={prevImage}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="absolute top-4 right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  onClick={nextImage}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="absolute top-4 left-1/2 transform -translate-x-1/2 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                                >
                                  {isAutoRotating ? (
                                    <Pause className="h-4 w-4" />
                                  ) : (
                                    <Play className="h-4 w-4" />
                                  )}
                                </Button>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  {currentImageIndex + 1} / {images.length}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image Thumbnails */}
                  {images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      {images.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'border-blue-500 scale-110' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  {selectedProject.type === 'mobile' ? (
                    <div className="relative">
                      <div className="w-80 h-[700px] bg-black rounded-2xl p-1 shadow-lg">
                        <div className="w-full h-full rounded-xl overflow-hidden relative group">
                          <img
                            src={currentImage}
                            alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover object-center"
                          />
                          
                          {/* Image Navigation */}
                          {images.length > 1 && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-4 left-4 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                onClick={prevImage}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-4 right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                onClick={nextImage}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-4 left-1/2 transform -translate-x-1/2 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                onClick={() => setIsAutoRotating(!isAutoRotating)}
                              >
                                {isAutoRotating ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {currentImageIndex + 1} / {images.length}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-full max-w-[900px] h-[450px] bg-gray-800 rounded-xl p-1 shadow-lg">
                        <div className="w-full h-full bg-white rounded overflow-hidden relative group">
                          <img
                            src={currentImage}
                            alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-contain"
                          />
                          
                          {/* Image Navigation */}
                          {images.length > 1 && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-4 left-4 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                onClick={prevImage}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-4 right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                onClick={nextImage}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-4 left-1/2 transform -translate-x-1/2 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                onClick={() => setIsAutoRotating(!isAutoRotating)}
                              >
                                {isAutoRotating ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {currentImageIndex + 1} / {images.length}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Thumbnails for Non-Hybrid Projects */}
                  {!isHybrid && images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      {images.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'border-blue-500 scale-110' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Section - Project Description */}
            <div className="w-full space-y-6 bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              {/* Project Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {hasVideos(selectedProject) && selectedProject.videos[selectedVideoIndex]?.type === "mobile" && selectedProject.mobile?.description
                      ? selectedProject.mobile.description
                      : hasVideos(selectedProject) && selectedProject.videos[selectedVideoIndex]?.type === "web" && selectedProject.web?.description
                        ? selectedProject.web.description
                        : isHybrid
                          ? selectedProject[currentSlide].description
                          : selectedProject.description}
                  </p>
                </div>

                {/* Project Metadata */}
                {(selectedProject.period || selectedProject.company) && (
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    {selectedProject.period && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedProject.period}</span>
                      </div>
                    )}
                    {selectedProject.company && (
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span>{selectedProject.company}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Key Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.highlights?.map((highlight: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all duration-300"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-gray-600" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-sm border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons - outstanding CTAs */}
                <div className="flex flex-wrap gap-4 pt-6">
                  {selectedProject.liveUrl && (
                    <Button asChild className="rounded-xl px-6 py-3 text-base font-semibold bg-gradient-to-r from-[#1A2E66] to-[#2A4A9A] text-white shadow-lg shadow-[#1A2E66]/25 hover:shadow-xl hover:shadow-[#1A2E66]/30 hover:scale-105 transition-all duration-300">
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.appStoreUrl && (
                    <Button variant="outline" asChild className="rounded-xl px-5 py-3 text-sm font-semibold border-2 border-[#1A2E66]/50 hover:bg-[#1A2E66] hover:text-white hover:border-[#1A2E66] hover:scale-105 hover:shadow-lg transition-all duration-300">
                      <a href={selectedProject.appStoreUrl} target="_blank" rel="noopener noreferrer">
                        <Smartphone className="h-4 w-4 mr-2" />
                        App Store
                      </a>
                    </Button>
                  )}
                  {selectedProject.playStoreUrl && (
                    <Button variant="outline" asChild className="rounded-xl px-5 py-3 text-sm font-semibold border-2 border-[#1A2E66]/50 hover:bg-[#1A2E66] hover:text-white hover:border-[#1A2E66] hover:scale-105 hover:shadow-lg transition-all duration-300">
                      <a href={selectedProject.playStoreUrl} target="_blank" rel="noopener noreferrer">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Play Store
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const content = (
    <>
      {!embedded && (
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 animate-fade-in-up">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
            A collection of projects that showcase my expertise in security engineering, full-stack development, and innovative solutions
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {projectsData.map((project, index) => renderProjectCard(project, index))}
      </div>

      {!embedded && (
        <div className="text-center mt-8">
          <Card className="inline-block p-5 bg-gradient-to-r from-[#1A2E66]/5 to-[#2A4A9A]/5 border border-[#1A2E66]/20">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-foreground mb-3">Interested in Working Together?</h3>
              <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                I'm always open to discussing new opportunities, security consulting, or collaborative projects.
                Let's create something secure and innovative together.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#1A2E66] to-[#2A4A9A] hover:from-[#2A4A9A] hover:to-[#1A2E66] hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#1A2E66]/30"
                asChild
              >
                <a href="#contact">Get In Touch</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )

  if (embedded) {
    return (
      <div className="mt-0">
        {content}
        {renderProjectModal()}
      </div>
    )
  }

  return (
    <section id="projects" className="py-12 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
      {renderProjectModal()}
    </section>
  )
}
