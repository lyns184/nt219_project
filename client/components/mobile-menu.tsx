"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Home, Package, Grid3x3, Tag, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  const closeMenu = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          <Link href="/" onClick={closeMenu}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/products" onClick={closeMenu}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Package className="h-4 w-4" />
              Products
            </Button>
          </Link>
          <Link href="/categories" onClick={closeMenu}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Grid3x3 className="h-4 w-4" />
              Categories
            </Button>
          </Link>
          <Link href="/deals" onClick={closeMenu}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Tag className="h-4 w-4" />
              Deals
            </Button>
          </Link>

          <Separator />

          {user ? (
            <>
              <Link href="/dashboard" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/orders" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Package className="h-4 w-4" />
                  Orders
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={() => {
                  logout()
                  closeMenu()
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" onClick={closeMenu}>
              <Button className="w-full gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
