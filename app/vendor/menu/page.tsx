"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
  Plus,
  Search,
  Camera,
} from "lucide-react"
import { useRouter } from "next/navigation"
import MenuItemCard from "@/components/MenuItemCard" // Import MenuItemCard component

// Mock data for menu items
const initialMenuItems = [
  {
    id: "item1",
    name: "Veg Momos (6 pcs)",
    description: "Steamed dumplings filled with mixed vegetables and spices",
    price: 80,
    image: "/placeholder.svg?height=120&width=120",
    category: "Momos",
    isVeg: true,
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
    isRecommended: false,
  },
]

const categories = ["All", "Momos", "Thali", "Chinese", "Beverages"]

export default function VendorMenu() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [editingItem, setEditingItem] = useState<(typeof initialMenuItems)[0] | null>(null)
  const [isLandscape, setIsLandscape] = useState(false)

  // Check for landscape orientation
  useState(() => {
    if (typeof window !== "undefined") {
      setIsLandscape(window.innerWidth > window.innerHeight)

      const handleResize = () => {
        setIsLandscape(window.innerWidth > window.innerHeight)
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  })

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeTab === "All" || item.category === activeTab
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const handleLogout = () => {
    router.push("/")
  }

  const toggleItemAvailability = (itemId: string) => {
    setMenuItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item)),
    )
  }

  const toggleItemRecommended = (itemId: string) => {
    setMenuItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, isRecommended: !item.isRecommended } : item)),
    )
  }

  const deleteItem = (itemId: string) => {
    setMenuItems((items) => items.filter((item) => item.id !== itemId))
  }

  const handleEditItem = (item: (typeof initialMenuItems)[0]) => {
    setEditingItem({ ...item })
  }

  const handleSaveItem = () => {
    if (!editingItem) return

    if (editingItem.id) {
      // Update existing item
      setMenuItems((items) => items.map((item) => (item.id === editingItem.id ? editingItem : item)))
    } else {
      // Add new item
      const newItem = {
        ...editingItem,
        id: `item${Date.now()}`,
      }
      setMenuItems((items) => [...items, newItem])
    }

    setEditingItem(null)
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
                    <SidebarMenuButton asChild isActive>
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
              <h1 className="text-xl font-bold">Menu Management</h1>

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
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search menu items..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Link href="/vendor/ocr-menu">
                    <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                      <Camera className="mr-2 h-4 w-4" />
                      OCR Upload
                    </Button>
                  </Link>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                        onClick={() =>
                          setEditingItem({
                            id: "",
                            name: "",
                            description: "",
                            price: 0,
                            image: "/placeholder.svg?height=120&width=120",
                            category: "Momos",
                            isVeg: true,
                            isAvailable: true,
                            isRecommended: false,
                          })
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{editingItem?.id ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
                      </DialogHeader>

                      {editingItem && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={editingItem.name}
                              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                              className="col-span-3"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                              Price (₹)
                            </Label>
                            <Input
                              id="price"
                              type="number"
                              value={editingItem.price}
                              onChange={(e) =>
                                setEditingItem({ ...editingItem, price: Number.parseInt(e.target.value) || 0 })
                              }
                              className="col-span-3"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              value={editingItem.description}
                              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                              className="col-span-3"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                              Category
                            </Label>
                            <Select
                              value={editingItem.category}
                              onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories
                                  .filter((cat) => cat !== "All")
                                  .map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="text-right">Type</div>
                            <div className="flex items-center space-x-2 col-span-3">
                              <Checkbox
                                id="isVeg"
                                checked={editingItem.isVeg}
                                onCheckedChange={(checked) =>
                                  setEditingItem({ ...editingItem, isVeg: checked === true })
                                }
                              />
                              <label
                                htmlFor="isVeg"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Vegetarian
                              </label>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="text-right">Availability</div>
                            <div className="flex items-center space-x-2 col-span-3">
                              <Checkbox
                                id="isAvailable"
                                checked={editingItem.isAvailable}
                                onCheckedChange={(checked) =>
                                  setEditingItem({ ...editingItem, isAvailable: checked === true })
                                }
                              />
                              <label
                                htmlFor="isAvailable"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Available
                              </label>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="text-right">Featured</div>
                            <div className="flex items-center space-x-2 col-span-3">
                              <Checkbox
                                id="isRecommended"
                                checked={editingItem.isRecommended}
                                onCheckedChange={(checked) =>
                                  setEditingItem({ ...editingItem, isRecommended: checked === true })
                                }
                              />
                              <label
                                htmlFor="isRecommended"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Recommended
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleSaveItem}>
                            Save
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  <div
                    className={`grid gap-6 ${isLandscape ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
                  >
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          onToggleAvailability={toggleItemAvailability}
                          onToggleRecommended={toggleItemRecommended}
                          onEdit={handleEditItem}
                          onDelete={deleteItem}
                          isLandscape={isLandscape}
                        />
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-12 text-gray-500">
                        No menu items found in this category
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </SidebarInset>
      </div>

      {/* Edit Item Dialog */}
      <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingItem?.id ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
          </DialogHeader>

          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price (₹)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: Number.parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={editingItem.category}
                  onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((cat) => cat !== "All")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">Type</div>
                <div className="flex items-center space-x-2 col-span-3">
                  <Checkbox
                    id="isVeg"
                    checked={editingItem.isVeg}
                    onCheckedChange={(checked) => setEditingItem({ ...editingItem, isVeg: checked === true })}
                  />
                  <label
                    htmlFor="isVeg"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Vegetarian
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">Availability</div>
                <div className="flex items-center space-x-2 col-span-3">
                  <Checkbox
                    id="isAvailable"
                    checked={editingItem.isAvailable}
                    onCheckedChange={(checked) => setEditingItem({ ...editingItem, isAvailable: checked === true })}
                  />
                  <label
                    htmlFor="isAvailable"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Available
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">Featured</div>
                <div className="flex items-center space-x-2 col-span-3">
                  <Checkbox
                    id="isRecommended"
                    checked={editingItem.isRecommended}
                    onCheckedChange={(checked) => setEditingItem({ ...editingItem, isRecommended: checked === true })}
                  />
                  <label
                    htmlFor="isRecommended"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Recommended
                  </label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleSaveItem}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
