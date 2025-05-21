"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ShoppingCart, Plus, Minus, Search, HomeIcon, History, QrCode } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for the restaurant
const restaurantData = {
  id: "spice-delight",
  name: "Spice Delight",
  rating: 4.5,
  cuisine: "North Indian, Chinese",
  preparationTime: "15-20 min",
  address: "123 Food Street, Foodville",
  categories: ["Recommended", "Momos", "Thali", "Chinese", "Beverages"],
  menu: [
    {
      id: "item1",
      name: "Veg Momos (6 pcs)",
      description: "Steamed dumplings filled with mixed vegetables and spices",
      price: 80,
      image: "/placeholder.svg?height=120&width=120",
      category: "Momos",
      isVeg: true,
      isRecommended: true,
    },
    {
      id: "item2",
      name: "Paneer Momos (6 pcs)",
      description: "Steamed dumplings with spiced cottage cheese filling",
      price: 100,
      image: "/placeholder.svg?height=120&width=120",
      category: "Momos",
      isVeg: true,
      isRecommended: true,
    },
    {
      id: "item3",
      name: "Chicken Momos (6 pcs)",
      description: "Steamed dumplings with minced chicken filling",
      price: 120,
      image: "/placeholder.svg?height=120&width=120",
      category: "Momos",
      isVeg: false,
      isRecommended: true,
    },
    {
      id: "item4",
      name: "Veg Thali",
      description: "Complete meal with rice, dal, 2 sabzis, roti, salad and dessert",
      price: 150,
      image: "/placeholder.svg?height=120&width=120",
      category: "Thali",
      isVeg: true,
      isRecommended: false,
    },
    {
      id: "item5",
      name: "Special Thali",
      description: "Deluxe thali with paneer, rice, dal, 2 sabzis, roti, salad and dessert",
      price: 180,
      image: "/placeholder.svg?height=120&width=120",
      category: "Thali",
      isVeg: true,
      isRecommended: true,
    },
    {
      id: "item6",
      name: "Veg Fried Rice",
      description: "Stir-fried rice with mixed vegetables and soy sauce",
      price: 120,
      image: "/placeholder.svg?height=120&width=120",
      category: "Chinese",
      isVeg: true,
      isRecommended: false,
    },
    {
      id: "item7",
      name: "Masala Tea",
      description: "Traditional Indian spiced tea",
      price: 30,
      image: "/placeholder.svg?height=120&width=120",
      category: "Beverages",
      isVeg: true,
      isRecommended: false,
    },
  ],
}

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  isVeg: boolean
}

export default function MenuPage({ params }: { params: { vendorId: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("Recommended")
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLandscape, setIsLandscape] = useState(false)

  // Check for landscape orientation
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    checkOrientation()
    window.addEventListener("resize", checkOrientation)

    return () => {
      window.removeEventListener("resize", checkOrientation)
    }
  }, [])

  // Filter menu items based on active tab and search query
  const filteredItems = restaurantData.menu.filter((item) => {
    const matchesCategory = activeTab === "Recommended" ? item.isRecommended : item.category === activeTab

    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const addToCart = (item: (typeof restaurantData.menu)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [
          ...prevCart,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            isVeg: item.isVeg,
          },
        ]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId)

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.id !== itemId)
      }
    })
  }

  const getItemQuantityInCart = (itemId: string) => {
    const item = cart.find((item) => item.id === itemId)
    return item ? item.quantity : 0
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const proceedToCheckout = () => {
    router.push(`/customer/cart?vendorId=${params.vendorId}`)
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
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-bold">{restaurantData.name}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">{restaurantData.cuisine}</span>
                <span>•</span>
                <span className="mx-2">{restaurantData.preparationTime}</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for dishes..."
              className="pl-10 bg-gray-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Menu Categories Tabs */}
      <div className="bg-white shadow-sm sticky top-[116px] z-10">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full h-auto overflow-x-auto flex justify-start p-0 bg-transparent landscape-content">
              {restaurantData.categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600 data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Menu Items */}
      <main className="flex-1 container mx-auto p-4 pb-24">
        {filteredItems.length > 0 ? (
          <div className={`grid gap-4 ${isLandscape ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className={`flex ${isLandscape ? "flex-col" : "p-4"}`}>
                    {isLandscape && (
                      <div className="w-full h-32 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={`${isLandscape ? "p-4" : "flex-1 pr-4"}`}>
                      <div className="flex items-center mb-1">
                        {item.isVeg ? (
                          <Badge variant="outline" className="border-green-500 text-green-600 mr-2">
                            Veg
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-red-500 text-red-600 mr-2">
                            Non-veg
                          </Badge>
                        )}
                        {item.isRecommended && (
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            Bestseller
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">₹{item.price}</p>
                      <p className="text-gray-600 text-sm">{item.description}</p>

                      <div className="mt-3">
                        {getItemQuantityInCart(item.id) > 0 ? (
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-3 font-medium">{getItemQuantityInCart(item.id)}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            className="h-8 px-4 border-orange-600 text-orange-600 hover:bg-orange-50"
                            onClick={() => addToCart(item)}
                          >
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                    {!isLandscape && (
                      <div className="w-24 h-24 rounded-md overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found. Try a different category or search term.</p>
          </div>
        )}
      </main>

      {/* Cart Footer */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </div>
                <div className="text-lg font-bold">₹{totalAmount}</div>
              </div>
              <Button onClick={proceedToCheckout} className="bg-orange-600 hover:bg-orange-700 text-white">
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Cart
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation (only visible when cart is empty) */}
      {totalItems === 0 && (
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
