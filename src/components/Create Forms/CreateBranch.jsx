import axios from "axios";
import React from "react";
import { useState } from "react"
import { toast } from 'react-toastify'


const CreateBranch = () => {

    const inputDiv = "mb-4 flex flex-col"
    const inputLabel = "mb-2 text-xl"
    const inputCss = "p-2 border-2 rounded-md "

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        contact: "",
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
            const response = await axios.post("/branch/create", formData);
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

                <div className=" pt-5 pb-5 mt-5 mb-5 border-secondary  w-2/4 h-3/4 flex flex-col justify-center items-center" id="login-box">
                    <h1 className="text-center p-2 m-6 text-2xl font-semibold text-blue-700">Add Branch</h1>

                    <form onSubmit={handleSubmit} className="w-[50vw] sm:w-[55%] flex flex-col space-y-5 border-2 border-blue-600 p-9 rounded-3xl">

                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example1">
                                Branch Name
                            </label>
                            <input type="text" id="form1Example1" className={inputCss}
                                placeholder="Branch Name" name="name"
                                onChange={handleChange}
                                value={formData.name} required />
                        </div>
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example2">
                                Location
                            </label>
                            <input type="text" id="form1Example2" className={inputCss} placeholder="Location"
                                name="location" onChange={handleChange}
                                value={formData.location} required />
                        </div>
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example2">
                                Contact Number
                            </label>
                            <input type="Number" id="form1Example2" className={inputCss} placeholder="Contact Number"
                                name="contact" onChange={handleChange}
                                value={formData.contact} required />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-700 text-white w-full py-2 rounded-md bottom-2 "
                            >
                                Create Branch
                            </button>
                        </div>
                    </form>

                </div>


            </div>


        </>
    )
}

export default CreateBranch;