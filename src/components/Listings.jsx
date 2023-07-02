import React,{useContext, useEffect, useState} from 'react'
import ListItem from './ListItem'
import { Link, useSearchParams } from 'react-router-dom'
import AppContext from '../context/AppContext'


const Listings = (props) => {
  const {fetchWishlist} = useContext(AppContext)
  
  useEffect(()=>{
    fetchWishlist()
  },[props.title,props.products[0]])

  return (
    <div className='listing-div'>
        <div className="listing-header d-flex j-between">
          <h2>{props.title}</h2>
          {props.category!==undefined?<Link to={`/viewcategory/${props.category}`}>Show more</Link>:''}
        </div>
        <div className="list-items-div">
            {props.products.map((product)=>{
              return(<ListItem key={product.id} product={product}/>)
            })}
        </div>

        <hr/>

    </div>
  )
}

export default Listings
