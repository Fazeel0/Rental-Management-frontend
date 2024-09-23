import React, { useState } from 'react'

export default function ResetPassword() {

    const inputDiv = "mb-4 flex flex-col"
    const inputLabel = "mb-2 text-sm"
    const inputCss = "p-2 border-2 rounded-md"


    const [formData,setFormData] = useState({currentPassword : "",newPassword : ""}) 

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formData);
        
    }

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setFormData({
            ...formData,
            [name] : value
        })

        
    }


  return (
    <>
    <div className="container mx-auto flex justify-center items-center h-screen w-screen">

        <div className=" pt-5 pb-5 mt-5 mb-5 border-secondary  w-3/4 h-3/4 flex flex-col justify-center items-center" id="login-box">
            <h1 className="text-center p-2 text-3xl font-bold m-6">Reset Password</h1>

            <form onSubmit={handleSubmit} className=" sm:w-[70%] md:w-3/6 p-10 border boder-2 border-black rounded-lg">

                
                <div className={inputDiv}>
                    <label className={inputLabel} htmlFor="form1Example2">
                        Current Password
                    </label>
                    <input type="password" id="form1Example2" className={inputCss} placeholder="currentPassword"
                        name="currentPassword" onChange={handleChange}
                        required />
                </div>
                <div className={inputDiv}>
                    <label className={inputLabel} htmlFor="form1Example2">
                        New Password
                    </label>
                    <input type="password" id="form1Example2" className={inputCss} placeholder="newPassword"
                        name="newPassword" onChange={handleChange}
                        value={formData.password} required />
                </div>
               
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-400 text-white hover:text-blue-400 w-full py-2 rounded-md bottom-2 hover:bg-slate-200">
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</>
  )
}
