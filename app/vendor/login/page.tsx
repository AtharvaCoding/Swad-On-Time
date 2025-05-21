"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Utensils } from "lucide-react"

export default function VendorLoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [shopName, setShopName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login process
    setTimeout(() => {
      setLoading(false)
      router.push("/vendor/dashboard")
    }, 1500)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setLoading(false)
      router.push("/vendor/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="container mx-auto p-4">
        <div className="flex items-center">
          <Link href="/" className="text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2 mx-auto">
            <Utensils className="h-6 w-6 text-orange-600" />
            <h1 className="text-2xl font-bold text-orange-600">SwadOnTime</h1>
          </div>
          <div className="w-5"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Vendor Portal</CardTitle>
            <CardDescription>Manage your shop, menu and orders</CardDescription>
          </CardHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-sm text-orange-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="shop-name">Shop Name</Label>
                    <Input
                      id="shop-name"
                      placeholder="Your Shop Name"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}
