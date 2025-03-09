"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import "../app/styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fallbackImage = "/image/tshirt.webp"; 

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found! Redirecting to login...");
      setError("Please log in to view your cart.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      console.log(data);
      setCartItems(data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError("Failed to load cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (id) => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found! Redirecting to login...");
      setError("Please log in to manage your cart.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }


      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item. Please try again.");
    }
  };

  return (
    <div className="cartContainer">
      <div className="cartSidebar">
      
        <a href="#">All Products</a>
        <a href="#">Discounted Products</a>
        <a href="#">New Arrivals</a>
        <a href="#">Best Sellers</a>
      </div>

      <div className="cartMain">
        <h2 className="cartTitle">Your Cart</h2>

        {loading ? (
          <div className="spinnerContainer">
            <ClipLoader color="#007bff" size={50} />
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : cartItems.length === 0 ? (
          <p>
            Your cart is empty.{" "}
            <a href="/Products" className="cartShopLink">
              Continue shopping
            </a>
          </p>
        ) : (
          <>
            <div className="cartItems">
              {cartItems.map((item) => {
                let productImage = item.productId?.["Image Src"];

              
                if (!productImage || !productImage.startsWith("http")) {
                  productImage = fallbackImage;
                }

                return (
                  <div key={item._id} className="cartItem">
                    <Image
                      src={productImage}
                      alt={item.productId?.Title || "Product Image"}
                      width={150}
                      height={150}
                      onError={(e) => (e.target.src = fallbackImage)}
                    />
                    <div className="cartDetails">
                      <h3 className="cartItemTitle">
                        {item.productId?.Title || "Unknown Product"}
                      </h3>
                      <p className="cartBody">
                        {item.productId?.Body || "No description available."}
                      </p>
                      <p className="cartPrice">
                        Price: ₹{item.productId?.["Variant Price"] || "N/A"}
                      </p>
                      <button
                        className="cartRemove"
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

           
            <div className="checkoutContainer">
              <button className="proceedCheckout">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
