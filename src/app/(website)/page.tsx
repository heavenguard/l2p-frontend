import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-foreground">Welcome to L2P Finance</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for all your financial needs. Get started by creating your account today.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="px-8 py-3 text-lg">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
