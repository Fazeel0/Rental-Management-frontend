import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';



const Navbar = () => {

    const logo = "Five7";

    const navigate = useNavigate();

    const { user, token } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        toast.success("Logout success");
        navigate("/");
    }

    const [branches, setBranches] = useState();

    const getAllBranches = async () => {
        try {

            const response = await axios.get("/branch/all");
            if (response.data.success) {
                setBranches(response.data.branches);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <div className="navbar bg-blue-400">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                            {token ?
                                <>
                                    <li><NavLink to={"/customer"}>Customer</NavLink></li>
                                    <li><NavLink to={"/rental"}>Rental</NavLink></li>

                                    {user.roles === "Admin" ?
                                        <>
                                            <li><NavLink to={"/users"}>Users</NavLink></li>
                                            <li><NavLink to={"/branch"}>Branch</NavLink></li>
                                        </>
                                        :
                                        null
                                    }

                                    <li><NavLink to={"/product"}>Product</NavLink></li>
                                    <button onClick={handleLogout} className='font-semibold text-lg bg-blue-700 px-2 rounded-lg text-white'>
                                        Logout
                                    </button>
                                </>
                                :
                                null
                            }

                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl border-2 border-blue-800 ml-3">{logo}</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        {token ?
                            <>
                                <li><NavLink to={"/Customer"} className=' font-semibold text-lg'>Customer</NavLink></li>
                                <li><NavLink to={"/rental"} className='font-semibold text-lg'>Rental</NavLink></li>
                                <li><NavLink to={"/product"} className='font-semibold text-lg'>Product</NavLink></li>

                                {user.roles === "Admin" ?
                                    <>
                                        <li><NavLink to={"/users"} className='font-semibold text-lg'>Users</NavLink></li>
                                        <li><NavLink to={"/branch"} className='font-semibold text-lg'>Branch</NavLink></li>
                                    </>
                                    :
                                    null
                                }
                                <li><NavLink to={"/invoice"} className='font-semibold text-lg'>Invoice</NavLink></li>
                                <button onClick={handleLogout} className='font-semibold text-lg bg-blue-700 px-2 rounded-lg text-white
                                hover:bg-blue-500'>
                                    Logout
                                </button>
                            </>
                            :
                            null
                        }
                    </ul>
                </div>

                {token ?
                    <>
                        <div className="navbar-end mr-24">
                            <details className="dropdown">
                                <summary onClick={getAllBranches} className="btn m-1 font-semibold text-lg">Branches</summary>
                                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                                    {branches?.map((branch) => {
                                        return (
                                            <>
                                                <li><a className='font-semibold text-sm'>{branch?.name}</a></li>
                                            </>
                                        )
                                    })}


                                </ul>
                            </details>
                        </div>
                    </>
                    :
                    null
                }

            </div>
        </>
    )
}

export default Navbar;