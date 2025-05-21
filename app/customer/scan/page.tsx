"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, QrCode, Camera, HomeIcon, History } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ScanPage() {
  const router = useRouter()
  const [scanning, setScanning] = useState(false)
  const [permission, setPermission] = useState<boolean | null>(null)

  const startScanning = async () => {
    try {
      // In a real app, we would request camera permission here
      // and initialize the QR scanner
      setPermission(true)
      setScanning(true)

      // Simulate successful scan after 3 seconds
      setTimeout(() => {
        // In a real app, this would be the actual scanned vendor ID
        const vendorId = "spice-delight"
        router.push(`/customer/menu/${vendorId}`)
      }, 3000)
    } catch (error) {
      setPermission(false)
      console.error("Error accessing camera:", error)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="bg-white shadow-sm p-4 landscape-header">
        <div className="container mx-auto flex items-center">
          <Link href="/customer/home" className="flex items-center text-gray-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </Link>
          <h1 className="text-xl font-semibold text-center flex-1 text-orange-600">Scan QR Code</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-6 flex flex-col items-center">
            {!scanning ? (
              <>
                <div className="bg-orange-100 p-6 rounded-full mb-6">
                  <QrCode className="h-16 w-16 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Scan Shop QR Code</h2>
                <p className="text-gray-600 text-center mb-6">
                  Point your camera at the shop's QR code to view their menu and place an order
                </p>
                <Button onClick={startScanning} className="bg-orange-600 hover:bg-orange-700 text-white w-full">
                  Start Scanning
                </Button>

                {/* For demo purposes - direct link to menu */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500 mb-2">For demo purposes:</p>
                  <Link href="/customer/menu/spice-delight">
                    <Button variant="outline" size="sm">
                      Go to Sample Menu
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="w-full aspect-square relative bg-black rounded-lg overflow-hidden flex items-center justify-center">
                {permission === false ? (
                  <div className="text-white text-center p-4">
                    <p className="mb-4">Camera permission denied</p>
                    <Button
                      onClick={() => setScanning(false)}
                      variant="outline"
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="h-24 w-24 text-white opacity-20 animate-pulse" />
                    </div>
                    <div className="absolute inset-0">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-orange-500 animate-scan"></div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button
                        onClick={() => setScanning(false)}
                        variant="outline"
                        size="sm"
                        className="bg-white/20 text-white border-white/40 hover:bg-white/30"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
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
              <Button variant="ghost" className="flex flex-col items-center text-orange-600">
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
