import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import RentUpdate from '../Update Forms/RentUpdate';

const AllRents = () => {

    const [rental, setrental] = useState();

    useEffect(() => {

        (async () => {
            try {
                const response = await axios.get("/rental/all");
                if (response.data.success) {
                    setrental(response.data.rentalProducts);
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
        <RentUpdate/>
        </>
    )
}

export default AllRents