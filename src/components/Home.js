"use client";
import { useState } from "react";
import "../app/styles/Home.css"; // Ensure correct CSS path
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Signup state
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Login state
  const [loginData, setLoginData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User created successfully");
        router.push("/login"); // Redirect to login page
      } else {
        alert(data.message || "User already exists. Please login.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful");
        router.push("http://localhost:3000/Products"); // Redirect to Products page
      } else {
        alert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="karini-page-container">
      <h1 className="karini-title">Welcome to our Shop</h1>
      <div className="karini-forms-container">
        {/* Signup Box */}
        <div className="karini-box karini-signup-box">
          <h2 className="karini-header">Sign Up</h2>
          <p className="karini-text">Join us today!</p>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
              className="karini-input"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              className="karini-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              className="karini-input"
              required
            />
            <button type="submit" className="karini-button">
              Sign Up
            </button>
          </form>
        </div>

        {/* Login Box */}
        <div className="karini-box karini-login-box">
          <h2 className="karini-header">Login</h2>
          <p className="karini-text">Already a member? Login here.</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username or Email"
              value={loginData.usernameOrEmail}
              onChange={(e) =>
                setLoginData({ ...loginData, usernameOrEmail: e.target.value })
              }
              className="karini-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="karini-input"
              required
            />
            <button type="submit" className="karini-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
