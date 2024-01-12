import '../App.css';
import React from "react";
import { NavLink ,Link} from "react-router-dom";
import { useAuth } from "./Auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt,faShoppingCart,faUser } from '@fortawesome/free-solid-svg-icons';

function NavBar(){
    const{user,logout}=useAuth()
    return(
        <nav>
            <div className='container'>
            <Link to='/dashboard' className='brand'><h1>PRODUCT ADMIN</h1></Link>
            <div className='navlist'>
            <NavLink to='/dashboard'><FontAwesomeIcon icon={faTachometerAlt} size="lg" style={{color: "#ffffff",}} className='icon'/>
                DashBoard</NavLink>
            <NavLink to='/product'><FontAwesomeIcon icon={faShoppingCart} size="lg" style={{color: "#ffffff",}}  className='icon'/>
                Product</NavLink>
            <NavLink to='/account'><FontAwesomeIcon icon={faUser} size="lg" style={{color: "#ffffff",}}  className='icon'/>
             Account</NavLink></div>
             <div className='logout'>
            {
                user && <Link to='/login' onClick={logout} >logout</Link>
            }
            </div>
            </div>
        </nav>
    )
}

export default NavBar