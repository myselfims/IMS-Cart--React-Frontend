import React, { useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = (props)=>{
    const [categories,setCategories] = useState([])
    const [offers,setOffers] = useState([{png:'',title:''}])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert,setAlert] = useState({alert:false,type:'',icon:'',color:'',message:''})
    const [cart,setCart] = useState([])
    const [wishlist,setWishlist] = useState([])
    const [orders,setOrders] = useState([])
    const [appliedCode,setAppliedCode] = useState(false)
    const [userdetails,setUserDetails] = useState(false)
    const [totalPrice,setTotalPrice] = useState(0)
    const [discountedprice,setDiscountedPrice] = useState(0)
    const [promocode,setPromoCode] = useState('')
    const [payment,setPayment] = useState(false)



    const baseUrl = 'https://imscartbackend.riseimstechnologies.com/'
    // const baseUrl = 'http://127.0.0.1:8000/'

    const showAlert = (type,message)=>{
        if (type==='danger'){
            setAlert({alert:true,type:'Error!',icon:'fa-solid fa-triangle-exclamation',color:'red',message:message})
        }else if (type==='warn'){
            setAlert({alert:true,type:'Warning!',icon:'fa-solid fa-circle-exclamation',color:'#dde35f',message:message})
        }else if (type==='success'){
            setAlert({alert:true,type:'Success!',icon:'fa-solid fa-circle-check',color:'green',message:message})
        }
    }

    const fetchCategories = async ()=>{
        setLoading(true)
        axios.get(baseUrl+'category').then((res)=>{
            setCategories(res.data)
            setLoading(false)
        })
    }

    const fetchOffers = async ()=>{
        setLoading(true)
        axios.get(baseUrl+'offers').then((res)=>{
            setOffers(res.data)
            setLoading(false)
        })
    }

    const fetchProducts = async (category)=>{
        setLoading(true)
        if (category !== undefined){
            
            axios.post(baseUrl+'products/',{category:category}).then((res)=>{
                setLoading(false)
                
                setProducts(res.data['products'])
            }).catch((err)=>{
                showAlert('danger','Something went wrong!')
            })

        }else{
            axios.get(baseUrl+'products/').then((res)=>{
                setLoading(false)
                setProducts(res.data['products'])
            }).catch((err)=>{
                showAlert('danger','Something went wrong!')
            })
        }
    
    }

    const fetchAProduct = async(id)=>{
        setLoading(true)
        return(axios.get(baseUrl+`products/${id}`).then((res)=>{
            setLoading(false)
            return(res.data)
        })).catch((err)=>{
            showAlert('danger','Something went wrong!')
        })

    }

    const searchProduct = (query)=>{
        setLoading(true)
        axios.get(baseUrl+`search/?search=${query}`).then((res)=>{
            setLoading(false)
            
            setProducts(res.data)
        }).catch((err)=>{
            setLoading(false)
            
            showAlert('danger','Error while fetching!')
        })
        
    }

    const login = (username,password)=>{

    
        return axios.post(baseUrl+'gettoken/',{
            username:username,
            password:password
        }).then((res)=>{
            localStorage.setItem('token',res.data['access'])
            localStorage.setItem('username',username)
            localStorage.setItem('password',password)
            showAlert('success','Login success!')
            
            return true
        }).catch((er)=>{
            try{
                if (er.response.status===401){
                    
                    showAlert('danger','User not found!')
                }else{
                    showAlert('danger','Something went wrong!')
                }
                return false
            }catch{
                showAlert('danger','Server not responding!')
            }
        })
    }

    const checkLogin = ()=>{
        return(
        axios.post(baseUrl+'tokenverify/',{
            token: localStorage.getItem('token')
        }).then((res)=>{
            if (res.status===200){
                return true
            }
        }).catch((err)=>{
            try{
                if (err.response.status === 401){
                    let username = localStorage.getItem('username')
                    let password = localStorage.getItem('password')
                    if (username!==null&&password!==null){
                        login(username,password).then((res)=>{window.reload}).catch((err)=>{
                            localStorage.clear()
                        })
                    }else{

                    }
                }
               
            }catch{}
            
        })
        )
    }

    const signup = (username, email,password)=>{
        return axios.post(baseUrl+'register/',{
            username:username,
            email : email,
            password:password
        }).then((res)=>{
            if (res.status===201){
                showAlert('success','Account created!')
                return true
            }
        }).catch((err)=>{
            try{
                if (err.response.data['username'][0] === "A user with that username already exists."){
                    showAlert('warn',"Username already exist try another username!")
                }else{
    
                    showAlert('danger','Something went wrong!')
                }

            }catch{
                showAlert('danger','Server not responding!')
            }
        })
    }


    const fetchUser = ()=>{
        setLoading(true)
        return axios.post(baseUrl+'getuser/',{username:localStorage.getItem('username')},{
            headers : {
                "Authorization": 'Bearer '+localStorage.getItem('token')
            }

        }).then((res)=>{
            setLoading(false)
            if (res.status===200){
                setUserDetails(res.data)
                return res.data
            }
            
        }).catch((err)=>{
            setLoading(false)
            if (err.response.status===401){
                checkLogin()
            }else{
                showAlert('danger','Something went wrong please refresh the page!')
            }
            
        })
    }

    const addToCart = (id)=>{
       
        axios.post(baseUrl+'cart/',{product:id},{
            headers : {
                "Authorization": 'Bearer '+localStorage.getItem('token')
            }

        }).then((res)=>{
            
            if (res.status===201){
                
                showAlert('success','Added to cart!')
            }
        }).catch((err)=>{
            if (err.response.status===401){
                showAlert('danger','Login required!')
                checkLogin()
            }
            
        })
    }

    const fetchCart = ()=>{
        
        setLoading(true)
        axios.get(baseUrl+'cart/',{
            headers : {
                "Authorization": 'Bearer '+localStorage.getItem('token')
            }

        }).then((res)=>{
            setLoading(false)
           
            if (res.status===200){
                setCart(res.data)
            }
            
        }).catch((err)=>{
           
            setLoading(false)
            if (err.response.status===401){
                checkLogin()
            }else{
                showAlert('danger','Server not responding!')
            }
            
        })

    }

    const deleteCart = (id)=>{
        setLoading(true)
        axios.delete(baseUrl+`cart/${id}/`,{
            headers : {
                "Authorization": 'Bearer '+localStorage.getItem('token')
            }

        }).then((res)=>{
            setLoading(false)
           
            if (res.status===204){
                fetchCart()
            }
            
        }).catch((err)=>{
           
            setLoading(false)
            if (err.response.status===401){
                checkLogin()
                fetchCart()
            }else{
                showAlert('danger','Server not responding!')
            }
            
        })
    }

    const logout = ()=>{
        localStorage.clear()
    }

    const addToWishlist = (product)=>{
        return axios.post(baseUrl+'wishlist/',{product:product},{
            headers : {
                "Authorization": 'Bearer '+localStorage.getItem('token')
            }

        }).then((res)=>{
            if (res.status===201){
                showAlert('success','Added to wishlist!')
                return res.data
            }
        }).catch((err)=>{
            if (err.response.status===401){
                showAlert('danger','Login required!')
                checkLogin()
            }
            
        })
    }

    const removeWishlist = (product)=>{
        return axios.delete(baseUrl+`wishlist/${product}/`,{
            headers : {
                "Authorization": 'Bearer '+localStorage.getItem('token')
            }

        }).then((res)=>{
            if (res.status===204){
                showAlert('success','Removed from wishlist!')
                return true
            }
        }).catch((err)=>{
            if (err.response.status===401){
                checkLogin()
            }
            
        })
    }

    const fetchWishlist = ()=>{
        axios.get(baseUrl+'wishlist/',{
            headers : {
                "Authorization": 'Bearer '+localStorage.getItem('token')
            }

        }).then((res)=>{
            if (res.status===200){
                setWishlist(res.data)
            }
            
        }).catch((err)=>{
            if (err.response.status===401){
                checkLogin()
            }else{
                showAlert('danger','Server not responding!')
            }
            
        })
    }

    const fetchOrders = ()=>{
        axios.get(baseUrl+'order/',{
            headers : {
                "Authorization": 'Bearer '+localStorage.getItem('token')
            }

        }).then((res)=>{
            if (res.status===200){
                let data = res.data
                if (data!==orders){
                    setOrders(data)
                }
            }
            
        }).catch((err)=>{
            
            if (err.response.status===401){
                checkLogin()
            }else{
                showAlert('danger','Server not responding!')
            }
            
        })
    }

    const cancelOrder = (id)=>{
        setLoading(true)
        return axios.delete(baseUrl+`order/${id}/`,{
            headers : {
                "Authorization": 'Bearer '+localStorage.getItem('token')
            }

        }).then((res)=>{
            setLoading(false)
            
            if (res.status===204){
                showAlert('success','Order cancelled!')
                return true
            }
        }).catch((err)=>{
            setLoading(false)
            if (err.response.status===401){
                checkLogin()
            }
            
        })
    }
    
    const verifypromo = (code)=>{
        return axios.post(baseUrl+'verifypromo/',{promo_code:code}).then((res)=>{
            if (res.status===200){
                return res.data
            }
        }).catch((res)=>{
            
            if (res.response.status===404){
                showAlert('warn','Promo code not valid!')
            }
        })
    }

    return(
        <AppContext.Provider value={{fetchProducts,categories,fetchCategories,products,fetchAProduct,loading,setLoading,alert,setAlert,showAlert,login,signup,checkLogin,searchProduct,setProducts,fetchOffers,offers, addToCart, fetchCart,cart,deleteCart, logout, fetchUser,baseUrl,setCart,addToWishlist,removeWishlist,wishlist,setWishlist,fetchWishlist,fetchOrders,cancelOrder,orders,verifypromo,appliedCode,setAppliedCode,userdetails,totalPrice,discountedprice,promocode,setPromoCode,setDiscountedPrice,setTotalPrice,payment,setPayment}}>

            {props.children}

        </AppContext.Provider>
    )
}

export default AppState;