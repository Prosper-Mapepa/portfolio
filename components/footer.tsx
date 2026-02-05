import { Linkedin, Mail, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#1A2E66] to-[#2A4A9A] bg-clip-text text-transparent">
              Prosper Mapepa
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Secure Software Engineer passionate about building secure, scalable solutions for the digital world.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="hover:scale-110 hover:rotate-12 hover:bg-[#1A2E66] hover:text-white transition-all duration-300 border-[#1A2E66]/30 hover:border-[#1A2E66]"
                asChild
              >
                <a href="https://linkedin.com/in/prosper-geek" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:scale-110 hover:rotate-12 hover:bg-[#1A2E66] hover:text-white transition-all duration-300 border-[#1A2E66]/30 hover:border-[#1A2E66]"
                asChild
              >
                <a href="mailto:mapep1p@cmich.edu">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  About Me
                </a>
              </li>
              <li>
                <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Experience
                </a>
              </li>
              {/* <li>
                <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Projects
                </a>
              </li> */}
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Services</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Secure Software Development</li>
              <li className="text-muted-foreground">Application Security</li>
              <li className="text-muted-foreground">FinTech Solutions</li>
              <li className="text-muted-foreground">Threat Modeling</li>
              
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Prosper Mapepa. All rights reserved.
            </p>
            {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>using Next.js & Tailwind CSS</span>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
