"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DataTable } from "@/components/ui/data-table"
import { useCRM, type Lead } from "@/components/crm-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Star } from "lucide-react"
import { LeadForm } from "@/components/forms/lead-form"

export default function LeadsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const { leads, deleteLead } = useCRM()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead)
    setShowForm(true)
  }

  const handleDelete = (lead: Lead) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      deleteLead(lead.id)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingLead(null)
  }

  const getStatusBadge = (status: Lead["status"]) => {
    const colors = {
      New: "bg-blue-100 text-blue-800",
      Qualified: "bg-green-100 text-green-800",
      Contacted: "bg-yellow-100 text-yellow-800",
      Converted: "bg-purple-100 text-purple-800",
      Lost: "bg-red-100 text-red-800",
    }
    return <Badge className={colors[status]}>{status}</Badge>
  }

  const getScoreDisplay = (score: number) => {
    const stars = Math.floor(score / 20)
    return (
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium">{score}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={i < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
          ))}
        </div>
      </div>
    )
  }

  const columns = [
    {
      key: "name" as keyof Lead,
      label: "Name",
      sortable: true,
    },
    {
      key: "email" as keyof Lead,
      label: "Email",
      sortable: true,
    },
    {
      key: "company" as keyof Lead,
      label: "Company",
      sortable: true,
    },
    {
      key: "source" as keyof Lead,
      label: "Source",
      sortable: true,
    },
    {
      key: "status" as keyof Lead,
      label: "Status",
      sortable: true,
      render: (value: Lead["status"]) => getStatusBadge(value),
    },
    {
      key: "score" as keyof Lead,
      label: "Score",
      sortable: true,
      render: (value: number) => getScoreDisplay(value),
    },
    {
      key: "createdAt" as keyof Lead,
      label: "Created",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
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
      <main className="flex-1 p-4 sm:p-6 lg:pl-8 max-w-6xl">
        <Header toggleSidebar={toggleSidebar} />

        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Lead Management</h1>
            <p className="text-sm text-gray-600">Track and manage potential customers</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
            <Plus size={16} className="mr-2" />
            Add Lead
          </Button>
        </div>

        {/* Leads Table */}
        <DataTable
          data={leads}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Search leads..."
        />

        {/* Lead Form Modal */}
        {showForm && <LeadForm lead={editingLead} onClose={handleFormClose} />}
      </main>
    </div>
  )
}
