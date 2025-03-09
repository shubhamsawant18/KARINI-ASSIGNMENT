import { useState } from "react";
import Navbar from "../components/Navbar";  

import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Chat from "../components/Chat";

export default function Home() {
  const [cart, setCart] = useState([]);
  const products = [
    { sku: "123", name: "Laptop", price: 999 },
    { sku: "456", name: "Phone", price: 499 },
    { sku: "789", name: "Headphones", price: 199 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <ProductList products={products} addToCart={addToCart} />
        <Cart cart={cart} removeFromCart={removeFromCart} />
        <Chat />
      </div>
    </div>
  );
}
