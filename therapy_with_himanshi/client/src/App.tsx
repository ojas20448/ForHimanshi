import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Preloader } from "@/components/ui/Preloader";
import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";

// Lazy load non-critical routes
const Book = lazy(() => import("@/pages/Book"));
const Payment = lazy(() => import("@/pages/Payment"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Atmospheric = lazy(() => import("@/pages/atmospheric"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/book" component={Book} />
        <Route path="/payment" component={Payment} />
        <Route path="/atmospheric" component={Atmospheric} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppContent />
        <WhatsAppButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  // Only show preloader on first visit (not on subsequent navigations)
  const isFirstVisit = !sessionStorage.getItem("manzar_visited");
  const [loading, setLoading] = useState(isFirstVisit);

  useEffect(() => {
    if (!isFirstVisit) return;

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("manzar_visited", "1");
    }, 1200);
    return () => clearTimeout(timer);
  }, [isFirstVisit]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader />}
      </AnimatePresence>
      <Router />
    </>
  );
}

export default App;
