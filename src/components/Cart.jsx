import React, {useContext, useEffect, useState} from 'react'
import CartItem from './CartItem'
import AppContext from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import EmptyAlert from './EmptyAlert'
import OrderSummary from './OrderSummary'

 

const Cart = () => {
  const {userdetails,cart,fetchCart,fetchProducts,products,fetchUser,showAlert,verifypromo,appliedCode,setAppliedCode} = useContext(AppContext)
  const [totalPrice,setTotalPrice] = useState(0)
  const [discountedprice,setDiscountedPrice] = useState(0)
  const [promocode,setPromoCode] = useState('')
  const navigate = useNavigate()

  // const handleCheckout = () => {
  //   fetchUser().then((res)=>{
  //     if (res.user.email==="" || res.user.mobile==="" || res.user.first_name==="" || res.address.length === 0){
  //       showAlert('warn',"Please complete your profile first!")
  //     }else{
  //       navigate('/checkout/')
  //     }
  //   })
  // }

  // const handlePromoCode = (e)=>{
  //   setPromoCode(e.target.value)
  // }

  // const applyPromo = ()=>{
  //   verifypromo(promocode).then((res)=>{
  //     let discount = (totalPrice/100)*res.discount
  //     setDiscountedPrice(totalPrice-discount)
  //     setAppliedCode(res)

  //   })
  // }

  useEffect(()=>{
    fetchUser()
    setPromoCode(appliedCode?.code)
    fetchProducts()
    fetchCart()
    
    let price = 0
    // cart.forEach(element => {
    //     let product = products.filter((prod)=>prod.id===element.product)[0]
    //     price+=product.price
    //     
    //   });
    // setTotalPrice(price)
    // setDiscountedPrice(price)
  },[cart.length])

  return (
    <>
    {cart.length>0?
    <div className='cart-div'>
      <div className="cart-items-div">
        <div className="cart-items-header">
            <h2>Your Cart</h2>
            <h2>Items : {cart.length}</h2>
        </div>
        <hr />
        <div className="cart-items-body">
          {cart.map((cartitem)=>{
            return (
              <CartItem price={{price:totalPrice,setPrice:setTotalPrice}} key={cartitem.id} cartitem={cartitem} product={products.filter((prod)=>prod.id===cartitem.product)[0]}/>
            )
          })}
            
        </div>
      </div>
      
      <OrderSummary />
    </div>
    :
    <EmptyAlert message='Your cart is empty!'/>
    }
    </>
  )
}

export default Cart
