import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const RentalData = () => {
    const params = useParams();

    const id = params.id;

    const [rental, setrental] = useState()
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/rental/${id}`);
                if (response.data.success) {
                    setrental(response.data.rental);
                }

            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        })();

    }, []);

    console.log(rental);
    return (
        <>
            <div className=''>
                <h1 className='text-2xl bg-blue-300 mx-3 rounded-lg text-center mt-2 font-bold py-1'>Rent Information</h1>
                <div >
                    <h1>Start Date: <span>{rental?.startDate}</span></h1>
                    <h1>Return Date: <span>{rental?.endDate}</span></h1>
                    <h1>Rented Quantity: <span>{rental?.quantity}</span></h1>

                </div>
            </div>
        </>
    )
}

export default RentalData