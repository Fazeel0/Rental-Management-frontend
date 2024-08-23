import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Branch from './components/Create Forms/CreateBranch';
import Customer from './pages/Customer';
import RentalForm from './components/Create Forms/CreateRental';
import BranchUpdate from './components/Update Forms/BranchUpdate';
import CustomerUpdate from './components/Update Forms/CustomerUpdate';
import RentalUpdate from './components/Update Forms/RentalUpdate';
import Rental from './pages/Rental';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ErrorPage from './pages/ErrorPage';
import ProductDetails from './pages/ProductDetails';
import CreateCustomer from './components/Create Forms/CreateCustomer';
import CreateBranch from './components/Create Forms/CreateBranch';
import CreateRental from './components/Create Forms/CreateRental';
import Product from './pages/Product';


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


          {/* layout for customer....... */}
          <Route path='/customer' element={<Customer />}>
            <Route index element={<CreateCustomer />} />
            <Route path='update' element={<CustomerUpdate />} />

          </Route>

          <Route path='/rental' element={<Rental />}>
            <Route index element={<CreateRental />} />
            <Route path='update' element={<RentalUpdate />} />

          </Route>

          <Route path='/product' element={<Product />}>
            <Route index element={""} />
            <Route path='update'/>
          </Route>

        </Routes>


      </BrowserRouter>

    </>
  );
}

export default App;
