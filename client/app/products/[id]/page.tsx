"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ShoppingCart, Star, Truck, RotateCcw, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/products-data"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => router.push("/products")}>Back to Products</Button>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    addItem(product, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart`,
    })
    setIsAdding(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          {/* Product Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <Badge className="mb-4">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 md:h-5 md:w-5 ${
                          i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-sm md:text-base text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">${product.price.toFixed(2)}</p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock > 20 ? (
                <Badge variant="outline" className="border-success text-success">
                  In Stock ({product.stock} available)
                </Badge>
              ) : product.stock > 0 ? (
                <Badge variant="outline" className="border-warning text-warning">
                  Low Stock ({product.stock} left)
                </Badge>
              ) : (
                <Badge variant="outline" className="border-destructive text-destructive">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="border-border"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="border-border"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              size="lg"
              className="w-full gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              {isAdding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>

            {/* Security Features */}
            <Card className="border-border bg-card">
              <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-success flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm md:text-base">Free Shipping</p>
                    <p className="text-xs md:text-sm text-muted-foreground">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-success flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm md:text-base">30-Day Returns</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Easy returns and refunds</p>
                  </div>
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
