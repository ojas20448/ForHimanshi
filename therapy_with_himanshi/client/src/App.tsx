import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { RouteMetadata } from "@/components/layout/RouteMetadata";
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import Home from "@/pages/Home";
import Workshops from "@/pages/Workshops";

const Book = lazy(() => import("@/pages/Book"));
const Payment = lazy(() => import("@/pages/Payment"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Atmospheric = lazy(() => import("@/pages/atmospheric"));

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MotionConfig reducedMotion="user">
          <RouteMetadata />
          <Toaster />
          <Suspense
            fallback={
              <div className="route-loading" role="status">
                Making a little space…
              </div>
            }
          >
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/workshops" component={Workshops} />
              <Route path="/book" component={Book} />
              <Route path="/payment" component={Payment} />
              <Route path="/atmospheric" component={Atmospheric} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
          <WhatsAppButton />
        </MotionConfig>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
