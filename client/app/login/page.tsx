"use client"

import Link from "next/link"
import { Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Store className="h-10 w-10 text-accent" />
            <span className="text-3xl font-bold">ShopHub</span>
          </div>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Nút duy nhất: chuyển hướng sang localhost:3001/login */}
            <Button asChild className="w-full">
              <Link href="http://localhost:3001/auth/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
