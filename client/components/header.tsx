"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MobileMenu } from "@/components/mobile-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

export function Header() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  console.log("[v0] Header render - User:", user)
  console.log("[v0] Header render - Dropdown open:", dropdownOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 md:gap-6">
          <MobileMenu />

          <Link href="/" className="flex items-center gap-2">
            <Store className="h-6 w-6 text-accent" />
            <span className="text-xl font-bold">ShopHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </Link>
            <Link href="/deals" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Deals
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative w-48 xl:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="pl-9 bg-secondary border-border" />
            </div>
          </div>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {user ? (
            <DropdownMenu
              open={dropdownOpen}
              onOpenChange={(open) => {
                console.log("[v0] Dropdown onOpenChange called with:", open)
                setDropdownOpen(open)
              }}
              modal={false}
            >
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 cursor-pointer"
                  onClick={(e) => {
                    console.log("[v0] Avatar button clicked, event:", e)
                    console.log("[v0] Current dropdown state:", dropdownOpen)
                  }}
                  aria-label="User menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.picture || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-[100]" sideOffset={8}>
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="cursor-pointer">
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer focus:text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="default" size="icon" className="md:hidden">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="default" className="hidden md:flex">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
