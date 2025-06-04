"use client"

import { useState } from "react"
import { Sidebar } from "../components/layout/sidebar"
import { Header } from "../components/layout/header"
import { DataTable } from "../components/ui/data-table"
import { useCRM, type Service } from "../components/crm-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Briefcase } from "lucide-react"
import { ServiceForm } from "../components/forms/service-form"

export default function ServicesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const { services, deleteService } = useCRM()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setShowForm(true)
  }

  const handleDelete = (service: Service) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteService(service.id)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingService(null)
  }

  const getStatusBadge = (status: Service["status"]) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-gray-100 text-gray-800",
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
      key: "name" as keyof Service,
      label: "Service Name",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-gray-400" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "description" as keyof Service,
      label: "Description",
      render: (value: string) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      ),
    },
    {
      key: "category" as keyof Service,
      label: "Category",
      sortable: true,
    },
    {
      key: "price" as keyof Service,
      label: "Price",
      sortable: true,
      render: (value: number) => <span className="font-medium text-green-600">{formatCurrency(value)}</span>,
    },
    {
      key: "duration" as keyof Service,
      label: "Duration",
      sortable: true,
    },
    {
      key: "status" as keyof Service,
      label: "Status",
      sortable: true,
      render: (value: Service["status"]) => getStatusBadge(value),
    },
    {
      key: "createdAt" as keyof Service,
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
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Service Management</h1>
            <p className="text-sm text-gray-600">Manage service offerings and pricing</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
            <Plus size={16} className="mr-2" />
            Add Service
          </Button>
        </div>

        {/* Services Table */}
        <DataTable
          data={services}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Search services..."
        />

        {/* Service Form Modal */}
        {showForm && <ServiceForm service={editingService} onClose={handleFormClose} />}
      </main>
    </div>
  )
}
