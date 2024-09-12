import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";

const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [uichange, setuichange] = useState(false);
  const [loading, setLoading] = useState();
  const [allCustomers, setAllCustomers] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/customer/all")
      .then((response) => {
        setCustomers(response.data.customers);
        setAllCustomers(response.data.customers);
      })
      .catch((error) => {
        console.error("There was an error fetching the customers!", error);
      });
  }, [uichange]);

  const handleChange = (e) => {

    let s = e.target.value.toLowerCase();

    if (s === "") {
      setAllCustomers(customers);
    } else {
      setAllCustomers([]);
      const filteredCustomers = customers.filter((customer) => {
        return customer.name.toLowerCase().includes(s);
      })
      setAllCustomers(filteredCustomers);
    }

  }

  const handleDelete = async (id) => {
    try {
      const isConfirmed = await showConfirmBox();

      if (isConfirmed) {
        setLoading(true);
        const response = await axios.delete(`customer/delete/${id}`);
        if (response.data.success) {
          setLoading(false);
          toast.success(response.data.message);
          setuichange(!uichange);
        }
      }
    } catch (error) {
      console.log("Error while deleting", error);
      setLoading(false);
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
    <>
      {!customers ? (
        <h1 className="bg-red-300 p-3 rounded-lg text-3xl mt-2 mx-2 text-white">
          Customers not available
        </h1>
      ) : (
        <div className="overflow-x-auto mt-5">
          <div className="flex justify-center">
            <input
              type="search"
              placeholder="Search by Customer name"
              onChange={handleChange}
              className="w-[20vw] h-12 p-4 rounded-lg border-2 border-blue-600 focus:border-none"
            />

          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="text-xl font-bold text-black"></th>
                <th className="text-xl font-bold text-black">Name</th>
                <th className="text-xl font-bold text-black">Phone Number</th>
                <th className="text-xl font-bold text-black">Address</th>
                <th className="text-xl font-bold text-black">Created At</th>
                <th className="text-xl font-bold text-black">Action</th>
                <th className="text-xl font-bold text-black">Update</th>
                <th className="text-xl font-bold text-black">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allCustomers?.map((customer, index) => (
                <tr key={customer._id}>
                  <th className="text-xl text-black font-bold">{index + 1}</th>
                  <td className="text-xl text-blue-700 font-bold">
                    {customer.name}
                  </td>
                  <td className="text-xl text-blue-700 font-bold">
                    {customer.phoneNo}
                  </td>
                  <td className="text-xl text-blue-700 font-bold">
                    {customer.address}
                  </td>
                  <td className="text-xl text-blue-700 font-bold">
                    {new Date(customer.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => navigate(`/rental/create/${customer._id}`)}
                      className="btn btn-primary text-white"
                    >
                      Give Rent
                    </button>
                  </td>
                  <td>
                    <i
                      onClick={() =>
                        navigate(`/customer/update/${customer._id}`)
                      }
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
          <div id="confirmDialog" class="absolute  top-0 right-0 hidden ">
            <div class="bg-gray-300 p-6 rounded-lg shadow-lg text-center">
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
                  class="btn btn-primary text-white px-4 py-2 rounded hover:bg-gray-400"
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

export default AllCustomer;
