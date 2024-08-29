import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from "axios";


const CreateRental = () => {

    const params = useParams();
    const id = params.id;


    const [products, setproducts] = useState();
    const [branches, setbranches] = useState()
    const [disableProduct, setDisableProduct] = useState(true);
    const [disableQty, setDisableQty] = useState(true);
    const hasMounted = useRef(false);


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
    const changeBranch = async (e) => {
        let value = e.target.value;
        setselectedBranch(value);
        setDisableProduct(false);
    }

    useEffect(() => {

        if (hasMounted.current) {
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
        }
        else {
            hasMounted.current = true;
        }



    }, [selectedBranch]);


    const [availableQty, setavailableQty] = useState();

    const changeProduct = (e) => {
        const productId = e.target.value;

        let matchedProduct = {};
        products.forEach((product) => {
            if (product._id === productId) {
                matchedProduct = product;
            }
        })
        setavailableQty(matchedProduct.availableQuantity);
        setDisableQty(false);
    }



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
                            className="input input-bordered input-info w-full" required />
                    </div>
                    <div>
                        <label htmlFor="startDate" className="font-bold">Return Date:</label>
                        <input id="startDate"
                            type="date"
                            name="endDate"
                            placeholder="Return date"
                            className="input input-bordered input-info w-full" required />
                    </div>
                    <div>
                        <label htmlFor="paidAmount" className="font-bold">Paid Amount:</label>
                        <input id="paidAmount"
                            type="text"
                            name="paidAmount"
                            placeholder="Enter amount paid"
                            className="input input-bordered input-info w-full" required />
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
                        <select onChange={changeBranch} name="branch" id="branch" className="select select-info w-full" required>
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
                        <select onChange={changeProduct} name="product" className="select select-info w-full" disabled={disableProduct} required>
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

                    <div>
                        <label htmlFor="quantity" className="font-bold">Quantity:</label>
                        {availableQty ? <span className="text-green-700 font-bold"> In Stock {availableQty}</span> : null}
                        <input id="quantity"
                            type="number"
                            name="quantity"
                            max={availableQty}
                            placeholder="Enter Rented quantity"
                            className="input input-bordered input-info w-full" disabled={disableQty} required />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-success text-white font-bold mr-2">Submit</button>
                        <button onClick={() => window.location.reload()} type="button" className="btn btn-error text-white font-bold">Reset</button>
                    </div>



                </form>
            </div>
        </>
    )
}

export default CreateRental;