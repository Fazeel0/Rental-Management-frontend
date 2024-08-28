import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from "axios";

const RentUpdate = () => {
  const params = useParams();
  const id = params.id;
  const [formData , setFormData] = useState({
    endDate : "",
    paidAmount : "",
    returnQuantitiy : "",
  });

  let [rentalProduct, setRentalProduct] = useState();


  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/${id}`);
        if(response){
          // setRentalProduct(response.data.rentalProduct);
          console.log(response.data.rentalProduct);
          
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
     
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.put(`/rental/update/${id}`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center mt-6 bg-blue-300 rounded-lg mx-4">
          Update Rented Product
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5 mx-10 mt-6"
        >
          <div>
            <label htmlFor="customer" className="font-bold">
              Customer:
            </label>
            <input
              id="customer"
              type="text"
              name="customer"
              value={id}
              className="input input-bordered input-info w-full"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="product" className="font-bold">
              Product:
            </label>
            <input
              id="product"
              type="text"
              name="product"
              value={id}
              className="input input-bordered input-info w-full"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="startDate" className="font-bold">
              Date:
            </label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              placeholder="Rent date"
              className="input input-bordered input-info w-full"
            />
          </div>

          <div>
            <label htmlFor="paidAmount" className="font-bold">
              Paid Amount:
            </label>
            <input
              id="paidAmount"
              type="text"
              name="paidAmount"
              placeholder="Enter amount paid"
              className="input input-bordered input-info w-full"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="font-bold">
              Return Quantity:
            </label>
            <input
              id="quantity"
              type="text"
              name="quantity"
              placeholder="Enter Rented quantity"
              className="input input-bordered input-info w-full"
            />
          </div>

          <div>
            <label htmlFor="balanceAmount" className="font-bold">
              Balance Amount:
            </label>
            <input
              id="balanceAmount"
              type="text"
              name="balanceAmount"
              value={"-"}
              className="input input-bordered input-info w-full"
              readOnly
            />
          </div>

         

          <button type="submit" className="btn btn-success">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default RentUpdate;
