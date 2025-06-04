"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Search } from "lucide-react"

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, item: T) => React.ReactNode
  width?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onRowClick?: (item: T) => void
  searchable?: boolean
  searchPlaceholder?: string
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  onRowClick,
  searchable = true,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredData = data.filter(
    (item) =>
      searchTerm === "" ||
      Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Search */}
      {searchable && (
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base border-gray-300 focus:border-[#D3FF61] focus:ring-[#D3FF61]"
            />
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className="bg-gradient-to-r from-[#E8FF8A] to-[#F0FFB3] px-6 py-4 border-b border-gray-200">
        <div
          className="grid gap-6 text-sm font-semibold text-gray-800"
          style={{
            gridTemplateColumns: columns.map((col) => col.width || "1fr").join(" ") + " 120px",
          }}
        >
          {columns.map((column) => (
            <div key={String(column.key)} className="flex items-center gap-2">
              <span className="font-medium">{column.label}</span>
              {column.sortable && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-white/50"
                  onClick={() => handleSort(column.key)}
                >
                  <ArrowUpDown size={14} className="text-gray-600" />
                </Button>
              )}
            </div>
          ))}
          <div className="font-medium text-center">Actions</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
        {sortedData.map((item, index) => (
          <div
            key={item.id}
            className={`px-6 py-4 hover:bg-gray-50 transition-colors duration-150 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
            } ${onRowClick ? "cursor-pointer" : ""}`}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
          >
            <div
              className="grid gap-6 items-center text-sm"
              style={{
                gridTemplateColumns: columns.map((col) => col.width || "1fr").join(" ") + " 120px",
              }}
            >
              {columns.map((column) => (
                <div key={String(column.key)} className="text-gray-700 font-medium">
                  {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                </div>
              ))}
              <div className="flex items-center justify-center gap-2">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(item)
                    }}
                    className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                  >
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(item)
                    }}
                    className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedData.length === 0 && (
        <div className="p-12 text-center">
          <div className="text-gray-400 text-lg mb-2">No data found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search criteria</div>
        </div>
      )}
    </div>
  )
}
