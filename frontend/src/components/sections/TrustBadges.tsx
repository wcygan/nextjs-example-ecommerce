import { Shield, Truck, RefreshCw, CreditCard } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "SSL encrypted payment",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Hassle-free returns",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options",
  },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div key={badge.title} className="text-center">
            <Icon className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-medium text-sm text-slate-900">{badge.title}</h3>
            <p className="text-xs text-slate-600 mt-1">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}