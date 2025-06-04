"use client"

import {
  CheckSquare,
  Users,
  Building2,
  Briefcase,
  BarChart3,
  LogOut,
  X,
  Home,
  Calendar,
  TrendingUp,
  Download,
  Bell,
  UserCheck,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useCRM } from "../crm-provider"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const { notifications, userRole } = useCRM()

  const unreadNotifications = notifications.filter((n) => !n.read).length

  // Define navigation item type
  type NavigationItem = {
    name: string
    href: string
    icon: React.ElementType
    badge?: number
  }

  // Define navigation based on user role
  const getNavigation = (): NavigationItem[] => {
    const commonNavItems: NavigationItem[] = [
      { name: "Dashboard", href: "/bussiness-head/", icon: Home },
      { name: "Tasks", href: "/bussiness-head/tasks", icon: CheckSquare },
      { name: "Calendar", href: "/bussiness-head/calendar", icon: Calendar },
    ]

    // Business head specific navigation
    if (userRole === "business_head") {
      return [
        ...commonNavItems,
        { name: "RM Heads", href: "/bussiness-head/rm-heads", icon: UserCheck },
        { name: "Leads", href: "/bussiness-head/leads", icon: Users },
        { name: "Clients", href: "/bussiness-head/clients", icon: Building2 },
        { name: "Services", href: "/bussiness-head/services", icon: Briefcase },
        { name: "Investments", href: "/bussiness-head/investments", icon: BarChart3 },
        { name: "Analytics", href: "/bussiness-head/analytics", icon: TrendingUp },
        { name: "Export", href: "/bussiness-head/export", icon: Download },
        { name: "Notifications", href: "/bussiness-head/notifications", icon: Bell, badge: unreadNotifications },
        { name: "Settings", href: "/bussiness-head/settings", icon: Settings },
      ]
    }

    // RM head specific navigation
    if (userRole === "rm_head") {
      return [
        ...commonNavItems,
        { name: "Team", href: "/team", icon: UserCheck },
        { name: "Leads", href: "/leads", icon: Users },
        { name: "Clients", href: "/clients", icon: Building2 },
        { name: "Services", href: "/services", icon: Briefcase },
        { name: "Analytics", href: "/analytics", icon: TrendingUp },
        { name: "Notifications", href: "/notifications", icon: Bell, badge: unreadNotifications },
      ]
    }

    // Default navigation for relationship managers
    return [
      ...commonNavItems,
      { name: "Leads", href: "/leads", icon: Users },
      { name: "Clients", href: "/clients", icon: Building2 },
      { name: "Services", href: "/services", icon: Briefcase },
      { name: "Notifications", href: "/notifications", icon: Bell, badge: unreadNotifications },
    ]
  }

  const navigation = getNavigation()

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[280px] sm:w-[240px] 
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        mt-0 lg:mt-[18px] ml-0 lg:ml-[20px] mb-0 lg:mb-[18px] 
        rounded-none lg:rounded-[24px] bg-white flex flex-col p-4 
        border-r border-white h-full lg:h-auto shadow-lg
      `}
    >
      {/* Mobile Close Button */}
      <Button variant="ghost" size="sm" className="lg:hidden self-end mb-4" onClick={() => setSidebarOpen(false)}>
        <X size={20} />
      </Button>

      {/* Logo */}
      <div className="mb-8 lg:mb-12 mt-4 lg:mt-8 pt-2 flex justify-center">
        <Image
          src="/finployee-logo.png"
          alt="Finployee"
          width={100}
          height={150}
          className="object-contain w-20 sm:w-24 lg:w-[100px]"
        />
      </div>

      {/* User Role Badge */}
      <div className="mb-6 px-4">
        <Badge className="w-full justify-center py-1.5 bg-[#D3FF61] text-black hover:bg-[#D3FF61] font-medium">
          {userRole === "business_head"
            ? "Business Head"
            : userRole === "rm_head"
              ? "RM Head"
              : userRole === "relationship_manager"
                ? "Relationship Manager"
                : "Admin"}
        </Badge>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-1 flex-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 lg:px-5 py-3 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive ? "bg-[#D3FF61] text-black shadow-sm" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
              {item.badge && item.badge > 0 && (
                <Badge className="ml-auto bg-red-500 text-white hover:bg-red-600">{item.badge}</Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <Button
        variant="ghost"
        className="flex items-center gap-3 justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-auto text-sm font-medium py-3"
        onClick={() => setSidebarOpen(false)}
      >
        <LogOut size={18} />
        Logout
      </Button>
    </aside>
  )
}
