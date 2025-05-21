"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Camera,
  Upload,
  Loader2,
  Check,
  X,
  Edit,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock categories
const categories = ["Momos", "Thali", "Chinese", "Beverages"]

// Mock OCR result
const mockOcrResult = [
  { name: "Veg Momos", price: "80", category: "Momos", isVeg: true },
  { name: "Paneer Momos", price: "100", category: "Momos", isVeg: true },
  { name: "Chicken Momos", price: "120", category: "Momos", isVeg: false },
  { name: "Veg Fried Rice", price: "120", category: "Chinese", isVeg: true },
  { name: "Masala Tea", price: "30", category: "Beverages", isVeg: true },
]

type MenuItemType = {
  name: string
  price: string
  category: string
  isVeg: boolean
  description?: string
}

export default function OcrMenuPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<"upload" | "processing" | "review" | "success">("upload")
  const [image, setImage] = useState<string | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
        setStep("processing")

        // Simulate OCR processing
        setTimeout(() => {
          setMenuItems(mockOcrResult)
          setStep("review")
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleEditItem = (index: number) => {
    setEditingIndex(index)
  }

  const handleUpdateItem = (index: number, field: keyof MenuItemType, value: string | boolean) => {
    setMenuItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleDeleteItem = (index: number) => {
    setMenuItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddItem = () => {
    setMenuItems((prev) => [...prev, { name: "", price: "", category: categories[0], isVeg: true, description: "" }])
    setEditingIndex(menuItems.length)
  }

  const handleSaveMenu = () => {
    // In a real app, we would save the menu to the backend
    setStep("success")
    setTimeout(() => {
      router.push("/vendor/menu")
    }, 2000)
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
                    <SidebarMenuButton asChild>
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
                    <SidebarMenuButton asChild isActive>
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
              <h1 className="text-xl font-bold">OCR Menu Upload</h1>

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
              <Card>
                <CardHeader>
                  <CardTitle>Upload Menu Image for OCR</CardTitle>
                </CardHeader>
                <CardContent>
                  {step === "upload" && (
                    <div className="flex flex-col items-center">
                      <div
                        className="w-full max-w-md h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors mb-6"
                        onClick={handleCameraClick}
                      >
                        <Camera className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-gray-500 mb-1">Take a photo of your menu or upload an image</p>
                        <p className="text-sm text-gray-400">Supports JPG, PNG</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleCameraClick}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Menu Image
                      </Button>
                    </div>
                  )}

                  {step === "processing" && (
                    <div className="flex flex-col items-center">
                      {image && (
                        <div className="w-full max-w-md mb-6">
                          <img src={image || "/placeholder.svg"} alt="Menu" className="w-full rounded-lg shadow-md" />
                        </div>
                      )}
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-8 w-8 text-orange-600 animate-spin mb-2" />
                        <p className="text-gray-700 font-medium">Processing your menu...</p>
                        <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
                      </div>
                    </div>
                  )}

                  {step === "review" && (
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Review Extracted Menu Items</h3>
                          <p className="text-sm text-gray-500">
                            We've extracted {menuItems.length} items from your menu. Please review and edit if needed.
                          </p>
                        </div>
                        {image && (
                          <div className="relative">
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                              onClick={() => setImage(null)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            <img
                              src={image || "/placeholder.svg"}
                              alt="Menu"
                              className="w-24 h-24 object-cover rounded-md shadow-sm"
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-4 mb-6">
                        {menuItems.map((item, index) => (
                          <Card key={index} className="overflow-hidden">
                            <CardContent className="p-4">
                              {editingIndex === index ? (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor={`name-${index}`}>Item Name</Label>
                                      <Input
                                        id={`name-${index}`}
                                        value={item.name}
                                        onChange={(e) => handleUpdateItem(index, "name", e.target.value)}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`price-${index}`}>Price (₹)</Label>
                                      <Input
                                        id={`price-${index}`}
                                        value={item.price}
                                        onChange={(e) => handleUpdateItem(index, "price", e.target.value)}
                                        className="mt-1"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor={`category-${index}`}>Category</Label>
                                      <Select
                                        value={item.category}
                                        onValueChange={(value) => handleUpdateItem(index, "category", value)}
                                      >
                                        <SelectTrigger className="mt-1">
                                          <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                              {category}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="flex items-end">
                                      <div className="flex items-center space-x-2 h-10">
                                        <Checkbox
                                          id={`isVeg-${index}`}
                                          checked={item.isVeg}
                                          onCheckedChange={(checked) =>
                                            handleUpdateItem(index, "isVeg", checked === true)
                                          }
                                        />
                                        <Label htmlFor={`isVeg-${index}`}>Vegetarian</Label>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                                    <Textarea
                                      id={`description-${index}`}
                                      value={item.description || ""}
                                      onChange={(e) => handleUpdateItem(index, "description", e.target.value)}
                                      className="mt-1"
                                      placeholder="Add a description for this item"
                                    />
                                  </div>

                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setEditingIndex(null)}>
                                      Cancel
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-orange-600 hover:bg-orange-700 text-white"
                                      onClick={() => setEditingIndex(null)}
                                    >
                                      Save
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`w-3 h-3 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"}`}
                                      ></div>
                                      <h3 className="font-semibold">{item.name}</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">₹{item.price}</p>
                                    <p className="text-gray-500 text-xs">{item.category}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleEditItem(index)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                      onClick={() => handleDeleteItem(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={handleAddItem}>
                          Add Item Manually
                        </Button>
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleSaveMenu}>
                          Save Menu
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === "success" && (
                    <div className="flex flex-col items-center py-8">
                      <div className="bg-green-100 p-3 rounded-full mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Menu Updated Successfully!</h3>
                      <p className="text-gray-500 mb-6">Your menu has been updated with {menuItems.length} items.</p>
                      <p className="text-sm text-gray-500">Redirecting to menu management...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
