// import { useState } from "react";

// const ProductList = ({ products, addToCart }) => {
//   const [search, setSearch] = useState("");

//   const filteredProducts = products.filter(
//     (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search)
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by SKU or Name..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <ul>
//         {filteredProducts.map((product) => (
//           <li key={product.sku}>
//             {product.name} - ${product.price}
//             <button onClick={() => addToCart(product)}>Add to Cart</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;
