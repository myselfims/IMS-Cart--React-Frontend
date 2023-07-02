import React, { useEffect,useContext, useState } from 'react'
import Listings from './Listings'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../context/AppContext'


const ViewItem = () => {
    const {id} = useParams()
    const {fetchAProduct,setCart,addToCart} = useContext(AppContext)
    const [product,setProduct] = useState({product:{name:'Please wait...',image1:'',image2:'',image3:'',image4:'',description:''},recomended:[]})
    const [quantity,setQuantity] = useState(1)
    const navigate = useNavigate()

    const [bannerimage, setBannerImage] = useState('')

    const changeBanner = (image)=>{
        setBannerImage(product['product'][`image${image}`])
    }

    const handleQuantity = (action)=>{
        
        if (action==='+'){
            setQuantity(quantity+1)
        }else{
            if (quantity!==1){
                setQuantity(quantity-1)
            }
        }
    }

    const handleBuyNow = ()=>{
        setCart([{product:product.product.id,quantity:quantity}])
        navigate('/checkout/')
    }

    const setImage = ()=>{
        setBannerImage(product['product'][`image1`])
        console.log(
            'runned....'
        )
    }

    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'})
        fetchAProduct(id).then((res)=>{
            setProduct(res)
        })

    },[id])
  return (
    <>
    
    <div  className='view-item-div'>
       <div className="images-div">
        <div className="main-image-div">
            <img key={bannerimage} src={bannerimage} alt="Loading" />
        </div>
        <div className="other-images-div">
            <img key={1} onClick={()=>changeBanner(1)} src={product['product'].image1} alt="" />
            <img key={2} onClick={()=>changeBanner(2)} src={product['product'].image2} alt="" />
            <img key={3} onClick={()=>changeBanner(3)} src={product['product'].image3} alt="" />
            <img key={4} onClick={()=>changeBanner(4)} src={product['product'].image4} alt="" />
        </div>
        </div> 
        <div className="product-info-div">
            <h1>{product['product'].name}</h1>
            <p>{product['product'].description}</p>
            <div className="ratings-div">
            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
             (210)
            </div>
            <hr />
            <div style={{width:'10rem',alignItems:'flex-end'}} className="d-flex ">
                <h2 style={{marginRight:'0.5rem',fontSize:'2rem'}}>₹{product['product'].price}</h2> <s><h5>₹{product['product'].mrp}</h5></s>
            </div>
            <hr />
            <div className="varients-div">
                <h3>Varients</h3>
                {String(product['product'].varients).includes(',')?
                <div>
                    {String(product['product'].varients).split(',').map((value)=>{
                        return (
                            <label htmlFor="blue">
                                <input type="radio" name="color" id="blue" /><label> {value}</label>
                            </label>
                        )
                    })}
                    
                </div>:<h2>Color : {product['product'].color}</h2>}
            </div>
            <hr />
            <div className="items-count-div">
                <div className="calculate-div">
                    <button onClick={()=>handleQuantity('-')}><i className="fa-solid fa-minus"></i></button>
                    <label htmlFor="">{quantity}</label>
                    <button onClick={()=>handleQuantity('+')}><i className="fa-solid fa-plus"></i></button>
                </div>
                <label htmlFor="">Only few available in stock</label>
            </div>
            <div className="purchase-div">
                <button onClick={handleBuyNow} className='btn-primary'>Buy Now</button>
                <button onClick={()=>addToCart(product['product'].id)} className='btn-outline-primary'>Add to Cart</button>
            </div>
            <div className="service-info">
                <div>
                    <i className="fa-solid fa-truck"></i> Free Delivery
                </div>
                <div>
                <i className="fa-solid fa-right-left"></i> 30 Days Return Policy
                </div>
            </div>
        </div>
    </div>
    <Listings title='You may also like!' products={product['recomended']}/>
    </>
  )
}

export default ViewItem
