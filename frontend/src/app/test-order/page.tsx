import { OrderConfirmation } from "@/components/order/OrderConfirmation";
import { Order } from "@/types";

export default function TestOrderPage() {
  const testOrder: Order = {
    id: "test-123",
    number: "TEST1234",
    email: "test@example.com",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      address2: "Apt 4B",
      city: "New York",
      region: "NY",
      postalCode: "10001",
      country: "US",
    },
    lines: [
      {
        id: "line-1",
        productId: "prod_001",
        name: "Modern Oak Bench",
        price: 45000,
        quantity: 1,
        image: "/products/oak-bench.svg",
        selectedOptions: {
          Legs: "Gold Aston Legs",
        },
      },
    ],
    subtotal: 45000,
    shipping: 0,
    total: 45000,
    createdAt: new Date().toISOString(),
  };

  return <OrderConfirmation order={testOrder} />;
}