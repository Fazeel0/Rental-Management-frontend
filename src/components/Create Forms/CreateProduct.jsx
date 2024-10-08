import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const inputDiv = "mb-4 flex flex-col";
  const inputLabel = "mb-2 text-xl";
  const inputCss = "p-2 border-2 rounded-md";

  const { user } = useSelector(state => state.user);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    allotedQuantity: "",
    branch: "",
  });

  const [branches, setBranches] = useState();

  useEffect(() => {
    getAllBranches();
  }, []);

  const getAllBranches = async () => {
    try {

      if (user.roles === "Admin") {
        const response = await axios.get("/branch/all");
        if (response.data.success) {
          setBranches(response.data.branches);
        }
      }
      else if (user.roles === "SubAdmin") {
        setBranches(user?.branches);
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

  const handleBranchChange = (e) => {
    setFormData({
      ...formData,
      branch: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post("/product/new", formData);
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/product")
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
          id="login-box">
          <h1 className="text-center p-2 m-6 text-2xl font-semibold text-blue-700">
            Add Product
          </h1>

          <form onSubmit={handleSubmit} className="w-[60vw] sm:w-[90%] 2xl:w-[65%] flex flex-col space-y-5 border-2 border-blue-600 p-9 rounded-3xl">
            <div className={inputDiv}>
              <label className={inputLabel} htmlFor="form1Example1">
                Product Name
              </label>
              <input
                type="text"
                id="form1Example1"
                className={inputCss}
                placeholder="Product Name"
                name="name"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <div className="flex sm:flex-col xl:justify-between gap-2">
              <div className={inputDiv}>
                <label className={inputLabel} htmlFor="form1Example2">
                  Price
                </label>
                <input
                  type="number"
                  id="form1Example2"
                  className={inputCss}
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                  value={formData.price}
                  required
                />
              </div>
              <div className={inputDiv}>
                <label className={inputLabel} htmlFor="form1Example2">
                  Alloted Quantity
                </label>
                <input
                  type="Number"
                  id="form1Example2"
                  className={inputCss}
                  placeholder="Alloted Quantity"
                  name="allotedQuantity"
                  onChange={handleChange}
                  value={formData.allotedQuantity}
                  required
                />
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <label for="options" class="text-xl   ">
                Choose Branch
              </label>
              <select
                onChange={handleBranchChange}
                id="options"
                class="p-2 border-2 rounded-md mb-3">
                <option></option>
                {branches?.map((branch, index) => {
                  return (
                    <>
                      <option key={branch._id} value={branch._id}><span>{index + 1}. </span>
                        {branch.name}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-700 text-white w-full py-2 rounded-md bottom-2 "
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
