"use client"

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <p>Loading products...</p>
    </div>}>
      <ProductsContent />
    </Suspense>
  );
}
