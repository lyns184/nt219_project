"use client"

import Link from "next/link"
import { Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/products-data"

export default function CategoriesPage() {
  const categoryDetails = [
    {
      id: "electronics",
      name: "Electronics",
      description: "Cutting-edge technology and gadgets for work and play",
      icon: "💻",
      products: products.filter((p) => p.category === "Electronics"),
    },
    {
      id: "furniture",
      name: "Furniture",
      description: "Ergonomic and stylish furniture for your workspace",
      icon: "🪑",
      products: products.filter((p) => p.category === "Furniture"),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="h-8 w-8 text-accent" />
            <h1 className="text-4xl font-bold text-balance">Product Categories</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Browse our curated selection of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {categoryDetails.map((category) => (
            <Card key={category.id} className="border-border bg-card hover:border-accent transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <CardTitle className="text-2xl">{category.name}</CardTitle>
                      <CardDescription className="mt-1">{category.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>{category.products.length} products available</span>
                  </div>
                  <Link href={`/products?category=${category.id}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      Browse
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Featured Products Preview */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {category.products.slice(0, 3).map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <div className="aspect-square rounded-lg bg-secondary border border-border overflow-hidden hover:border-accent transition-colors">
                        <img
                          src={`/ceholder-svg-key-l8ly3.jpg?key=l8ly3&height=200&width=200`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Products Link */}
        <div className="text-center">
          <Link href="/products">
            <Button size="lg" className="gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
