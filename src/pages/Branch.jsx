import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const Branch = () => {
    return (
        <>
            <div className="drawer md:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn drawer-button md:hidden">
                        <i class="fa-solid fa-bars "></i>
                    </label>

                    {/* Page content inside */}
                    <div className='ml-16 md:ml-3'>

                        <Outlet />
                    </div>


                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-[16rem] p-4 space-y-4">
                        {/* Sidebar content here */}
                        <li className='font-bold text-lg'><Link to={"/branch"}>Add Branch</Link></li>
                        <li className='font-bold text-lg'><NavLink to={"/branch/update"}>Update Branch</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Branch;