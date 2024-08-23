import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch customers from the API
    axios
      .get("/customer/all")
      .then((response) => {
        setCustomers(response.data.customers);
      })
      .catch((error) => {
        console.error("There was an error fetching the customers!", error);
      });
  }, []);



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
            <th className="py-2 px-4 border-b text-left">Update & Delete</th>
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
              <td className="py-2 px-4 border-b">
                <div className="flex justify-evenly gap-2">
                  <button variant="ghost" className="rounded-full">
                  <i className="fa fa-pencil" aria-hidden="true"  onClick={() => navigate(`/customer/update/${customer._id}`)} ></i>
                  </button>
                  <button variant="ghost" className=" ">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCustomer;
