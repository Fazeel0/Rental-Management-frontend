import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const CreateUser = () => {


    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        delete data.branch;
        data.branches = checkedBranches;
        

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

    const [branches, setBranches] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/branch/all");
                if (response.data.success) {
                    setBranches(response.data.branches);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const [checkedBranches, setcheckedBranches] = useState([]);
    const handleCheckChange = (e) => {
        const { value, checked } = e.target;
        console.log({ value, checked });

        if (checked) {
            setcheckedBranches([...checkedBranches, value])
        }
        else {
            let arr = checkedBranches.filter((branch) => {
                return branch !== value;
            })
            setcheckedBranches(arr);
        }
    }

    const star = <span className='text-red-600'>*</span>;

    return (
        <>
            <div className='w-full h-[80vh] flex flex-col space-y-7 justify-center items-center'>
                <h1 className='text-2xl font-semibold text-blue-700'>Create User</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-5 border-2 border-blue-600 p-9 rounded-3xl '>
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
                        <h1 className="font-bold">Assign Branches to this user:</h1><hr className='mb-2' />
                        <div className='grid grid-cols-2'>
                        {branches?.map((branch) => {
                            return (
                                 <div>
                                    <input type="checkbox" name="branch" onChange={handleCheckChange} id={branch?.name} value={branch?._id}
                                        className="border-2 border-black border-solid" />
                                    <label htmlFor={branch?.name}
                                        className="font-bold ml-1">
                                        {branch?.name}
                                    </label>
                                </div>
                            )
                        })}
                        </div>

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