import React, { useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";


const CartItem = (props) => {
  const {deleteCart} = useContext(AppContext)
  const {price,setPrice} = props.price

  const handleDelete = ()=>{
    deleteCart(props.cartitem.id)
  }
 
  return (
    <div className="cart-item-div">
      <div className="item-image-div">
        <Link to={`/viewproduct/${props.product?.id}`}>
          <img
            className="border"
            src={props.product?.image1}
            width={100}
            height={100}
            alt=""
          />
        </Link>
        <div className="calculate-div">
          <button>
            <i className="fa-solid fa-minus"></i>
          </button>
          <label htmlFor="">{props.cartitem.quantity}</label>
          <button>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="cart-item-info">
        <h3>{props.product?.name}</h3>
        <h4>Price : {props.product?.price}</h4>
      </div>

      <div className="cart-item-last">
        <button onClick={handleDelete} className="btn-outline-primary">
          <i className="fa-solid fa-trash"></i> Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
