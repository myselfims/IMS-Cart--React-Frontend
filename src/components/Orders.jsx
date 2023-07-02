import React,{useContext, useEffect, useState} from 'react';
import OrderItem from './OrderItem';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import EmptyAlert from './EmptyAlert';

const Orders = () => {

    const {fetchProducts,orders,fetchOrders,products} = useContext(AppContext)
    const [orderedProduct, setOrderedPrducts] =  useState([])

    useEffect(()=>{
        fetchProducts()
        fetchOrders()
        
        orders.forEach(element => {
            let product = products.filter((prod)=>prod.id===element.product)
            setOrderedPrducts(product)
        });
    },[orders.length])

  return (
    <>
    {orders.length>0?
    <div className='orders-div d-flex full-width j-center'>
        <div className="orders-body">
            <h1>Your orders</h1>
            <div className="order-items">
                {orders.map((order)=>{
                    return (<OrderItem key={order.id} order={order}/>)
                })}
                
            </div>
        </div>
    </div>
    :
    <EmptyAlert message='Orders not found!'/>}
    </>
  )
}

export default Orders
