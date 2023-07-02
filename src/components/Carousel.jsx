import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

const Carousel = (props) => {

  const [currentSlide, setCurrentSlide] = useState(0)
  const {offers,fetchOffers} = useContext(AppContext)
  const slides = [{text:'Amazing deals on smartphones!',image:'https://www.freepnglogos.com/uploads/mobile-png/export-genius-country-wise-analysis-mobile-phones-38.png'},{text:'Get 10% off on branded shoes!',image:'https://freepngimg.com/download/adidas_shoes/1-2-adidas-shoes-png.png'}]

  const nextSlide = ()=>{
    if(currentSlide !== (offers.length-1)){
      setCurrentSlide(currentSlide+1)
    }
  }

  const prevSlide = ()=>{
    if(currentSlide > 0){
      setCurrentSlide(currentSlide-1)
    }
  }

  const changeOffer = ()=>{
    setTimeout(() => {
      if (currentSlide !== (offers.length-1)){
        setCurrentSlide(currentSlide+1)
      }else{
        setCurrentSlide(0)
      }
    }, 10000);
  }

  
  useEffect(()=>{
    if (offers.length===1){
      fetchOffers()

    }
    changeOffer()

  },[currentSlide])

  return (
    <div className='carousel-div'>
        <div className="banner-div">
          <img key={offers[currentSlide].png} src={offers[currentSlide].png} alt="" />
        </div>
        <div className="action-div">
          <h1>{offers[currentSlide].title}</h1>
          <button className='btn-primary'>Buy Now</button>  
        </div>

      <div className="carousel-btns">
        <button onClick={prevSlide}><i className="fa-solid fa-chevron-left"></i></button>
        <button onClick={nextSlide}><i className="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
  )
}

export default Carousel
