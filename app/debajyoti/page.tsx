"use client"

import { ArrowUpRight, Search, CheckSquare, Users, Building2, Briefcase, BarChart3, LogOut } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/dashboard-ui/avatar"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDateTime = (date: Date) => {
    const day = date.getDate()
    const month = date.toLocaleDateString("en-GB", { month: "short" })
    const year = date.getFullYear()
    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    return `${day} ${month} ${year}\n${time}`
  }

  const dashboardData = [
    {
      number: "24",
      title: "Active Leads",
      description: "Leads in your pipeline requiring follow-up",
      percentage: 75,
      increase: "Increase",
    },
    {
      number: "12",
      title: "Tasks",
      description: "Tasks to complete this week",
      percentage: 75,
      increase: "Increase",
    },
    {
      number: "24",
      title: "Service requests",
      description: "Client service requests to resolve",
      percentage: 75,
      increase: "Increase",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F4FFD7] flex">
      {/* Sidebar */}
      <aside className="w-[200px] mt-[18px] ml-[20px] mb-[18px] rounded-[24px] bg-white flex flex-col p-4 border-r border-white ">
        {/* Logo */}
        <div className="mb-12 mt-12 pt-2 flex justify-center">
          <Image src="/finployee-logo.png" alt="Finployee" width={120} height={185} className="object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-1 flex-1">
          <Link
            href="#"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg bg-[#D3FF61] text-black font-medium text-xs"
          >
           
            <ArrowUpRight size={16} />
            Dashboard
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs"
          >
            <CheckSquare size={16} />
            Tasks
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs"
          >
            <Users size={16} />
            Leads
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs"
          >
            <Building2 size={16} />
            Clients
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs"
          >
            <Briefcase size={16} />
            Services
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs"
          >
            <BarChart3 size={16} />
            Invest
          </Link>
        </nav>

        {/* Logout */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-auto text-sm"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          {/* Search */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-[#D3FF61] rounded-full flex items-center justify-center">
              <Search size={16} className="text-black" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-12 pr-4 py-2.5 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400 w-80 text-sm"
            />
          </div>

          {/* Command Center */}
          <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
            <div className="text-right">
              <div className="text-sm font-semibold text-black">Command Center</div>
              <div className="text-xs text-gray-600">Executive Leadership</div>
            </div>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">👨‍💼</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Welcome Section and Date */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm text-gray-600 mb-1">Welcome back,</div>
            <h1 className="text-2xl font-bold text-black">Ram</h1>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-black whitespace-pre-line">{formatDateTime(currentTime)}</div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {dashboardData.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative">
              {/* Header with number and arrow */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-5xl font-bold text-black mb-1">{item.number}</h2>
                  <p className="text-sm font-semibold text-black">{item.title}</p>
                </div>
                <div className="w-10 h-10 bg-[#D3FF61] rounded-full flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-black" />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 mb-4">{item.description}</p>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Conversion rate</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-black">{item.percentage}%</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-green-600">{item.increase}</span>
                    <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Client Button */}
        <Button
          variant="outline"
          className="rounded-full px-6 py-2 border-2 border-black text-black hover:bg-black hover:text-white font-medium"
        >
          Add Client
        </Button>
      </main>
    </div>
  )
}
