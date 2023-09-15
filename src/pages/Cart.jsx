import React, {useContext, useEffect, useState} from 'react'
import CartItem from '../components/CartItem'
import AppContext from '../context/AppContext'
import EmptyAlert from '../components/EmptyAlert'
import OrderSummary from '../components/OrderSummary'

 

const Cart = () => {
  const {cart,fetchCart,fetchProducts,setPromoCode,products,fetchUser,appliedCode} = useContext(AppContext)
  const [totalPrice,setTotalPrice] = useState(0)

  useEffect(()=>{
    fetchUser()
    setPromoCode(appliedCode?.code)
    fetchProducts()
    fetchCart()

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
