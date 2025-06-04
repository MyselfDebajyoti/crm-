import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CRMProvider } from "./components/crm-provider"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Executive CRM - Comprehensive Management System",
  description: "Advanced CRM system for top management and CEOs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <CRMProvider>
            <div className="min-h-screen bg-gradient-to-b from-lime-50 to-lime-100">{children}</div>
          </CRMProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
