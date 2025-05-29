"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

// Types
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignedUsers: string[];
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: "New" | "Qualified" | "Contacted" | "Converted" | "Lost";
  score: number;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  address: string;
  status: "Active" | "Inactive" | "Prospect";
  totalValue: number;
  interactions: Interaction[];
  createdAt: string;
  updatedAt: string;
}

export interface Interaction {
  id: string;
  type: "Call" | "Email" | "Meeting" | "Note";
  description: string;
  date: string;
  userId: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

export interface Investment {
  id: string;
  name: string;
  type: "Equity" | "Mutual Fund" | "Bond" | "Real Estate" | "Crypto";
  amount: number;
  currentValue: number;
  returns: number;
  returnPercentage: number;
  purchaseDate: string;
  status: "Active" | "Sold" | "Pending";
}

interface CRMContextType {
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Leads
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;

  // Clients
  clients: Client[];
  addClient: (client: Omit<Client, "id" | "createdAt" | "updatedAt">) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  // Services
  services: Service[];
  addService: (service: Omit<Service, "id" | "createdAt">) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Investments
  investments: Investment[];
  addInvestment: (investment: Omit<Investment, "id">) => void;
  updateInvestment: (id: string, updates: Partial<Investment>) => void;
  deleteInvestment: (id: string) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function useCRM() {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error("useCRM must be used within a CRMProvider");
  }
  return context;
}

export function CRMProvider({ children }: { children: React.ReactNode }) {
  // Sample data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review Project Proposal",
      description: "Task1",
      dueDate: "2025-01-15",
      assignedUsers: ["John Doe", "Jane Smith"],
      status: "In Progress",
      priority: "High",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-05",
    },
    {
      id: "2",
      title: "Client Follow-up",
      description: "Task2",
      dueDate: "2025-01-10",
      assignedUsers: ["Mike Johnson"],
      status: "To Do",
      priority: "Medium",
      createdAt: "2025-01-02",
      updatedAt: "2025-01-02",
    },
  ]);

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
    },
  ]);

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
    },
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Strategic Consulting",
      description: "Strategy development ",
      category: "Consulting",
      price: 15000,
      duration: "3 months",
      status: "Active",
      createdAt: "2024-01-01",
    },
  ]);

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
  ]);

  // Task functions
  const addTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Lead functions
  const addLead = (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLeads((prev) => [...prev, newLead]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? { ...lead, ...updates, updatedAt: new Date().toISOString() }
          : lead
      )
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  // Client functions
  const addClient = (
    client: Omit<Client, "id" | "createdAt" | "updatedAt">
  ) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setClients((prev) => [...prev, newClient]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id
          ? { ...client, ...updates, updatedAt: new Date().toISOString() }
          : client
      )
    );
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
  };

  // Service functions
  const addService = (service: Omit<Service, "id" | "createdAt">) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, ...updates } : service
      )
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  // Investment functions
  const addInvestment = (investment: Omit<Investment, "id">) => {
    const newInvestment: Investment = {
      ...investment,
      id: Date.now().toString(),
    };
    setInvestments((prev) => [...prev, newInvestment]);
  };

  const updateInvestment = (id: string, updates: Partial<Investment>) => {
    setInvestments((prev) =>
      prev.map((investment) =>
        investment.id === id ? { ...investment, ...updates } : investment
      )
    );
  };

  const deleteInvestment = (id: string) => {
    setInvestments((prev) => prev.filter((investment) => investment.id !== id));
  };

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
      }}
    >
      {children}
    </CRMContext.Provider>
  );
}
