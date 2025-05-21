"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, CheckCircle2, ChefHat, Truck, HomeIcon, History, QrCode } from "lucide-react"

// Mock order data
const orderData = {
  id: "ORD12345",
  restaurant: {
    id: "spice-delight",
    name: "Spice Delight",
    address: "123 Food Street, Foodville",
  },
  items: [
    { name: "Veg Momos (6 pcs)", quantity: 1, price: 80 },
    { name: "Chicken Momos (6 pcs)", quantity: 2, price: 240 },
  ],
  total: 340,
  status: "preparing", // confirmed, preparing, ready, completed
  estimatedTime: 15, // minutes
  queuePosition: 3,
  placedAt: new Date().toISOString(),
}

export default function OrderStatusPage() {
  const searchParams = useSearchParams()
  const vendorId = searchParams.get("vendorId") || "spice-delight"

  const [order, setOrder] = useState(orderData)
  const [progress, setProgress] = useState(25)
  const [timeRemaining, setTimeRemaining] = useState(order.estimatedTime)
  const [queuePosition, setQueuePosition] = useState(order.queuePosition)

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })

      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setOrder((prev) => ({ ...prev, status: "ready" }))
          return 100
        }
        return prev + 100 / ((order.estimatedTime * 60) / 5)
      })

      // Update queue position
      if (queuePosition > 0 && Math.random() > 0.7) {
        setQueuePosition((prev) => Math.max(0, prev - 1))
      }

      // Update order status based on progress
      if (progress > 25 && progress <= 75 && order.status !== "preparing") {
        setOrder((prev) => ({ ...prev, status: "preparing" }))
      } else if (progress > 75 && order.status !== "ready") {
        setOrder((prev) => ({ ...prev, status: "ready" }))
      }
    }, 5000) // Update every 5 seconds for demo purposes

    return () => clearInterval(timer)
  }, [order.estimatedTime, order.status, progress, queuePosition])

  const getStatusText = () => {
    switch (order.status) {
      case "confirmed":
        return "Order Confirmed"
      case "preparing":
        return "Preparing Your Order"
      case "ready":
        return "Order Ready for Pickup"
      case "completed":
        return "Order Completed"
      default:
        return "Processing Order"
    }
  }

  const getStatusIcon = () => {
    switch (order.status) {
      case "confirmed":
        return <Clock className="h-8 w-8 text-blue-500" />
      case "preparing":
        return <ChefHat className="h-8 w-8 text-orange-500" />
      case "ready":
        return <Truck className="h-8 w-8 text-green-500" />
      case "completed":
        return <CheckCircle2 className="h-8 w-8 text-green-600" />
      default:
        return <Clock className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 landscape-header">
        <div className="container mx-auto p-4">
          <div className="flex items-center">
            <Link href="/customer/home" className="text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="ml-4 text-xl font-bold">Order Status</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <div className="space-y-4 max-w-md mx-auto">
          {/* Status Card */}
          <Card className="border-t-4 border-t-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{getStatusText()}</h2>
                  <p className="text-gray-500">Order #{order.id}</p>
                </div>
                {getStatusIcon()}
              </div>

              <Progress value={progress} className="h-2 mb-2" />

              <div className="flex justify-between text-sm text-gray-500 mb-6">
                <span>Order Placed</span>
                <span>Preparing</span>
                <span>Ready</span>
              </div>

              {queuePosition > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg text-center mb-4">
                  <p className="text-blue-800 font-medium">Your position in queue</p>
                  <p className="text-3xl font-bold text-blue-900">{queuePosition}</p>
                </div>
              )}

              {timeRemaining > 0 ? (
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <p className="text-orange-800 font-medium">Estimated time remaining</p>
                  <p className="text-2xl font-bold text-orange-900">{timeRemaining} minutes</p>
                </div>
              ) : (
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-green-800 font-medium">Your order is ready!</p>
                  <p className="text-green-900">Please collect it from the counter</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{order.restaurant.name}</h3>
              <p className="text-sm text-gray-500">{order.restaurant.address}</p>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-3">Order Summary</h3>

              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>₹{item.price}</span>
                  </div>
                ))}

                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 border-orange-600 text-orange-600 hover:bg-orange-50">
              Contact Shop
            </Button>
            <Link href="/customer/home" className="flex-1">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">New Order</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3">
        <div className="container mx-auto">
          <div className="flex justify-around">
            <Link href="/customer/home">
              <Button variant="ghost" className="flex flex-col items-center">
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
              <Button variant="ghost" className="flex flex-col items-center text-orange-600">
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
