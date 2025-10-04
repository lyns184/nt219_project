"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart, type Product } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
    setIsAdding(false)
  }

  return (
    <Card className="border-border bg-card overflow-hidden group">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.stock < 20 && (
            <Badge className="absolute top-2 right-2 bg-warning text-warning-foreground">Low Stock</Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold mb-2 line-clamp-2 hover:text-accent transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <Badge variant="outline" className="border-border">
            {product.stock} in stock
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} disabled={isAdding || product.stock === 0} className="w-full gap-2">
          <ShoppingCart className="h-4 w-4" />
          {isAdding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
