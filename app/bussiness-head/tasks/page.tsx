"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DataTable } from "@/components/ui/data-table"
import { useCRM, type Task } from "@/components/crm-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus } from "lucide-react"
import { TaskForm } from "@/components/forms/task-form"

export default function TasksPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const { tasks, updateTask, deleteTask } = useCRM()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleDelete = (task: Task) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  const getStatusBadge = (status: Task["status"]) => {
    const colors = {
      "To Do": "bg-gray-100 text-gray-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[status]}>{status}</Badge>
  }

  const getPriorityBadge = (priority: Task["priority"]) => {
    const colors = {
      Low: "bg-blue-100 text-blue-800",
      Medium: "bg-orange-100 text-orange-800",
      High: "bg-red-100 text-red-800",
    }
    return <Badge className={colors[priority]}>{priority}</Badge>
  }

  const columns = [
    {
      key: "title" as keyof Task,
      label: "Title",
      sortable: true,
    },
    {
      key: "description" as keyof Task,
      label: "Description",
      render: (value: string) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      ),
    },
    {
      key: "status" as keyof Task,
      label: "Status",
      sortable: true,
      render: (value: Task["status"]) => getStatusBadge(value),
    },
    {
      key: "priority" as keyof Task,
      label: "Priority",
      sortable: true,
      render: (value: Task["priority"]) => getPriorityBadge(value),
    },
    {
      key: "assignedUsers" as keyof Task,
      label: "Assigned To",
      render: (value: string[]) => (
        <div className="flex items-center gap-1">
          {value.slice(0, 2).map((user, index) => (
            <Avatar key={index} className="w-6 h-6">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                {user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
          {value.length > 2 && <span className="text-xs text-gray-500">+{value.length - 2}</span>}
        </div>
      ),
    },
    {
      key: "dueDate" as keyof Task,
      label: "Due Date",
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
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Task Management</h1>
            <p className="text-sm text-gray-600">Manage and track all organizational tasks</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]">
            <Plus size={16} className="mr-2" />
            Add Task
          </Button>
        </div>

        {/* Tasks Table */}
        <DataTable
          data={tasks}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Search tasks..."
        />

        {/* Task Form Modal */}
        {showForm && <TaskForm task={editingTask} onClose={handleFormClose} />}
      </main>
    </div>
  )
}
