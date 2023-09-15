import React, { useEffect, useState, useContext} from 'react'
import Listings from '../components/Listings'
import AppContext from '../context/AppContext'
import EmptyAlert from '../components/EmptyAlert'


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
