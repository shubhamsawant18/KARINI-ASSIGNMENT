"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import "../app/styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const fallbackImage = "/image/tshirt.webp";

  const searchParams = useSearchParams();

  useEffect(() => {
    // Update search query when URL changes
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery) return; // Prevent unnecessary requests

      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/products/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: searchQuery }),
        });

        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(
            data.map((product) => ({
              id: product._id,
              Title: product.Title || "No Title Available",
              Body: product.Body || "No description available",
              ImageSrc: product["Image Src"] || fallbackImage,
              Price: product["Variant Price"] || "Price Not Available",
              Type: product.Type || "N/A",
            }))
          );
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cart items");
        const data = await response.json();
        setCartItems(data.cart || []);
      } catch (err) {
        setError("Failed to fetch cart items.");
      }
    };

    fetchCartItems();
  }, []);

  const addToCart = async (product) => {
    const cartItem = {
      productId: product.id,
      quantity: 2,
      address: {
        street: "Street",
        state: "Mah",
        zipCode: "415501",
        country: "India",
        city: "Koregaon",
      },
    };

    const token = Cookies.get("token");
    if (!token) return setError("User not authenticated!");

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) throw new Error("Failed to add item to cart");

      setSuccessMessage("Item added successfully!");
      setTimeout(() => setSuccessMessage(""), 1500);
    } catch (err) {
      setError("Failed to add item to cart. Please try again.");
    }
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
    e.target.onerror = null;
  };

  return (
    <div className="homeContainer">
      <div className="homeSidebar">
        <span className="homeFilterText">All Products</span>
        <span className="homeFilterText">Discounted Products</span>
        <span className="homeFilterText">New Arrivals</span>
        <span className="homeFilterText">Best Sellers</span>
      </div>

      <div className="homeMain">
        <h1 className="kariniWelcomeText">Welcome to Our Store</h1>

        {loading ? (
          <div className="spinnerContainer">
            <ClipLoader color="#007bff" size={50} />
          </div>
        ) : (
          <>
            {error && <p className="error">Error: {error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            {products.length > 0 ? (
              <div className="homeProductGrid">
                {products.map((product, index) => (
                  <div key={index} className="homeCard">
                    <img
                      src={product.ImageSrc}
                      alt={product.Title}
                      onError={handleImageError}
                      className="homeImage"
                    />
                    <h2 className="homeTitle">{product.Title}</h2>
                    <p className="homeBody">
                      {product.Body.length > 60
                        ? product.Body.substring(0, 60) + "..."
                        : product.Body}
                    </p>
                    <div className="homeTypePrice">
                      <p className="homeType">
                        <strong>Type:</strong> <span className="boldText">{product.Type}</span>
                      </p>
                      <p className="homeProductPrice">
                        <span className="priceText">$ {product.Price}</span>
                      </p>
                    </div>
                    <button className="homeButton" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No matching products found.</p>
            )}

            <div className="checkoutContainer">
              <button className="proceedCheckout">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
