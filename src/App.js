import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Branch from './components/Create Forms/Branch';
import RentalForm from './components/Create Forms/Rental';
import BranchUpdate from './components/Update Forms/BranchUpdate';
import RentalUpdate from './components/Update Forms/RentalUpdate';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import axios from 'axios';


function App() {


  axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

  return (
    <>

      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
