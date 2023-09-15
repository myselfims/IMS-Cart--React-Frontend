import Carousel from '../components/Carousel'
import Card from '../components/Card'
import Listings from '../components/Listings'
import AppContext from '../context/AppContext'
import {React, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const {fetchProducts,categories,fetchCategories,products,checkLogin} = useContext(AppContext)

  useEffect(()=>{
    fetchProducts()
    fetchCategories()
    checkLogin()
  },[])

  return (
    <div className='landing-pade-div'>
      <Carousel />

      <div className="categories-div">
        <h2>Shop out top categories</h2>
        <div className="categories-list-div">

            {categories.map((cate)=>{
              return(<Link key={cate.id} to={`/viewcategory/${cate.name}`}><Card category={cate} /></Link>)
            })}

        </div>
      </div>
      <hr />
      {categories.map((cate)=>{
        return(<Listings category={cate.name} key={cate.id} title={`Pick your next ${cate.name}`} products={products.filter((prod)=>prod.category===cate.id).slice(0,5)}/>)
      })}
      
      <hr />
    </div>
  )
}

export default LandingPage
