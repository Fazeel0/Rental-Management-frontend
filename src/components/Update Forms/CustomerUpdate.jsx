import axios from "axios";
import React from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from "axios";


const CustomerUpdate = () => {

    const params = useParams();

    const id = params.id;
    console.log("Id ", id);

    const inputDiv = "mb-4 flex flex-col"
    const inputLabel = "mb-2 text-xl"
    const inputCss = "p-2 border-2 rounded-md"

    const [formData, setFormData] = useState({
        name: "",
        phoneNo: "",
        address: "",
    })


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

        const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== "")
        );

        console.log(formData);
        let customerId = "66c7000248a8316b0056d1ab";

        try {

            const response = await axios.put(`/customer/update/${customerId}`, filteredFormData);
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message);
            }

        } catch (error) {
            console.log(error);

            toast.error(error.response.data.message);
        }




    }


    return (
        <>
            <div className="container mx-auto flex justify-center items-center h-screen">

                <div className=" pt-5 pb-5 mt-5 mb-5 border-secondary  w-3/4 h-3/4 flex flex-col justify-center items-center" id="login-box">
                    <h1 className="text-center p-2 text-5xl font-bold m-6">Update Customer</h1>

                    <form onSubmit={handleSubmit} className=" w-3/6 p-10">

                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example1">
                                Customer Name
                            </label>
                            <input type="text" id="form1Example1" className={inputCss}
                                placeholder="Customer Name" name="name"
                                onChange={handleChange}
                                value={formData.name} />
                        </div>
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example2">
                                Phone Number
                            </label>
                            <input type="Number" id="form1Example2" className={inputCss} placeholder="Phone Number"
                                name="phoneNo" onChange={handleChange}
                                value={formData.phoneNo} />
                        </div>
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example2">
                                Address
                            </label>
                            <input type="text" id="form1Example2" className={inputCss} placeholder="Address"
                                name="address" onChange={handleChange}
                                value={formData.address} />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-400 text-white hover:text-blue-400 w-full py-2 rounded-md bottom-2 hover:bg-slate-200"
                            >
                                Update Customer
                            </button>
                        </div>
                    </form>

                </div>


            </div>


        </>
    )
}

export default CustomerUpdate;