import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RentUpdate from "../Update Forms/RentUpdate";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const AllRents = () => {

  const [customerName, setCustomerName] = useState("");

  const [displayRental, setDisplayRental] = useState();
  const [allRentals, setAllRentals] = useState();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //for displaying buttons
  const [paginateButtons, setPaginateButtons] = useState(true);

  const [loading, setloading] = useState(true)

  const { user } = useSelector(state => state.user);

  useEffect(() => {
    (async () => {
      try {

        let response;
        if (user.roles === "Admin") {
          setloading(true);
          response = await axios.post(`/rental/rentsByPaginate?page=${page}&limit=100`);
          if (response.data.success) {
            setDisplayRental(response.data.rentals);
            setAllRentals(response.data.rentals);
            setTotalPages(response.data.totalPages);
            setloading(false);
          }
        }
        else if (user.roles === "SubAdmin") {
          setloading(true);
          response = await axios.post("/rental/all/byBranches", { branches: user.branches });
          if (response.data.success) {
            setDisplayRental(response.data.rentalByBranches);
            setAllRentals(response.data.rentalByBranches)
            setloading(false);
          }
        }

      } catch (error) {
        setloading(false);
        console.log(error);
        toast.error(error.response.data.message);
      }
    })();
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }


  //Searching rentals by cutomer names
  const handleSearch = async (e) => {
    //hide paginate buttons
    setPaginateButtons(false);
    console.log(customerName);
    try {
      if (user.roles === "Admin") {
        const response = await axios.post(`rental/querySearch?search=${customerName}`)
        if (response.data.success) {
          setDisplayRental(response.data.searchArray);
        }
      }
      else {
        const response = await axios.post(`rental/byCustomerBranch`, { customerName, branches: user.branches })
        if (response.data.success) {
          setDisplayRental(response.data.rentals);
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  console.log({ displayRental });

  const handleChange = (e) => {
    setCustomerName(e.target.value);
  }

  useEffect(() => {
    if (customerName === "") {
      //show paginate buttons when there is no search
      setPaginateButtons(true);
      setDisplayRental(allRentals);
    }
  }, [handleChange])


  const [branches, setBranches] = useState();
  //fetching all branches
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

  }, [])


  //for rentals filtered by branch
  const [rentalsByBranch, setRentalsByBranch] = useState();
  const [selectedBranch, setSelectedBranch] = useState();

  const handleBranchChange = async (e) => {
    const selectedBranch = e.target.value;

    setSelectedBranch(selectedBranch);

    if (selectedBranch === "all") {
      setDisplayRental(allRentals);
      setRentalsByBranch("");
      setRentalsByDate("");
      return;
    }

    try {
      const response = await axios.post("/rental/all/byBranches", { branches: [selectedBranch] });
      if (response.data.success) {
        setRentalsByBranch(response.data.rentalByBranches);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  console.log(rentalsByBranch);


  //Rentals filtered by date
  const [rentalsByDate, setRentalsByDate] = useState();
  const dateChange = async (e) => {
    const date = e.target.value;

    if (!date) {
      setRentalsByDate("");
      setDisplayRental(allRentals)
      setRentalsByBranch("");
      return;
    }

    try {
      if (user.roles === "Admin") {
        const response = await axios.post("/rental/byDate", { date });
        if (response.data.success) {
          setRentalsByDate(response.data.rentals)
        }
      }
      else {
        const response = await axios.post("/rental/byDateBranch", { date, branches: user.branches });
        if (response.data.success) {
          setRentalsByDate(response.data.rentals)
        }
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  console.log(rentalsByDate);


  //Loader.....
  if (loading) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <>
      <div className="overflow-x-auto mt-5">
        <div className="flex justify-center items-center gap-5">

          <div>
            <input onChange={dateChange} type="date" name="date" className="border-2 border-solid border-black p-2 rounded-2xl" />
          </div>

          <div>
            <input
              type="search"
              placeholder="Search by Customer"
              onChange={handleChange}
              className="w-[20vw] h-12 p-4 rounded-lg border-2 border-blue-600 focus:border-none"
            />
            <button onClick={handleSearch} className='ml-2 bg-blue-700 text-white font-bold w-20 h-12 rounded-lg'>Search</button>
          </div>


          {user?.roles === "Admin" ?
            <>
              <select onChange={handleBranchChange} className="select select-bordered w-full max-w-xs">
                <option disabled selected>Select by Branch</option>
                <option value="all">All</option>
                {branches?.map((b) => {
                  return (
                    <>
                      <option value={b._id}>{b?.name}</option>
                    </>
                  )
                })}
              </select>
            </>
            :
            null
          }

        </div>

        {/* By default table for all rental records */}
        {!rentalsByBranch && !rentalsByDate ?
          <>
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-lg font-bold text-black">Customer name</th>
                  <th className="text-lg font-bold text-black">Start Date</th>
                  <th className="text-lg font-bold text-black">End Date</th>
                  <th className="text-lg font-bold text-black">Products</th>
                  <th className="text-lg font-bold text-black">Balance Amount</th>
                  <th className="text-lg font-bold text-black">Paid Amount</th>
                  <th className="text-lg font-bold text-black">Quantity</th>
                  <th className="text-lg font-bold text-black">More details</th>
                  <th className="text-lg font-bold text-black">Branch</th>
                </tr>
              </thead>
              {displayRental?.map((rent, index) => {
                return (
                  <>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <td className="text-lg text-black font-bold">
                          {index + 1}
                        </td>
                        <td className="text-lg text-blue-700 font-bold">
                          {rent?.customer?.name}
                        </td>
                        <td className="text-lg text-blue-700 font-bold">
                          {new Date(rent?.startDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="text-lg text-blue-700 font-bold">
                          {new Date(rent?.endDate).toLocaleDateString("en-GB")}
                        </td>


                        <td className="text-lg text-blue-700 font-bold">
                          {rent?.products?.length}
                        </td>
                        <td className="text-lg text-blue-700 font-bold">
                          {rent?.balanceAmount}
                        </td>
                        <td className="text-lg text-blue-700 font-bold">
                          {rent?.paidAmount}
                        </td>
                        <td className="text-lg text-blue-700 font-bold">
                          {rent?.totalQuantity}
                        </td>
                        <td className="text-lg text-blue-700 font-bold">
                          <button
                            onClick={() => navigate(`/rental-data/${rent._id}`)}
                            className="btn btn-primary text-white"
                          >
                            More details
                          </button>
                        </td>
                        <td className="text-lg text-blue-700 font-bold">
                          {rent?.branch?.name}
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </table>

            {paginateButtons && user.roles === "Admin" ?
              <>
                <div className="h-20 flex justify-center items-center">
                  <button onClick={handlePrevious} className="btn btn-success text-white font-bold" disabled={page === 1}>Previous</button>
                  <span className="bg-blue-500 mx-3 p-4 rounded text-white font-bold">Page {page} of {totalPages}</span>
                  <button onClick={handleNext} className="btn btn-success text-white font-bold" disabled={page === totalPages}>Next</button>
                </div>
              </>
              :
              null
            }

          </>
          : null}




        {/* Table for rentals filtered by branch */}
        {rentalsByBranch && !rentalsByDate ? <table className="table">
          <thead>
            <tr>
              <th></th>
              <th className="text-lg font-bold text-black">Customer name</th>
              <th className="text-lg font-bold text-black">Start Date</th>
              <th className="text-lg font-bold text-black">End Date</th>
              <th className="text-lg font-bold text-black">No. of Products</th>
              <th className="text-lg font-bold text-black">Balance Amount</th>
              <th className="text-lg font-bold text-black">Paid Amount</th>
              <th className="text-lg font-bold text-black">Quantity</th>
              <th className="text-lg font-bold text-black">More details</th>
              <th className="text-lg font-bold text-black">Branch</th>
            </tr>
          </thead>
          {rentalsByBranch?.map((rent, index) => {
            return (
              <>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td className="text-lg text-black font-bold">
                      {index + 1}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.customer?.name}

                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {new Date(rent?.startDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {new Date(rent?.endDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.products?.length}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.balanceAmount}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.paidAmount}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.totalQuantity}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      <button
                        onClick={() => navigate(`/rental-data/${rent._id}`)}
                        className="btn btn-primary text-white"
                      >
                        More details
                      </button>
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.branch?.name}
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}

        </table> : null}




        {/* Table for rentals by Date */}
        {rentalsByDate ? <table className="table">
          <thead>
            <tr>
              <th></th>
              <th className="text-lg font-bold text-black">Customer name</th>
              <th className="text-lg font-bold text-black">Start Date</th>
              <th className="text-lg font-bold text-black">End Date</th>
              <th className="text-lg font-bold text-black">No. of Products</th>
              <th className="text-lg font-bold text-black">Balance Amount</th>
              <th className="text-lg font-bold text-black">Paid Amount</th>
              <th className="text-lg font-bold text-black">Quantity</th>
              <th className="text-lg font-bold text-black">More details</th>
              <th className="text-lg font-bold text-black">Branch</th>
            </tr>
          </thead>
          {rentalsByDate?.map((rent, index) => {
            return (
              <>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td className="text-lg text-black font-bold">
                      {index + 1}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.customer?.name}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {new Date(rent?.startDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {new Date(rent?.endDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.products?.length}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.balanceAmount}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.paidAmount}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.totalQuantity}
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      <button
                        onClick={() => navigate(`/rental-data/${rent._id}`)}
                        className="btn btn-primary text-white"
                      >
                        More details
                      </button>
                    </td>
                    <td className="text-lg text-blue-700 font-bold">
                      {rent?.branch?.name}
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}

        </table> : null}



      </div>
    </>
  );
};

export default AllRents;
