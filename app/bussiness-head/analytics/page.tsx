"use client"

import { useState } from "react"
import { Sidebar } from "../components/layout/sidebar"
import { Header } from "../components/layout/header"
import { AnalyticsDashboard } from "../components/analytics/analytics-dashboard"

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-[#F4FFD7] flex relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:pl-8 max-w-7xl">
        <Header toggleSidebar={toggleSidebar} />

        {/* Analytics Dashboard */}
        <AnalyticsDashboard />
      </main>
    </div>
  )
}
