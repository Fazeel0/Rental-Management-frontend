import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from "axios";


const CreateRental = () => {

    const params = useParams();
    const id = params.id;


    const [products, setproducts] = useState();
    const [branches, setbranches] = useState()
    const [disable, setdisable] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/branch/all");
                if (response.data.success) {
                    setbranches(response.data.branches);
                }

            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        })();
    }, []);



    const [selectedBranch, setselectedBranch] = useState();
    const changeBranch = (e) => {
        let value = e.target.value;
        setselectedBranch(value);
        setdisable(false);
    }

    useEffect(() => {

        (async () => {
            try {
                const response = await axios.post("/product/getProductsByBranch", { branch: selectedBranch });

                if (response.data.success) {
                    setproducts(response.data.products);
                }

            } catch (error) {
                console.log(error);
                setproducts([]);
            }

        })();

    }, [selectedBranch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {

            const response = await axios.post("/rental/add", data)
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
            <div>
                <h1 className="text-2xl font-bold text-center mt-6 bg-blue-300 rounded-lg mx-4">Rent a Product</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 mx-10 mt-6">
                    <div>
                        <label htmlFor="startDate" className="font-bold">Rent Date:</label>
                        <input id="startDate"
                            type="date"
                            name="startDate"
                            placeholder="Rent date"
                            className="input input-bordered input-info w-full" />
                    </div>
                    <div>
                        <label htmlFor="startDate" className="font-bold">Return Date:</label>
                        <input id="startDate"
                            type="date"
                            name="endDate"
                            placeholder="Return date"
                            className="input input-bordered input-info w-full" />
                    </div>
                    <div>
                        <label htmlFor="paidAmount" className="font-bold">Paid Amount:</label>
                        <input id="paidAmount"
                            type="text"
                            name="paidAmount"
                            placeholder="Enter amount paid"
                            className="input input-bordered input-info w-full" />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="font-bold">Quantity:</label>
                        <input id="quantity"
                            type="text"
                            name="quantity"
                            placeholder="Enter Rented quantity"
                            className="input input-bordered input-info w-full" />
                    </div>

                    <div>
                        <label htmlFor="customer" className="font-bold">Customer:</label>
                        <input id="customer"
                            type="text"
                            name="customer"
                            value={id}
                            className="input input-bordered input-info w-full" readOnly />
                    </div>

                    <div>
                        <label htmlFor="branch" className="font-bold">Branch:</label>
                        <select onChange={changeBranch} name="branch" id="branch" className="select select-info w-full">
                            <option disabled selected>Select Branch</option>
                            {branches?.map((branch) => {
                                return (
                                    <>
                                        <option value={branch?._id}>{branch?.name}</option>
                                    </>
                                )
                            })}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="product" className="font-bold">Product:</label>
                        <select name="product" className="select select-info w-full" disabled={disable}>
                            <option disabled selected>Select Product</option>
                            {products?.map((product) => {
                                return (
                                    <>
                                        <option value={product?._id}>{product?.name}</option>
                                    </>
                                )
                            })}

                        </select>
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>

                </form>
            </div>
        </>
    )
}

export default CreateRental;