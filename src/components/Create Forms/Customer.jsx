import React from "react";
import { useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";


const Customer = () => {

    const inputDiv = "mb-4 flex flex-col"
    const inputLabel = "mb-2 text-xl"
    const inputCss = "p-2 border-2 rounded-md"

    const [formData, setFormData] = useState({
        name: "",
        phoneNo : "",
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
        console.log(formData);

        try {
            const response = await axios.post("/customer/create",formData);
            console.log(response);

            if(response.data.success){
                toast.success(response.data.message);
                
                console.log(response.data.customer._id);
                
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            
        }
        
    }




    return (
        <>
            <div className="container mx-auto flex justify-center items-center h-screen w-screen">

                    <div className=" pt-5 pb-5 mt-5 mb-5 border-secondary  w-3/4 h-3/4 flex flex-col justify-center items-center" id="login-box">
                        <h1 className="text-center p-2 text-5xl font-bold m-6">Create Customer</h1>

                        <form onSubmit={handleSubmit} className=" w-3/6 p-10">

                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example1">
                                    Customer Name
                                </label>
                                <input type="text" id="form1Example1" className={inputCss}
                                    placeholder="Customer Name" name="name"
                                    onChange={handleChange}
                                    value={formData.name} required />
                            </div>
                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example2">
                                    Phone Number
                                </label>
                                <input type="Number" id="form1Example2" className={inputCss} placeholder="Phone Number"
                                    name="phoneNo" onChange={handleChange}
                                    value={formData.phoneNo} required />
                            </div>
                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example2">
                                    Address
                                </label>
                                <input type="text" id="form1Example2" className={inputCss} placeholder="Address"
                                    name="address" onChange={handleChange}
                                    value={formData.address} required />
                            </div>
                                
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-400 text-white hover:text-blue-400 w-full py-2 rounded-md bottom-2 hover:bg-slate-200"
                                >
                                    Create Customer
                                </button>
                            </div>
                        </form>

                    </div>


            </div>


        </>
    )
}

export default Customer;