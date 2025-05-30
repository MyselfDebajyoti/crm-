"use client"

import { useState } from "react"
import { Sidebar } from "../components/layout/sidebar"
import { Header } from "../components/layout/header"
import { DataTable } from "../components/ui/data-table"
import { useCRM, type RmHead } from "../components/crm-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, TrendingUp, Phone } from "lucide-react"
import { RmHeadForm } from "../components/forms/rm-head-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function RmHeadsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingRmHead, setEditingRmHead] = useState<RmHead | null>(null)
  const [selectedRmHead, setSelectedRmHead] = useState<RmHead | null>(null)
  const { rmHeads, deleteRmHead } = useCRM()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleEdit = (rmHead: RmHead) => {
    setEditingRmHead(rmHead)
    setShowForm(true)
  }

  const handleDelete = (rmHead: RmHead) => {
    if (confirm("Are you sure you want to delete this RM Head?")) {
      deleteRmHead(rmHead.id)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingRmHead(null)
  }

  const handleViewDetails = (rmHead: RmHead) => {
    setSelectedRmHead(rmHead)
  }

  const getStatusBadge = (status: RmHead["status"]) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      "On Leave": "bg-yellow-100 text-yellow-800",
      Inactive: "bg-red-100 text-red-800",
    }
    return <Badge className={colors[status]}>{status}</Badge>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const columns = [
    {
      key: "name" as keyof RmHead,
      label: "Name",
      sortable: true,
    },
    {
      key: "department" as keyof RmHead,
      label: "Department",
      sortable: true,
    },
    {
      key: "team" as keyof RmHead,
      label: "Team Size",
      render: (value: string[]) => <span>{value.length} members</span>,
    },
    {
      key: "performance" as keyof RmHead,
      label: "Revenue",
      render: (value: RmHead["performance"]) => <span className="font-medium">{formatCurrency(value.revenue)}</span>,
    },
    {
      key: "performance" as keyof RmHead,
      label: "Target",
      render: (value: RmHead["performance"]) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${value.targetAchievement >= 100 ? "bg-green-500" : "bg-yellow-500"}`}
              style={{ width: `${Math.min(value.targetAchievement, 100)}%` }}
            />
          </div>
          <span className="text-sm">{value.targetAchievement}%</span>
        </div>
      ),
    },
    {
      key: "status" as keyof RmHead,
      label: "Status",
      sortable: true,
      render: (value: RmHead["status"]) => getStatusBadge(value),
    },
    {
      key: "joinDate" as keyof RmHead,
      label: "Join Date",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ]

  // Performance data for charts
  const getPerformanceData = (rmHead: RmHead) => [
    {
      name: "Clients Acquired",
      value: rmHead.performance.clientsAcquired,
      fill: "#D3FF61",
    },
    {
      name: "Leads Converted",
      value: rmHead.performance.leadsConverted,
      fill: "#82ca9d",
    },
    {
      name: "Target Achievement",
      value: rmHead.performance.targetAchievement,
      fill: "#8884d8",
    },
  ]

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
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">RM Heads Management</h1>
            <p className="text-sm text-gray-600">Monitor and manage relationship manager heads</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
            <Plus size={16} className="mr-2" />
            Add RM Head
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total RM Heads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rmHeads.length}</div>
              <p className="text-xs text-muted-foreground">
                Managing {rmHeads.reduce((sum, rm) => sum + rm.team.length, 0)} team members
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(rmHeads.reduce((sum, rm) => sum + rm.performance.revenue, 0))}
              </div>
              <p className="text-xs text-muted-foreground">From all RM heads</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Target Achievement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {rmHeads.length > 0
                  ? `${(rmHeads.reduce((sum, rm) => sum + rm.performance.targetAchievement, 0) / rmHeads.length).toFixed(1)}%`
                  : "0%"}
              </div>
              <p className="text-xs text-muted-foreground">Average across all RM heads</p>
            </CardContent>
          </Card>
        </div>

        {/* RM Heads Table */}
        <DataTable
          data={rmHeads}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Search RM heads..."
          onRowClick={handleViewDetails}
        />

        {/* RM Head Details */}
        {selectedRmHead && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-black">{selectedRmHead.name}</h2>
                <p className="text-sm text-gray-600">{selectedRmHead.department}</p>
              </div>
              <Badge className={getStatusBadge(selectedRmHead.status).props.className}>{selectedRmHead.status}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{selectedRmHead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>{selectedRmHead.email}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-4">Team Members</h3>
                <div className="grid grid-cols-1 gap-2">
                  {selectedRmHead.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {member.charAt(0)}
                      </div>
                      <span>{member}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getPerformanceData(selectedRmHead)} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Value" fill="#D3FF61" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Revenue</div>
                    <div className="text-xl font-bold">{formatCurrency(selectedRmHead.performance.revenue)}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Target Achievement</div>
                    <div className="text-xl font-bold">{selectedRmHead.performance.targetAchievement}%</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Clients Acquired</div>
                    <div className="text-xl font-bold">{selectedRmHead.performance.clientsAcquired}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Leads Converted</div>
                    <div className="text-xl font-bold">{selectedRmHead.performance.leadsConverted}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedRmHead(null)} className="mr-2">
                Close
              </Button>
              <Button onClick={() => handleEdit(selectedRmHead)} className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
                Edit
              </Button>
            </div>
          </div>
        )}

        {/* RM Head Form Modal */}
        {showForm && <RmHeadForm rmHead={editingRmHead} onClose={handleFormClose} />}
      </main>
    </div>
  )
}
