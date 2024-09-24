import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [products, setProducts] = useState();
  const [allProducts, setAllProducts] = useState();
  const [loading, setLoading] = useState();
  const [uichange, setuichange] = useState(false);
  const [scraps, setScraps] = useState([]);
  const [totalScrap, settotalScrap] = useState();
  const navigate = useNavigate();

  const hasMounted = useRef(false);

  const { user } = useSelector(state => state.user);

  const getAllScraps = async (id) => {
    try {
      const response = await axios.get(`/product/${id}`);
      if (response.data.success) {
        setScraps(response.data.product.scrap);
      }

      console.log({ scraps });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    let sum = 0;
    scraps.forEach((scrap) => {
      console.log("for each...");
      sum = sum + scrap.quantity;
    });
    settotalScrap(sum);
  }, [scraps]);



  const getAllProducts = async () => {
    try {
      setLoading(true);
      if (user?.roles === "Admin") {
        const response = await axios.get("/product/get/all");
        console.log(response);

        if (response.data.success) {
          setProducts(response.data.products);
          setAllProducts(response.data.products);
        }
      }
      else if (user?.roles === "SubAdmin") {

        let productsByBranches = [];
        await Promise.all(
          user?.branches?.map(async (branch) => {
            let response = await axios.post("/product/getProductsByBranch", { branch: branch._id })
            if (response.data.success) {
              let p = response.data.products;
              productsByBranches.push(...p);
              setProducts(productsByBranches);
              setAllProducts(productsByBranches);
            }
          })
        )
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [uichange]);

  const handleChange = (e) => {
    let s = e.target.value.toLowerCase();

    const filteredProduct = products.filter((product) => {
      return product.name.toLowerCase().includes(s);
    })

    setAllProducts(filteredProduct);

  }

  // Search Product by selecting Branch
  const [allBranches, setAllBranches] = useState();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("branch/all");
        if (response.data.success) {
          setAllBranches(response.data.branches);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

  const [selectedBranch, setSelectedBranch] = useState();
  const changeBranch = async (e) => {
    if (e.target.value === "all") {
      toast.success("Selected All branches");
      await getAllProducts();
      return;
    }
    setSelectedBranch(e.target.value);
  }

  useEffect(() => {
    //it wont call api on first render
    if (hasMounted.current === true) {
      (async () => {
        try {
          setLoading(true);
          const response = await axios.post("/product/getProductsByBranch", { branch: selectedBranch });
          setLoading(false);
          
          if (response.data.success) {
            setAllProducts(response.data.products);
          }

        } catch (error) {
          console.log(error);
          setLoading(false);
          toast.error(error.response.data.message);
        }
      })();
    }
    else {
      hasMounted.current = true;
    }

  }, [selectedBranch])



  const handleDelete = async (id) => {
    try {
      const isConfirmed = await showConfirmBox();

      if (isConfirmed) {
        setLoading(true);
        const response = await axios.delete(`product/${id}`);
        if (response.data.success) {
          setLoading(false);
          toast.success(response.data.message);
          setuichange(!uichange);
        }
      }
    } catch (error) {
      console.log("Error while deleting", error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Error deleting product");
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
      {!products ? (
        <h1 className="bg-red-300 p-3 rounded-lg text-3xl mt-2 mx-2 text-white">
          Products not available
        </h1>
      ) : (
        <div className="overflow-x-auto mt-5">
          <div className="flex justify-center gap-3">
            <input
              type="search"
              placeholder="Search"
              onChange={handleChange}
              className="w-[20vw] h-12 p-4 rounded-lg border-2 border-blue-600 focus:border-none"
            />
            {
              user.roles === "Admin" ?
                <>
                  <div>
                    <select onChange={changeBranch} name="branch" className="select select-bordered w-full">
                      <option disabled selected>Select Branch</option>
                      <option value="all">All</option>
                      {allBranches?.map((b) => {
                        return (
                          <>
                            <option value={b?._id}>{b?.name}</option>
                          </>
                        )
                      })}

                    </select>
                  </div>
                </>
                : null
            }

          </div>

          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>

                <th className="text-xl text-black">Name</th>
                <th className="text-xl text-black">Price</th>
                <th className="text-xl text-black">Alloted Quantity</th>
                <th className="text-xl text-black">Availabe Quantity</th>
                <th className="text-xl text-black">Rented Quantity</th>
                <th className="text-xl text-black">Scrap</th>
                <th className="text-xl text-black">Update</th>
                <th className="text-xl text-black">Delete</th>
                <th className="text-xl text-black">Branch</th>
              </tr>
            </thead>
            {allProducts?.map((product, index) => {
              return (
                <>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th className="text-xl text-black font-bold">
                        {index + 1}
                      </th>
                      <td className="text-xl text-blue-700 font-bold">
                        {product?.name}
                      </td>
                      <td className="text-xl text-blue-700 font-bold">
                        {product?.price}
                      </td>
                      <td className="text-xl text-blue-700 font-bold">
                        {product?.allotedQuantity}
                      </td>
                      <td className="text-xl text-blue-700 font-bold">
                        {product?.availableQuantity}
                      </td>
                      <td className="text-xl text-blue-700 font-bold">
                        {product?.rentedQuantity}
                      </td>
                      <button
                        className="btn btn-primary text-white"
                        onClick={() => {
                          document.getElementById("my_modal_4").showModal();
                          getAllScraps(product._id);
                        }}
                      >
                        View Scraps
                      </button>
                      <td>
                        <i
                          onClick={() =>
                            navigate(`/product/update/${product._id}`)
                          }
                          class="fa-solid fa-pen-to-square text-green-800 cursor-pointer"
                        ></i>
                      </td>
                      <td>
                        <i
                          onClick={() => handleDelete(product._id)}
                          class="fa-solid fa-trash text-red-600 cursor-pointer"
                        ></i>
                      </td>

                      <td className="text-xl text-blue-700 font-bold">
                        {product?.branch?.name}
                      </td>

                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>

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

          {/* Scrap details box */}

          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="text-xl text-black text-center font-bold">
                Scrap Details
              </h3>
              {/* head */}
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-xl text-black">Quantity</th>
                    <th className="text-xl text-black">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {scraps.length > 0 ? (
                    scraps.map((scrap, index) => (
                      <tr key={index}>
                        <th className="text-xl text-black font-bold">
                          {index + 1}
                        </th>
                        <td className="text-xl text-blue-700 font-bold">
                          {scrap?.quantity}
                        </td>
                        <td className="text-xl text-blue-700 font-bold">
                          {scrap?.reason}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">
                        <h1 className="bg-red-300 p-3 rounded-lg text-2xl mt-2 mx-2 text-white">
                          No scrap details available
                        </h1>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <h1 className="mt-4">
                <span className="text-red-600 font-bold text-lg">
                  Total Scrap:
                </span>{" "}
                <span className="font-bold text-xl">{totalScrap}</span>
              </h1>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-primary text-white">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default AllProducts;
