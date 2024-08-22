import React, { useState } from "react";

function ProductDetails() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addProduct = () => {
    if (editIndex !== null) {
      // Update existing product
      const updatedProducts = products.map((product, index) =>
        index === editIndex ? productName : product
      );
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      // Add new product
      setProducts([...products, productName]);
    }
    setProductName("");
  };

  const editProduct = (index) => {
    setProductName(products[index]);
    setEditIndex(index);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>

        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 mb-4 w-full rounded-md"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button
          onClick={addProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-4"
        >
          {editIndex !== null ? "Update Product" : "Add Product"}
        </button>

        <ul>
          {products.map((product, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-200 p-2 mb-2 rounded-md"
            >
              <span>{product}</span>
              <div>
                <button
                  onClick={() => editProduct(index)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductDetails;