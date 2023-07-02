import React,{useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext'


const ListItem = (props) => {
  const product = props.product
  const {addToCart,addToWishlist,removeWishlist,wishlist,fetchWishlist} = useContext(AppContext)
  const [wished, setWished] = useState(false)
  const [wishid, setWishId] = useState(0)

  const add = ()=>{
    addToWishlist(product.id).then((res)=>{
      fetchWishlist()
      setWishId(res.id)
      setWished(true)
    })
  }
  
  const remove = ()=>{
    fetchWishlist()
    removeWishlist(wishid)
    setWished(false)
  }

  useEffect(()=>{
    let checkwish = wishlist.filter((prod)=>prod.product===product.id)
    if (checkwish.length > 0){
      setWished(true)
      setWishId(checkwish[0].id)
      
    }
  },[])

  return (
    <div key={product.id} className='list-item'>
        <div className="visual-div">
            <Link key={product.id} to={`/viewproduct/${product.id}`}>
              <img src={product.image1} alt="" />
            </Link>
            <button onClick={wished?remove:add} ><i className={`fa-${wished?'solid':'regular'} fa-heart`}></i></button>
        </div>
        <div className="info-div">
          <Link to={`/viewproduct/${product.id}`}>
            <div>
                <h4>{product.name}</h4>
                <h4>₹{product.price}</h4>
            </div>
            <p>{product.description.slice(0,50)}...</p>
            
            <div className="ratings-div">
            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
            (210)
            </div>
          </Link>
            <button onClick={()=>addToCart(product.id)} className='btn-outline-primary'>Add to Cart</button>
        </div>
    </div>
  )
}

export default ListItem
