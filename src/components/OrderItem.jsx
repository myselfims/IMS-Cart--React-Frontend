import React,{useContext, useEffect, useState} from 'react'
import AppContext from '../context/AppContext'


const OrderItem = (props) => {
  const {cancelOrder,fetchOrders,products} = useContext(AppContext)
  const order = props.order
  const [progressStyle,setProgressStyle] = useState({width:'2rem'})
  const [product,setProduct] = useState({})

  const handleCancel = ()=>{
    cancelOrder(order.id)
    fetchOrders()
  }

  let progressStyleSetting = {
    width:`${order.status==='Placed'?'2rem':order.status==='Shipped'?'20%':order.status==='Out For Delivery'?'45%':order.status==='Delivered'?'69%':'91%'}`,
    backgroundColor:`${order.status==='Cancelled'?'red':''}`
  }

  let spanStyle = {
    backgroundColor:`${order.status==='Cancelled'?'red':''}`
  }

  useEffect(()=>{
    
    setProduct(products.filter((prod)=>order.product===prod.id)[0])
    setProgressStyle(progressStyleSetting)
  },[order])

  return (
    <>
    <div style={{margin:'1rem'}} className='order-item'>
      <div className="order-status full-width">
        
        <div className="d-flex j-center a-center direction-col">
          <label htmlFor="">Placed</label>
          <span style={spanStyle}></span>
        </div>

        <div className="d-flex j-center a-center direction-col">
          <label htmlFor="">Shipped</label>
          <span style={spanStyle}></span>
        </div>

        <div className="d-flex j-center a-center direction-col">
          <label htmlFor="">Out For Delivery</label>
          <span style={spanStyle}></span>
        </div>

        <div className="d-flex j-center a-center direction-col">
          <label htmlFor="">Delivered</label>
          <span style={spanStyle}></span>
        </div>

        <div className="d-flex j-center a-center direction-col">
          <label htmlFor="">Cancelled</label>
          <span style={spanStyle}></span>
        </div>

        <div style={progressStyle} className="progress-bar">

        </div>

      </div>

      <div className="order-item-body a-center d-flex j-between">
        <div className="order-image">
            <img style={{width:'5rem'}} src={product?.image1} alt="" />
        </div>
        <div style={{margin:'0 1rem'}} className="order-item-info d-flex direction-col">
            <h3>{product?.name}</h3>
            <label htmlFor="">₹ {product?.price}</label>
        </div>

        <div className="order-actions d-flex j-between a-center direction-col">
            <label htmlFor="">{order.date}</label>
            <button onClick={handleCancel} className='btn-outline-primary'>Cancel</button>
        </div>
      </div>
    </div>
    <hr />
    </>
  )
}

export default OrderItem
