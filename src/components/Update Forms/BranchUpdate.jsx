import React, { useEffect } from "react";
import { useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Loader";


const BranchUpdate = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    console.log("Branch ID: ", id);

    const [loading, setLoading] = useState()

    const inputDiv = "mb-4 flex flex-col"
    const inputLabel = "mb-2 text-xl"
    const inputCss = "p-2 border-2 rounded-md"

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        contact: "",
    })

    const [branch, setbranch] = useState();

    useEffect(() => {
        const getBranchById = async (id) => {
            try {
                setLoading(true);
                const response = await axios.get(`/branch/${id}`);
                setLoading(false);

                if (response.data.success) {
                    setbranch(response.data.branch);

                }
            } catch (error) {
                setLoading(false);
                console.log(error);
                toast.error(error.response.data.message);
            }
        }

        getBranchById(id);
    }, [])


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

        const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== "")
        );

        console.log(filteredFormData);

        try {
            const response = await axios.put(`/branch/update/${id}`, filteredFormData);

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/branch/')
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        }
    }

    if (loading === true) {
        return <Loader />;
    }

    return (
        <>
            <div className="container mx-auto flex justify-center items-center h-screen">

                <div className=" pt-5 pb-5 mt-5 mb-5 border-secondary  w-3/4 h-3/4 flex flex-col justify-center items-center" id="login-box">
                    <h1 className="text-center p-2 m-6 text-2xl font-semibold text-blue-700">Update Branch</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-5 border-2 border-blue-600 p-9 rounded-3xl w-96">

                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example1">
                                Branch Name
                            </label>
                            <input type="text" id="form1Example1" className={inputCss}
                                placeholder={branch?.name} name="name"
                                onChange={handleChange}
                                value={formData.name} />
                        </div>
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example2">
                                Location
                            </label>
                            <input type="text" id="form1Example2" className={inputCss} placeholder={branch?.location}
                                name="location" onChange={handleChange}
                                value={formData.location} />
                        </div>
                        <div className={inputDiv}>
                            <label className={inputLabel} htmlFor="form1Example2">
                                Contact Number
                            </label>
                            <input type="Number" id="form1Example2" className={inputCss} placeholder={branch?.contact}
                                name="contact" onChange={handleChange}
                                value={formData.contact} />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-700 text-white w-full py-2 rounded-md bottom-2 ">
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