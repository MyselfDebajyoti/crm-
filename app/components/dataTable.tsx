"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search } from "lucide-react";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  searchable = true,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredData = data.filter(
    (item) =>
      searchTerm === "" ||
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <>
      <div className=" rounded-2xl  overflow-hidden">
        {searchable && (
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-[#D3FF61] rounded-full flex items-center justify-center">
                <Search size={18} className="text-black" />
              </div>
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12  rounded-2xl  bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400  text-sm font-helvetica-light text-black"
              />
            </div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl shadow-sm  overflow-hidden">
        {/* Search */}

        {/* Table Header */}
        <div className="bg-[#D3FF61] text-black font-helvetica px-6 py-4 border-b border-gray-200 border border-b-gray-200">
          <div
            className="grid gap-6 text-sm font-semibold text-gray-800"
            style={{
              gridTemplateColumns:
                columns.map((col) => col.width || "1fr").join(" ") + " 120px",
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
        <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto font-helvetica-light">
          {sortedData.map((item, index) => (
            <div
              key={item.id}
              className={`px-6 py-4 hover:bg-gray-50 transition-colors duration-150 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
              }`}
            >
              <div
                className="grid gap-6 items-center text-sm"
                style={{
                  gridTemplateColumns:
                    columns.map((col) => col.width || "1fr").join(" ") +
                    " 120px",
                }}
              >
                {columns.map((column) => (
                  <div
                    key={String(column.key)}
                    className="text-gray-700 font-medium"
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key])}
                  </div>
                ))}
                <div className="flex items-center justify-center gap-2">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(item)}
                      className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(item)}
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
            <div className="text-gray-500 text-sm">
              Try adjusting your search criteria
            </div>
          </div>
        )}
      </div>
    </>
  );
}
