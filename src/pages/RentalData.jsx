import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RentalData = () => {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;

  const [rental, setRental] = useState();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/rental/${id}`);
        if (response.data.success) {
          setRental(response.data.rentalProduct);
          // toast.success(response.data.message);
          console.log(rental);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    })();
  }, []);

  console.log(rental);
  return (
    <>
      <div className="flex w-screen">
        <div className="w-1/3">
          <h1 className="text-2xl bg-blue-300 mx-3 rounded-lg text-center mt-2 font-bold py-1">
            Rent Information
          </h1>
          <div className="px-10 p-4">
            <h1>
              Start Date: <span>{rental?.startDate}</span>
            </h1>
            <h1>
              Return Date: <span>{rental?.endDate}</span>
            </h1>
            <h1>
              Rented Quantity: <span>{rental?.quantity}</span>
            </h1>
            <h1>
              Paid Amount: <span>{rental?.paidAmount}</span>
            </h1>
            <h1>
              Balance Amount: <span>{rental?.returnedProductAmount-rental?.paidAmount}</span>
            </h1>
            <h1>
              Total Price: <span>{rental?.totalPrice}</span>
            </h1>
            <h1>
              Rental Status: <span>{rental?.rentalStatus}</span>
            </h1>
            <h1>Returned Product price : <span>{rental?.returnedProductAmount}</span></h1>
          </div>
        </div>
        <div className="w-1/3">
          <h1 className="text-2xl bg-blue-300 mx-3 rounded-lg text-center mt-2 font-bold py-1">
            Customer Information
          </h1>
          <div className="px-10 p-4">
            <h1>
              Name: <span>{rental?.customer?.name}</span>
            </h1>
            <h1>
              Phone No: <span>{rental?.customer?.phoneNo}</span>
            </h1>
            <h1>
              Address: <span>{rental?.customer?.address}</span>
            </h1>
          </div>
        </div>
        <div className="w-1/3">
          <h1 className="text-2xl bg-blue-300 mx-3 rounded-lg text-center mt-2 font-bold py-1">
            Product Information
          </h1>
          <div className="px-10 p-4">
            <h1>
              Name: <span>{rental?.product?.name}</span>
            </h1>
            <h1>
              Price: <span>{rental?.product?.price}</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="text-center">
        {
            (rental?.returnedProductAmount - rental?.paidAmount) > 0 || rental?.rentalStatus === "BORROWED" ? (
<button
          className=" btn btn-primary text-white"
          onClick={() => navigate(`/rental/update/${id}`)}
        >
          update
        </button>
            ) : (
                <p>rent closed</p>
            )
        }
        
      </div>
    </>
  );
};

export default RentalData;
