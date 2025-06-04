"use client"

import { useState } from "react"
import { useCRM } from "../crm-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Download } from "lucide-react"
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

export function AnalyticsDashboard() {
  const { tasks, leads, clients, services, investments } = useCRM()
  const [timeRange, setTimeRange] = useState("30")
  const [selectedMetric, setSelectedMetric] = useState("all")

  // Calculate KPIs
  const totalClients = clients.length
  const activeClients = clients.filter((c) => c.status === "Active").length
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalValue, 0)
  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalInvestmentReturns = investments.reduce((sum, inv) => sum + inv.returns, 0)
  const avgReturnPercentage =
    investments.length > 0 ? investments.reduce((sum, inv) => sum + inv.returnPercentage, 0) / investments.length : 0

  const completedTasks = tasks.filter((t) => t.status === "Completed").length
  const taskCompletionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

  const qualifiedLeads = leads.filter((l) => l.status === "Qualified").length
  const convertedLeads = leads.filter((l) => l.status === "Converted").length
  const leadConversionRate = leads.length > 0 ? (convertedLeads / leads.length) * 100 : 0

  // Sample data for charts
  const monthlyRevenue = [
    { month: "Jan", revenue: 45000, clients: 12, leads: 25 },
    { month: "Feb", revenue: 52000, clients: 15, leads: 30 },
    { month: "Mar", revenue: 48000, clients: 14, leads: 28 },
    { month: "Apr", revenue: 61000, clients: 18, leads: 35 },
    { month: "May", revenue: 55000, clients: 16, leads: 32 },
    { month: "Jun", revenue: 67000, clients: 20, leads: 40 },
  ]

  const leadSourceData = [
    { name: "Website", value: 35, color: "#D3FF61" },
    { name: "Referral", value: 25, color: "#E8FF8A" },
    { name: "Social Media", value: 20, color: "#F0FFB3" },
    { name: "Email", value: 15, color: "#C5FF4A" },
    { name: "Other", value: 5, color: "#B8FF37" },
  ]

  const investmentPerformance = investments.map((inv) => ({
    name: inv.name,
    invested: inv.amount,
    current: inv.currentValue,
    returns: inv.returns,
    percentage: inv.returnPercentage,
  }))

  const taskStatusData = [
    { name: "To Do", value: tasks.filter((t) => t.status === "To Do").length, color: "#94A3B8" },
    { name: "In Progress", value: tasks.filter((t) => t.status === "In Progress").length, color: "#FCD34D" },
    { name: "Completed", value: tasks.filter((t) => t.status === "Completed").length, color: "#10B981" },
  ]

  const clientIndustryData = clients.reduce(
    (acc, client) => {
      const industry = client.industry || "Other"
      acc[industry] = (acc[industry] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const industryChartData = Object.entries(clientIndustryData).map(([industry, count], index) => ({
    name: industry,
    value: count,
    color: `hsl(${index * 45}, 70%, 60%)`,
  }))

  const exportAnalytics = () => {
    const analyticsData = {
      summary: {
        totalClients,
        activeClients,
        totalRevenue,
        taskCompletionRate,
        leadConversionRate,
        totalInvestmentValue,
        totalInvestmentReturns,
        avgReturnPercentage,
      },
      monthlyRevenue,
      leadSources: leadSourceData,
      investments: investmentPerformance,
      taskStatus: taskStatusData,
      clientIndustries: industryChartData,
      generatedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(analyticsData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-report-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Analytics Dashboard</h2>
          <p className="text-sm text-gray-600">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportAnalytics} variant="outline">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp size={12} className="mr-1" />
                +12.5% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp size={12} className="mr-1" />+{activeClients} active clients
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskCompletionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp size={12} className="mr-1" />
                {completedTasks} of {tasks.length} tasks
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investment Returns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgReturnPercentage.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              <span className={`flex items-center ${avgReturnPercentage >= 0 ? "text-green-600" : "text-red-600"}`}>
                {avgReturnPercentage >= 0 ? (
                  <TrendingUp size={12} className="mr-1" />
                ) : (
                  <TrendingDown size={12} className="mr-1" />
                )}
                ${totalInvestmentReturns.toLocaleString()} total returns
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#D3FF61" fill="#D3FF61" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investment Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={investmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="invested" fill="#E8FF8A" name="Invested" />
                <Bar dataKey="current" fill="#D3FF61" name="Current Value" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Client Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Clients</span>
              <Badge variant="secondary">{totalClients}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Clients</span>
              <Badge className="bg-green-100 text-green-800">{activeClients}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Prospects</span>
              <Badge className="bg-blue-100 text-blue-800">
                {clients.filter((c) => c.status === "Prospect").length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Client Value</span>
              <Badge variant="outline">${totalClients > 0 ? (totalRevenue / totalClients).toLocaleString() : 0}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Lead Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Leads</span>
              <Badge variant="secondary">{leads.length}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Qualified Leads</span>
              <Badge className="bg-green-100 text-green-800">{qualifiedLeads}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Conversion Rate</span>
              <Badge className="bg-purple-100 text-purple-800">{leadConversionRate.toFixed(1)}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Lead Score</span>
              <Badge variant="outline">
                {leads.length > 0 ? (leads.reduce((sum, l) => sum + l.score, 0) / leads.length).toFixed(0) : 0}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Service Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Service Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Services</span>
              <Badge variant="secondary">{services.length}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Services</span>
              <Badge className="bg-green-100 text-green-800">
                {services.filter((s) => s.status === "Active").length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Service Price</span>
              <Badge variant="outline">
                $
                {services.length > 0
                  ? (services.reduce((sum, s) => sum + s.price, 0) / services.length).toLocaleString()
                  : 0}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Categories</span>
              <Badge className="bg-blue-100 text-blue-800">{new Set(services.map((s) => s.category)).size}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
