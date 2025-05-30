"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Types
export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  assignedUsers: string[]
  status: "To Do" | "In Progress" | "Completed"
  priority: "Low" | "Medium" | "High"
  createdAt: string
  updatedAt: string
  reminder?: {
    date: string
    time: string
    sent: boolean
  }
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  source: string
  status: "New" | "Qualified" | "Contacted" | "Converted" | "Lost"
  score: number
  notes: string[]
  createdAt: string
  updatedAt: string
  assignedTo?: string
  value?: number
  lastContact?: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  industry: string
  address: string
  status: "Active" | "Inactive" | "Prospect"
  totalValue: number
  interactions: Interaction[]
  createdAt: string
  updatedAt: string
  assignedRm?: string
  lastInteraction?: string
  satisfactionScore?: number
}

export interface Interaction {
  id: string
  type: "Call" | "Email" | "Meeting" | "Note"
  description: string
  date: string
  userId: string
}

export interface Service {
  id: string
  name: string
  description: string
  category: string
  price: number
  duration: string
  status: "Active" | "Inactive"
  createdAt: string
  performance?: {
    revenue: number
    clientCount: number
    satisfactionScore: number
  }
}

export interface Investment {
  id: string
  name: string
  type: "Equity" | "Mutual Fund" | "Bond" | "Real Estate" | "Crypto"
  amount: number
  currentValue: number
  returns: number
  returnPercentage: number
  purchaseDate: string
  status: "Active" | "Sold" | "Pending"
}

export interface RmHead {
  id: string
  name: string
  email: string
  phone: string
  department: string
  team: string[]
  performance: {
    clientsAcquired: number
    leadsConverted: number
    revenue: number
    targetAchievement: number
  }
  status: "Active" | "On Leave" | "Inactive"
  joinDate: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "reminder" | "alert" | "update" | "system"
  date: string
  read: boolean
  relatedTo?: {
    type: "task" | "lead" | "client" | "rm" | "service"
    id: string
  }
}

interface CRMContextType {
  // Tasks
  tasks: Task[]
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void

  // Leads
  leads: Lead[]
  addLead: (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  deleteLead: (id: string) => void

  // Clients
  clients: Client[]
  addClient: (client: Omit<Client, "id" | "createdAt" | "updatedAt">) => void
  updateClient: (id: string, updates: Partial<Client>) => void
  deleteClient: (id: string) => void

  // Services
  services: Service[]
  addService: (service: Omit<Service, "id" | "createdAt">) => void
  updateService: (id: string, updates: Partial<Service>) => void
  deleteService: (id: string) => void

  // Investments
  investments: Investment[]
  addInvestment: (investment: Omit<Investment, "id">) => void
  updateInvestment: (id: string, updates: Partial<Investment>) => void
  deleteInvestment: (id: string) => void

  // RM Heads
  rmHeads: RmHead[]
  addRmHead: (rmHead: Omit<RmHead, "id">) => void
  updateRmHead: (id: string, updates: Partial<RmHead>) => void
  deleteRmHead: (id: string) => void

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void
  markNotificationAsRead: (id: string) => void
  deleteNotification: (id: string) => void

  // User Role
  userRole: "business_head" | "rm_head" | "relationship_manager" | "admin"
  setUserRole: (role: "business_head" | "rm_head" | "relationship_manager" | "admin") => void
}

const CRMContext = createContext<CRMContextType | undefined>(undefined)

export function useCRM() {
  const context = useContext(CRMContext)
  if (!context) {
    throw new Error("useCRM must be used within a CRMProvider")
  }
  return context
}

export function CRMProvider({ children }: { children: React.ReactNode }) {
  // Sample data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review Q4 Financial Reports",
      description: "Comprehensive review of quarterly financial performance and budget analysis",
      dueDate: "2025-01-15",
      assignedUsers: ["John Doe", "Jane Smith"],
      status: "In Progress",
      priority: "High",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-05",
      reminder: {
        date: "2025-01-14",
        time: "09:00",
        sent: false,
      },
    },
    {
      id: "2",
      title: "Client Presentation Preparation",
      description: "Prepare presentation materials for upcoming client meeting",
      dueDate: "2025-01-10",
      assignedUsers: ["Mike Johnson"],
      status: "To Do",
      priority: "Medium",
      createdAt: "2025-01-02",
      updatedAt: "2025-01-02",
    },
    {
      id: "3",
      title: "RM Performance Review",
      description: "Conduct quarterly performance reviews for all relationship managers",
      dueDate: "2025-01-20",
      assignedUsers: ["Emily Chen", "John Doe"],
      status: "To Do",
      priority: "High",
      createdAt: "2025-01-03",
      updatedAt: "2025-01-03",
      reminder: {
        date: "2025-01-18",
        time: "14:00",
        sent: false,
      },
    },
    {
      id: "4",
      title: "Strategic Planning Session",
      description: "Annual strategic planning session with department heads",
      dueDate: "2025-01-25",
      assignedUsers: ["John Doe", "Sarah Wilson", "Robert Chen"],
      status: "To Do",
      priority: "High",
      createdAt: "2025-01-04",
      updatedAt: "2025-01-04",
    },
  ])

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "Sarah Wilson",
      email: "sarah@techcorp.com",
      phone: "+1-555-0123",
      company: "TechCorp Solutions",
      source: "Website",
      status: "Qualified",
      score: 85,
      notes: ["Initial contact made", "Interested in premium package"],
      createdAt: "2025-01-01",
      updatedAt: "2025-01-05",
      assignedTo: "Mike Johnson",
      value: 75000,
      lastContact: "2025-01-04",
    },
    {
      id: "2",
      name: "David Brown",
      email: "david@globalfirm.com",
      phone: "+1-555-0124",
      company: "Global Firm Inc",
      source: "Referral",
      status: "New",
      score: 65,
      notes: ["Referred by Robert Chen", "Needs follow-up call"],
      createdAt: "2025-01-02",
      updatedAt: "2025-01-02",
      assignedTo: "Jane Smith",
      value: 50000,
      lastContact: "2025-01-02",
    },
    {
      id: "3",
      name: "Lisa Martinez",
      email: "lisa@innovatech.com",
      phone: "+1-555-0125",
      company: "InnovaTech",
      source: "Trade Show",
      status: "Contacted",
      score: 75,
      notes: ["Met at Tech Expo", "Interested in consulting services"],
      createdAt: "2025-01-03",
      updatedAt: "2025-01-06",
      assignedTo: "Mike Johnson",
      value: 120000,
      lastContact: "2025-01-06",
    },
  ])

  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Robert Chen",
      email: "robert@innovate.com",
      phone: "+1-555-0456",
      company: "Innovate Inc",
      industry: "Technology",
      address: "123 Business Ave, NY 10001",
      status: "Active",
      totalValue: 250000,
      interactions: [
        {
          id: "1",
          type: "Meeting",
          description: "Quarterly business review",
          date: "2025-01-05",
          userId: "user1",
        },
      ],
      createdAt: "2024-12-01",
      updatedAt: "2025-01-05",
      assignedRm: "Jane Smith",
      lastInteraction: "2025-01-05",
      satisfactionScore: 9.2,
    },
    {
      id: "2",
      name: "Amanda Lee",
      email: "amanda@globaltech.com",
      phone: "+1-555-0457",
      company: "Global Technologies",
      industry: "Manufacturing",
      address: "456 Industry Blvd, Chicago, IL 60601",
      status: "Active",
      totalValue: 180000,
      interactions: [
        {
          id: "2",
          type: "Call",
          description: "Follow-up on implementation",
          date: "2025-01-03",
          userId: "user2",
        },
      ],
      createdAt: "2024-11-15",
      updatedAt: "2025-01-03",
      assignedRm: "Mike Johnson",
      lastInteraction: "2025-01-03",
      satisfactionScore: 8.5,
    },
    {
      id: "3",
      name: "Thomas Wright",
      email: "thomas@financepro.com",
      phone: "+1-555-0458",
      company: "Finance Professionals LLC",
      industry: "Finance",
      address: "789 Wall St, NY 10005",
      status: "Active",
      totalValue: 320000,
      interactions: [
        {
          id: "3",
          type: "Email",
          description: "Sent proposal for additional services",
          date: "2025-01-06",
          userId: "user1",
        },
      ],
      createdAt: "2024-10-20",
      updatedAt: "2025-01-06",
      assignedRm: "Jane Smith",
      lastInteraction: "2025-01-06",
      satisfactionScore: 9.7,
    },
  ])

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Strategic Consulting",
      description: "Comprehensive business strategy development and implementation",
      category: "Consulting",
      price: 15000,
      duration: "3 months",
      status: "Active",
      createdAt: "2024-01-01",
      performance: {
        revenue: 450000,
        clientCount: 12,
        satisfactionScore: 9.2,
      },
    },
    {
      id: "2",
      name: "Financial Advisory",
      description: "Expert financial planning and investment advisory services",
      category: "Advisory",
      price: 12000,
      duration: "Ongoing",
      status: "Active",
      createdAt: "2024-02-15",
      performance: {
        revenue: 360000,
        clientCount: 15,
        satisfactionScore: 8.9,
      },
    },
    {
      id: "3",
      name: "Market Research",
      description: "In-depth market analysis and competitive intelligence",
      category: "Research",
      price: 8500,
      duration: "2 months",
      status: "Active",
      createdAt: "2024-03-10",
      performance: {
        revenue: 280000,
        clientCount: 18,
        satisfactionScore: 8.7,
      },
    },
  ])

  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "1",
      name: "Tech Growth Fund",
      type: "Mutual Fund",
      amount: 100000,
      currentValue: 125000,
      returns: 25000,
      returnPercentage: 25,
      purchaseDate: "2024-01-01",
      status: "Active",
    },
  ])

  const [rmHeads, setRmHeads] = useState<RmHead[]>([
    {
      id: "1",
      name: "Emily Chen",
      email: "emily.chen@company.com",
      phone: "+1-555-1001",
      department: "Corporate Banking",
      team: ["Jane Smith", "Mike Johnson", "Alex Rodriguez"],
      performance: {
        clientsAcquired: 24,
        leadsConverted: 38,
        revenue: 1250000,
        targetAchievement: 115,
      },
      status: "Active",
      joinDate: "2022-06-15",
    },
    {
      id: "2",
      name: "Marcus Williams",
      email: "marcus.williams@company.com",
      phone: "+1-555-1002",
      department: "Retail Banking",
      team: ["Sarah Johnson", "David Lee", "Lisa Wong"],
      performance: {
        clientsAcquired: 32,
        leadsConverted: 45,
        revenue: 980000,
        targetAchievement: 98,
      },
      status: "Active",
      joinDate: "2021-09-10",
    },
    {
      id: "3",
      name: "Sophia Rodriguez",
      email: "sophia.rodriguez@company.com",
      phone: "+1-555-1003",
      department: "Wealth Management",
      team: ["James Wilson", "Emma Davis", "Michael Brown"],
      performance: {
        clientsAcquired: 18,
        leadsConverted: 29,
        revenue: 1450000,
        targetAchievement: 121,
      },
      status: "Active",
      joinDate: "2023-01-05",
    },
  ])

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Task Reminder",
      message: "Review Q4 Financial Reports due tomorrow",
      type: "reminder",
      date: "2025-01-14T09:00:00Z",
      read: false,
      relatedTo: {
        type: "task",
        id: "1",
      },
    },
    {
      id: "2",
      title: "New Lead Assigned",
      message: "A new lead has been assigned to your team",
      type: "alert",
      date: "2025-01-06T14:30:00Z",
      read: true,
      relatedTo: {
        type: "lead",
        id: "3",
      },
    },
    {
      id: "3",
      title: "Performance Update",
      message: "Monthly performance reports are now available",
      type: "update",
      date: "2025-01-05T10:15:00Z",
      read: false,
    },
  ])

  const [userRole, setUserRole] = useState<"business_head" | "rm_head" | "relationship_manager" | "admin">(
    "business_head",
  )

  // Task functions
  const addTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task)),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  // Lead functions
  const addLead = (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setLeads((prev) => [...prev, newLead])
  }

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates, updatedAt: new Date().toISOString() } : lead)),
    )
  }

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id))
  }

  // Client functions
  const addClient = (client: Omit<Client, "id" | "createdAt" | "updatedAt">) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setClients((prev) => [...prev, newClient])
  }

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? { ...client, ...updates, updatedAt: new Date().toISOString() } : client,
      ),
    )
  }

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id))
  }

  // Service functions
  const addService = (service: Omit<Service, "id" | "createdAt">) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setServices((prev) => [...prev, newService])
  }

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((service) => (service.id === id ? { ...service, ...updates } : service)))
  }

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id))
  }

  // Investment functions
  const addInvestment = (investment: Omit<Investment, "id">) => {
    const newInvestment: Investment = {
      ...investment,
      id: Date.now().toString(),
    }
    setInvestments((prev) => [...prev, newInvestment])
  }

  const updateInvestment = (id: string, updates: Partial<Investment>) => {
    setInvestments((prev) =>
      prev.map((investment) => (investment.id === id ? { ...investment, ...updates } : investment)),
    )
  }

  const deleteInvestment = (id: string) => {
    setInvestments((prev) => prev.filter((investment) => investment.id !== id))
  }

  // RM Head functions
  const addRmHead = (rmHead: Omit<RmHead, "id">) => {
    const newRmHead: RmHead = {
      ...rmHead,
      id: Date.now().toString(),
    }
    setRmHeads((prev) => [...prev, newRmHead])
  }

  const updateRmHead = (id: string, updates: Partial<RmHead>) => {
    setRmHeads((prev) => prev.map((rmHead) => (rmHead.id === id ? { ...rmHead, ...updates } : rmHead)))
  }

  const deleteRmHead = (id: string) => {
    setRmHeads((prev) => prev.filter((rmHead) => rmHead.id !== id))
  }

  // Notification functions
  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [...prev, newNotification])
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <CRMContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        leads,
        addLead,
        updateLead,
        deleteLead,
        clients,
        addClient,
        updateClient,
        deleteClient,
        services,
        addService,
        updateService,
        deleteService,
        investments,
        addInvestment,
        updateInvestment,
        deleteInvestment,
        rmHeads,
        addRmHead,
        updateRmHead,
        deleteRmHead,
        notifications,
        addNotification,
        markNotificationAsRead,
        deleteNotification,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </CRMContext.Provider>
  )
}
