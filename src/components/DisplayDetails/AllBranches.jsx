import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader';


const AllBranches = () => {


    const [branches, setBranches] = useState();
    const [loading, setLoading] = useState();
    const [uichange, setuichange] = useState(false);
    const navigate = useNavigate();


    const getAllBranches = async () => {


        try {
            setLoading(true);
            const response = await axios.get("/branch/all");
            setLoading(false);
            if (response.data.success) {
                setBranches(response.data.branches);
            }

        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.message);
        }

    }

    useEffect(() => {
        getAllBranches();
    }, [uichange])

    const deleteBranch = async (id) => {
        try {
            console.log("delete :", id);
            let agree = window.confirm("Are you sure, want to delete this branch?");

            if (agree) {
                const response = await axios.delete(`/branch/delete/${id}`);

                if (response.data.success) {
                    setuichange(!uichange);
                    toast.success(response.data.message);
                }
            }
            else {
                return;
            }


        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    if (loading === true) {
        return (
            <>
                <Loader />
            </>
        )
    }



    return (
        <>
            {
                !branches ?
                    <h1 className='bg-red-300 p-3 rounded-lg text-3xl mt-2 mx-2 text-white'>Branches not available</h1>
                    :
                    <>
                        <div className="overflow-x-auto mt-5">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className='text-xl text-black'>Name</th>
                                        <th className='text-xl text-black'>Location</th>
                                        <th className='text-xl text-black'>Contact</th>
                                        <th className='text-xl text-black'>Update</th>
                                        <th className='text-xl text-black'>Delete</th>
                                    </tr>
                                </thead>
                                {branches?.map((branch, index) => {
                                    return (
                                        <>
                                            <tbody>
                                                {/* row 1 */}
                                                <tr>
                                                    <th>{index + 1}</th>
                                                    <td>{branch?.name}</td>
                                                    <td>{branch?.location}</td>
                                                    <td>{branch?.contact}</td>
                                                    <td><i onClick={() => navigate(`/branch/update/${branch._id}`)} class="fa-solid fa-pen-to-square text-green-800 cursor-pointer"></i></td>
                                                    <td><i onClick={() => deleteBranch(branch._id)} class="fa-solid fa-trash text-red-600 cursor-pointer"></i></td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })}

                            </table>
                        </div>
                    </>

            }

        </>
    )
}

export default AllBranches;