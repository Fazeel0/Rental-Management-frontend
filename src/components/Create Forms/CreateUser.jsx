import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

const CreateUser = () => {


    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        try {
            const response = await axios.post(`/user/createUser`, data);
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }


    }

    const star = <span className='text-red-600'>*</span>;

    return (
        <>
            <div className='w-full h-[80vh] flex flex-col space-y-7 justify-center items-center'>
                <h1 className='text-2xl font-semibold text-blue-700'>Create User</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-5 border-2 border-blue-600 p-9 rounded-3xl'>
                    <div>
                        <label htmlFor="name">Name:</label> {star}
                        <input id='name' name='name'
                            type="text"
                            placeholder="Name"
                            className="input input-bordered input-primary w-full max-w-xs" required />

                    </div>
                    <div>
                        <label htmlFor="email">Email:</label> {star}
                        <input id='email' name='email'
                            type="text"
                            placeholder="Email"
                            className="input input-bordered input-primary w-full max-w-xs" required />

                    </div>
                    <div>
                        <label htmlFor="password">Password:</label> {star}
                        <input id='password' name='password'
                            type="password"
                            placeholder="Password"
                            className="input input-bordered input-primary w-full max-w-xs" required />

                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary w-full text-white text-xl'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateUser