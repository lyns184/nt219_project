"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Package, Truck, Shield, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    const id = searchParams.get("orderId")
    if (!id) {
      router.push("/")
    } else {
      setOrderId(id)
    }
  }, [searchParams, router])

  if (!user || !orderId) {
    return null
  }

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-2">Thank you for your secure purchase</p>
            <p className="text-muted-foreground">
              Order confirmation has been sent to <span className="font-medium text-foreground">{user.email}</span>
            </p>
          </div>

          {/* Order Details */}
          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="font-mono font-medium">{orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                  <p className="font-medium">{estimatedDelivery.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                  <p className="font-medium text-success">Paid</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Security Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                <div>
                  <p className="font-medium">Payment Tokenized</p>
                  <p className="text-sm text-muted-foreground">
                    Your card details were securely tokenized and encrypted
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                <div>
                  <p className="font-medium">Fraud Check Passed</p>
                  <p className="text-sm text-muted-foreground">Transaction verified by our fraud detection system</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                <div>
                  <p className="font-medium">TLS 1.3 Encrypted</p>
                  <p className="text-sm text-muted-foreground">All data transmitted with military-grade encryption</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-border bg-card mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0">
                  <Package className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium mb-1">Order Processing</p>
                  <p className="text-sm text-muted-foreground">
                    We're preparing your items for shipment. You'll receive an email when your order ships.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0">
                  <Truck className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium mb-1">Track Your Order</p>
                  <p className="text-sm text-muted-foreground">
                    Once shipped, you can track your package in real-time from your dashboard.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0">
                  <Download className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium mb-1">Download Receipt</p>
                  <p className="text-sm text-muted-foreground">
                    Your receipt and invoice are available in your order history.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button size="lg" className="w-full">
                View Order Status
              </Button>
            </Link>
            <Link href="/products" className="flex-1">
              <Button size="lg" variant="outline" className="w-full border-border bg-transparent">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
