import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import { toast } from 'react-toastify';



const Navbar = () => {

    const logo = "ZD Plates";

    const { user, token } = useSelector(state => state.user);
    const dispatch = useDispatch();
    console.log({ user, token });

    const handleLogout = () => {
        dispatch(logout())
        toast.success("Logout success");
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

                                    {user.roles === "Admin" ? <><li><NavLink to={"/product"}>Users</NavLink></li></> : null}

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
                    <a className="btn btn-ghost text-xl">{logo}</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        {token ?
                            <>
                                <li><NavLink to={"/Customer"} className=' font-semibold text-lg'>Customer</NavLink></li>
                                <li><NavLink to={"/rental"} className='font-semibold text-lg'>Rental</NavLink></li>
                                <li><NavLink to={"/product"} className='font-semibold text-lg'>Product</NavLink></li>

                                {user.roles === "Admin" ?
                                    <li><NavLink to={"/users"} className='font-semibold text-lg'>Users</NavLink></li>
                                    :
                                    null
                                }
                                <li><NavLink to={"/invoice"} className='font-semibold text-lg'>Invoice</NavLink></li>
                                <button onClick={handleLogout} className='font-semibold text-lg bg-blue-700 px-2 rounded-lg text-white'>
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
                                <summary className="btn m-1 font-semibold text-lg">Branches</summary>
                                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><a className='font-semibold text-sm'>Item 1</a></li>
                                    <li><a className='font-semibold text-sm'>Item 2</a></li>
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