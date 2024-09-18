import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CreateRental = () => {

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const { user } = useSelector(state => state.user);

    const [customerDetails, setCustomerDetails] = useState();


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/customer/${id}`);
                if (response.data.success) {
                    setCustomerDetails(response.data.customer);
                    console.log(customerDetails);

                }
            } catch (error) {
                console.log(error);

            }
        })()
    }, [])



    const [products, setproducts] = useState();
     const [branches, setbranches] = useState()
    const [disableProduct, setDisableProduct] = useState(true);
    const [disableQty, setDisableQty] = useState(true);
    const hasMounted = useRef(false);
    console.log(products);
    


    useEffect(() => {
        (async () => {
            try {
                if (user.roles === "Admin") {

                    const response = await axios.get("/branch/all");
                    if (response.data.success) {
                        setbranches(response.data.branches);
                    }
                }
                else if (user.roles === "SubAdmin") {

                    setbranches(user?.branches)
                }


            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        })();

    }, []);





    const [selectedBranch, setselectedBranch] = useState();
    const [isBranchSelected, setIsBranchSelected] = useState(false);
    const changeBranch = async (e) => {
        let value = e.target.value;
        
        setselectedBranch(value);
        setIsBranchSelected(true);
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



    

   



    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let data = Object.fromEntries(formData.entries());


    
        
        data = {
            ...data,
            customer : id,
            branch : selectedBranch,
        }

        let totalQuantity = 0;
        rows.forEach((row) => {
            totalQuantity = totalQuantity + Number(row.quantity);
        })

        data = { ...data, products: rows, totalQuantity };
        console.log(data);
        


        try {
            const response = await axios.post("/rental/add", data)
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/rental")
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    //Table 
    const [rows, setRows] = useState([{ name: '', quantity: '', availableQty : '0' }]);

    const handleAddRow = () => {
        setRows([...rows, { name: '', quantity: '', availableQty : '0' }]);
        
        
    };

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        if(field === "name"){
            products.forEach((product)=>{
                if(value === product.name){
                    console.log(product.availableQuantity);
                    updatedRows[index]["availableQty"] = product.availableQuantity
                }
            })
        }
        updatedRows[index][field] = value;
        setRows(updatedRows); 
    };

    return (
        <>
            <div>
                <h1 className="text-center mt-6 bg-blue-300 rounded-lg mx-4 text-2xl font-semibold text-blue-700">Rent a Product</h1>
                <form onSubmit={handleSubmit} >
                    <div className="grid grid-cols-2 gap-5 mx-10 mt-6">
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
                                value={customerDetails?.name}
                                className="input input-bordered input-info w-full" readOnly />
                        </div>

                        <div>
                            <label htmlFor="branch" className="font-bold">Branch:</label>
                            <select onChange={changeBranch} name="branch" id="branch" className="select select-info w-full" required disabled={isBranchSelected} 
                            >
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
                    </div>


                    {/* Table................................................................. */}
                    <table className="w-[70%] bg-white border mx-10 my-4">
                        <thead>
                            <tr>
                                {/* <th className="px-4 py-2 border">id</th> */}
                                <th className="px-4 py-2 border">Product</th>
                                <th className="px-4 py-2 border">Quantity</th>
                                <th className="px-4 py-2 border"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows?.map((row, index) => (
                                <tr key={index}>
                                    <td className="px-4  py-2 border">
                                        <input
                                            type="text"
                                            list="suggestion"
                                            className="w-full px-2 py-1 border rounded"
                                            placeholder="Enter product"
                                            value={row?.name}
                                            onChange={(e) =>{
                                                handleInputChange(index, 'name', e.target.value);
                                                // changeProduct(row?.id)
                                            } }
                                        />

                                        <datalist id="suggestion" >
                                            {products?.map((product) => {
                                                return <>
                                                    <option value={product?.name}>{product?.name}</option>
                                                </>
                                            })}
                                        </datalist>

                                    </td>
                                    {/* <td  className="px-4 py-2 border">
                                    <input id="customer"
                                type="text"
                                name="customer"
                                value={productName}
                                className="input input-bordered input-info w-full" readOnly />
                                    </td> */}
                                    
                                    <td className="px-4 py-2 border">
                                        <input
                                            type="number"
                                            className="w-full px-2 py-1 border rounded placeholder:text-green-600"
                                            placeholder={`${row.availableQty} InStock`}
                                            value={row?.quantity}
                                            max={row.availableQty}
                                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {index === rows.length - 1 && (
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full"
                                                onClick={handleAddRow}>
                                                +
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                    <div className="mx-10">
                        <button type="submit" className="btn btn-success text-white font-bold mr-2">Submit</button>
                        <button onClick={() => window.location.reload()} type="reset" className="btn btn-error text-white font-bold">Reset</button>
                    </div>

                </form>






            </div>
        </>
    )
}

export default CreateRental;