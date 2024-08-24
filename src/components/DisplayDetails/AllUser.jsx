import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AllUser = () => {


    const [users, setusers] = useState();
    const [loading, setLoading] = useState();
    const [uichange, setuichange] = useState();

    const loggedInUser = useSelector(state => state.user.user);

    const navigate = useNavigate();

    const getAllUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/user/all`);
            setLoading(false);
            if (response.data.success) {
                setusers(response.data.users);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [uichange])

    const deleteUser = async (id) => {
        try {


            const agree = window.confirm("Are you sure, want to delete this user?");

            if (agree) {
                const response = await axios.post(`/user/delete`, { id });
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



    if (loading === true) return <Loader />

    return (
        <>
            <div>
                <div className="overflow-x-auto mt-5">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th className='text-xl text-black'>Name</th>
                                <th className='text-xl text-black'>Email</th>
                                <th className='text-xl text-black'>Roles</th>
                                <th className='text-xl text-black'>Update</th>
                                <th className='text-xl text-black'>Delete</th>
                            </tr>
                        </thead>
                        {users?.map((user, index) => {
                            return (
                                <>
                                    <tbody>
                                        {/* row 1 */}

                                        {
                                            user._id === loggedInUser._id ?
                                                <>
                                                    <tr className='bg-green-200'>
                                                        <th>{index + 1}</th>
                                                        <th>{user?.name}</th>
                                                        <td>{user?.email}</td>
                                                        <td>{user?.roles}</td>
                                                        <td><i onClick={() => navigate(`/users/update/${user?._id}`)} class="fa-solid fa-pen-to-square text-green-800 cursor-pointer"></i></td>

                                                    </tr>
                                                </>
                                                :
                                                <tr>
                                                    <th>{index + 1}</th>
                                                    <th>{user?.name}</th>
                                                    <td>{user?.email}</td>
                                                    <td>{user?.roles}</td>
                                                    <td><i onClick={() => navigate(`/users/update/${user?._id}`)} class="fa-solid fa-pen-to-square text-green-800 cursor-pointer"></i></td>
                                                    <td><i onClick={() => deleteUser(user?._id)} class="fa-solid fa-trash text-red-600 cursor-pointer"></i></td>
                                                </tr>
                                        }


                                    </tbody>
                                </>
                            )
                        })}

                    </table>
                </div>
            </div>
        </>
    )
}

export default AllUser