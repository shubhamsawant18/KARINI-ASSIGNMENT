import Cart from "@/components/Cart";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading Cart...</div>}>
      <Cart />
    </Suspense>
  );
}
