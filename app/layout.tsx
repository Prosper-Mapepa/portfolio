import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Prosper Mapepa | Application Security Engineer",
  description: "Application Security Engineer with 7+ years experience in secure full-stack development, cybersecurity, and FinTech solutions. Specializing in blockchain integration, threat modeling, and secure SDLC practices.",
  keywords: ["Application Security Engineer", "Cybersecurity", "Full-Stack Development", "Blockchain", "FinTech", "React", "Node.js", "Security Engineering"],
  authors: [{ name: "Prosper Mapepa" }],
  creator: "Prosper Mapepa",
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    title: "Prosper Mapepa | Application Security Engineer",
    description: "Application Security Engineer with 7+ years experience in secure full-stack development and cybersecurity",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prosper Mapepa | Application Security Engineer",
    description: "Application Security Engineer with 7+ years experience in secure full-stack development and cybersecurity",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
