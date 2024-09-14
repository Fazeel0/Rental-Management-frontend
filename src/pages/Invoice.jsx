import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const Invoice = () => {

    const [allRentals, setAllRentals] = useState();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setloading] = useState(true)

    const { user } = useSelector(state => state.user);
    console.log(user);

    useEffect(() => {
        (async () => {
            try {

                let response;
                if (user.roles === "Admin") {
                    setloading(true);
                    response = await axios.post(`/rental/rentsByPaginate?page=${page}&limit=10`);
                    if (response.data.success) {
                        setAllRentals(response.data.rentals);
                        setTotalPages(response.data.totalPages);
                        setloading(false);
                    }
                }
                else if (user.roles === "SubAdmin") {
                    setloading(true);
                    response = await axios.post("/rental/all/byBranches", { branches: user.branches });
                    if (response.data.success) {
                        setAllRentals(response.data.rentalByBranches)
                        setloading(false);
                    }
                }

            } catch (error) {
                setloading(false);
                console.log(error);
                toast.error(error.response.data.message);
            }
        })();
    }, [page]);


    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }


    if (loading) {
        return (
            <>
                <Loader />
            </>
        )
    }

    return (
        <>
            <div className="overflow-x-auto mt-5">

                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="text-xl font-bold text-black">Customer name</th>
                            <th className="text-xl font-bold text-black">No. of Products</th>
                            <th className="text-xl font-bold text-black">Balance Amount</th>
                            <th className="text-xl font-bold text-black">Paid Amount</th>
                            <th className="text-xl font-bold text-black">Quantity</th>
                            <th className="text-xl font-bold text-black">More details</th>
                            <th className="text-xl font-bold text-black">Branch</th>
                        </tr>
                    </thead>
                    {allRentals?.map((rent, index) => {
                        return (
                            <>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <td className="text-xl text-black font-bold">
                                            {index + 1}
                                        </td>
                                        <td className="text-xl text-blue-700 font-bold">
                                            {rent?.customer?.name}
                                        </td>
                                        <td className="text-xl text-blue-700 font-bold">
                                            {rent?.products?.length}
                                        </td>
                                        <td className="text-xl text-blue-700 font-bold">
                                            {rent?.balanceAmount}
                                        </td>
                                        <td className="text-xl text-blue-700 font-bold">
                                            {rent?.paidAmount}
                                        </td>
                                        <td className="text-xl text-blue-700 font-bold">
                                            {rent?.totalQuantity}
                                        </td>
                                        <td className="text-xl text-blue-700 font-bold">
                                            <button
                                                onClick={() => navigate(`/rental-data/${rent._id}`)}
                                                className="btn btn-primary text-white"
                                            >
                                                More details
                                            </button>
                                        </td>
                                        <td className="text-xl text-blue-700 font-bold">
                                            {rent?.branch?.name}
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        );
                    })}
                </table>

                <div className="h-20 flex justify-center items-center">
                    <button onClick={handlePrevious} className="btn btn-success text-white font-bold">Previous</button>
                    <span className="bg-blue-500 mx-3 p-4 rounded text-white font-bold">Page {page} of {totalPages}</span>
                    <button onClick={handleNext} className="btn btn-success text-white font-bold">Next</button>
                </div>
            </div>
        </>
    );

}

export default Invoice;