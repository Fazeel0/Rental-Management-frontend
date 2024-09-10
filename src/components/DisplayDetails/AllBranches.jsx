import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";

const AllBranches = () => {
  const [branches, setBranches] = useState();
  const [loading, setLoading] = useState();
  const [uichange, setuichange] = useState(false);
  const navigate = useNavigate();
  const [allBranches, setAllBranches] = useState();

  const getAllBranches = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/branch/all");
      setLoading(false);
      if (response.data.success) {
        setBranches(response.data.branches);
        setAllBranches(response.data.branches);
        console.log(allBranches);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllBranches();
  }, [uichange]);

  const handleChange = (e)=>{
    let s = e.target.value.toLowerCase();
    if(s === ""){
      setAllBranches(branches);
    }else{
      setAllBranches([])
      const filteredBranches = branches.filter((branch)=>{
        return branch.name.toLowerCase().includes(s);
      })
      setAllBranches(filteredBranches);
    }
  }

  //   const deleteBranch = async (id) => {
  //     try {
  //       console.log("delete :", id);
  //       let agree = window.confirm("Are you sure, want to delete this branch?");

  //       if (agree) {
  //         const response = await axios.delete(`/branch/delete/${id}`);

  //         if (response.data.success) {
  //           setuichange(!uichange);
  //           toast.success(response.data.message);
  //         }
  //       } else {
  //         return;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.response.data.message);
  //     }
  //   };

  // handling delete user

  const handleDelete = async (id) => {
    try {
      const isConfirmed = await showConfirmBox();

      if (isConfirmed) {
        setLoading(true);
        const response = await axios.delete(`/branch/delete/${id}`);
        if (response.data.success) {
          setLoading(false);
          toast.success(response.data.message);
          setuichange(!uichange);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while deleting", error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  function showConfirmBox() {
    return new Promise((resolve) => {
      console.log("Showing confirmation dialog");
      document.getElementById("confirmDialog").classList.remove("hidden");

      const handleConfirm = (isConfirmed) => {
        resolve(isConfirmed);
        closeConfirmBox();
      };

      document.getElementById("confirmYes").onclick = () => handleConfirm(true);
      document.getElementById("confirmNo").onclick = () => handleConfirm(false);
    });
  }

  function closeConfirmBox() {
    console.log("Closing confirmation dialog");
    document.getElementById("confirmDialog").classList.add("hidden");
  }

  if (loading === true) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      {!allBranches ? (
        <h1 className="bg-red-300 p-3 rounded-lg text-3xl mt-2 mx-2 text-white">
          Branches not available
        </h1>
      ) : (
        <>
          <div className="overflow-x-auto mt-5">
            <div className="flex justify-center">
              <input
                type="search"
                placeholder="Search"
                onChange={handleChange}
                className="w-[20vw] h-12 p-4 rounded-lg border-2 border-blue-600 focus:border-none"
              />
              
            </div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th className="text-xl text-black">Name</th>
                  <th className="text-xl text-black">Location</th>
                  <th className="text-xl text-black">Contact</th>
                  <th className="text-xl text-black">Update</th>
                  <th className="text-xl text-black">Delete</th>
                </tr>
              </thead>
              {allBranches?.map((branch, index) => {
                return (
                  <>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <th className="text-xl text-black font-bold">
                          {index + 1}
                        </th>
                        <td className="text-xl text-blue-700 font-bold">
                          {branch?.name}
                        </td>
                        <td className="text-xl text-blue-700 font-bold">
                          {branch?.location}
                        </td>
                        <td className="text-xl text-blue-700 font-bold">
                          {branch?.contact}
                        </td>
                        <td>
                          <i
                            onClick={() =>
                              navigate(`/branch/update/${branch._id}`)
                            }
                            class="fa-solid fa-pen-to-square text-green-800 cursor-pointer"
                          ></i>
                        </td>
                        <td>
                          <i
                            onClick={() => handleDelete(branch._id)}
                            class="fa-solid fa-trash text-red-600 cursor-pointer"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </table>
          </div>
        </>
      )}

      {/* confirmation box */}
      <div id="confirmDialog" class="absolute  top-0 right-0 hidden ">
        <div class="bg-gray-300 p-6 rounded-lg shadow-lg text-center">
          <h2 class="text-xl font-semibold mb-4">Confirmation</h2>
          <p class="mb-6">Are you sure you want to delete?</p>
          <div class="flex justify-center gap-4">
            <button
              id="confirmYes"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              id="confirmNo"
              class="btn btn-primary text-white px-4 py-2 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBranches;
