"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DataTable } from "@/components/ui/data-table"
import { useCRM, type Investment } from "@/components/crm-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, TrendingUp, TrendingDown } from "lucide-react"
import { InvestmentForm } from "@/components/forms/investment-form"

export default function InvestmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null)
  const { investments, deleteInvestment } = useCRM()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment)
    setShowForm(true)
  }

  const handleDelete = (investment: Investment) => {
    if (confirm("Are you sure you want to delete this investment?")) {
      deleteInvestment(investment.id)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingInvestment(null)
  }

  const getStatusBadge = (status: Investment["status"]) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Sold: "bg-gray-100 text-gray-800",
      Pending: "bg-yellow-100 text-yellow-800",
    }
    return <Badge className={colors[status]}>{status}</Badge>
  }

  const getTypeBadge = (type: Investment["type"]) => {
    const colors = {
      Equity: "bg-blue-100 text-blue-800",
      "Mutual Fund": "bg-purple-100 text-purple-800",
      Bond: "bg-green-100 text-green-800",
      "Real Estate": "bg-orange-100 text-orange-800",
      Crypto: "bg-yellow-100 text-yellow-800",
    }
    return <Badge className={colors[type]}>{type}</Badge>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getReturnDisplay = (returns: number, percentage: number) => {
    const isPositive = returns >= 0
    return (
      <div className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <div className="text-right">
          <div className="font-medium">{formatCurrency(returns)}</div>
          <div className="text-xs">({percentage.toFixed(1)}%)</div>
        </div>
      </div>
    )
  }

  const columns = [
    {
      key: "name" as keyof Investment,
      label: "Investment Name",
      sortable: true,
    },
    {
      key: "type" as keyof Investment,
      label: "Type",
      sortable: true,
      render: (value: Investment["type"]) => getTypeBadge(value),
    },
    {
      key: "amount" as keyof Investment,
      label: "Initial Amount",
      sortable: true,
      render: (value: number) => formatCurrency(value),
    },
    {
      key: "currentValue" as keyof Investment,
      label: "Current Value",
      sortable: true,
      render: (value: number) => <span className="font-medium">{formatCurrency(value)}</span>,
    },
    {
      key: "returns" as keyof Investment,
      label: "Returns",
      sortable: true,
      render: (value: number, investment: Investment) => getReturnDisplay(value, investment.returnPercentage),
    },
    {
      key: "status" as keyof Investment,
      label: "Status",
      sortable: true,
      render: (value: Investment["status"]) => getStatusBadge(value),
    },
    {
      key: "purchaseDate" as keyof Investment,
      label: "Purchase Date",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ]

  // Calculate portfolio summary
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalReturns = investments.reduce((sum, inv) => sum + inv.returns, 0)
  const overallReturnPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0

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
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Investment Portfolio</h1>
            <p className="text-sm text-gray-600">Track and manage investment performance</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
            <Plus size={16} className="mr-2" />
            Add Investment
          </Button>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Invested</h3>
            <p className="text-2xl font-bold text-black">{formatCurrency(totalInvested)}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Current Value</h3>
            <p className="text-2xl font-bold text-black">{formatCurrency(totalCurrentValue)}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Returns</h3>
            <p className={`text-2xl font-bold ${totalReturns >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(totalReturns)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Overall Return</h3>
            <p className={`text-2xl font-bold ${overallReturnPercentage >= 0 ? "text-green-600" : "text-red-600"}`}>
              {overallReturnPercentage.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Investments Table */}
        <DataTable
          data={investments}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Search investments..."
        />

        {/* Investment Form Modal */}
        {showForm && <InvestmentForm investment={editingInvestment} onClose={handleFormClose} />}
      </main>
    </div>
  )
}
