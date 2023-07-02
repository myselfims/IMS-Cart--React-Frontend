import React,{useContext,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'
import axios from 'axios'

const OrderSummary = (props) => {
    const {userdetails,cart,products,fetchUser,showAlert,verifypromo,appliedCode,setAppliedCode,totalPrice,discountedprice,promocode,setTotalPrice,setDiscountedPrice,setPromoCode,payment,baseUrl,deleteCart} = useContext(AppContext)


    const navigate = useNavigate()

    const handlePromoCode = (e)=>{
        setPromoCode(e.target.value)
    }

    const handleCheckout = () => {
        fetchUser().then((res)=>{
          if (res.user.email==="" || res.user.mobile==="" || res.user.first_name==="" || res.address.length === 0){
            showAlert('warn',"Please complete your profile first!")
          }else{
            navigate('/checkout/')
          }
        })
    }

    const applyPromo = ()=>{
        verifypromo(promocode).then((res)=>{
          let discount = (totalPrice/100)*res.discount
          setDiscountedPrice(totalPrice-discount)
          setAppliedCode(res)
    
        })
    }

    const placeOrder = ()=>{
        if (payment){
          cart.forEach((prod)=>{
            deleteCart(prod.id)
            axios.post(baseUrl+'order/',{product:prod.product,quantity:prod.quantity},{
              headers : {
                  "Authorization": 'Bearer '+localStorage.getItem('token')
              }
            }).then((res)=>{
              showAlert('success','Order placed!')
              setAppliedCode(false)
              navigate('/myorders/')
            })
          })
    
        }else{
          showAlert('warn','Please select payment method!')
        }
      }

    useEffect(()=>{
        fetchUser()
        setPromoCode(appliedCode?.code)
        
        let price = 0
        cart.forEach(element => {
            let product = products.filter((prod)=>prod.id===element.product)[0]
            price+=product.price
            
          });
        setTotalPrice(price)
        discountedprice===0?setDiscountedPrice(price):''
        
      },[cart.length])

    return (
        <div className="order-summary-div">
        <div className='cart-items-header'>
          <h2>Your Order Summary </h2>
        </div>
        <hr />
          <div className='summary-header'>
            <label htmlFor="">Items : {cart.length}</label>
            <label htmlFor="">Rs.{totalPrice}</label>
          </div>
        <label htmlFor="">Shipping</label>
        <select className='select' name="" id="">
          <option defaultChecked value="">{userdetails?userdetails.address[0].city+'-'+userdetails.address[0].pincode:''}</option>
        </select>

        <label htmlFor="">Promo Code (Optional)</label>
        <input 
        value={promocode}
        style={{color:`${appliedCode?'green':'black'}`}} 
        disabled={appliedCode?true:false}
        onChange={handlePromoCode} className='form-input' type="text" />
        {appliedCode?
        <label htmlFor="">Applied! you will get {appliedCode.discount}% Off.</label>
        :
        <button disabled={appliedCode?true:false} onClick={applyPromo} className="btn-outline-primary">Apply</button>
        }
        <hr />
        <div className="order-summary-last">
          <h3>Total Cost :</h3> 
          <h3>₹{discountedprice}</h3>
        </div>
        <div>
          
          <button onClick={props.checkout?placeOrder:handleCheckout} className='full-width btn-outline-primary'>{props.checkout?'Place Order':'Checkout'}</button>
          
        </div>
        </div>
  )
}

export default OrderSummary
