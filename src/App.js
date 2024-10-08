import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Customer from './pages/Customer';
import BranchUpdate from './components/Update Forms/BranchUpdate';
import CustomerUpdate from './components/Update Forms/CustomerUpdate';
import Rental from './pages/Rental';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ErrorPage from './pages/ErrorPage';
import CreateCustomer from './components/Create Forms/CreateCustomer';
import CreateBranch from './components/Create Forms/CreateBranch';
import CreateRental from './components/Create Forms/CreateRental';
import Product from './pages/Product';
import Users from './pages/Users';
import Branch from './pages/Branch';
import Invoice from './pages/Invoice';
import AllCustomer from './components/DisplayDetails/AllCustomer';
import AllBranches from './components/DisplayDetails/AllBranches';
import CreateUser from './components/Create Forms/CreateUser';
import UpdateUser from './components/Update Forms/UpdateUser';
import AllUser from './components/DisplayDetails/AllUser';
import CreateProduct from './components/Create Forms/CreateProduct';
import AllProducts from './components/DisplayDetails/AllProducts';
import ProductUpdate from './components/Update Forms/ProductUpdate';
import AllRents from './components/DisplayDetails/AllRents';
import RentalData from './pages/RentalData';
import RentUpdate from './components/Update Forms/RentUpdate';



function App() {

  const { token } = useSelector(state => state.user);

  axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.withCredentials = true;

  return (
    <>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/createBranch' element={<CreateBranch />} />
          <Route path='/updateBranch' element={<BranchUpdate />} />


          <Route path='/rental-data/:id' element={<RentalData />} />

          {/* layout for customer....... */}
          <Route path='/customer' element={<Customer />}>
            <Route index element={<AllCustomer />} />
            <Route path='update/:id' element={<CustomerUpdate />} />
            <Route path='add' element={<CreateCustomer />} />

          </Route>

          <Route path='/rental' element={<Rental />}>
            <Route index element={<AllRents />} />
            <Route path='create/:id' element={<CreateRental />} />
            <Route path='update/:id' element={<RentUpdate />} />

          </Route>

          <Route path='/product' element={<Product />}>
            <Route index element={<AllProducts />} />
            <Route path='update/:id' element={<ProductUpdate />} />
            <Route path='add' element={<CreateProduct />} />
          </Route>


          <Route path='/users' element={<Users />}>
            <Route index element={<AllUser />} />
            <Route path='update/:id' element={<UpdateUser />} />
            <Route path='add' element={<CreateUser />} />
          </Route>

          <Route path='/branch' element={<Branch />}>
            <Route index element={<AllBranches />} />
            <Route path='update/:id' element={<BranchUpdate />} />
            <Route path='add' element={<CreateBranch />} />
          </Route>

          <Route path='invoice/:id' element={<Invoice />} />

        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;
