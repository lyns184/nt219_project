import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {[1, 2].map((i) => (
            <Card key={i} className="border-border bg-card">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="flex-1">
                    <Skeleton className="h-7 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-40 mb-6" />
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="aspect-square rounded-lg" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Skeleton className="h-11 w-48 mx-auto" />
        </div>
      </div>
    </div>
  )
}
