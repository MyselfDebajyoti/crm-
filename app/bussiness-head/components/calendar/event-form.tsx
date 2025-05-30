"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Trash2, ExternalLink } from "lucide-react"
import type { Client, Lead, Task } from "../crm-provider"

interface CalendarEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: number
  type: "meeting" | "task" | "call" | "other"
  attendees: string[]
  location?: string
  relatedTo?: {
    type: "client" | "lead" | "task"
    id: string
    name: string
  }
}

interface EventFormProps {
  event?: CalendarEvent | null
  onClose: () => void
  onSave: (event: Omit<CalendarEvent, "id"> | Partial<CalendarEvent>) => void
  onDelete?: () => void
  clients: Client[]
  leads: Lead[]
  tasks: Task[]
}

export function EventForm({ event, onClose, onSave, onDelete, clients, leads, tasks }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || new Date().toISOString().split("T")[0],
    time: event?.time || "09:00",
    duration: event?.duration || 60,
    type: event?.type || ("meeting" as CalendarEvent["type"]),
    attendees: event?.attendees.join(", ") || "",
    location: event?.location || "",
    relatedTo: event?.relatedTo || undefined,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const eventData = {
      ...formData,
      attendees: formData.attendees
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    }

    onSave(eventData)
    onClose()
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRelatedToChange = (value: string) => {
    if (!value) {
      setFormData((prev) => ({ ...prev, relatedTo: undefined }))
      return
    }

    const [type, id] = value.split(":")
    let name = ""

    if (type === "client") {
      const client = clients.find((c) => c.id === id)
      name = client?.company || ""
    } else if (type === "lead") {
      const lead = leads.find((l) => l.id === id)
      name = lead?.company || ""
    } else if (type === "task") {
      const task = tasks.find((t) => t.id === id)
      name = task?.title || ""
    }

    setFormData((prev) => ({
      ...prev,
      relatedTo: { type: type as "client" | "lead" | "task", id, name },
    }))
  }

  const exportToGoogleCalendar = () => {
    const startDate = new Date(`${formData.date}T${formData.time}:00`)
    const endDate = new Date(startDate.getTime() + formData.duration * 60000)

    const googleUrl = new URL("https://calendar.google.com/calendar/render")
    googleUrl.searchParams.set("action", "TEMPLATE")
    googleUrl.searchParams.set("text", formData.title)
    googleUrl.searchParams.set(
      "dates",
      `${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    )
    googleUrl.searchParams.set("details", formData.description)
    googleUrl.searchParams.set("location", formData.location || "")

    window.open(googleUrl.toString(), "_blank")
  }

  const exportToOutlook = () => {
    const startDate = new Date(`${formData.date}T${formData.time}:00`)
    const endDate = new Date(startDate.getTime() + formData.duration * 60000)

    const outlookUrl = new URL("https://outlook.live.com/calendar/0/deeplink/compose")
    outlookUrl.searchParams.set("subject", formData.title)
    outlookUrl.searchParams.set("startdt", startDate.toISOString())
    outlookUrl.searchParams.set("enddt", endDate.toISOString())
    outlookUrl.searchParams.set("body", formData.description)
    outlookUrl.searchParams.set("location", formData.location || "")

    window.open(outlookUrl.toString(), "_blank")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">{event ? "Edit Event" : "Add New Event"}</h2>
          <div className="flex items-center gap-2">
            {event && onDelete && (
              <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-600">
                <Trash2 size={16} />
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="15"
                step="15"
                value={formData.duration}
                onChange={(e) => handleChange("duration", Number.parseInt(e.target.value) || 60)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Event Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="relatedTo">Related To</Label>
              <Select
                value={formData.relatedTo ? `${formData.relatedTo.type}:${formData.relatedTo.id}` : "none"}
                onValueChange={handleRelatedToChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select related item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={`client:${client.id}`} value={`client:${client.id}`}>
                      Client: {client.company}
                    </SelectItem>
                  ))}
                  {leads.map((lead) => (
                    <SelectItem key={`lead:${lead.id}`} value={`lead:${lead.id}`}>
                      Lead: {lead.company}
                    </SelectItem>
                  ))}
                  {tasks.map((task) => (
                    <SelectItem key={`task:${task.id}`} value={`task:${task.id}`}>
                      Task: {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Enter location or meeting link"
            />
          </div>

          <div>
            <Label htmlFor="attendees">Attendees (comma-separated)</Label>
            <Input
              id="attendees"
              value={formData.attendees}
              onChange={(e) => handleChange("attendees", e.target.value)}
              placeholder="John Doe, Jane Smith"
            />
          </div>

          {/* Calendar Export Options */}
          <div className="border-t pt-4">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Export to Calendar</Label>
            <div className="flex gap-3">
              <Button type="button" variant="outline" size="sm" onClick={exportToGoogleCalendar}>
                <ExternalLink size={14} className="mr-2" />
                Google Calendar
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={exportToOutlook}>
                <ExternalLink size={14} className="mr-2" />
                Outlook Calendar
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
              {event ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
