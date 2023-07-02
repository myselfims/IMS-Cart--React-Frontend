import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext'
AppContext

const Sidebar = (props) => {
    const {logout,fetchCart} = useContext(AppContext)

    const handleCartClick = ()=>{
        props.toggleSidebar()
        fetchCart()
    }

  return (
    <div className='sidebar-base-div'>
        <div className="sidebar-div">
            <div className="sidebar-header">
                <div className="profile-pic-div">
                    <img src="https://e0.pxfuel.com/wallpapers/932/376/desktop-wallpaper-stylish-boys-cool-d-profile-pics-for-facebook-whatsapp-pretty-boys.jpg" alt="" width={40} height={40}/>
                </div>
                <div className="username-div">
                    <label htmlFor="">Hello,</label>
                    <h3>{localStorage.getItem('username')}</h3>
                </div>
            </div>
            <hr />
            <div className="sidebar-body">

            {localStorage.getItem('username')!==null?
              <>
              
              <Link onClick={props.toggleSidebar} to={'/'}>
                <div className="sidebar-buttons-div">
                    <div>
                        <i className="fa-solid fa-house"></i>
                        <label htmlFor="">Home</label>
                    </div>
                <i className="fa-solid fa-chevron-right"></i>
                </div>
                </Link>

                <Link onClick={props.toggleSidebar} to={'/profile/'}>
                <div className="sidebar-buttons-div">
                    <div>
                        <i class="fa-solid fa-user"></i>
                        <label htmlFor="">My Profile</label>
                    </div>
                <i className="fa-solid fa-chevron-right"></i>
                </div>
                </Link>

                <Link onClick={props.toggleSidebar} to={'/wishlist/'}>
                <div className="sidebar-buttons-div">
                    <div>
                        <i class="fa-solid fa-heart"></i>
                        <label htmlFor="">My Wishlist</label>
                    </div>
                <i className="fa-solid fa-chevron-right"></i>
                </div>
                </Link>

                <Link onClick={props.toggleSidebar} to={'/myorders/'}>
                <div className="sidebar-buttons-div">
                    <div>
                        <i className="fa-solid fa-list"></i>
                        <label htmlFor="">My Orders</label>
                    </div>
                <i className="fa-solid fa-chevron-right"></i>
                </div>
                </Link>

                <Link onClick={handleCartClick} to={'/cart/'}>
                <div className="sidebar-buttons-div">
                    <div>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <label htmlFor="">My Cart</label>
                    </div>
                <i className="fa-solid fa-chevron-right"></i>
                </div>
                </Link>

                <Link onClick={props.toggleSidebar}>
                <div className="sidebar-buttons-div">
                    <div>
                        <i className="fa-regular fa-credit-card"></i>
                        <label htmlFor="">Payments</label>
                    </div>
                <i className="fa-solid fa-chevron-right"></i>
                </div>
                </Link>

                <div className="sidebar-buttons-div">
                    <div style={{color:'red'}}>
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <a onClick={logout} href="/">Logout</a>
                    </div>
                </div>

              </>
              :
              <>

              <Link onClick={props.toggleSidebar} to="/auth/login"><i className="fa-regular fa-user"></i> Login</Link>
              <Link onClick={props.toggleSidebar} to='/auth/signup' className='btn-outline-primary' >Signup</Link>
              
              </>
              }

                

            </div>
        </div>
        <div onClick={props.toggleSidebar} className="sidebar-blank-div">

        </div>
    </div>
  )
}

export default Sidebar
