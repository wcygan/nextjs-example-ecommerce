import { Product, Order } from "@/types";
import { products } from "./seed";

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

const maybeFail = () => {
  if (Math.random() < 0.05) {
    throw new Error("Temporary error - please try again");
  }
};

export async function listProducts(): Promise<Product[]> {
  await wait(Math.random() * 400 + 200); // 200-600ms
  maybeFail();
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  await wait(Math.random() * 350 + 200); // 200-550ms
  maybeFail();
  return products.find(p => p.slug === slug);
}

export async function createOrder(payload: Omit<Order, "id" | "number" | "createdAt">): Promise<Order> {
  await wait(Math.random() * 400 + 400); // 400-800ms
  maybeFail();
  
  const id = crypto.randomUUID();
  const order: Order = {
    ...payload,
    id,
    number: id.slice(0, 8).toUpperCase(),
    createdAt: new Date().toISOString(),
  };
  
  // Store in sessionStorage for confirmation page
  if (typeof window !== "undefined") {
    sessionStorage.setItem(`order_${id}`, JSON.stringify(order));
  }
  
  return order;
}

export async function getOrder(id: string): Promise<Order | null> {
  await wait(Math.random() * 250 + 150); // 150-400ms
  
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem(`order_${id}`);
    if (stored) {
      return JSON.parse(stored) as Order;
    }
  }
  
  return null;
}