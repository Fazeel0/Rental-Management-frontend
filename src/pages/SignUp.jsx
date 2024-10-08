import React from "react";
import { useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


const SignUp = () => {

    const inputDiv = "mb-4 flex flex-col"
    const inputLabel = "mb-2 mr-2 text-xl"
    const inputCss = "p-2 border-2 rounded-md"

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
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
        try {
            const response = await axios.post("/user/createAdmin", formData);

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/");
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
                    <h1 className="text-center p-2 text-3xl font-bold m-6">Signup</h1>

                    <form onSubmit={handleSubmit} className=" w-3/6 p-10">

                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example1">
                                Name
                            </label>
                            <input type="text" id="form1Example1" className={inputCss}
                                placeholder="Full Name" name="name"
                                onChange={handleChange}
                                value={formData.name} required />
                        </div>
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example1">
                                Email
                            </label>
                            <input type="email" id="form1Example1" className={inputCss}
                                placeholder="Email" name="email"
                                onChange={handleChange}
                                value={formData.email} required />
                        </div>
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example2">
                                Password
                            </label>
                            <input type="password" id="form1Example2" className={inputCss} placeholder="password"
                                name="password" onChange={handleChange}
                                value={formData.password} required />
                        </div>
                        <div className=" mb-4">
                            <div className={inputLabel}>
                                <span className={inputLabel} >Already have Account?</span>
                                <Link className="hover:text-blue-500" to="/">LogIn</Link>
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-400 text-white hover:text-blue-400 w-full py-2 rounded-md bottom-2 hover:bg-slate-200"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                </div>


            </div>


        </>
    )
}

export default SignUp;