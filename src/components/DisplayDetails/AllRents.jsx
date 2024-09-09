import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RentUpdate from "../Update Forms/RentUpdate";

const AllRents = () => {
  const [rentals, setrentals] = useState();
  const [allRentals, setAllRentals] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/rental/all");
        if (response.data.success) {
          setrentals(response.data.rentalProducts);
          setAllRentals(response.data.rentalProducts)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    })();
  }, []);

  const handleChange = (e) => {
    let s = e.target.value.toLowerCase();

    if(s === ""){
        setAllRentals(rentals);
    }else{
        const filteredProduct = rentals.filter((rental) => {
          return rental.customer.name.toLowerCase().includes(s);
        });
    
        setAllRentals(filteredProduct);
    }

  };

  console.log(rentals);

  return (
    <>
      <div className="overflow-x-auto mt-5">
        <div className="flex justify-center">
          <input
            type="search"
            placeholder="Search"
            onChange={handleChange}
            className="w-[20vw] h-12 p-4 rounded-lg border-2 border-blue-600 focus:border-none"
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th className="text-xl font-bold text-black">Customer name</th>
              <th className="text-xl font-bold text-black">no of Products</th>
              <th className="text-xl font-bold text-black">Balance Amount</th>
              <th className="text-xl font-bold text-black">Paid Amount</th>
              <th className="text-xl font-bold text-black">Quantity</th>
              <th className="text-xl font-bold text-black">More details</th>
            </tr>
          </thead>
          {allRentals?.map((rent, index) => {
            return (
              <>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td className="text-xl text-black font-bold">
                      {index + 1}
                    </td>
                    <td className="text-xl text-blue-700 font-bold">
                      {rent?.customer?.name}
                    </td>
                    <td className="text-xl text-blue-700 font-bold">
                      {rent?.products?.length}
                    </td>
                    <td className="text-xl text-blue-700 font-bold">
                      {rent?.balanceAmount}
                    </td>
                    <td className="text-xl text-blue-700 font-bold">
                      {rent?.paidAmount}
                    </td>
                    <td className="text-xl text-blue-700 font-bold">
                      {rent?.totalQuantity}
                    </td>
                    <td className="text-xl text-blue-700 font-bold">
                      <button
                        onClick={() => navigate(`/rental-data/${rent._id}`)}
                        className="btn btn-primary text-white"
                      >
                        More details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default AllRents;
