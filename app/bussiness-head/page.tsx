"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./components/layout/sidebar"
import { Header } from "./components/layout/header"
import { useCRM } from "./components/crm-provider"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, CheckSquare, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { tasks, leads, clients, services, rmHeads, userRole } = useCRM()

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

  const formatDateTimeMobile = (date: Date) => {
    const day = date.getDate()
    const month = date.toLocaleDateString("en-GB", { month: "short" })
    const year = date.getFullYear()
    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
    return `${day} ${month} ${year} ${time}`
  }

  // Calculate metrics
  const activeTasks = tasks.filter((t) => t.status !== "Completed").length
  const qualifiedLeads = leads.filter((l) => l.status === "Qualified").length
  const activeClients = clients.filter((c) => c.status === "Active").length
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalValue, 0)
  const totalRmHeads = rmHeads.length
  const totalTeamMembers = rmHeads.reduce((sum, rm) => sum + rm.team.length, 0)
  const avgTargetAchievement = rmHeads.reduce((sum, rm) => sum + rm.performance.targetAchievement, 0) / rmHeads.length

  // Calculate lead conversion rate
  const convertedLeads = leads.filter((l) => l.status === "Converted").length
  const leadConversionRate = leads.length > 0 ? (convertedLeads / leads.length) * 100 : 0

  // Calculate client satisfaction
  const avgClientSatisfaction =
    clients.reduce((sum, client) => sum + (client.satisfactionScore || 0), 0) / clients.length

  const kpiMetrics = [
    {
      title: "Total Revenue",
      value: `$${(totalRevenue / 1000).toFixed(0)}K`,
      change: "+8.2% from last month",
      trend: "up",
      color: "green",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Active Clients",
      value: activeClients.toString(),
      change: "+2.1% from last month",
      trend: "up",
      color: "green",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "Lead Conversion",
      value: `${leadConversionRate.toFixed(1)}%`,
      change: "+5.3% from last month",
      trend: "up",
      color: "green",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Target Achievement",
      value: `${avgTargetAchievement.toFixed(0)}%`,
      change: "-1.2% from last month",
      trend: "down",
      color: "red",
      icon: <CheckSquare className="h-5 w-5" />,
    },
  ]

  // Sample data for charts
  const revenueData = [
    { month: "Jan", revenue: 450000, target: 400000 },
    { month: "Feb", revenue: 520000, target: 450000 },
    { month: "Mar", revenue: 480000, target: 500000 },
    { month: "Apr", revenue: 610000, target: 550000 },
    { month: "May", revenue: 550000, target: 600000 },
    { month: "Jun", revenue: 670000, target: 650000 },
  ]

  const leadSourceData = [
    { name: "Website", value: 35, color: "#D3FF61" },
    { name: "Referral", value: 25, color: "#E8FF8A" },
    { name: "Social Media", value: 20, color: "#F0FFB3" },
    { name: "Email", value: 15, color: "#C5FF4A" },
    { name: "Other", value: 5, color: "#B8FF37" },
  ]

  const rmPerformanceData = rmHeads.map((rm) => ({
    name: rm.name.split(" ")[0],
    revenue: rm.performance.revenue / 1000, // Convert to K
    clients: rm.performance.clientsAcquired,
    leads: rm.performance.leadsConverted,
    target: rm.performance.targetAchievement,
  }))

  const servicePerformanceData = services.map((service) => ({
    name: service.name,
    revenue: service.performance?.revenue || 0,
    clients: service.performance?.clientCount || 0,
    satisfaction: service.performance?.satisfactionScore || 0,
  }))

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
      <main className="flex-1 p-4 sm:p-6 lg:pl-8 space-y-6 max-w-7xl">
        <Header toggleSidebar={toggleSidebar} />

        {/* Welcome Section and Date */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Welcome back,</div>
            <h1 className="text-xl sm:text-2xl font-bold text-black">Business Head Dashboard</h1>
          </div>

          <div className="text-right">
            <div className="text-sm sm:text-lg font-bold text-black">
              <span className="sm:hidden">{formatDateTimeMobile(currentTime)}</span>
              <span className="hidden sm:block whitespace-pre-line">{formatDateTime(currentTime)}</span>
            </div>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiMetrics.map((metric, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <div className="w-8 h-8 bg-[#D3FF61] rounded-full flex items-center justify-center">{metric.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-black mb-1">{metric.value}</div>
                <div
                  className={`text-xs ${metric.color === "green" ? "text-green-600" : "text-red-600"} flex items-center`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpRight size={14} className="mr-1" />
                  ) : (
                    <ArrowDownRight size={14} className="mr-1" />
                  )}
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* RM Heads Performance */}
        {userRole === "business_head" && (
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">RM Heads Performance</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                  <a href="/rm-heads">View All</a>
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                {totalRmHeads} RM Heads managing {totalTeamMembers} team members
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rmPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "revenue") return [`$${value}K`, "Revenue"]
                        if (name === "target") return [`${value}%`, "Target Achievement"]
                        return [value, name]
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Revenue ($K)" fill="#D3FF61" />
                    <Bar yAxisId="left" dataKey="clients" name="Clients Acquired" fill="#82ca9d" />
                    <Bar yAxisId="left" dataKey="leads" name="Leads Converted" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="target" name="Target Achievement (%)" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Revenue vs Target</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, "Amount"]} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Actual Revenue"
                      stroke="#D3FF61"
                      fill="#D3FF61"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      name="Target Revenue"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Lead Sources */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} leads`, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Performance */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Service Performance</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                <a href="/services">View All</a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={servicePerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "revenue") return [`$${(value as number).toLocaleString()}`, "Revenue"]
                      if (name === "satisfaction") return [`${value}/10`, "Satisfaction"]
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#D3FF61" />
                  <Bar yAxisId="left" dataKey="clients" name="Clients" fill="#82ca9d" />
                  <Bar yAxisId="right" dataKey="satisfaction" name="Satisfaction Score" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Section: Quick Stats and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <Card className="border-none shadow-md lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Client Satisfaction</span>
                <div className="flex items-center">
                  <span className="font-medium text-black mr-2">{avgClientSatisfaction.toFixed(1)}/10</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(avgClientSatisfaction / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Lead Conversion Rate</span>
                <div className="flex items-center">
                  <span className="font-medium text-black mr-2">{leadConversionRate.toFixed(1)}%</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${leadConversionRate}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Task Completion</span>
                <div className="flex items-center">
                  <span className="font-medium text-black mr-2">
                    {tasks.filter((t) => t.status === "Completed").length}/{tasks.length}
                  </span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{
                        width: `${tasks.length > 0 ? (tasks.filter((t) => t.status === "Completed").length / tasks.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Team Performance</span>
                <div className="flex items-center">
                  <span className="font-medium text-black mr-2">{avgTargetAchievement.toFixed(0)}%</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${Math.min(avgTargetAchievement, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="border-none shadow-md lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">Upcoming Tasks</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                  <a href="/tasks">View All</a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks
                  .filter((task) => task.status !== "Completed")
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .slice(0, 3)
                  .map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div
                        className={`w-1 self-stretch rounded-full ${
                          task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-black">{task.title}</h3>
                          <Badge
                            className={`${
                              task.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            {task.assignedUsers.slice(0, 2).map((user, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center -ml-1 first:ml-0 text-xs font-medium text-blue-600 border border-white"
                              >
                                {user.charAt(0)}
                              </div>
                            ))}
                            {task.assignedUsers.length > 2 && (
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center -ml-1 text-xs font-medium text-gray-600 border border-white">
                                +{task.assignedUsers.length - 2}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {tasks.filter((task) => task.status !== "Completed").length === 0 && (
                  <div className="text-center py-6 text-gray-500">No upcoming tasks</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
