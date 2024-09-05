import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from "axios";

const RentUpdate = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [formData , setFormData] = useState({
    endDate : "",
    paidAmount : "",
    returnedQuantity : "",
  });

 
  const [rentalProduct, setRentalProduct] = useState();

  useEffect(() => {
    const fetchRentalProduct = async () => {
      try {
        const response = await axios.get(`/rental/${id}`);
        if (response.data.success) {
          setRentalProduct(response.data.rentalProduct);
          console.log(rentalProduct);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    fetchRentalProduct();
  }, []); 

const handleChange = (e)=>{
  const {name, value} = e.target;
  setFormData({
    ...formData,
    [name]: value
  })
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // let formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());

    console.log(formData);
    

    try {
      const response = await axios.put(`/rental/update/${id}`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(`/rental/`);
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
              value={rentalProduct?.customer?.name}
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
              value={rentalProduct?.product?.name}
              className="input input-bordered input-info w-full"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="startDate" className="font-bold">
              Date:
            </label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              placeholder="Rent date"
              onChange={handleChange}
              value={formData.endDate}
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
              onChange={handleChange}
              value={formData.paidAmount}
              className="input input-bordered input-info w-full"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="font-bold">
              Return Quantity: <span className="text-red-500">{rentalProduct?.quantity}</span>
            </label>
            <input
              id="returnedQuantity"
              type="text"
              name="returnedQuantity"
              placeholder="Enter Rented quantity"
              onChange={handleChange}
              value={formData.returnedQuantity}
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
              value={rentalProduct?.balanceAmount}
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
