
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Localdata from './components/LocalStorage';
import DashBoard from './mainComponents/DashBoard';
import ProductsPage from './mainComponents/ProductPage';
import AccountPage from './mainComponents/AccountPage';
import Login from './mainComponents/LoginPage';
import NavBar from './components/NavBar';
import AddNewProduct from './mainComponents/AddNewProduct';
import { useAuth } from './components/Auth';
import PrivateRouter from './components/PrivateRouter';
import { Navigate } from 'react-router-dom';

function App() {
  const{user}=useAuth()


    const status = window.localStorage.getItem("loginStatus");
  
  return (
    <div className="App">
      {!status && <Localdata/>}
      <NavBar/>
      <Routes>
      <Route
          path="/"
          element={status==="true" ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        /> 
        
        <Route path='/dashboard' element={<PrivateRouter><DashBoard/></PrivateRouter>} />
        <Route path='/product' element={<PrivateRouter><ProductsPage/></PrivateRouter>}/>
        <Route path='/account' element={<PrivateRouter><AccountPage/></PrivateRouter>}/>
        <Route path='/addProduct' element={<PrivateRouter><AddNewProduct/></PrivateRouter>}/>
        <Route path='*' element={<PrivateRouter>< DashBoard/></PrivateRouter>} />
        <Route path='/login' element={<Login/>}/>
        <Route path="*" element={<PrivateRouter><DashBoard/></PrivateRouter>}/>

      </Routes>
    </div>
  );
}

export default App;
