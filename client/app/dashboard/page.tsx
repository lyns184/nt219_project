"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Package, ShoppingBag, Shield, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { mockOrders } from "@/lib/orders-data"

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const totalOrders = mockOrders.length
  const totalSpent = mockOrders.reduce((sum, order) => sum + order.total, 0)
  const activeOrders = mockOrders.filter((o) => o.status === "processing" || o.status === "shipped").length
  const avgSecurityScore = Math.round(mockOrders.reduce((sum, order) => sum + order.securityScore, 0) / totalOrders)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground">Manage your orders and account security</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <span className="text-3xl font-bold">{totalOrders}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-success/10">
                  <ShoppingBag className="h-6 w-6 text-success" />
                </div>
                <span className="text-3xl font-bold">{activeOrders}</span>
              </div>
              <p className="text-sm text-muted-foreground">Active Orders</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <span className="text-3xl font-bold">${totalSpent.toFixed(0)}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-success/10">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <span className="text-3xl font-bold">{avgSecurityScore}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Security Score</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Link href="/orders">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-mono text-sm font-medium">{order.id}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "delivered"
                              ? "bg-success/10 text-success"
                              : order.status === "shipped"
                                ? "bg-accent/10 text-accent"
                                : order.status === "processing"
                                  ? "bg-warning/10 text-warning"
                                  : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {order.items.length} {order.items.length === 1 ? "item" : "items"} • {order.date}
                      </p>
                      <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                    </div>
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline" size="sm" className="border-border bg-transparent">
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Security Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-success" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Account Security</span>
                    <span className="text-sm font-medium">{avgSecurityScore}%</span>
                  </div>
                  <Progress value={avgSecurityScore} className="h-2" />
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">Two-Factor Authentication</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">Email Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">Secure Password</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-muted-foreground">Payment Methods (1)</span>
                  </div>
                </div>

                <Link href="/settings">
                  <Button variant="outline" className="w-full border-border bg-transparent">
                    Security Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Fraud Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-muted-foreground">All transactions verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-muted-foreground">No suspicious activity</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-muted-foreground">Real-time monitoring active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
