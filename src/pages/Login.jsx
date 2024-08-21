import React from "react";
import { useState } from "react"
// import axios from "axios";


const Login = () => {

    const inputDiv = "mb-4 flex flex-col"
    const inputLabel = "mb-2 text-xl"
    const inputCss = "p-2 border-2 rounded-md"

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
                        <h1 className="text-center p-2 text-5xl font-bold m-6">Login</h1>

                        <form onSubmit={handleSubmit} className=" w-3/6 p-10">
                            {error && <p className="">{error}</p>}
                            {status && <p className="">{status}</p>}

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
                                    <div className="">
                                        <label className={inputLabel} htmlFor="form1Example3">
                                            
                                            Remember me{" "}
                                        </label>
                                        <input
                                            className="bg-blue-600"
                                            type="checkbox"
                                            defaultValue=""
                                            id="form1Example3"
                                            defaultChecked=""
                                        />
                                    </div>
                                </div>
                                <div className={inputLabel}>
                                    <a className="hover:text-blue-500" href="/verify">Forgot password?</a>
                                </div>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-400 text-white hover:text-blue-400 w-full py-2 rounded-md bottom-2 hover:bg-slate-200"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                    </div>


            </div>


        </>
    )
}

export default Login;