import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4 max-w-md">
        <h1 className="font-heading text-6xl font-bold text-foreground">404</h1>
        <p className="text-xl text-muted-foreground">
          This page doesn't exist. It may have been moved or removed.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8">
            <Home size={18} className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
