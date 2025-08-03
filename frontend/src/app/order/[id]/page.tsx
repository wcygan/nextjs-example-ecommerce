import { notFound } from "next/navigation";
import { getOrder } from "@/lib/mockApi";
import { OrderConfirmation } from "@/components/order/OrderConfirmation";

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const order = await getOrder(params.id);

  if (!order) {
    notFound();
  }

  return <OrderConfirmation order={order} />;
}