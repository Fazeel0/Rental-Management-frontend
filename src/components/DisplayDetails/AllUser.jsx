import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AllUser = () => {
  const [users, setusers] = useState();
  const [loading, setLoading] = useState();
  const [uichange, setuichange] = useState();

  const loggedInUser = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/user/all`);
      setLoading(false);
      if (response.data.success) {
        setusers(response.data.users);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [uichange]);

  // const deleteUser = async (id) => {
  //     try {

  //         const agree = window.confirm("Are you sure, want to delete this user?");

  //         if (agree) {
  //             const response = await axios.post(`/user/delete`, { id });
  //             if (response.data.success) {
  //                 setuichange(!uichange);
  //                 toast.success(response.data.message);
  //             }
  //         }
  //         else {
  //             return;
  //         }

  //     } catch (error) {
  //         console.log(error);
  //         toast.error(error.response.data.message);
  //     }
  // }

  // handling delete user

  const handleDelete = async (id) => {
    try {
      const isConfirmed = await showConfirmBox();

      if (isConfirmed) {
        setLoading(true);
        const response = await axios.post("/user/delete", { id });
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

  if (loading === true) return <Loader />;

  return (
    <>
      <div>
        <div className="overflow-x-auto mt-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-xl text-black">Name</th>
                <th className="text-xl text-black">Email</th>
                <th className="text-xl text-black">Roles</th>
                <th className="text-xl text-black">Update</th>
                <th className="text-xl text-black">Delete</th>
              </tr>
            </thead>
            {users?.map((user, index) => {
              return (
                <>
                  <tbody>
                    {/* row 1 */}

                    {user._id === loggedInUser._id ? (
                      <>
                        <tr className="bg-green-200">
                          <th>{index + 1}</th>
                          <th>{user?.name}</th>
                          <td>{user?.email}</td>
                          <td>{user?.roles}</td>
                          <td>
                            <i
                              onClick={() =>
                                navigate(`/users/update/${user?._id}`)
                              }
                              class="fa-solid fa-pen-to-square text-green-800 cursor-pointer"
                            ></i>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <th>{index + 1}</th>
                        <th>{user?.name}</th>
                        <td>{user?.email}</td>
                        <td>{user?.roles}</td>
                        <td>
                          <i
                            onClick={() =>
                              navigate(`/users/update/${user?._id}`)
                            }
                            class="fa-solid fa-pen-to-square text-green-800 cursor-pointer"
                          ></i>
                        </td>
                        <td>
                          <i
                            onClick={() => handleDelete(user?._id)}
                            class="fa-solid fa-trash text-red-600 cursor-pointer"
                          ></i>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      </div>

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

export default AllUser;
