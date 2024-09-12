import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from "axios";

const RentUpdate = () => {

  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    endDate: "",
    paidAmount: "",
  });


  const [rentalProduct, setRentalProduct] = useState();

  useEffect(() => {
    const fetchRentalProduct = async () => {
      try {
        const response = await axios.get(`/rental/${id}`);
        if (response.data.success) {
          setRentalProduct(response.data.rentalProduct);
          console.log("getting rentalProduct");
          
          console.log(rentalProduct);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    fetchRentalProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  //Dynamic inputs handling
  const [returnedInfo, setReturnedInfo] = useState([{ product: "", returnedQuantity: 0 }])

  const addNewRow = () => {
    let newReturnedInfo = [...returnedInfo, { product: "", returnedQuantity: 0 }];
    setReturnedInfo(newReturnedInfo);
  }

  const returnedInfoChange = (index, field, value) => {

    let updatedReturnedInfo = [...returnedInfo]

    updatedReturnedInfo[index][field] = value;

    setReturnedInfo(updatedReturnedInfo);

  }


  //on submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // let formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());

    let data = { ...formData, returnedInfo };

    try {
      const response = await axios.put(`/rental/update/${id}`, data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(`/rental/`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center mt-6 bg-blue-300 rounded-lg mx-4">
          Update Rented Product
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5 mx-10 mt-6">
            <div>
              <label htmlFor="customer" className="font-bold">
                Customer:
              </label>
              <input
                id="customer"
                type="text"
                name="customer"
                value={rentalProduct?.customer?.name}
                className="input input-bordered input-info w-full"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="startDate" className="font-bold">
                Date:
              </label>
              <input
                id="endDate"
                type="date"
                name="endDate"
                placeholder="Rent date"
                onChange={handleChange}
                value={formData.endDate}
                className="input input-bordered input-info w-full"
              />
            </div>

            <div>
              <label htmlFor="paidAmount" className="font-bold">
                Paid Amount:
              </label>
              <input
                id="paidAmount"
                type="text"
                name="paidAmount"
                placeholder="Enter amount paid"
                onChange={handleChange}
                value={formData.paidAmount}
                className="input input-bordered input-info w-full"
              />
            </div>

            <div>
              <label htmlFor="balanceAmount" className="font-bold">
                Balance Amount:
              </label>
              <input
                id="balanceAmount"
                type="text"
                name="balanceAmount"
                value={rentalProduct?.balanceAmount}
                className="input input-bordered input-info w-full bg-gray-200"
                readOnly
              />
            </div>
          </div>

          {/* Table....................... */}
          <table className="mx-10 my-4">
            <tr>
              <th>Product</th>
              <th>Returned Qty</th>
            </tr>


            {returnedInfo.map((info, index) => {
              return (
                <>
                  <tr>
                    <td className="">
                      <input type="text" list="suggestion" name="product" value={info?.product}
                        onChange={(e) => returnedInfoChange(index, "product", e.target.value)}
                        className="input input-bordered border-blue-600 mx-2" placeholder="product name" />

                      <datalist id="suggestion">
                        {rentalProduct?.products?.map((obj) => {
                          return <><option value={obj?.product?._id}>{obj?.product?.name}</option></>
                        })}
                      </datalist>
                    </td>
                    <td className="">
                      <input type="number" name="returnedQuantity" value={info?.returnedQuantity}
                        onChange={(e) => returnedInfoChange(index, "returnedQuantity", e.target.value)}
                        placeholder="Quantity" className="input input-bordered border-blue-600 mx-2" />
                    </td>
                    <td><div onClick={addNewRow} className="btn btn-primary text-2xl text-white">+</div></td>

                  </tr >
                </>
              )
            })}

          </table>

          <div className="text-center">
            <button type="submit" className="btn btn-success text-white font-bold">Update</button>
          </div>
        </form>

      </div>
    </>
  );
};

export default RentUpdate;
