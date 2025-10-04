import Link from "next/link"
import { Package, Truck, HeadphonesIcon, CreditCard, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-24 text-center">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-mono">
              <Star className="h-4 w-4" />
              Trusted by Thousands
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Your modern shopping destination
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Discover amazing products at great prices. Fast shipping, easy returns, and exceptional customer service.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Browse Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-border bg-transparent w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Why shop with us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We make online shopping easy, fast, and enjoyable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                  <Truck className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Fast Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $50. Get your items delivered quickly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">
                  30-day return policy. Shop with confidence knowing you can return anything.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                  <CreditCard className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Multiple payment options with secure checkout for your peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                  <HeadphonesIcon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our customer service team is always here to help you with any questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 md:py-24">
          <Card className="border-border bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-6 md:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to start shopping?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of happy customers and discover amazing products today
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Create Account
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="border-border bg-transparent w-full sm:w-auto">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
