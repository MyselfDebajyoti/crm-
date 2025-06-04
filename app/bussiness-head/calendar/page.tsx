"use client"

import { useState } from "react"
import { Sidebar } from "../components/layout/sidebar"
import { Header } from "../components/layout/header"
import { CalendarView } from "../components/calendar/calendar-view"

export default function CalendarPage() {
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

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Calendar</h1>
          <p className="text-sm text-gray-600">Schedule and manage events, meetings, and tasks</p>
        </div>

        {/* Calendar Component */}
        <CalendarView />
      </main>
    </div>
  )
}
