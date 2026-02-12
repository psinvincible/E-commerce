"use client"
export const dynamic = "force-dynamic";

import ProductContent from "./ProductContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <p>Loading products...</p>
    </div>}>
      <ProductsContent />
    </Suspense>
  );
}
