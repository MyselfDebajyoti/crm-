"use client"

import type React from "react"

import { useState } from "react"
import { useCRM, type Investment } from "../crm-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface InvestmentFormProps {
  investment?: Investment | null
  onClose: () => void
}

export function InvestmentForm({ investment, onClose }: InvestmentFormProps) {
  const { addInvestment, updateInvestment } = useCRM()
  const [formData, setFormData] = useState({
    name: investment?.name || "",
    type: investment?.type || ("Equity" as Investment["type"]),
    amount: investment?.amount || 0,
    currentValue: investment?.currentValue || 0,
    purchaseDate: investment?.purchaseDate || "",
    status: investment?.status || ("Active" as Investment["status"]),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const returns = formData.currentValue - formData.amount
    const returnPercentage = formData.amount > 0 ? (returns / formData.amount) * 100 : 0

    const investmentData = {
      ...formData,
      returns,
      returnPercentage,
    }

    if (investment) {
      updateInvestment(investment.id, investmentData)
    } else {
      addInvestment(investmentData)
    }

    onClose()
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const investmentTypes: Investment["type"][] = ["Equity", "Mutual Fund", "Bond", "Real Estate", "Crypto"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">{investment ? "Edit Investment" : "Add New Investment"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Investment Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter investment name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Investment Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {investmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Initial Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange("amount", Number.parseFloat(e.target.value) || 0)}
                placeholder="Enter initial investment amount"
                required
              />
            </div>

            <div>
              <Label htmlFor="currentValue">Current Value ($)</Label>
              <Input
                id="currentValue"
                type="number"
                min="0"
                step="0.01"
                value={formData.currentValue}
                onChange={(e) => handleChange("currentValue", Number.parseFloat(e.target.value) || 0)}
                placeholder="Enter current market value"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input
              id="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => handleChange("purchaseDate", e.target.value)}
              required
            />
          </div>

          {/* Returns Preview */}
          {formData.amount > 0 && formData.currentValue > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Returns Preview</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Absolute Return:</span>
                  <span
                    className={`ml-2 font-medium ${(formData.currentValue - formData.amount) >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    ${(formData.currentValue - formData.amount).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Percentage Return:</span>
                  <span
                    className={`ml-2 font-medium ${(((formData.currentValue - formData.amount) / formData.amount) * 100) >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {(((formData.currentValue - formData.amount) / formData.amount) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
              {investment ? "Update Investment" : "Create Investment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
