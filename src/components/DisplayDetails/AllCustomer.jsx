import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";

const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/customer/all")
      .then((response) => {
        setCustomers(response.data.customers);
      })
      .catch((error) => {
        console.error("There was an error fetching the customers!", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const isConfirmed = await showConfirmBox();

      if (isConfirmed) {
        setLoading(true);
        const response = await axios.delete(`customer/delete/${id}`);
        setLoading(false);
        if (response.data.success) {
          toast.success(response.data.message);
          setCustomers(customers.filter((customer) => customer._id !== id));
        }
      }
    } catch (error) {
      console.log("Error while deleting", error);
      toast.error(error.response?.data?.message || "Error deleting customer");
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

  if (loading === true) return <Loader />;
  return (
    <div className="container mx-auto m-5">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>
      <table className="min-w-full bg-white border-2 ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Phone Number</th>
            <th className="py-2 px-4 border-b text-left">Address</th>
            <th className="py-2 px-4 border-b text-left">Created At</th>
            <th className="py-2 px-4 border-b text-left">Update</th>
            <th className="py-2 px-4 border-b text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{customer.phoneNo}</td>
              <td className="py-2 px-4 border-b">{customer.address}</td>
              <td className="py-2 px-4 border-b">
                {new Date(customer.createdAt).toLocaleDateString()}
              </td>
              <td>
                <i
                  onClick={() => navigate(`/customer/update/${customer._id}`)}
                  class="py-2 px-4 fa-solid fa-pen-to-square text-green-800 cursor-pointer"
                ></i>
              </td>
              <td>
                <i
                  onClick={() => handleDelete(customer._id)}
                  class="py-2 px-4 fa-solid fa-trash text-red-600 cursor-pointer"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* confirmation box */}
      <div
        id="confirmDialog"
        class="absolute  top-0 right-0 hidden "
      >
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
  );
};

export default AllCustomer;
