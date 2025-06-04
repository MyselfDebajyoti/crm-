"use client"

import type React from "react"

import { useState } from "react"
import { useCRM, type RmHead } from "../crm-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface RmHeadFormProps {
  rmHead?: RmHead | null
  onClose: () => void
}

export function RmHeadForm({ rmHead, onClose }: RmHeadFormProps) {
  const { addRmHead, updateRmHead } = useCRM()
  const [formData, setFormData] = useState({
    name: rmHead?.name || "",
    email: rmHead?.email || "",
    phone: rmHead?.phone || "",
    department: rmHead?.department || "",
    team: rmHead?.team.join(", ") || "",
    status: rmHead?.status || ("Active" as RmHead["status"]),
    joinDate: rmHead?.joinDate || new Date().toISOString().split("T")[0],
    performance: {
      clientsAcquired: rmHead?.performance.clientsAcquired || 0,
      leadsConverted: rmHead?.performance.leadsConverted || 0,
      revenue: rmHead?.performance.revenue || 0,
      targetAchievement: rmHead?.performance.targetAchievement || 0,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const rmHeadData = {
      ...formData,
      team: formData.team
        .split(",")
        .map((member) => member.trim())
        .filter(Boolean),
    }

    if (rmHead) {
      updateRmHead(rmHead.id, rmHeadData)
    } else {
      addRmHead(rmHeadData)
    }

    onClose()
  }

  const handleChange = (field: string, value: string | number) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof typeof prev] as object) || {}),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const departments = [
    "Corporate Banking",
    "Retail Banking",
    "Wealth Management",
    "Investment Banking",
    "Commercial Banking",
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">{rmHead ? "Edit RM Head" : "Add New RM Head"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="joinDate">Join Date</Label>
              <Input
                id="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={(e) => handleChange("joinDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="team">Team Members (comma-separated)</Label>
            <Input
              id="team"
              value={formData.team}
              onChange={(e) => handleChange("team", e.target.value)}
              placeholder="John Doe, Jane Smith, etc."
              required
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientsAcquired">Clients Acquired</Label>
                <Input
                  id="clientsAcquired"
                  type="number"
                  min="0"
                  value={formData.performance.clientsAcquired}
                  onChange={(e) => handleChange("performance.clientsAcquired", Number.parseInt(e.target.value) || 0)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="leadsConverted">Leads Converted</Label>
                <Input
                  id="leadsConverted"
                  type="number"
                  min="0"
                  value={formData.performance.leadsConverted}
                  onChange={(e) => handleChange("performance.leadsConverted", Number.parseInt(e.target.value) || 0)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="revenue">Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  min="0"
                  value={formData.performance.revenue}
                  onChange={(e) => handleChange("performance.revenue", Number.parseInt(e.target.value) || 0)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="targetAchievement">Target Achievement (%)</Label>
                <Input
                  id="targetAchievement"
                  type="number"
                  min="0"
                  max="200"
                  value={formData.performance.targetAchievement}
                  onChange={(e) => handleChange("performance.targetAchievement", Number.parseInt(e.target.value) || 0)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
              {rmHead ? "Update RM Head" : "Create RM Head"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
