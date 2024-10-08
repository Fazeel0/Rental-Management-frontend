import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CustomerUpdate = () => {
    const params = useParams();
    const navigate = useNavigate();

    const id = params.id;
    console.log("Id ", id);

    const inputDiv = "mb-4 flex flex-col";
    const inputLabel = "mb-2 text-xl";
    const inputCss = "p-2 border-2 rounded-md";

    const [formData, setFormData] = useState({
        name: "",
        phoneNo: "",
        address: "",
    });

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`/customer/${id}`);
                if (response.data.success) {
                    const customer = response.data.customer;
                    setFormData({
                        name: customer.name,
                        phoneNo: customer.phoneNo,
                        address: customer.address,
                    });
                }
            } catch (error) {
                console.error("There was an error fetching the customer data!", error);
            }
        };

        fetchCustomerData();
    }, []);

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

        try {
            const response = await axios.put(
                `/customer/update/${id}`,
                filteredFormData
            );
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);

            toast.error(error.response.data.message);
        }

        navigate("/customer/");
    };

    return (
        <>
            <div className="container mx-auto flex justify-center items-center h-screen">
                <div
                    className=" pt-5 pb-5 mt-5 mb-5 border-secondary  w-3/4 h-3/4 flex flex-col justify-center items-center"
                    id="login-box"
                >
                    <h1 className="text-center p-2 m-6 text-2xl font-semibold text-blue-700">
                        Update Customer
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-5 border-2 border-blue-600 p-9 rounded-3xl w-96">
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example1">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                id="form1Example1"
                                className={inputCss}
                                placeholder="Customer Name"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </div>
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example2">
                                Phone Number
                            </label>
                            <input
                                type="Number"
                                id="form1Example2"
                                className={inputCss}
                                placeholder="Phone Number"
                                name="phoneNo"
                                onChange={handleChange}
                                value={formData.phoneNo}
                            />
                        </div>
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example2">
                                Address
                            </label>
                            <input
                                type="text"
                                id="form1Example2"
                                className={inputCss}
                                placeholder="Address"
                                name="address"
                                onChange={handleChange}
                                value={formData.address}
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-700 text-white w-full py-2 rounded-md bottom-2 "
                            >
                                Update Customer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CustomerUpdate;
