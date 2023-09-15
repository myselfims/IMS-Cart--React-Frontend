import React, {useContext, useEffect, useState} from 'react'
import AppContext from '../context/AppContext'
import OrderSummary from '../components/OrderSummary'
 

const Checkout = () => {
  const {setPayment,cart,setDiscountedPrice ,fetchProducts,setPromoCode,products,fetchUser,appliedCode,payment} = useContext(AppContext)
  const [totalPrice,setTotalPrice] = useState(0)

  const handleCod = ()=>{
    setPayment(true)
  }



  useEffect(()=>{
    fetchUser()
    fetchProducts()
    setPromoCode(appliedCode.code)
    let discount = (totalPrice/100)*appliedCode.discount
    setDiscountedPrice(totalPrice-discount)
    let price = 0
    cart.forEach(element => {
        let product = products.filter((prod)=>prod.id===element.product)[0]
        price+=product.price
        
      });
    setTotalPrice(price)
    setDiscountedPrice(price)
  },[cart.length])

  return (
    <div className='cart-div'>
      <div className="cart-items-div">
        <div className="cart-items-header">
            <h2>Payment Option</h2>
        </div>
        <hr />
        <div className="cart-items-body">

          <div className="payment-opt-div">
          <button className='border  payment-btns'>
              Credit or Debit Card (Coming Soon) 
              <img src="https://cdn-icons-png.flaticon.com/512/6963/6963703.png" alt="" />
            </button>

            <button className=' border payment-btns'>
              Gigital Wallets (Coming Soon) 
              <img style={{width:"6rem"}} src="https://abhijnana.com/wp-content/uploads/2022/06/payment-logo-icons.png" alt="" />
            </button>
            <button className=' border payment-btns'>
              UPI (Coming Soon) 
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" alt="" />
            </button>

            <button onClick={handleCod} className={` border  ${payment?'success-border':''} payment-btns`}>
              Cash On Delivery 
              <img src="https://cdn-icons-png.flaticon.com/512/1019/1019607.png" alt="" />
            </button>
          </div>
        
            
        </div>
      </div>
      <OrderSummary checkout={true}/>
    </div>
  )
}

export default Checkout
