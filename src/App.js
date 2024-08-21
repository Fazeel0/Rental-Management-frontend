import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Branch from './components/Create Forms/Branch';
import RentalForm from './components/Create Forms/Rental';
import BranchUpdate from './components/Update Forms/BranchUpdate';
import RentalUpdate from './components/Update Forms/RentalUpdate';
import Login from './pages/Login';

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
