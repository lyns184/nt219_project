"use client"

import Link from "next/link"
import { Tag, Clock, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/products-data"

export default function DealsPage() {
  // Mock deals - in real app, this would come from backend
  const deals = [
    {
      id: "flash-sale",
      title: "Flash Sale",
      description: "Limited time offers on selected products",
      discount: "Up to 30% off",
      endsIn: "2 hours",
      products: products.slice(0, 4),
      badge: "Hot",
      badgeColor: "bg-red-500",
    },
    {
      id: "weekend-special",
      title: "Weekend Special",
      description: "Exclusive weekend deals on electronics",
      discount: "20% off",
      endsIn: "3 days",
      products: products.filter((p) => p.category === "Electronics").slice(0, 4),
      badge: "New",
      badgeColor: "bg-blue-500",
    },
    {
      id: "clearance",
      title: "Clearance Sale",
      description: "Last chance to grab these items at amazing prices",
      discount: "Up to 50% off",
      endsIn: "1 week",
      products: products.slice(4, 8),
      badge: "Sale",
      badgeColor: "bg-green-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Tag className="h-8 w-8 text-accent" />
            <h1 className="text-4xl font-bold text-balance">Special Deals & Offers</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don't miss out on our exclusive deals and limited-time offers
          </p>
        </div>

        {/* Deals List */}
        <div className="space-y-12">
          {deals.map((deal) => (
            <div key={deal.id}>
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">{deal.title}</CardTitle>
                        <Badge className={`${deal.badgeColor} text-white`}>{deal.badge}</Badge>
                      </div>
                      <CardDescription className="text-base">{deal.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent mb-1">{deal.discount}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Ends in {deal.endsIn}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {deal.products.map((product) => (
                      <Link key={product.id} href={`/products/${product.id}`}>
                        <Card className="border-border bg-secondary hover:border-accent transition-colors h-full">
                          <CardContent className="p-4">
                            <div className="aspect-square rounded-lg bg-background border border-border overflow-hidden mb-3">
                              <img
                                src={`/ceholder-svg-key-vtyk3.jpg?key=vtyk3&height=200&width=200`}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold">${product.price}</span>
                              <Badge variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                Deal
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link href={`/products`}>
                      <Button variant="outline" className="gap-2 bg-transparent">
                        View All {deal.title} Products
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/products">
            <Button size="lg" className="gap-2">
              Browse All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
