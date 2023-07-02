import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import axios from 'axios';

const AuthenticationPage = (props) => {
    const {showAlert,fetchOffers,login,signup,checkLogin,offers} = useContext(AppContext)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    const [currentOffer, setOffer] = useState(0)
    const navigate = useNavigate()

    const handleUsername = (e)=>{
        setUsername(e.target.value)
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }

    const handleLogin = ()=>{
        if (username!==''&&password!==''){
            setLoading(true)
            login(username,password).then((res)=>{
                setLoading(false)
                if(res===true){
                    navigate('/')
                }
            })

        }else{
            showAlert('warn','Please enter username and password!')
        }
    }

    const handleSignup = ()=>{
        if (username!==''&&email!==''&&password!==''){
            setLoading(true)
            signup(username,email,password).then((res)=>{
                setLoading(false)
                if(res===true){
                    login(username,password).then((res)=>{if(res===true){navigate('/')}})
                }
            })

        }else{
            showAlert('warn','Please all the blank fields!')
        }
    }

    useEffect(()=>{

        fetchOffers()
        checkLogin().then((res)=>{
            if (res===true){
                navigate('/')
            }
        })
    },[])
    


  return (
    <div className='auth-base j-center d-flex'>
        <div className="auth-div shadow d-flex">
            <div className="auth-form d-flex direction-col j-center">
                <div className="auth-header d-flex j-center">
                    <h1>{props.type === 'login'?'Login':'Create Account'}</h1>
                </div>
                <div className="auth-body d-flex j-center direction-col">
                    <input onChange={handleUsername} placeholder='Username' className='form-input' type="text" />
                    
                    {props.type==='login'?'':<input onChange={handleEmail} placeholder='Email' className='form-input' type="email" />}
                
                    <input onChange={handlePassword} placeholder='Password' className='form-input' type="password" />

                    <label>Already have an account ! <Link to={props.type==='login'?'/auth/signup':'/auth/login'} >{props.type==='login'?'Signup':'Login'}</Link> </label>

                    <button onClick={props.type==='login'?handleLogin:handleSignup} className='btn-outline-primary'>
                    {props.type==='login'?'Login':'Signup'}
                    {loading?<i className="fa-solid fa-spinner spinner"></i>:''}

                    </button>
                </div>
            </div>
            <div id='auth-banner' className="auth-banner a-center d-flex direction-col">
                <h1>{offers[0].title}</h1>
                <img style={{width:'30rem'}} src={offers[0].png} alt="" />
            </div>
        </div>
    </div>
  )
}

export default AuthenticationPage
