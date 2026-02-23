import { useEffect } from "react";
import { useLocation } from "wouter";

// Payment page now redirects to /book which handles the full booking flow.
// Preserves query params (service, order_id) for backward compatibility.
export default function Payment() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const searchParams = window.location.search;
    setLocation(`/book${searchParams}`);
  }, [setLocation]);

  return null;
}
