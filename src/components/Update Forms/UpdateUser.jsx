import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateUser = () => {

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());


        const { name, email, roles, password } = data;
        console.log(checkedBranches);
        

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
        if(password){
            filteredData = { ...filteredData, password};
        }
        if(checkedBranches.length > 0) {
            filteredData = {...filteredData, branches :  checkedBranches};
        }

        console.log(filteredData);
        

        try {

            const response = await axios.put(`/user/update/${id}`, filteredData);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/users")
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


    return (
        <>
            <div className='w-full h-[80vh] flex flex-col space-y-7 justify-center items-center'>
                <h1 className='text-2xl font-semibold text-blue-700'>UPDATE USER</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-5 border-2 border-blue-600 p-9 rounded-3xl w-96'>

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
                        {
                            user?.roles === "SubAdmin" ? <>

                            {/* for password change  */}
                            <div>
                        <label htmlFor="password">Password:</label> 
                        <input id='password' name='password'
                            type="password"
                            placeholder="Password"
                            className="input input-bordered input-primary w-full max-w-xs" />

                    </div>
                            
                            
                    <div>
                        <h1 className="font-bold">Assign Branches to this user:</h1><hr className='mb-2' />
                        <div className='grid grid-cols-2 gap-1'>
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
                    </>
                    : 
                    <></>
                        }

                    <div>
                        <button type='submit' className='btn btn-primary w-full text-white text-xl'>Submit</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default UpdateUser