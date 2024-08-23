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
          <Route path='/createCustomer' element={<Customer />} />
          <Route path='/updateCustomer' element={<CustomerUpdate />} />
          <Route path='/rentProduct' element={<Rental />} />
        </Routes>


      </BrowserRouter>

    </>
  );
}

export default App;
