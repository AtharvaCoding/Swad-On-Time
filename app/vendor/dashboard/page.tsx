"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Utensils,
  ClipboardList,
  Settings,
  LogOut,
  Bell,
  User,
  ChevronDown,
  Clock,
  ArrowUpRight,
  Camera,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for orders
const orders = [
  {
    id: "ORD12345",
    customer: "Rahul S.",
    items: [
      { name: "Veg Momos (6 pcs)", quantity: 1 },
      { name: "Masala Tea", quantity: 1 },
    ],
    total: 110,
    status: "pending",
    time: "5 min ago",
  },
  {
    id: "ORD12346",
    customer: "Priya M.",
    items: [
      { name: "Special Thali", quantity: 1 },
      { name: "Masala Tea", quantity: 2 },
    ],
    total: 240,
    status: "preparing",
    time: "15 min ago",
  },
  {
    id: "ORD12347",
    customer: "Amit K.",
    items: [{ name: "Chicken Momos (6 pcs)", quantity: 2 }],
    total: 240,
    status: "ready",
    time: "25 min ago",
  },
  {
    id: "ORD12348",
    customer: "Neha G.",
    items: [
      { name: "Veg Fried Rice", quantity: 1 },
      { name: "Paneer Momos (6 pcs)", quantity: 1 },
    ],
    total: 220,
    status: "completed",
    time: "1 hour ago",
  },
  {
    id: "ORD12349",
    customer: "Vikram S.",
    items: [{ name: "Veg Thali", quantity: 2 }],
    total: 300,
    status: "completed",
    time: "2 hours ago",
  },
]

// Stats data
const statsData = {
  todayOrders: 12,
  todayRevenue: 2450,
  pendingOrders: 2,
  avgPrepTime: 18,
}

export default function VendorDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = activeTab === "all" ? orders : orders.filter((order) => order.status === activeTab)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pending</Badge>
      case "preparing":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Preparing</Badge>
      case "ready":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ready</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Utensils className="h-6 w-6 text-orange-600" />
              <h1 className="text-xl font-bold text-orange-600">SwadOnTime</h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/vendor/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/vendor/menu">
                        <Utensils />
                        <span>Menu Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/vendor/ocr-menu">
                        <Camera />
                        <span>OCR Menu Upload</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/vendor/orders">
                        <ClipboardList />
                        <span>Order History</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/vendor/settings">
                        <Settings />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-col h-full">
            {/* Header */}
            <header className="bg-white shadow-sm p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Vendor Dashboard</h1>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>

                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="font-medium">Spice Delight</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                  title="Today's Orders"
                  value={statsData.todayOrders}
                  icon={<ClipboardList className="h-5 w-5 text-blue-600" />}
                  trend="+20%"
                />

                <StatCard
                  title="Today's Revenue"
                  value={`₹${statsData.todayRevenue}`}
                  icon={<ArrowUpRight className="h-5 w-5 text-green-600" />}
                  trend="+15%"
                />

                <StatCard
                  title="Pending Orders"
                  value={statsData.pendingOrders}
                  icon={<Clock className="h-5 w-5 text-orange-600" />}
                  trend="0%"
                />

                <StatCard
                  title="Avg. Prep Time"
                  value={`${statsData.avgPrepTime} min`}
                  icon={<Clock className="h-5 w-5 text-purple-600" />}
                  trend="-5%"
                />
              </div>

              {/* Orders Section */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Recent Orders</CardTitle>
                </CardHeader>

                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All Orders</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="preparing">Preparing</TabsTrigger>
                      <TabsTrigger value="ready">Ready</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-0">
                      <div className="space-y-4">
                        {filteredOrders.length > 0 ? (
                          filteredOrders.map((order) => (
                            <OrderCard key={order.id} order={order} getStatusBadge={getStatusBadge} />
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">No orders found in this category</div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  trend: string
}) {
  const isTrendPositive = trend.startsWith("+")
  const isTrendNeutral = trend === "0%"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
        </div>

        <div className="mt-4 flex items-center">
          <span
            className={`text-sm font-medium ${
              isTrendNeutral ? "text-gray-500" : isTrendPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend}
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last week</span>
        </div>
      </CardContent>
    </Card>
  )
}

function OrderCard({
  order,
  getStatusBadge,
}: {
  order: (typeof orders)[0]
  getStatusBadge: (status: string) => React.ReactNode
}) {
  const [status, setStatus] = useState(order.status)

  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
  }

  const getActionButtons = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={() => updateStatus("preparing")}
            >
              Start Preparing
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50"
              onClick={() => updateStatus("cancelled")}
            >
              Cancel
            </Button>
          </div>
        )
      case "preparing":
        return (
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => updateStatus("ready")}
          >
            Mark as Ready
          </Button>
        )
      case "ready":
        return (
          <Button
            size="sm"
            className="bg-gray-600 hover:bg-gray-700 text-white"
            onClick={() => updateStatus("completed")}
          >
            Complete Order
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">Order #{order.id}</h3>
              {getStatusBadge(status)}
            </div>

            <p className="text-sm text-gray-500 mb-1">Customer: {order.customer}</p>

            <div className="text-sm">
              {order.items.map((item, index) => (
                <div key={index}>
                  {item.quantity}x {item.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <div className="text-lg font-bold">₹{order.total}</div>
            <div className="text-sm text-gray-500">{order.time}</div>

            {getActionButtons()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
