"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app/styles/Login.css";

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    usernameOrEmail: "",
    password: "",
  });

 
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
        Cookies.set("token", data.token,); 
        router.push("/Products"); 
      } else {
        alert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h2 className="loginenter">Welcome Back</h2>
        <p className="loginp">Please login to continue</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or Email"
            value={loginData.usernameOrEmail}
            onChange={(e) =>
              setLoginData({ ...loginData, usernameOrEmail: e.target.value })
            }
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account? <a href="/Home">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
