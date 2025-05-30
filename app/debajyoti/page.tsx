"use client";

import {
  ArrowUpRight,
  Search,
  CheckSquare,
  Users,
  Building2,
  Briefcase,
  BarChart3,
  LogOut,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/dashboard-ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useRef } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button"
import { TrendingUp, Target, ArrowDownRight, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString("en-GB", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${day} ${month} ${year}\n${time}`;
  };

  const dashboardData = [
    {
      number: "24",
      title: "Active Leads",
      description: "Leads in your pipeline requiring follow-up",
      percentage: 75,
      increase: "Increase",
    },
    {
      number: "12",
      title: "Tasks",
      description: "Tasks to complete this week",
      percentage: 75,
      increase: "Increase",
    },
    {
      number: "24",
      title: "Service requests",
      description: "Client service requests to resolve",
      percentage: 75,
      increase: "Increase",
    },
  ];

  const kpiData = [
    { title: "Total AUM", value: "₹2.4B", change: "+12.5%", trend: "up" },
    { title: "Monthly SIPs", value: "₹45.2M", change: "+8.3%", trend: "up" },
    { title: "Client Retention", value: "94.2%", change: "+2.1%", trend: "up" },
    {
      title: "Active Clients",
      value: "12,847",
      change: "-1.2%",
      trend: "down",
    },
  ];

  const departmentData = [
    { name: "Equity", performance: 85, target: 80 },
    { name: "Mutual Funds", performance: 92, target: 85 },
    { name: "Insurance", performance: 78, target: 75 },
    { name: "Fixed Deposits", performance: 88, target: 90 },
  ];

  const growthData = [
    { month: "Jan", aum: 2.1, sip: 38 },
    { month: "Feb", aum: 2.2, sip: 41 },
    { month: "Mar", aum: 2.3, sip: 43 },
    { month: "Apr", aum: 2.4, sip: 45 },
  ];

  const rmDistribution = [
    { name: "Top Performers", value: 35, color: "#D3FF61" },
    { name: "Good Performers", value: 45, color: "#1B2409" },
    { name: "Needs Improvement", value: 20, color: "#F4FFD7" },
  ];

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

  const handleLogout = () => {
    setIsOpen(false);
    // Navigate to base route
    router.push("/");
  };

  const username = "Debajyoti";
  const post = "Executive Leadership";

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
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg bg-[#D3FF61] text-black font-helvetica text-xs"
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
            href=" /debajyoti/invest"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
          >
            <BarChart3 size={16} />
            Invest
          </Link>

          <Link
            href=" /debajyoti/calender"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
          >
            <Calendar size={16} />
            Calender
          </Link>
          
          {/* <Link
            href=" /debajyoti/analytics"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
          >
            < TrendingUp size={16} />
            Analytics
          </Link>
          <Link
            href=" /debajyoti/export"
            className="flex items-center gap-3 px-10 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-xs font-helvetica-light"
          >
            <Download size={16} />
            Export
          </Link> */}
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
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

        {/* Welcome Section and Date */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm text-gray-600 mb-1 font-helvetica-light">
              Welcome back,
            </div>
            <h1 className="text-4xl font-helvetica  text-black">Debajyoti</h1>
          </div>

          <div className="text-right">
            <div className="text-lg  text-black whitespace-pre-line font-helvetica">
              {formatDateTime(currentTime)}
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                  <CardTitle className="text-sm font-medium font-helvetica"></CardTitle>
                  {kpi.trend === "up" ? (
                    <div className="bg-[#D3FF61] rounded-full ">
                      <ArrowUpRight className="h-10 w-10 text-[#1B2409] text-lg" />
                    </div>
                  ) : (
                    <div className="bg-red-100 rounded-full ">
                      <ArrowDownRight className="h-10 w-10 text-red-600" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="text-5xl  font-helvetica">{kpi.value}</div>
                  <p className="text-sm font-helvetica-light font-bold pl-2 pb-3">
                    {kpi.title}
                  </p>

                  <p
                    className={`text-xs font-helvetica-light ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {kpi.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            {/* Department Performance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-helvetica text-xl ">
                  Department Performance
                </CardTitle>
                <CardDescription>
                  Performance vs Target by Department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="performance"
                      fill="#D3FF61"
                      name="Performance"
                    />
                    <Bar dataKey="target" fill="#1B2409" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Growth Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="font-helvetica text-xl ">
                  Growth Trends
                </CardTitle>
                <CardDescription>AUM and SIP Growth Over Time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="aum"
                      stroke="#D3FF61"
                      name="AUM (₹B)"
                    />
                    <Line
                      type="monotone"
                      dataKey="sip"
                      stroke="#1B2409"
                      name="SIP (₹M)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* RM Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="font-helvetica text-xl ">
                  RM Performance Distribution
                </CardTitle>
                <CardDescription>
                  Performance categorization of RMs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={rmDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {rmDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {rmDistribution.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full border-1 border-black"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-helvetica font-medium">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-helvetica text-xl ">
                  Quick Actions
                </CardTitle>
                <CardDescription>Executive tools and reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 font-helvetica-light">
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Monthly Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  View All Business Heads
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Set Quarterly Targets
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Performance Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-helvetica text-xl ">
                  Recent Alerts
                </CardTitle>
                <CardDescription>
                  Important notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 font-helvetica-light">
                <div className="flex items-start space-x-3">
                  <Badge variant="destructive" className="font-helvetica">
                    High
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium font-helvetica">
                      SLA Breach Alert
                    </p>
                    <p className="text-xs text-gray-600">
                      3 service requests overdue
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary">Medium</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Target Achievement</p>
                    <p className="text-xs text-gray-600">
                      Q1 targets 85% achieved
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline">Low</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New Client Onboarding</p>
                    <p className="text-xs text-gray-600">
                      15 new clients this week
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Client Button */}
        {/* <Button
          variant="outline"
          className="rounded-full px-6 py-2 border-2 border-black text-black hover:bg-black hover:text-white font-medium"
        >
          Add Client
        </Button> */}
      </main>
    </div>
  );
}
