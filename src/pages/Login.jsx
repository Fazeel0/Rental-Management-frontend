import React, { useEffect } from "react";
import { useState } from "react"
import axios from "axios";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const inputDiv = "mb-4 flex flex-col"
    const inputLabel = "mb-2 text-sm"
    const inputCss = "p-2 border-2 rounded-md"
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token } = useSelector(state => state.user);



    useEffect(() => {
        //if user is logged in then redirecting
        if (token) {
            navigate("/customer");
        }
    }, [])

    const [formData, setFormData] = useState({
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

        console.log(formData);

        try {
            const response = await axios.post("/user/login", formData);
            console.log(response);

            if (response.data.success) {

                let user = response.data.user;
                let token = response.data.token;

                dispatch(login({ user, token }));
                toast.success(response.data.message);
                navigate("/customer");
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
                    <h1 className="text-center p-2 text-3xl font-bold m-6">Login</h1>

                    <form onSubmit={handleSubmit} className=" sm:w-[70%] md:w-3/6 p-10 border boder-2 border-black rounded-lg">

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
                                <a className="hover:text-blue-500 text-sm" href="/verify">Forgot password?</a>
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-400 text-white hover:text-blue-400 w-full py-2 rounded-md bottom-2 hover:bg-slate-200">
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