import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateUser = () => {

    const params = useParams();
    const id = params.id;

    const [user, setuser] = useState();

    useEffect(() => {
        (async () => {

            try {
                const response = await axios.get(`/user/${id}`);
                if (response.data.success) {
                    setuser(response.data.user);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }

        })();

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());


        const { name, email, roles } = data;

        let filteredData = {};
        if (name) {
            filteredData = { ...filteredData, name };
        }
        if (email) {
            filteredData = { ...filteredData, email };
        }
        if (roles) {
            filteredData = { ...filteredData, roles };
        }

        try {

            const response = await axios.post(`/user/update/${id}`, filteredData);
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
            <div className='w-full h-[80vh] flex flex-col space-y-7 justify-center items-center'>
                <h1 className='text-2xl font-semibold text-blue-700'>UPDATE USER</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-5 border-2 border-blue-600 p-9 rounded-3xl'>

                    <div>
                        <label htmlFor="name">Name:</label>
                        <input id='name' name='name'
                            type="text"
                            placeholder={user?.name}
                            className="input input-bordered input-primary w-full max-w-xs" />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input id='email' name='email'
                            type="text"
                            placeholder={user?.email}
                            className="input input-bordered input-primary w-full max-w-xs" />
                    </div>

                    <div>
                        <label htmlFor="email">Role:</label>
                        <select name='roles' className="select select-primary w-full max-w-xs">
                            <option disabled selected>{user?.roles}</option>
                            <option value="Admin">Admin</option>
                            <option value="SubAdmin">SubAdmin</option>
                        </select>
                    </div>

                    <div>
                        <button type='submit' className='btn btn-primary w-full text-white text-xl'>Submit</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default UpdateUser