import React from "react";
import { useState } from "react"
// import axios from "axios";


const RentalForm = () => {

    const inputDiv = "mb-4 flex flex-row "
    const inputLabel = "mb-2 mx-3 text-xl"
    const inputCss = "p-2 border-2 rounded-md"

    const [formData, setFormData] = useState({
        startDate : "",
        endDate : "",
        cName : "",
        pName : "",
        quantity : "",
        paidAmount : "",
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

                    <div className=" pt-5 pb-5 mt-5 mb-5 border-secondary   w-full h-3/4 flex flex-col justify-center items-center" id="login-box">
                        <h1 className="text-center p-2 text-5xl font-bold m-6">Rent Product</h1>

                        <form onSubmit={handleSubmit} className=" w-5/6 p-10">
                            {error && <p className="">{error}</p>}
                            {status && <p className="">{status}</p>}

                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example1">
                                    Start Date
                                </label>
                                <input type="date" id="form1Example1" className={inputCss}
                                    placeholder="" name="startDate"
                                    onChange={handleChange}
                                    value={formData.name} required />
                                <label className={inputLabel} htmlFor="form1Example1">
                                    Return Date
                                </label>
                                <input type="date" id="form1Example1" className={inputCss}
                                    placeholder="" name="endDate"
                                    onChange={handleChange}
                                    value={formData.name} required />
                            </div>
                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example1">
                                    Customer Name
                                </label>
                                <input type="text" id="form1Example1" className={inputCss}
                                    placeholder="Customer Name" name="cName"
                                    onChange={handleChange}
                                    value={formData.email} required />
                                <label className={inputLabel} htmlFor="form1Example1">
                                    Customer Id :-
                                </label>
                                <h3>0</h3>
                            </div>
                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example1">
                                    Product Name
                                </label>
                                <input type="text" id="form1Example1" className={inputCss}
                                    placeholder="Customer Name" name="cName"
                                    onChange={handleChange}
                                    value={formData.email} required />
                                <label className={inputLabel} htmlFor="form1Example1">
                                    Product Id :-
                                </label>
                                <h3>0</h3>
                            </div>
                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example1">
                                    Quantity
                                </label>
                                <input type="number" id="form1Example1" className={inputCss}
                                    placeholder="Quantity" name="quantity"
                                    onChange={handleChange}
                                    value={formData.quantity} required />
                                <label className={inputLabel} htmlFor="form1Example1">
                                    In Stock :-
                                </label>
                                <h3>0</h3>
                            </div>
                            <div className={inputDiv}>
                                <label className={inputLabel} htmlFor="form1Example2">
                                    Paid Amount
                                </label>
                                <input type="number" id="form1Example2" className={inputCss} placeholder="Paid Amount"
                                    name="paidAmount" onChange={handleChange}
                                    value={formData.password} required />
                                <label className={inputLabel} htmlFor="form1Example2">
                                    Total Amount :-
                                </label>
                                <h3>0</h3>
                            </div>
                            <div className=" mb-4">
                                <div className={inputLabel}>
                                    <span className={inputLabel} >Already Rented?</span>
                                    <a className="hover:text-blue-500" href="/">Update here</a>
                                </div>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-400 text-white hover:text-blue-400 w-1/3 py-2 rounded-md bottom-2 hover:bg-slate-200"
                                >
                                    Rent Product
                                </button>
                            </div>
                        </form>

                    </div>


            </div>


        </>
    )
}

export default RentalForm;