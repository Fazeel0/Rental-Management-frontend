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
      <div className="flex flex-col">
        <div className="text-center py-2 mx-3 mt-2 bg-blue-200 rounded-lg border-2 border-blue-600">
          {rental?.balanceAmount > 0 || rental?.rentalStatus === "BORROWED" ? (
            <button
              className=" btn btn-outline btn-primary text-white font-bold px-6 border-2"
              onClick={() => navigate(`/rental/update/${id}`)}
            >
              {" "}
              UPDATE
            </button>
          ) : (
            <p className="text-2xl font-bold text-blue-600">RENT CLOSED</p>
          )}
        </div>

        <div className="w-full ">
          <h1 className="text-2xl bg-blue-300 mx-3 rounded-lg text-center mt-2 font-bold py-1">
            Rent Information
          </h1>

          <div className=" flex flex-row flex-wrap gap-5 mx-10 my-4">
            <div className="">
              <h1 className="text-xl">
                <span className="font-bold">Start Date:</span>{" "}
                <span className="text-blue-700 font-bold">
                  {new Date(rental?.startDate).toLocaleDateString("en-GB")}
                </span>
              </h1>
              <h1 className="text-xl">
                <span className="font-bold">Return Date:</span>{" "}
                <span className="text-blue-700 font-bold">
                  {new Date(rental?.endDate).toLocaleDateString("en-GB")}
                </span>
              </h1>
              <h1 className="text-xl">
                <span className="font-bold">Rented Quantity:</span>{" "}
                <span className="text-blue-700 font-bold">
                  {rental?.totalQuantity}
                </span>
              </h1>
              <h1 className="text-xl">
                <span className="font-bold">Paid Amount:</span>{" "}
                <span className="text-blue-700 font-bold">
                  {rental?.paidAmount}
                </span>
              </h1>
              <h1 className="text-xl">
                <span className="font-bold">Balance Amount:</span>{" "}
                <span className="text-blue-700 font-bold">
                  {rental?.balanceAmount}
                </span>
              </h1>
              <h1 className="text-xl">
                <span className="font-bold">Total Price:</span>{" "}
                <span className="text-blue-700 font-bold">
                  {rental?.totalPrice}
                </span>
              </h1>
              <h1 className="text-xl">
                <span className="font-bold">Rental Status:</span>{" "}
                <span className="text-blue-700 font-bold">
                  {rental?.rentalStatus}
                </span>
              </h1>
              <h1 className="text-xl">
                <span className="font-bold">Payment Status:</span>{" "}
                <span className="text-blue-700 font-bold">
                  {rental?.paymentStatus}
                </span>
              </h1>
            </div>


          </div>
        </div>

        <div className="w-full space-y-2">
          <h1 className="text-2xl bg-blue-300 mx-3 rounded-lg text-center mt-2 font-bold py-1">
            Customer Information
          </h1>
          <div className="px-10 p-4">
            <h1 className="text-xl">
              <span className="font-bold">Name:</span>{" "}
              <span className="text-blue-700 font-bold">
                {rental?.customer?.name}
              </span>
            </h1>
            <h1 className="text-xl">
              <span className="font-bold">Phone No:</span>{" "}
              <span className="text-blue-700 font-bold">
                {rental?.customer?.phoneNo}
              </span>
            </h1>
            <h1 className="text-xl">
              <span className="font-bold">Address:</span>{" "}
              <span className="text-blue-700 font-bold">
                {rental?.customer?.address}
              </span>
            </h1>
          </div>
        </div>

        <div className="w-full space-y-2">
          <h1 className="text-2xl bg-blue-300 mx-3 rounded-lg text-center mt-2 font-bold py-1">
            Product Information
          </h1>
          <div className="overflow-x-auto mt-5">
            <table className="table">
              <thead>
                <tr>
                  <td className="text-xl text-black font-bold"></td>
                  <td className="text-xl text-black font-bold">Name</td>
                  <td className="text-xl text-black font-bold">Quantity</td>
                  <td className="text-xl text-black font-bold">Price</td>
                </tr>
              </thead>

              {rental?.products.map((product, index) => {
                return <tbody>
                  <tr>
                    <td className="text-xl text-black font-bold">{index + 1}</td>
                    <td className="text-xl text-blue-700 font-bold">{product?.product?.name}</td>
                    <td className="text-xl text-blue-700 font-bold">{product?.quantity}</td>
                    <td className="text-xl text-blue-700 font-bold">{product?.price}</td>
                  </tr>
                </tbody>;
              })}
            </table>
          </div>
          {/* <div className="px-10 p-4">
            <h1 className="text-xl">
              <span className="font-bold">Name:</span> <span className="text-blue-700 font-bold">{rental?.product?.name}</span>
            </h1>
            <h1 className="text-xl">
              <span className="font-bold">Price:</span> <span className="text-blue-700 font-bold">{rental?.product?.price}</span>
            </h1>
          </div> */}

          <div>
            <h1 className="text-2xl bg-blue-300 mx-3 rounded-lg text-center mt-2 font-bold py-1">Rental Summary</h1>
            <div className="my-3 mx-10">
              {/* multiple divs........... */}
              {rental?.paymentSummary.map((summary, index) => {
                return (
                  <>
                    <div className="border-4 border-blue-600 inline-block ml-6 p-4 rounded-lg">
                      <h1 className="font-bold text-blue-800 text-xl">{index + 1}.</h1><hr className="h-[2px] bg-blue-400" />
                      <h1 className="font-bold text-blue-800 text-xl">Date: {new Date(summary?.date).toLocaleDateString("en-GB")}</h1>
                      <h1 className="font-bold text-blue-800 text-xl">Total Price: {summary?.price}</h1>
                      <h1 className="font-bold text-blue-800 text-xl">Products </h1><hr className="h-[2px] bg-blue-400" />
                      {/* multiple products............... */}
                      {summary?.products?.map((obj) => {
                        return (
                          <>
                            <div className="border-2 border-blue-600 mt-2 p-2 rounded-lg">
                              <h1 className="font-bold text-blue-800 text-xl">Product Name: {obj?.product?.name}</h1>
                              <h1 className="font-bold text-blue-800 text-xl">Returned Qty: {obj?.returnedQuantity}</h1>
                              <h1 className="font-bold text-blue-800 text-xl">Price: {obj?.price}</h1>
                            </div>
                          </>
                        )
                      })}

                    </div>
                  </>
                )
              })}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalData;
