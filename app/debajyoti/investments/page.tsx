// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowUpRight,
//   CheckSquare,
//   Users,
//   Building2,
//   Briefcase,
//   BarChart3,
//   LogOut,
//   Search,
// } from "lucide-react";
// // import { useRouter } from "next/navigation";
// import { useState, useRef, useEffect } from "react";
// import { DataTable } from "../../components/dataTable";
// import { useCRM, type Lead, CRMProvider } from "../tasks/crmProvider";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Plus, Star } from "lucide-react";
// import { TaskForm } from "../../components/taskForm";
// import { useRouter } from "next/navigation";
// import { LeadForm } from "../../components/leadsForm";

// export default function LeadsPage() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !(dropdownRef.current as HTMLElement).contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   //  const handleLogout = () => {
//   //    setIsOpen(false);
//   //    // Navigate to base route
//   //    router.push("/");
//   //  };

//   const username = "Debajyoti";
//   const post = "Executive Leadership";
//   const handleLogout = () => {
//     setIsOpen(false);
//     // Navigate to base route
//     router.push("/");
//   };

//   const Avatar = ({
//     children,
//     className,
//   }: {
//     children: React.ReactNode;
//     className?: string;
//   }) => (
//     <div className={`rounded-full overflow-hidden ${className}`}>
//       {children}
//     </div>
//   );

//   const AvatarImage = ({ src, alt }: { src: string; alt?: string }) => (
//     <img
//       src={src}
//       alt={alt || "Avatar"}
//       className="w-full h-full object-cover"
//     />
//   );

//   const AvatarFallback = ({
//     children,
//     className,
//   }: {
//     children: React.ReactNode;
//     className?: string;
//   }) => (
//     <div
//       className={`w-full h-full flex items-center justify-center ${className}`}
//     >
//       {children}
//     </div>
//   );

//   const [showForm, setShowForm] = useState(false);
//   const [editingLead, setEditingLead] = useState<Lead | null>(null);
//   const { leads, deleteLead } = useCRM();

//   //   const toggleSidebar = () => {
//   //     setSidebarOpen(!sidebarOpen)
//   //   }

//   const handleEdit = (lead: Lead) => {
//     setEditingLead(lead);
//     setShowForm(true);
//   };

//   const handleDelete = (lead: Lead) => {
//     if (confirm("Are you sure you want to delete this lead?")) {
//       deleteLead(lead.id);
//     // }
//   };

//   const handleFormClose = () => {
//     setShowForm(false);
//     setEditingLead(null);
//   };

//   const getStatusBadge = (status: Lead["status"]) => {
//     const colors = {
//       New: "bg-blue-100 text-blue-800",
//       Qualified: "bg-green-100 text-green-800",
//       Contacted: "bg-yellow-100 text-yellow-800",
//       Converted: "bg-purple-100 text-purple-800",
//       Lost: "bg-red-100 text-red-800",
//     };
//     return <Badge className={colors[status]}>{status}</Badge>;
//   };

//   const getScoreDisplay = (score: number) => {
//     const stars = Math.floor(score / 20);
//     return (
//       <div className="flex items-center gap-1">
//         <span className="text-sm font-medium">{score}</span>
//         <div className="flex">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               size={12}
//               className={
//                 i < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//               }
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const columns = [
//     {
//       key: "name" as keyof Lead,
//       label: "Name",
//       sortable: true,
//     },
//     {
//       key: "email" as keyof Lead,
//       label: "Email",
//       sortable: true,
//     },
//     {
//       key: "company" as keyof Lead,
//       label: "Company",
//       sortable: true,
//     },
//     {
//       key: "source" as keyof Lead,
//       label: "Source",
//       sortable: true,
//     },
//     {
//       key: "status" as keyof Lead,
//       label: "Status",
//       sortable: true,
//       render: (value: Lead["status"]) => getStatusBadge(value),
//     },
//     {
//       key: "score" as keyof Lead,
//       label: "Score",
//       sortable: true,
//       render: (value: number) => getScoreDisplay(value),
//     },
//     {
//       key: "createdAt" as keyof Lead,
//       label: "Created",
//       sortable: true,
//       render: (value: string) => new Date(value).toLocaleDateString(),
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F4FFD7] flex">
//       {/* Sidebar */}
//       <aside className="w-[200px] mt-[18px] ml-[20px] mb-[18px] rounded-[24px] bg-white flex flex-col p-4 border-r border-white sticky top-[18px] h-[calc(100vh-36px)]">
//         {/* Logo */}
//         <div className="mb-12 mt-12 pt-2 flex justify-center">
//           <Image
//             src="/finployee-logo.png"
//             alt="Finployee"
//             width={120}
//             height={185}
//             className="object-contain"
//           />
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col space-y-1 flex-1 overflow-y-auto">
//           <Link
//             href="#"
//             className="flex items-center gap-3 px-10 py-2.5 rounded-lg bg-[#D3FF61] text-black font-helvetica-light text-xs"
//           >
//             <ArrowUpRight size={16} />
//             Dashboard
//           </Link>

//           <Link
//             href="#"
//             className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
//           >
//             <CheckSquare size={16} />
//             Tasks
//           </Link>

//           <Link
//             href="#"
//             className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
//           >
//             <Users size={16} />
//             Leads
//           </Link>

//           <Link
//             href="#"
//             className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
//           >
//             <Building2 size={16} />
//             Clients
//           </Link>

//           <Link
//             href="#"
//             className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
//           >
//             <Briefcase size={16} />
//             Services
//           </Link>

//           <Link
//             href="#"
//             className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
//           >
//             <BarChart3 size={16} />
//             Invest
//           </Link>
//         </nav>

//         {/* Logout */}
//         <Button
//           variant="ghost"
//           onClick={handleLogout}
//           className="flex items-center gap-2 justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-auto text-sm font-helvetica-light"
//         >
//           <LogOut size={16} />
//           Logout
//         </Button>
//       </aside>

//       <main className="flex-1 p-4 sm:p-6 lg:pl-8 max-w-screen">
//         <header className="flex justify-between items-center mb-8">
//           {/* Search */}
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-[#D3FF61] rounded-full flex items-center justify-center">
//               <Search size={16} className="text-black" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search"
//               className="pl-12 pr-4 py-2.5 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400 w-80 text-sm"
//             />
//           </div>

//           {/* Command Center */}
//           {/* <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
//                   <div className="text-right">
//                     <div className="text-sm font-semibold text-black">
//                       Command Center
//                     </div>
//                     <div className="text-xs text-gray-600">Executive Leadership</div>
//                   </div>
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src="/placeholder.svg?height=32&width=32" />
//                     <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
//                       👨‍💼
//                     </AvatarFallback>
//                   </Avatar>
//                 </div> */}
//           <div className="relative" ref={dropdownRef}>
//             {/* Main Profile Button */}
//             <div
//               className="flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
//               onClick={toggleDropdown}
//             >
//               <div className="text-right">
//                 <div className="text-sm font-semibold text-black">
//                   Command Center
//                 </div>
//                 <div className="text-xs text-gray-600">
//                   Executive Leadership
//                 </div>
//               </div>
//               <Avatar className="w-8 h-8">
//                 <AvatarImage src="/placeholder.svg?height=32&width=32" />
//                 <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
//                   👨‍💼
//                 </AvatarFallback>
//               </Avatar>

//               {/* Dropdown Arrow */}
//               <svg
//                 className={`w-4 h-4 text-gray-400 transition-transform ${
//                   isOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </div>

//             {/* Dropdown Menu */}
//             {isOpen && (
//               <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//                 {/* User Info Section */}
//                 <div className="px-4 py-3 border-b border-gray-100">
//                   <div className="flex items-center gap-3">
//                     <Avatar className="w-10 h-10">
//                       <AvatarImage src="/placeholder.svg?height=40&width=40" />
//                       <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
//                         👨‍💼
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="text-sm font-semibold text-gray-900">
//                         {username}
//                       </div>
//                       <div className="text-xs text-gray-600">{post}</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Menu Options */}
//                 <div className="py-1">
//                   <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                     View Profile
//                   </button>

//                   <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                     Settings
//                   </button>

//                   <div className="border-t border-gray-100 my-1"></div>

//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//                   >
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                       />
//                     </svg>
//                     Sign out
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </header>
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
//               Lead Management
//             </h1>
//             <p className="text-sm text-gray-600">
//               Track and manage potential customers
//             </p>
//           </div>
//           <Button
//             onClick={() => setShowForm(true)}
//             className="bg-[#D3FF61] text-black hover:bg-[#C5FF4A]"
//           >
//             <Plus size={16} className="mr-2" />
//             Add Lead
//           </Button>
//         </div>

//         {/* Leads Table */}
//         <DataTable
//           data={leads}
//           columns={columns}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           searchPlaceholder="Search leads..."
//         />

//         {/* Lead Form Modal */}
//         {showForm && <LeadForm lead={editingLead} onClose={handleFormClose} />}
//       </main>
//     </div>
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
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { DataTable } from "../../components/dataTable";
import { useCRM, type Investment, CRMProvider } from "../tasks/crmProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { InvestmentForm } from "../../components/investmentForm";

// Create the actual LeadsPage content component that uses CRM context
function LeadsPageContent() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
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

  const username = "Debajyoti";
  const post = "Executive Leadership";

  const handleLogout = () => {
    setIsOpen(false);
    router.push("/");
  };

  // Custom Avatar components
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

  const [showForm, setShowForm] = useState(false);
  //   const [editingLead, setEditingLead] = useState<Lead | null>(null);
  //   const { leads, deleteLead } = useCRM();
  //   const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { clients, deleteClient } = useCRM();
  //   const [editingService, setEditingService] = useState<Service | null>(null);
  const { services, deleteService } = useCRM();
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(
    null
  );
  const { investments, deleteInvestment } = useCRM();

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment);
    setShowForm(true);
  };

  const handleDelete = (investment: Investment) => {
    if (confirm("Are you sure you want to delete this investment?")) {
      deleteInvestment(investment.id);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingInvestment(null);
  };

  const getStatusBadge = (status: Investment["status"]) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Sold: "bg-gray-100 text-gray-800",
      Pending: "bg-yellow-100 text-yellow-800",
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  const getTypeBadge = (type: Investment["type"]) => {
    const colors = {
      Equity: "bg-blue-100 text-blue-800",
      "Mutual Fund": "bg-purple-100 text-purple-800",
      Bond: "bg-green-100 text-green-800",
      "Real Estate": "bg-orange-100 text-orange-800",
      Crypto: "bg-yellow-100 text-yellow-800",
    };
    return <Badge className={colors[type]}>{type}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getReturnDisplay = (returns: number, percentage: number) => {
    const isPositive = returns >= 0;
    return (
      <div
        className={`flex items-center gap-1 ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <div className="text-right">
          <div className="font-medium">{formatCurrency(returns)}</div>
          <div className="text-xs">({percentage.toFixed(1)}%)</div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      key: "name" as keyof Investment,
      label: "Investment Name",
      sortable: true,
    },
    {
      key: "type" as keyof Investment,
      label: "Type",
      sortable: true,
      render: (value: Investment["type"]) => getTypeBadge(value),
    },
    {
      key: "amount" as keyof Investment,
      label: "Initial Amount",
      sortable: true,
      render: (value: number) => formatCurrency(value),
    },
    {
      key: "currentValue" as keyof Investment,
      label: "Current Value",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">{formatCurrency(value)}</span>
      ),
    },
    {
      key: "returns" as keyof Investment,
      label: "Returns",
      sortable: true,
      render: (value: number, investment: Investment) =>
        getReturnDisplay(value, investment.returnPercentage),
    },
    {
      key: "status" as keyof Investment,
      label: "Status",
      sortable: true,
      render: (value: Investment["status"]) => getStatusBadge(value),
    },
    {
      key: "purchaseDate" as keyof Investment,
      label: "Purchase Date",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  // Calculate portfolio summary
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = investments.reduce(
    (sum, inv) => sum + inv.currentValue,
    0
  );
  const totalReturns = investments.reduce((sum, inv) => sum + inv.returns, 0);
  const overallReturnPercentage =
    totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;
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
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
          >
            <ArrowUpRight size={16} />
            Dashboard
          </Link>

          <Link
            href="/debajyoti/tasks"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
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
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg bg-[#D3FF61] text-black font-helvetica text-xs"
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

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-black mb-2 font-helvetica">
              Investment Portfolio
            </h1>
            <p className="text-sm text-gray-600 font-helvetica-light">
              Track and manage investment performance
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#D3FF61] text-black hover:bg-[#1B2409] hover:text-[#D3FF61] rounded-2xl font-helvetica"
          >
            <Plus size={16} className="mr-2" />
            Add Investment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-black  font-helvetica">
              Total Invested
            </h3>
            <p
              className="text-3xl font-bold text-black font-helvetica"
              font-helvetica
            >
              {formatCurrency(totalInvested)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-black  font-helvetica">
              Current Value
            </h3>
            <p className="text-3xl font-bold text-black font-helvetica">
              {formatCurrency(totalCurrentValue)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-black  font-helvetica">
              Total Returns
            </h3>
            <p
              className={`text-3xl font-helvetica font-bold ${
                totalReturns >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(totalReturns)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-black  font-helvetica">
              Overall Return
            </h3>
            <p
              className={`text-3xl font-helvetica font-bold ${
                overallReturnPercentage >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {overallReturnPercentage.toFixed(1)}%
            </p>
          </div>
        </div>

        <DataTable
          data={investments}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Search investments..."
        />

        {/* Investment Form Modal */}
        {showForm && (
          <InvestmentForm
            investment={editingInvestment}
            onClose={handleFormClose}
          />
        )}
      </main>
    </div>
  );
}

// Main component that wraps everything in CRMProvider
export default function LeadsPage() {
  return (
    <CRMProvider>
      <LeadsPageContent />
    </CRMProvider>
  );
}
