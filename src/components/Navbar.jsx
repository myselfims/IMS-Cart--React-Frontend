import React, { useState, useContext, useEffect} from 'react'
import Sidebar from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext';
import Loader from './Loader';
import Alert from './Alert';

const Navbar = () => {
  const {loading,alert,categories,logout,fetchCart}= useContext(AppContext)
  const [sidebar, setSidebar]= useState(false)
  const [query,setQuery]=useState('')
  const navigate = useNavigate()

  const handleSearch = (e)=>{
    setQuery(e.target.value)
  }

  const search = ()=>{
    navigate(`/search/${query}`)
  }


  const toggleSidebar = ()=>{
    if(sidebar){
      setSidebar(false)
    }else{
      setSidebar(true)
    }
  }
  
  return (
    <div>
      {sidebar?<Sidebar toggleSidebar={toggleSidebar} />:''}
      <nav>
        <div className="navbar">
            <Link to={'/'}>
            <div className="logo">
                <img src="https://drive.google.com/uc?id=1FhIGi3PQA-A4X6quBo0eX_WQiZgW4-R7" alt="" />
            </div>
            </Link>
            <div className="nav-links">
                <ul>
                    <li>
                      <a>Categories <i className="fa-solid fa-angle-down"></i> </a>
                      <div className="border category-dropdown dropdown">
                        {categories.map((cate)=>{
                          return(<Link key={cate.id} to={`/viewcategory/${cate.name}`}>{cate.name}</Link>)

                        })}
                      </div>
                    
                    </li>
                    <li><a href="">Deals</a></li>
                    <li><a href="">Whats New</a></li>
                    <li><a href="">Delivery</a></li>
                </ul>
            </div>
            <div id='search-div' className="search-div">
                <input onChange={handleSearch} type="text" placeholder='Search Product'/>
                <button onClick={search}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="user-data">
              {localStorage.getItem('username')!==null?
              <>
              
              <a id='profile-btn'><i className="fa-regular fa-user"></i> Account <i className="fa-solid fa-angle-down"></i></a>

                <div className="border profile-dropdown dropdown">

                        <Link to={'/profile/'} >My Profile</Link>
                        <Link to='/myorders/'>My Orders</Link>
                        <Link to='/wishlist/' >My Wishlist</Link>
                        <a onClick={logout} href="/">Logout</a>

                </div>

              <Link onClick={fetchCart} to='/cart' ><i className="fa-solid fa-cart-shopping"></i> Cart</Link>

              </>
              :
              <>
              <Link to="/auth/login"><i className="fa-regular fa-user"></i> Login</Link>
              <Link to='/auth/signup' className='btn-outline-primary' >Signup</Link>
              
              </>
              }
            </div>
            <div className="hamburger-div">
              <button onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></button>
            </div>
        </div>

      </nav>
      {alert.alert?<Alert/>:''}
      {loading?<Loader/>:''}
    </div>
  )
}

export default Navbar
