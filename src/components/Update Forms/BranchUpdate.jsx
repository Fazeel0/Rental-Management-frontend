import React from "react";
import { useState } from "react"
// import axios from "axios";


const BranchUpdate = () => {

    const inputDiv = "mb-4 flex flex-col"
    const inputLabel = "mb-2 text-xl"
    const inputCss = "p-2 border-2 rounded-md"

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        contact : "",
    })

    const [error, setError] = useState("");
    const [status, setStatus] = useState("");


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
        setError("");
        setStatus("");
        console.log(formData);

        

          
        

        

    }




    return (
        <>
            <div className="container mx-auto flex justify-center items-center h-screen w-screen">

                    <div className=" pt-5 pb-5 mt-5 mb-5 border-secondary  w-3/4 h-3/4 flex flex-col justify-center items-center" id="login-box">
                        <h1 className="text-center p-2 text-5xl font-bold m-6">Update Branch</h1>

                        <form onSubmit={handleSubmit} className=" w-3/6 p-10">
                            {error && <p className="">{error}</p>}
                            {status && <p className="">{status}</p>}

                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example1">
                                    Branch Name
                                </label>
                                <input type="text" id="form1Example1" className={inputCss}
                                    placeholder="Branch Name" name="name"
                                    onChange={handleChange}
                                    value={formData.name} />
                            </div>
                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example2">
                                    Location
                                </label>
                                <input type="text" id="form1Example2" className={inputCss} placeholder="Location"
                                    name="location" onChange={handleChange}
                                    value={formData.location} />
                            </div>
                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example2">
                                    Contact Number
                                </label>
                                <input type="Number" id="form1Example2" className={inputCss} placeholder="Contact Number"
                                    name="contact" onChange={handleChange}
                                    value={formData.contact} />
                            </div>
                                
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-400 text-white hover:text-blue-400 w-full py-2 rounded-md bottom-2 hover:bg-slate-200"
                                >
                                    Update Branch
                                </button>
                            </div>
                        </form>

                    </div>


            </div>


        </>
    )
}

export default BranchUpdate;