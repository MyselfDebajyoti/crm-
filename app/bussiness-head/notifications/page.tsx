"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { useCRM, type Notification } from "@/components/crm-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Check, Trash2, AlertTriangle, BarChartIcon as ChartBar, Settings } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { notifications, markNotificationAsRead, deleteNotification } = useCRM()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id)
  }

  const handleDelete = (id: string) => {
    deleteNotification(id)
  }

  const handleMarkAllAsRead = () => {
    notifications.forEach((notification) => {
      if (!notification.read) {
        markNotificationAsRead(notification.id)
      }
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Bell className="h-5 w-5 text-blue-500" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "update":
        return <ChartBar className="h-5 w-5 text-green-500" />
      case "system":
        return <Settings className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getRelatedLink = (notification: Notification) => {
    if (!notification.relatedTo) return null

    switch (notification.relatedTo.type) {
      case "task":
        return `/tasks?id=${notification.relatedTo.id}`
      case "lead":
        return `/leads?id=${notification.relatedTo.id}`
      case "client":
        return `/clients?id=${notification.relatedTo.id}`
      case "rm":
        return `/rm-heads?id=${notification.relatedTo.id}`
      case "service":
        return `/services?id=${notification.relatedTo.id}`
      default:
        return null
    }
  }

  // Group notifications by date
  const groupedNotifications = notifications.reduce(
    (groups, notification) => {
      const date = new Date(notification.date).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(notification)
      return groups
    },
    {} as Record<string, Notification[]>,
  )

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedNotifications).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  const unreadCount = notifications.filter((n) => !n.read).length

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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Notifications</h1>
            <p className="text-sm text-gray-600">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "All notifications are read"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead} variant="outline" className="flex items-center gap-2">
              <Check size={16} />
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedDates.length > 0 ? (
              sortedDates.map((date) => (
                <div key={date} className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">{date}</h3>
                  <div className="space-y-3">
                    {groupedNotifications[date].map((notification) => {
                      const relatedLink = getRelatedLink(notification)
                      return (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border ${notification.read ? "bg-white" : "bg-blue-50 border-blue-100"}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                  {relatedLink && (
                                    <Link
                                      href={relatedLink}
                                      className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
                                    >
                                      View details
                                    </Link>
                                  )}
                                </div>
                                <Badge
                                  className={`${
                                    notification.type === "reminder"
                                      ? "bg-blue-100 text-blue-800"
                                      : notification.type === "alert"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : notification.type === "update"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-purple-100 text-purple-800"
                                  }`}
                                >
                                  {notification.type}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center mt-3">
                                <span className="text-xs text-gray-500">
                                  {new Date(notification.date).toLocaleTimeString()}
                                </span>
                                <div className="flex items-center gap-2">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleMarkAsRead(notification.id)}
                                      className="h-8 px-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                    >
                                      <Check size={16} className="mr-1" />
                                      Mark as read
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(notification.id)}
                                    className="h-8 px-2 text-red-600 hover:text-red-800 hover:bg-red-50"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
                <p className="text-gray-500 mt-1">You're all caught up!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
