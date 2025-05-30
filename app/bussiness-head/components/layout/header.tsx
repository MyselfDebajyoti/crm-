"use client"

import { Search, Menu, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useCRM } from "../crm-provider"
import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface HeaderProps {
  toggleSidebar: () => void
}

export function Header({ toggleSidebar }: HeaderProps) {
  const { notifications, markNotificationAsRead, userRole } = useCRM()
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  const unreadNotifications = notifications.filter((n) => !n.read).length
  const recentNotifications = notifications.slice(0, 5)

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id)
    setShowNotifications(false)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return "🔔"
      case "alert":
        return "⚠️"
      case "update":
        return "📊"
      case "system":
        return "🔧"
      default:
        return "📌"
    }
  }

  const getRoleName = () => {
    switch (userRole) {
      case "business_head":
        return "Business Head"
      case "rm_head":
        return "RM Head"
      case "relationship_manager":
        return "Relationship Manager"
      case "admin":
        return "Administrator"
      default:
        return "User"
    }
  }

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      {/* Mobile Menu Button and Search */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={toggleSidebar}>
          <Menu size={20} />
        </Button>

        {/* Search */}
        <div className="relative flex-1 sm:flex-none">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-[#D3FF61] rounded-full flex items-center justify-center">
            <Search size={14} className="text-black sm:w-4 sm:h-4" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400 w-full sm:w-64 lg:w-80 text-sm"
          />
        </div>
      </div>

      {/* Right Side: Notifications & User */}
      <div className="flex items-center gap-4 self-end sm:self-auto">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <Button
            variant="ghost"
            size="sm"
            className="relative rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                {unreadNotifications}
              </Badge>
            )}
          </Button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-3 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <Link
                    href="/notifications"
                    className="text-xs text-blue-600 hover:text-blue-800"
                    onClick={() => setShowNotifications(false)}
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {recentNotifications.length > 0 ? (
                  recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-lg">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                            <span className="text-xs text-gray-500">
                              {new Date(notification.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Command Center */}
        <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 shadow-sm">
          <div className="text-right">
            <div className="text-xs sm:text-sm font-semibold text-black">Command Center</div>
            <div className="text-xs text-gray-600 hidden sm:block">{getRoleName()}</div>
          </div>
          <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">👨‍💼</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
