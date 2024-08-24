import axios from "axios";
import React from "react";
import { useState } from "react"
import { toast } from 'react-toastify'


const CreateBranch = () => {

    const inputDiv = "mb-4 flex flex-col"
    const inputLabel = "mb-2 text-xl"
    const inputCss = "p-2 border-2 rounded-md"

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
            const response = await axios.post("/branch/createBranch", formData);
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
                    <h1 className="text-center p-2 text-4xl font-bold m-6">Add Branch</h1>

                    <form onSubmit={handleSubmit} className="w-[70vw] sm:w-[70%] p-10">

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
                                className="bg-blue-400 text-white hover:text-blue-400 w-full py-2 rounded-md bottom-2 hover:bg-slate-200"
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