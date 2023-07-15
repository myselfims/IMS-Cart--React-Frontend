import React, { useContext, useEffect } from 'react'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import ViewItem from './components/ViewItem';
import LandingPage from './components/LandingPage';
import Cart from './components/Cart';
import ProfilePage from './components/ProfilePage';
import SearchPage from './components/SearchPage';
import AppState from './context/AppState';
import AuthenticationPage from './components/AuthenticationPage';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import Orders from './components/Orders';
import AppContext from './context/AppContext';




const App = () => {
  const {mode} = useContext(AppContext)

  return (
    <AppState>

    <Router forceRefresh={true}>
      
      <div className={`${mode?'dark-mode':''} main-container`}>
        <Navbar/>
        <div className="nav-space"></div>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/viewproduct/:id' Component={ViewItem} />
          <Route exact path='profile' element={<ProfilePage />} />
          <Route exact path='cart' element={<Cart />} />
          <Route exact path='/myorders/' element={<Orders />} />
          <Route exact path='/search/:query' element={<SearchPage search={true}/>} />
          <Route exact path='/viewcategory/:query' element={<SearchPage search={false}/>} />
          <Route exact path='/wishlist/' element={<Wishlist />} />
          <Route exact path='/:category' element={<SearchPage />} />
          <Route exact path='auth/signup' element={<AuthenticationPage type='signup' />} />
          <Route exact path='auth/login' element={<AuthenticationPage type='login' />} />
          <Route exact path='checkout/' element={<Checkout />} />
        </Routes>
      </div>
    </Router>
    </AppState>
  )
}

export default App

