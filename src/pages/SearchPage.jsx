import React, { useEffect, useState, useContext} from 'react'

import Sort from '../components/Sort'
import Listings from '../components/Listings'
import AppContext from '../context/AppContext'
import { useParams } from 'react-router-dom'


const SearchPage = (props) => {
  const {searchProduct,fetchProducts,products} = useContext(AppContext)
  const {query} = useParams()

  const fetchProduct = ()=>{
    if (props.search===false){
      fetchProducts(query)
    }else{
      searchProduct(query)
    }
  }

  useEffect(()=>{
    fetchProduct()
    window.scrollTo({top:0,behavior:'instant'})
  },[query])


  
  return (
    <div>
      {/* <Carousel image='https://www.pngmart.com/files/15/Happy-Girl-Listening-Music-PNG.png' text='Grab upto 50% off on selected headphone' /> */}
      <Sort refresh={fetchProduct} />
      <Listings title={`${products.length} results found`} products={products} />
    </div>
  )
}

export default SearchPage
