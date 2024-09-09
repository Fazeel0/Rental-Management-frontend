import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const inputDiv = "mb-4 flex flex-col";
  const inputLabel = "mb-2 text-lg";
  const inputCss = "p-2 border-2 rounded-md";

  const navigate = useNavigate();
  const params = useParams();

  const id = params.id;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    allotedQuantity: "",
    quantity: "",
    reason: ""
  });

  const [product, setProduct] = useState();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(`/product/${id}`);

      if (response.data.success) {
        setProduct(response.data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };



  //whenever user types in input fields, handles ==>
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    let filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    );

    if (filteredFormData.quantity) {
      if (!filteredFormData.reason) {
        toast.error("Required Reason for scrap!");
        return;
      }

      if (filteredFormData.quantity && filteredFormData.reason) {
        let scrapObj = {
          quantity: filteredFormData.quantity,
          reason: filteredFormData.reason
        }

        filteredFormData = { ...filteredFormData, scrap: scrapObj };
      }

      delete filteredFormData.quantity;
      delete filteredFormData.reason;

    }

    try {
      const response = await axios.put(`/product/${id}`, filteredFormData);
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/product/")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div
          className=" pt-5 pb-5 mt-5 mb-5 border-secondary  w-2/4 h-3/4 flex flex-col justify-center items-center"
          id="login-box"
        >
          <h1 className="text-center p-2 m-6 text-2xl font-semibold text-blue-700">
            Update Product
          </h1>

          <form onSubmit={handleSubmit} className="w-[70vw] sm:w-[70%] p-10">
            <div className={inputDiv}>
              <label className={inputLabel} htmlFor="form1Example1">
                Product Name
              </label>
              <input
                type="text"
                id="form1Example1"
                className={inputCss}
                placeholder={product?.name}
                name="name"
                onChange={handleChange}
                value={formData.name}
              // required
              />
            </div>
            <div className="flex xl:flex-row  xl:justify-between md:flex-col gap-2">
              <div className={inputDiv}>
                <label className={inputLabel} htmlFor="form1Example2">
                  Price
                </label>
                <input
                  type="number"
                  id="form1Example2"
                  className={inputCss}
                  placeholder={product?.price}
                  name="price"
                  onChange={handleChange}
                  value={formData.price}
                //   required
                />
              </div>
              <div className={inputDiv}>
                <label className={inputLabel} htmlFor="form1Example2">
                  Add to Alloted Quantity
                </label>
                <input
                  type="Number"
                  id="form1Example2"
                  className={inputCss}
                  placeholder={product?.allotedQuantity}
                  name="allotedQuantity"
                  onChange={handleChange}
                  value={formData.allotedQuantity}
                //   required
                />
              </div>
            </div>
            <div className={inputDiv}>
              <label className={inputLabel} htmlFor="form1Example2">
                Scrap Quantity
              </label>
              <input
                type="Number"
                id="form1Example2"
                className={inputCss}
                placeholder="Scrap Quantity"
                name="quantity"
                onChange={handleChange}
                value={formData.quantity}
              //   required
              />
            </div>
            <div className={inputDiv}>
              <label className={inputLabel} htmlFor="form1Example2">
                Scrap Reason
              </label>
              <textarea
                type="text"
                id="form1Example2"
                className={inputCss}
                placeholder="Scrap Reason"
                name="reason"
                onChange={handleChange}
                value={formData.reason}
              //   required
              />
            </div>



            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-400 text-white hover:text-blue-400 w-full py-2 rounded-md bottom-2 hover:bg-slate-200"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;
