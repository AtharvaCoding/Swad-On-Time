"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Minus, Trash2, CreditCard, HomeIcon, History, QrCode } from "lucide-react"

// Mock cart data (in a real app, this would come from state management or localStorage)
const cartItems = [
  { id: "item1", name: "Veg Momos (6 pcs)", price: 80, quantity: 1, isVeg: true },
  { id: "item3", name: "Chicken Momos (6 pcs)", price: 120, quantity: 2, isVeg: false },
]

const restaurantData = {
  id: "spice-delight",
  name: "Spice Delight",
  address: "123 Food Street, Foodville",
  preparationTime: "15-20 min",
}

export default function CartPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const vendorId = searchParams.get("vendorId") || "spice-delight"

  const [items, setItems] = useState(cartItems)
  const [paymentMethod, setPaymentMethod] = useState("upi")

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 20
  const taxes = Math.round(subtotal * 0.05) // 5% tax
  const total = subtotal + deliveryFee + taxes

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems(items.filter((item) => item.id !== itemId))
    } else {
      setItems(items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const placeOrder = () => {
    // In a real app, we would send the order to the backend
    router.push(`/customer/order-status?vendorId=${vendorId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 landscape-header">
        <div className="container mx-auto p-4">
          <div className="flex items-center">
            <Link href={`/customer/menu/${vendorId}`} className="text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="ml-4 text-xl font-bold">Your Cart</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 pb-24">
        {items.length > 0 ? (
          <div className="space-y-4">
            {/* Restaurant Info */}
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg">{restaurantData.name}</h2>
                <p className="text-sm text-gray-500">{restaurantData.address}</p>
                <p className="text-sm text-gray-500">Prep time: {restaurantData.preparationTime}</p>
              </CardContent>
            </Card>

            {/* Cart Items */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="font-semibold text-lg">Order Items</h2>

                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${item.isVeg ? "bg-green-500" : "bg-red-500"}`}></div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">₹{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500"
                        onClick={() => updateQuantity(item.id, 0)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center ml-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="ml-4 font-semibold w-16 text-right">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-3">Payment Method</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                      UPI Payment
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Bill Details */}
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-3">Bill Details</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item Total</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes and Charges</span>
                    <span>₹{taxes}</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add items from the menu to place an order</p>
            <Link href={`/customer/menu/${vendorId}`}>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">Browse Menu</Button>
            </Link>
          </div>
        )}
      </main>

      {/* Place Order Footer */}
      {items.length > 0 ? (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">{items.reduce((sum, item) => sum + item.quantity, 0)} items</div>
                <div className="text-lg font-bold">₹{total}</div>
              </div>
              <Button onClick={placeOrder} className="bg-orange-600 hover:bg-orange-700 text-white">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      ) : (
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
                <Button variant="ghost" className="flex flex-col items-center">
                  <History className="h-5 w-5" />
                  <span className="text-xs mt-1">Orders</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
