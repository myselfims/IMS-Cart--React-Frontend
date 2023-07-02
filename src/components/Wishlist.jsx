import React, { useEffect, useState, useContext} from 'react'
import Carousel from './Carousel'
import Sort from './Sort'
import Listings from './Listings'
import AppContext from '../context/AppContext'
import { useParams } from 'react-router-dom'
import EmptyAlert from './EmptyAlert'


const Wishlist = () => {
  const {wishlist,fetchProducts,setProducts,products,fetchWishlist} = useContext(AppContext)
  const [wishedProducts,setWishedProducts] = useState([])

  useEffect(()=>{
    fetchWishlist()
    fetchProducts()
    
    let tempprod = []
    wishlist.forEach(element => {
      let prod = products.filter((elem)=>elem.id===element.product)
      
      tempprod.push(prod[0])
    });
    setWishedProducts(tempprod)
    

  },[])


  
  return (
    <div>
      {wishedProducts.length>0?
      <Listings title={`${wishedProducts.length} Items found in your wishlist`} products={wishedProducts} />
      :
      <EmptyAlert message='Your wishlist is empty!' />
      }
    </div>
  )
}

export default Wishlist
