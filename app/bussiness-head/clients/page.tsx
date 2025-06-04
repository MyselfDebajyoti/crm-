"use client"

import { useState } from "react"
import { Sidebar } from "../components/layout/sidebar"
import { Header } from "../components/layout/header"
import { DataTable } from "../components/ui/data-table"
import { useCRM, type Client } from "../components/crm-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Building2 } from "lucide-react"
import { ClientForm } from "../components/forms/client-form"

export default function ClientsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const { clients, deleteClient } = useCRM()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setShowForm(true)
  }

  const handleDelete = (client: Client) => {
    if (confirm("Are you sure you want to delete this client?")) {
      deleteClient(client.id)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingClient(null)
  }

  const getStatusBadge = (status: Client["status"]) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-gray-100 text-gray-800",
      Prospect: "bg-blue-100 text-blue-800",
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
      key: "name" as keyof Client,
      label: "Name",
      sortable: true,
    },
    {
      key: "company" as keyof Client,
      label: "Company",
      sortable: true,
      render: (value: string, client: Client) => (
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-gray-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "industry" as keyof Client,
      label: "Industry",
      sortable: true,
    },
    {
      key: "email" as keyof Client,
      label: "Email",
      sortable: true,
    },
    {
      key: "status" as keyof Client,
      label: "Status",
      sortable: true,
      render: (value: Client["status"]) => getStatusBadge(value),
    },
    {
      key: "totalValue" as keyof Client,
      label: "Total Value",
      sortable: true,
      render: (value: number) => <span className="font-medium text-green-600">{formatCurrency(value)}</span>,
    },
    {
      key: "interactions" as keyof Client,
      label: "Interactions",
      render: (value: Client["interactions"]) => (
        <span className="text-sm text-gray-600">{value.length} interactions</span>
      ),
    },
    {
      key: "createdAt" as keyof Client,
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
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Client Management</h1>
            <p className="text-sm text-gray-600">Manage client relationships and track interactions</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
            <Plus size={16} className="mr-2" />
            Add Client
          </Button>
        </div>

        {/* Clients Table */}
        <DataTable
          data={clients}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Search clients..."
        />

        {/* Client Form Modal */}
        {showForm && <ClientForm client={editingClient} onClose={handleFormClose} />}
      </main>
    </div>
  )
}
