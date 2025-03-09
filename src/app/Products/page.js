"use client";  

import { Suspense } from "react";
import Products from "@/components/Products";

export default function ProductsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Products />
    </Suspense>
  );
}
