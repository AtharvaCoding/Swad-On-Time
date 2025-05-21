"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react"

interface MenuItemCardProps {
  item: {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    isVeg: boolean
    isAvailable: boolean
    isRecommended: boolean
  }
  onToggleAvailability: (itemId: string) => void
  onToggleRecommended: (itemId: string) => void
  onEdit: (item: any) => void
  onDelete: (itemId: string) => void
  isLandscape: boolean
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onToggleAvailability,
  onToggleRecommended,
  onEdit,
  onDelete,
  isLandscape,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className={`flex ${isLandscape ? "flex-col" : "p-4"}`}>
          {isLandscape && (
            <div className="w-full h-32 overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
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

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0"
                  onClick={() => onToggleAvailability(item.id)}
                >
                  {item.isAvailable ? (
                    <ToggleRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ToggleLeft className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0"
                  onClick={() => onToggleRecommended(item.id)}
                >
                  {item.isRecommended ? (
                    <Star className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Star className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => onEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          {!isLandscape && (
            <div className="w-24 h-24 rounded-md overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default MenuItemCard
