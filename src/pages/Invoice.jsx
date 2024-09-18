import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const Invoice = () => {
    const params = useParams();

    const id = params.id;
    console.log(id);

    const { user } = useSelector(state => state.user);

    const [rental, setRental] = useState();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`rental/${id}`);
                if (response.data.success) {
                    setRental(response.data.rentalProduct);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }

        })();
    }, [])

    console.log(rental);

    return (
        <>
            <div className="flex justify-center items-center my-4">
                <button onClick={() => window.print()} className="btn btn-outline print:hidden">Download Invoice</button>
            </div>
            <div className="mx-10 my-5 border-2 border-black px-10 py-8 space-y-2">
                <div><span className="font-bold">Customer:</span> {rental?.customer?.name}</div>
                <div><span className="font-bold">Contact:</span> {rental?.customer?.phoneNo}</div>
                <div><span className="font-bold">Address:</span> {rental?.customer?.address}</div>
                <hr />
                <div className="font-bold mt-5">Order # RENTAL ID: {rental?._id}</div>
                <div><span className="font-bold">Start Date: </span>{new Date(rental?.startDate).toLocaleDateString("en-GB")}</div>
                <div><span className="font-bold">End Date: </span>{new Date(rental?.endDate).toLocaleDateString("en-GB")}</div>

                <div><span className="font-bold">Salesperson: </span>{user?.name}</div>
                <hr />
                <div className="font-bold mt-5">Order Info:</div>
                <table className="table">
                    <tr className="">
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    {rental?.products?.map((p) => {
                        return (
                            <>
                                <tr>
                                    <td>{p?.product?.name}</td>
                                    <td>{p?.quantity}</td>
                                    <td>{p?.price}</td>
                                </tr>
                            </>
                        )
                    })}

                </table>
                <hr />
                <div className="font-bold">Total: ₹{rental?.totalPrice}</div>

                {rental?.paidAmount > 0 ? <div className="font-bold">Amount Paid: ₹{rental?.paidAmount}</div> : null}

            </div>

            <div>
                {rental?.paymentSummary?.length > 0 ?
                    <>
                        <h1 className="bg-blue-300 mx-3 rounded-lg text-center mt-2 font-bold py-1">Rental Summary</h1>
                        <div className="my-3 mx-10">
                            {/* multiple divs........... */}
                            {rental?.paymentSummary.map((summary, index) => {
                                return (
                                    <>
                                        <div className="border-4 border-blue-600 inline-block ml-6 p-4 rounded-lg">
                                            <h1 className="font-bold text-blue-800 text-xl">{index + 1}.</h1><hr className="h-[2px] bg-blue-400" />
                                            <h1 className="font-bold text-blue-800 text-xl">Date: {new Date(summary?.date).toLocaleDateString("en-GB")}</h1>
                                            <h1 className="font-bold text-blue-800 text-xl">Total Price: {summary?.price}</h1>
                                            <h1 className="font-bold text-blue-800 text-xl">Products </h1><hr className="h-[2px] bg-blue-400" />
                                            {/* multiple products............... */}
                                            {summary?.products?.map((obj) => {
                                                return (
                                                    <>
                                                        <div className="border-2 border-blue-600 mt-2 p-2 rounded-lg">
                                                            <h1 className="font-bold text-blue-800 text-xl">Product Name: {obj?.product?.name}</h1>
                                                            <h1 className="font-bold text-blue-800 text-xl">Returned Qty: {obj?.returnedQuantity}</h1>
                                                            <h1 className="font-bold text-blue-800 text-xl">Price: {obj?.price}</h1>
                                                        </div>
                                                    </>
                                                )
                                            })}

                                        </div>
                                    </>
                                )
                            })}

                        </div>
                    </>
                    : null}

            </div>

        </>
    )
}

export default Invoice;