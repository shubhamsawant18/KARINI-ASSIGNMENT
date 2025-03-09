"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import "../app/styles/Navbar.css";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/Products?q=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">
          <Image src="/image/logo-chanel.png" alt="Logo" width={50} height={44} priority />
        </Link>
        <span className="brand-name">KARINI AI</span>
      </div>

     
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" aria-label="Search">🔍</button>
      </form>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
        ☰
      </button>

      <div className={`nav-section ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li><Link href="/Home">Home</Link></li>
          <li><Link href="/Products">Products</Link></li>
          <li><Link href="/Cart">Cart</Link></li>
          <li><Link href="/Search">Search</Link></li>
        </ul>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <Link href="/login">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
