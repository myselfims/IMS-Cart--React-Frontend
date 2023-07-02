import React from 'react'

const Card = (props) => {

  const category = props.category
    
  return (
    <div className='card-div'>
      <img src={category.image} alt="" />
      <h2>{category.name}</h2>
    </div>
  )
}

export default Card
