"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Table } from "lucide-react"
import { useCRM } from "../tasks/crmProvider"

interface ExportField {
  key: string
  label: string
  checked: boolean
}

export function DataExport() {
  const { tasks, leads, clients, services, investments } = useCRM()
  const [selectedModule, setSelectedModule] = useState("clients")
  const [exportFormat, setExportFormat] = useState("csv")
  const [dateRange, setDateRange] = useState("all")

  const [clientFields, setClientFields] = useState<ExportField[]>([
    { key: "name", label: "Name", checked: true },
    { key: "email", label: "Email", checked: true },
    { key: "phone", label: "Phone", checked: true },
    { key: "company", label: "Company", checked: true },
    { key: "industry", label: "Industry", checked: true },
    { key: "status", label: "Status", checked: true },
    { key: "totalValue", label: "Total Value", checked: true },
    { key: "address", label: "Address", checked: false },
    { key: "createdAt", label: "Created Date", checked: false },
  ])

  const [taskFields, setTaskFields] = useState<ExportField[]>([
    { key: "title", label: "Title", checked: true },
    { key: "description", label: "Description", checked: true },
    { key: "status", label: "Status", checked: true },
    { key: "priority", label: "Priority", checked: true },
    { key: "dueDate", label: "Due Date", checked: true },
    { key: "assignedUsers", label: "Assigned Users", checked: true },
    { key: "createdAt", label: "Created Date", checked: false },
    { key: "updatedAt", label: "Updated Date", checked: false },
  ])

  const [leadFields, setLeadFields] = useState<ExportField[]>([
    { key: "name", label: "Name", checked: true },
    { key: "email", label: "Email", checked: true },
    { key: "phone", label: "Phone", checked: true },
    { key: "company", label: "Company", checked: true },
    { key: "source", label: "Source", checked: true },
    { key: "status", label: "Status", checked: true },
    { key: "score", label: "Score", checked: true },
    { key: "notes", label: "Notes", checked: false },
    { key: "createdAt", label: "Created Date", checked: false },
  ])

  const [serviceFields, setServiceFields] = useState<ExportField[]>([
    { key: "name", label: "Service Name", checked: true },
    { key: "description", label: "Description", checked: true },
    { key: "category", label: "Category", checked: true },
    { key: "price", label: "Price", checked: true },
    { key: "duration", label: "Duration", checked: true },
    { key: "status", label: "Status", checked: true },
    { key: "createdAt", label: "Created Date", checked: false },
  ])

  const [investmentFields, setInvestmentFields] = useState<ExportField[]>([
    { key: "name", label: "Investment Name", checked: true },
    { key: "type", label: "Type", checked: true },
    { key: "amount", label: "Initial Amount", checked: true },
    { key: "currentValue", label: "Current Value", checked: true },
    { key: "returns", label: "Returns", checked: true },
    { key: "returnPercentage", label: "Return %", checked: true },
    { key: "status", label: "Status", checked: true },
    { key: "purchaseDate", label: "Purchase Date", checked: true },
  ])

  const getCurrentFields = () => {
    switch (selectedModule) {
      case "clients":
        return clientFields
      case "tasks":
        return taskFields
      case "leads":
        return leadFields
      case "services":
        return serviceFields
      case "investments":
        return investmentFields
      default:
        return []
    }
  }

  const setCurrentFields = (fields: ExportField[]) => {
    switch (selectedModule) {
      case "clients":
        setClientFields(fields)
        break
      case "tasks":
        setTaskFields(fields)
        break
      case "leads":
        setLeadFields(fields)
        break
      case "services":
        setServiceFields(fields)
        break
      case "investments":
        setInvestmentFields(fields)
        break
    }
  }

  const getCurrentData = () => {
    switch (selectedModule) {
      case "clients":
        return clients
      case "tasks":
        return tasks
      case "leads":
        return leads
      case "services":
        return services
      case "investments":
        return investments
      default:
        return []
    }
  }

  const toggleField = (key: string) => {
    const currentFields = getCurrentFields()
    const updatedFields = currentFields.map((field) =>
      field.key === key ? { ...field, checked: !field.checked } : field,
    )
    setCurrentFields(updatedFields)
  }

  const selectAllFields = () => {
    const currentFields = getCurrentFields()
    const updatedFields = currentFields.map((field) => ({ ...field, checked: true }))
    setCurrentFields(updatedFields)
  }

  const deselectAllFields = () => {
    const currentFields = getCurrentFields()
    const updatedFields = currentFields.map((field) => ({ ...field, checked: false }))
    setCurrentFields(updatedFields)
  }

  const exportToCSV = () => {
    const data = getCurrentData()
    const fields = getCurrentFields().filter((f) => f.checked)

    if (fields.length === 0) {
      alert("Please select at least one field to export")
      return
    }

    // Create CSV header
    const headers = fields.map((f) => f.label).join(",")

    // Create CSV rows
    const rows = data.map((item) => {
      return fields
        .map((field) => {
          let value = (item as any)[field.key]

          // Handle special cases
          if (Array.isArray(value)) {
            value = value.join("; ")
          } else if (typeof value === "object" && value !== null) {
            value = JSON.stringify(value)
          } else if (value === null || value === undefined) {
            value = ""
          }

          // Escape commas and quotes
          value = String(value).replace(/"/g, '""')
          if (value.includes(",") || value.includes('"') || value.includes("\n")) {
            value = `"${value}"`
          }

          return value
        })
        .join(",")
    })

    const csvContent = [headers, ...rows].join("\n")

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${selectedModule}-export-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToJSON = () => {
    const data = getCurrentData()
    const fields = getCurrentFields().filter((f) => f.checked)

    if (fields.length === 0) {
      alert("Please select at least one field to export")
      return
    }

    // Filter data to include only selected fields
    const filteredData = data.map((item) => {
      const filteredItem: any = {}
      fields.forEach((field) => {
        filteredItem[field.key] = (item as any)[field.key]
      })
      return filteredItem
    })

    const jsonContent = JSON.stringify(
      {
        module: selectedModule,
        exportDate: new Date().toISOString(),
        totalRecords: filteredData.length,
        data: filteredData,
      },
      null,
      2,
    )

    // Download file
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${selectedModule}-export-${new Date().toISOString().split("T")[0]}.json`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToPDF = () => {
    const data = getCurrentData()
    const fields = getCurrentFields().filter((f) => f.checked)

    if (fields.length === 0) {
      alert("Please select at least one field to export")
      return
    }

    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1)} Export</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; border-bottom: 2px solid #D3FF61; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #E8FF8A; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .export-info { margin-bottom: 20px; color: #666; }
        </style>
      </head>
      <body>
        <h1>${selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1)} Export Report</h1>
        <div class="export-info">
          <p>Export Date: ${new Date().toLocaleDateString()}</p>
          <p>Total Records: ${data.length}</p>
        </div>
        <table>
          <thead>
            <tr>
              ${fields.map((f) => `<th>${f.label}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (item) => `
              <tr>
                ${fields
                  .map((field) => {
                    let value = (item as any)[field.key]
                    if (Array.isArray(value)) {
                      value = value.join(", ")
                    } else if (typeof value === "object" && value !== null) {
                      value = JSON.stringify(value)
                    } else if (value === null || value === undefined) {
                      value = ""
                    }
                    return `<td>${String(value).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>`
                  })
                  .join("")}
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </body>
      </html>
    `

    // Open in new window for printing/saving as PDF
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
      }, 250)
    }
  }

  const handleExport = () => {
    switch (exportFormat) {
      case "csv":
        exportToCSV()
        break
      case "json":
        exportToJSON()
        break
      case "pdf":
        exportToPDF()
        break
      default:
        exportToCSV()
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "csv":
        return <Table size={16} />
      case "json":
        return <FileText size={16} />
      case "pdf":
        return <FileText size={16} />
      default:
        return <Download size={16} />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black mb-2">Data Export</h2>
        <p className="text-sm text-gray-600">Export your CRM data in various formats</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Export Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="module">Data Module</Label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clients">Clients ({clients.length})</SelectItem>
                  <SelectItem value="tasks">Tasks ({tasks.length})</SelectItem>
                  <SelectItem value="leads">Leads ({leads.length})</SelectItem>
                  <SelectItem value="services">Services ({services.length})</SelectItem>
                  <SelectItem value="investments">Investments ({investments.length})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="format">Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Comma Separated)</SelectItem>
                  <SelectItem value="json">JSON (JavaScript Object)</SelectItem>
                  <SelectItem value="pdf">PDF (Printable Report)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                  <SelectItem value="365">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleExport} className="w-full bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
              {getFormatIcon(exportFormat)}
              <span className="ml-2">Export {selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1)}</span>
            </Button>
          </CardContent>
        </Card>

        {/* Field Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Select Fields to Export</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAllFields}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={deselectAllFields}>
                  Deselect All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getCurrentFields().map((field) => (
                <div key={field.key} className="flex items-center space-x-2">
                  <Checkbox id={field.key} checked={field.checked} onCheckedChange={() => toggleField(field.key)} />
                  <Label
                    htmlFor={field.key}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Export Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            <p>
              Module:{" "}
              <span className="font-medium">{selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1)}</span>
            </p>
            <p>
              Format: <span className="font-medium">{exportFormat.toUpperCase()}</span>
            </p>
            <p>
              Records: <span className="font-medium">{getCurrentData().length}</span>
            </p>
            <p>
              Selected Fields: <span className="font-medium">{getCurrentFields().filter((f) => f.checked).length}</span>
            </p>
          </div>

          {getCurrentFields().filter((f) => f.checked).length > 0 && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium mb-2">Fields to be exported:</p>
              <div className="flex flex-wrap gap-2">
                {getCurrentFields()
                  .filter((f) => f.checked)
                  .map((field) => (
                    <span key={field.key} className="px-2 py-1 bg-[#D3FF61] text-black text-xs rounded">
                      {field.label}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
