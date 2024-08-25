import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";

const AllProducts = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState();
  const [uichange, setuichange] = useState(false);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/product/get/all");
      console.log(response);

      setLoading(false);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [uichange]);

  const deleteBranch = async (id) => {
    try {
      console.log("delete :", id);
      let agree = window.confirm("Are you sure, want to delete this branch?");

      if (agree) {
        const response = await axios.post(`/branch/delete/${id}`);

        if (response.data.success) {
          setuichange(!uichange);
          toast.success(response.data.message);
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  if (loading === true) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const handleDelete = async (id) => {
    try {
      const isConfirmed = await showConfirmBox();

      if (isConfirmed) {
        setLoading(true);
        const response = await axios.delete(`product/${id}`);
        if (response.data.success) {
          setLoading(false);
          toast.success(response.data.message);
          setuichange(!uichange);
        }
      }
    } catch (error) {
      console.log("Error while deleting", error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Error deleting product");
    }
  };

  function showConfirmBox() {
    return new Promise((resolve) => {
      console.log("Showing confirmation dialog");
      document.getElementById("confirmDialog").classList.remove("hidden");

      const handleConfirm = (isConfirmed) => {
        resolve(isConfirmed);
        closeConfirmBox();
      };

      document.getElementById("confirmYes").onclick = () => handleConfirm(true);
      document.getElementById("confirmNo").onclick = () => handleConfirm(false);
    });
  }

  function closeConfirmBox() {
    console.log("Closing confirmation dialog");
    document.getElementById("confirmDialog").classList.add("hidden");
  }

  return (
    <>
      {!products ? (
        <h1 className="bg-red-300 p-3 rounded-lg text-3xl mt-2 mx-2 text-white">
          Products not available
        </h1>
      ) : (
        <div className="overflow-x-auto mt-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-xl text-black">Name</th>
                <th className="text-xl text-black">Price</th>
                <th className="text-xl text-black">Availabe Quantity</th>
                <th className="text-xl text-black">Alloted Quantity</th>
                <th className="text-xl text-black">Rented Quantity</th>
                <th className="text-xl text-black">Scrap Quantity</th>
                <th className="text-xl text-black">Scrap Reason</th>
                <th className="text-xl text-black">Update</th>
                <th className="text-xl text-black">Delete</th>
              </tr>
            </thead>
            {products?.map((product, index) => {
              return (
                <>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>{index + 1}</th>
                      <td>{product?.name}</td>
                      <td>{product?.price}</td>
                      <td>{product?.availableQuantity}</td>
                      <td>{product?.allotedQuantity}</td>
                      <td>{product?.allotedQuantity}</td>
                      <td>{product.scrap?.quantity}</td>
                      <td>{product.scrap?.reason}</td>
                      <td>
                        <i
                          onClick={() =>
                            navigate(`/product/update/${product._id}`)
                          }
                          class="fa-solid fa-pen-to-square text-green-800 cursor-pointer"
                        ></i>
                      </td>
                      <td>
                        <i
                          onClick={() => handleDelete(product._id)}
                          class="fa-solid fa-trash text-red-600 cursor-pointer"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>

          <div id="confirmDialog" class="absolute  top-0 right-0 hidden ">
            <div class="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 class="text-xl font-semibold mb-4">Confirmation</h2>
              <p class="mb-6">Are you sure you want to delete?</p>
              <div class="flex justify-center gap-4">
                <button
                  id="confirmYes"
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  id="confirmNo"
                  class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
