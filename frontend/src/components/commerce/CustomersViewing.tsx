"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export function CustomersViewing() {
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Simulate random viewers between 2-8
    const randomViewers = Math.floor(Math.random() * 7) + 2;
    setViewers(randomViewers);

    // Update every 30 seconds
    const interval = setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setViewers((prev) => {
        const next = prev + change;
        return Math.max(2, Math.min(8, next)); // Keep between 2-8
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
      <Users className="h-4 w-4" />
      <span>{viewers} people are viewing this product</span>
    </div>
  );
}