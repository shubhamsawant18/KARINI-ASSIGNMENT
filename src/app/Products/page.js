import Products from "@/components/Products";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Products />
    </Suspense>
  );
}
