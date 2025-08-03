import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Order } from "@/types";
import { toMoney } from "@/lib/currency";
import { Button } from "@/components/ui/button";

interface OrderConfirmationProps {
  order: Order;
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-3xl font-medium text-slate-900 mb-2">
            Thank you!
          </h1>
          <p className="text-slate-600">
            Your order #{order.number} has been confirmed
          </p>
          <p className="text-sm text-slate-500 mt-1">
            A receipt has been sent to {order.email}
          </p>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-stone-50 p-6 rounded-xl">
            <h3 className="font-medium mb-3">Shipping address</h3>
            <address className="not-italic text-slate-600 text-sm">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              <br />
              {order.shippingAddress.address1}
              {order.shippingAddress.address2 && (
                <>
                  <br />
                  {order.shippingAddress.address2}
                </>
              )}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.region}{" "}
              {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </address>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-medium mb-4">Order items</h3>
            <div className="space-y-4">
              {order.lines.map((line) => (
                <div key={line.id} className="flex gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md bg-slate-100">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{line.name}</p>
                    {line.selectedOptions && (
                      <p className="text-sm text-slate-600">
                        {Object.entries(line.selectedOptions).map(
                          ([key, value]) => (
                            <span key={key}>
                              {key}: {value}{" "}
                            </span>
                          )
                        )}
                      </p>
                    )}
                    <p className="text-sm text-slate-600">
                      Qty: {line.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {toMoney(line.price * line.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span>{toMoney(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Shipping</span>
              <span>
                {order.shipping === 0 ? "Free" : toMoney(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>{toMoney(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline" className="rounded-2xl">
              Continue shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}