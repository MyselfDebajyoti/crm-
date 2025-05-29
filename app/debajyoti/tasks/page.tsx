// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// // import { Button } from "@/components/ui/button";
// import {
//   ArrowUpRight,
//   CheckSquare,
//   Users,
//   Building2,
//   Briefcase,
//   BarChart3,
//   LogOut,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// import { useState } from "react";
// // import { Sidebar } from "@/components/layout/sidebar"
// // import { Header } from "@/components/layout/header"
// import { DataTable } from "../../components/dataTable";
// import { useCRM, type Task } from "./crmProvider";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Plus } from "lucide-react";
// import { TaskForm } from "../../components/taskForm";

// function handleLogout() {
//   // Implement your logout logic here
//   console.log("User logged out");
// }

// export default function TasksPage() {
//   const [showForm, setShowForm] = useState(false);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const { tasks, updateTask, deleteTask } = useCRM();

//   //   const toggleSidebar = () => {
//   //     setSidebarOpen(!sidebarOpen)
//   //   }

//   const handleEdit = (task: Task) => {
//     setEditingTask(task);
//     setShowForm(true);
//   };

//   const handleDelete = (task: Task) => {
//     if (confirm("Are you sure you want to delete this task?")) {
//       deleteTask(task.id);
//     }
//   };

//   const handleFormClose = () => {
//     setShowForm(false);
//     setEditingTask(null);
//   };

//   const getStatusBadge = (status: Task["status"]) => {
//     const colors = {
//       "To Do": "bg-gray-100 text-gray-800",
//       "In Progress": "bg-yellow-100 text-yellow-800",
//       Completed: "bg-green-100 text-green-800",
//     };
//     return <Badge className={colors[status]}>{status}</Badge>;
//   };

//   const getPriorityBadge = (priority: Task["priority"]) => {
//     const colors = {
//       Low: "bg-blue-100 text-blue-800",
//       Medium: "bg-orange-100 text-orange-800",
//       High: "bg-red-100 text-red-800",
//     };
//     return <Badge className={colors[priority]}>{priority}</Badge>;
//   };

//   const columns = [
//     {
//       key: "title" as keyof Task,
//       label: "Title",
//       sortable: true,
//     },
//     {
//       key: "description" as keyof Task,
//       label: "Description",
//       render: (value: string) => (
//         <div className="max-w-xs truncate" title={value}>
//           {value}
//         </div>
//       ),
//     },
//     {
//       key: "status" as keyof Task,
//       label: "Status",
//       sortable: true,
//       render: (value: Task["status"]) => getStatusBadge(value),
//     },
//     {
//       key: "priority" as keyof Task,
//       label: "Priority",
//       sortable: true,
//       render: (value: Task["priority"]) => getPriorityBadge(value),
//     },
//     {
//       key: "assignedUsers" as keyof Task,
//       label: "Assigned To",
//       render: (value: string[]) => (
//         <div className="flex items-center gap-1">
//           {value.slice(0, 2).map((user, index) => (
//             <Avatar key={index} className="w-6 h-6">
//               <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
//                 {user
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </AvatarFallback>
//             </Avatar>
//           ))}
//           {value.length > 2 && (
//             <span className="text-xs text-gray-500">+{value.length - 2}</span>
//           )}
//         </div>
//       ),
//     },
//     {
//       key: "dueDate" as keyof Task,
//       label: "Due Date",
//       sortable: true,
//       render: (value: string) => new Date(value).toLocaleDateString(),
//     },
//   ];

//   return (
//     <>
//       <div className="min-h-screen bg-[#F4FFD7] flex">
//         {/* Sidebar */}
//         <aside className="w-[200px] mt-[18px] ml-[20px] mb-[18px] rounded-[24px] bg-white flex flex-col p-4 border-r border-white sticky top-[18px] h-[calc(100vh-36px)]">
//           {/* Logo */}
//           <div className="mb-12 mt-12 pt-2 flex justify-center">
//             <Image
//               src="/finployee-logo.png"
//               alt="Finployee"
//               width={120}
//               height={185}
//               className="object-contain"
//             />
//           </div>

//           {/* Navigation */}
//           <nav className="flex flex-col space-y-1 flex-1 overflow-y-auto">
//             <Link
//               href="#"
//               className="flex items-center gap-3 px-10 py-2.5 rounded-lg bg-[#D3FF61] text-black font-helvetica-light text-xs"
//             >
//               <ArrowUpRight size={16} />
//               Dashboard
//             </Link>

//             <Link
//               href="#"
//               className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
//             >
//               <CheckSquare size={16} />
//               Tasks
//             </Link>

//             <Link
//               href="#"
//               className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
//             >
//               <Users size={16} />
//               Leads
//             </Link>

//             <Link
//               href="#"
//               className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
//             >
//               <Building2 size={16} />
//               Clients
//             </Link>

//             <Link
//               href="#"
//               className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
//             >
//               <Briefcase size={16} />
//               Services
//             </Link>

//             <Link
//               href="#"
//               className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
//             >
//               <BarChart3 size={16} />
//               Invest
//             </Link>
//           </nav>

//           {/* Logout */}
//           <Button
//             variant="ghost"
//             onClick={handleLogout}
//             className="flex items-center gap-2 justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-auto text-sm font-helvetica-light"
//           >
//             <LogOut size={16} />
//             Logout
//           </Button>
//         </aside>

//         <main className="flex-1 p-4 sm:p-6 lg:pl-8 max-w-6xl">
//           {/* <Header toggleSidebar={toggleSidebar} /> */}

//           {/* Page Header */}
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
//                 Task Management
//               </h1>
//               <p className="text-sm text-gray-600">
//                 Manage and track all organizational tasks
//               </p>
//             </div>
//             <Button
//               onClick={() => setShowForm(true)}
//               className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]"
//             >
//               <Plus size={16} className="mr-2" />
//               Add Task
//             </Button>
//           </div>

//           {/* Tasks Table */}
//           <DataTable
//             data={tasks}
//             columns={columns}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//             searchPlaceholder="Search tasks..."
//           />

//           {/* Task Form Modal */}
//           {showForm && (
//             <TaskForm task={editingTask} onClose={handleFormClose} />
//           )}
//         </main>
//       </div>
//     </>
//   );
// }

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckSquare,
  Users,
  Building2,
  Briefcase,
  BarChart3,
  LogOut,
  Search,
} from "lucide-react";
// import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { DataTable } from "../../components/dataTable";
import { useCRM, type Task, CRMProvider } from "./crmProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { TaskForm } from "../../components/taskForm";
import { useRouter } from "next/navigation";

function handleLogout() {
  // Implement your logout logic here
  console.log("User logged out");
}

// Create the actual TasksPage component that uses CRM context
function TasksPageContent() {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { tasks, updateTask, deleteTask } = useCRM();
  //    const [isOpen, setIsOpen] = useState(false);

  const Avatar = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={`rounded-full overflow-hidden ${className}`}>
      {children}
    </div>
  );

  const AvatarImage = ({ src, alt }: { src: string; alt?: string }) => (
    <img
      src={src}
      alt={alt || "Avatar"}
      className="w-full h-full object-cover"
    />
  );

  const AvatarFallback = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );

  // const ProfileDropdown = ({
  //   username = "John Doe",
  //   post = "Executive Leadership"
  // }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //  const handleLogout = () => {
  //    setIsOpen(false);
  //    // Navigate to base route
  //    router.push("/");
  //  };

  const username = "Debajyoti";
  const post = "Executive Leadership";

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (task: Task) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const getStatusBadge = (status: Task["status"]) => {
    const colors = {
      "To Do": "bg-gray-100 text-gray-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-800",
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: Task["priority"]) => {
    const colors = {
      Low: "bg-blue-100 text-blue-800",
      Medium: "bg-orange-100 text-orange-800",
      High: "bg-red-100 text-red-800",
    };
    return <Badge className={colors[priority]}>{priority}</Badge>;
  };

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
          {value.length > 2 && (
            <span className="text-xs text-gray-500">+{value.length - 2}</span>
          )}
        </div>
      ),
    },
    {
      key: "dueDate" as keyof Task,
      label: "Due Date",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];
  const handleLogout = () => {
    setIsOpen(false);
    // Navigate to base route
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F4FFD7] flex">
      {/* Sidebar */}
      <aside className="w-[200px] mt-[18px] ml-[20px] mb-[18px] rounded-[24px] bg-white flex flex-col p-4 border-r border-white sticky top-[18px] h-[calc(100vh-36px)]">
        {/* Logo */}
        <div className="mb-12 mt-12 pt-2 flex justify-center">
          <Image
            src="/finployee-logo.png"
            alt="Finployee"
            width={120}
            height={185}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-1 flex-1 overflow-y-auto">
          <Link
            href="/debajyoti"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg  text-gray-700  hover:bg-gray-100 font-helvetica-light text-xs"
          >
            <ArrowUpRight size={16} />
            Dashboard
          </Link>

          <Link
            href="/debajyoti/tasks"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-black hover:bg-gray-100 bg-[#D3FF61] text-xs font-helvetica"
          >
            <CheckSquare size={16} />
            Tasks
          </Link>

          <Link
            href="/debajyoti/leads"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
          >
            <Users size={16} />
            Leads
          </Link>

          <Link
            href="/debajyoti/clients"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
          >
            <Building2 size={16} />
            Clients
          </Link>

          <Link
            href="/debajyoti/services"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
          >
            <Briefcase size={16} />
            Services
          </Link>

          <Link
            href="/debajyoti/investments"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
          >
            <BarChart3 size={16} />
            Invest
          </Link>
          <Link
            href="/debajyoti/calender"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
          >
            <BarChart3 size={16} />
            Calender
          </Link>
        </nav>

        {/* Logout */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center gap-2 justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-auto text-sm font-helvetica-light"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:pl-8 max-w-screen">
        <header className="flex justify-between items-center mb-8">
          {/* Search */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-[#D3FF61] rounded-full flex items-center justify-center">
              <Search size={16} className="text-black" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-12 pr-4 py-2.5 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400 w-80 text-sm"
            />
          </div>

          {/* Command Center */}
          {/* <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-black">
                      Command Center
                    </div>
                    <div className="text-xs text-gray-600">Executive Leadership</div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                      👨‍💼
                    </AvatarFallback>
                  </Avatar>
                </div> */}
          <div className="relative" ref={dropdownRef}>
            {/* Main Profile Button */}
            <div
              className="flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={toggleDropdown}
            >
              <div className="text-right">
                <div className="text-sm font-semibold text-black">
                  Command Center
                </div>
                <div className="text-xs text-gray-600">
                  Executive Leadership
                </div>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                  👨‍💼
                </AvatarFallback>
              </Avatar>

              {/* Dropdown Arrow */}
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                        👨‍💼
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {username}
                      </div>
                      <div className="text-xs text-gray-600">{post}</div>
                    </div>
                  </div>
                </div>

                {/* Menu Options */}
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    View Profile
                  </button>

                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </button>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-black mb-2 font-helvetica">
              Task Management
            </h1>
            <p className="text-sm text-gray-600 font-helvetica-light">
              Manage and track all organizational tasks
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#D3FF61] text-black hover:bg-[#1B2409] hover:text-[#D3FF61] rounded-2xl"
          >
            <Plus size={16} className="mr-2 " />
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
  );
}

// Main component that wraps everything in CRMProvider
export default function TasksPage() {
  return (
    <CRMProvider>
      <TasksPageContent />
    </CRMProvider>
  );
}
