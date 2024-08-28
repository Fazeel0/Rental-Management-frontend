import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AllRents = () => {

    const [rentals, setrentals] = useState();

    useEffect(() => {

        (async () => {
            try {
                const response = await axios.get("/rental/all");
                if (response.data.success) {
                    setrentals(response.data.rentalProducts);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }

        })();

    }, []);

    console.log(rentals);

    return (
        <>
            <div className="overflow-x-auto mt-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-base text-black'>Customer name</th>
                            <th className='text-base text-black'>Product name</th>
                            <th className='text-base text-black'>Balance Amount</th>
                            <th className='text-base text-black'>Paid Amount</th>
                            <th className='text-base text-black'>Quantity</th>
                            <th className='text-base text-black'>More details</th>
                        </tr>
                    </thead>
                    {rentals?.map((rent, index) => {
                        return (
                            <>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{rent?.customer?.name}</td>
                                        <td>{rent?.product?.name}</td>
                                        <td>{rent?.balanceAmount}</td>
                                        <td>{rent?.paidAmount}</td>
                                        <td>{rent?.quantity}</td>
                                        <td><button className='btn btn-primary text-white'>More details</button></td>
                                    </tr>
                                </tbody>
                            </>
                        )
                    })}

                </table>
            </div>
        </>
    )
}

export default AllRents