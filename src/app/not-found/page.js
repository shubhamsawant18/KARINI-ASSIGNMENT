"use client";  

export default function NotFound() {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, we couldn't find what you were looking for.</p>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          Go Home
        </a>
      </div>
    );
  }
  