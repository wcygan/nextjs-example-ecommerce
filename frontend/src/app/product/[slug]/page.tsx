import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, listProducts } from "@/lib/mockApi";
import { ProductDetail } from "@/components/commerce/ProductDetail";
import { RelatedProducts } from "@/components/commerce/RelatedProducts";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  // Get related products (excluding current product)
  const allProducts = await listProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Product Image */}
        <div className="aspect-[4/3] relative bg-stone-50 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8"
          />
        </div>

        {/* Right: Product Info */}
        <ProductDetail product={product} />
      </div>

      {/* Shipping & Returns Info */}
      <div className="border-t border-slate-200 py-8 mb-16">
        <div className="max-w-2xl">
          <h3 className="text-lg font-medium mb-4">Shipping & Returns</h3>
          <div className="space-y-2 text-slate-600">
            <p>Free shipping on orders over $50</p>
            <p>Standard shipping: 5-7 business days</p>
            <p>Express shipping: 2-3 business days</p>
            <p>30-day return policy for unopened items</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-medium mb-6">You might also like</h2>
          <RelatedProducts products={relatedProducts} />
        </div>
      )}
    </div>
  );
}