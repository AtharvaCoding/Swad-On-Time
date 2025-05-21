import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, QrCode, Utensils, Clock, Smartphone, Search } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-orange-600" />
          <h1 className="text-2xl font-bold text-orange-600">SwadOnTime</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/customer/home">
            <Button variant="ghost">Customer</Button>
          </Link>
          <Link href="/vendor/login">
            <Button variant="outline">Vendor Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Skip the Wait, <span className="text-orange-600">Enjoy the Food</span>
          </h2>
          <p className="text-lg text-gray-700">
            Order ahead from your favorite local shops, pay online, and get notified when your food is ready. No more
            waiting in long queues!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/customer/home">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Order as Customer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/vendor/login">
              <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                Register as Vendor
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-4 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="SwadOnTime App Interface"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-t-3xl shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Search className="h-10 w-10 text-orange-600" />}
            title="Find Restaurants"
            description="Search for your favorite restaurants by name or location."
          />
          <FeatureCard
            icon={<QrCode className="h-10 w-10 text-orange-600" />}
            title="Scan & Order"
            description="Scan the shop's QR code to view their menu and place your order in seconds."
          />
          <FeatureCard
            icon={<Smartphone className="h-10 w-10 text-orange-600" />}
            title="Pay Easily"
            description="Pay via UPI or cash on delivery - whatever works for you."
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-orange-600" />}
            title="Track Queue"
            description="See real-time updates on your order status and estimated wait time."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Utensils className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold">SwadOnTime</span>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} SwadOnTime. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-orange-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}
