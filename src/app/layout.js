import Navbar from "@/components/Navbar";  // Instead of ../../components/Navbar
import { ProductsProvider } from "../context/ProductsContext"; // ✅ Import the context provider
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProductsProvider> 
          <Navbar />
          {children} 
        </ProductsProvider>
      </body>
    </html>
  );
}
