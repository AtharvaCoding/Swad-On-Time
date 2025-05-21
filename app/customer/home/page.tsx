"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, QrCode, Search, MapPin, Star, Clock, History, HomeIcon } from "lucide-react"

// Mock data for restaurants
const restaurants = [
  {
    id: "spice-delight",
    name: "Spice Delight",
    cuisine: "North Indian, Chinese",
    rating: 4.5,
    distance: "1.2 km",
    preparationTime: "15-20 min",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: "momo-house",
    name: "Momo House",
    cuisine: "Tibetan, Chinese",
    rating: 4.2,
    distance: "0.8 km",
    preparationTime: "10-15 min",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: "punjabi-dhaba",
    name: "Punjabi Dhaba",
    cuisine: "North Indian",
    rating: 4.0,
    distance: "2.1 km",
    preparationTime: "20-25 min",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: "chinese-wok",
    name: "Chinese Wok",
    cuisine: "Chinese, Thai",
    rating: 3.9,
    distance: "1.5 km",
    preparationTime: "15-20 min",
    image: "/placeholder.svg?height=120&width=120",
  },
]

// Mock data for recent orders
const recentOrders = [
  {
    id: "ORD12345",
    restaurant: "Spice Delight",
    items: ["Veg Momos (6 pcs)", "Masala Tea"],
    total: 110,
    status: "Completed",
    date: "Yesterday",
  },
  {
    id: "ORD12346",
    restaurant: "Momo House",
    items: ["Chicken Momos (6 pcs)", "Veg Fried Rice"],
    total: 240,
    status: "Completed",
    date: "3 days ago",
  },
]

export default function CustomerHome() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("restaurants")

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 landscape-header">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-orange-600">SwadOnTime</h1>
            <Link href="/customer/scan">
              <Button variant="ghost" size="icon" className="rounded-full">
                <QrCode className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              className="pl-10 bg-gray-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="restaurants"
              className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600"
            >
              <HomeIcon className="h-4 w-4 mr-2" />
              Restaurants
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600"
            >
              <History className="h-4 w-4 mr-2" />
              Order History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants" className="mt-0">
            <div className="space-y-4">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant) => (
                  <Link key={restaurant.id} href={`/customer/menu/${restaurant.id}`}>
                    <RestaurantCard restaurant={restaurant} />
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No restaurants found. Try a different search term.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => <OrderHistoryCard key={order.id} order={order} />)
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No order history yet.</p>
                  <Button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white">Browse Restaurants</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3">
        <div className="container mx-auto">
          <div className="flex justify-around">
            <Link href="/customer/home">
              <Button variant="ghost" className="flex flex-col items-center text-orange-600">
                <HomeIcon className="h-5 w-5" />
                <span className="text-xs mt-1">Home</span>
              </Button>
            </Link>
            <Link href="/customer/scan">
              <Button variant="ghost" className="flex flex-col items-center">
                <QrCode className="h-5 w-5" />
                <span className="text-xs mt-1">Scan</span>
              </Button>
            </Link>
            <Link href="/customer/orders">
              <Button variant="ghost" className="flex flex-col items-center">
                <History className="h-5 w-5" />
                <span className="text-xs mt-1">Orders</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function RestaurantCard({ restaurant }: { restaurant: (typeof restaurants)[0] }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex p-4">
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-lg">{restaurant.name}</h3>
            <p className="text-gray-500 text-sm">{restaurant.cuisine}</p>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <div className="flex items-center mr-3">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center mr-3">
                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                <span>{restaurant.distance}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span>{restaurant.preparationTime}</span>
              </div>
            </div>
          </div>
          <div className="w-20 h-20 rounded-md overflow-hidden">
            <img
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function OrderHistoryCard({ order }: { order: (typeof recentOrders)[0] }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{order.restaurant}</h3>
          <Badge
            variant="outline"
            className={
              order.status === "Completed"
                ? "border-green-500 text-green-600"
                : order.status === "Ready"
                  ? "border-orange-500 text-orange-600"
                  : "border-blue-500 text-blue-600"
            }
          >
            {order.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mb-2">{order.date}</p>
        <div className="text-sm mb-3">
          {order.items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">₹{order.total}</span>
          <Link href={`/customer/order-details/${order.id}`}>
            <Button variant="outline" size="sm" className="text-orange-600 border-orange-600 hover:bg-orange-50">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
