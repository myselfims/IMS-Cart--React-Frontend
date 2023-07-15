import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object({
    username : Yup.string().min(2).max(20).required('username is required!'),
    email : Yup.string(),
    password : Yup.string().required('password is required!'),
    confirm_password : Yup.string()
})

const signupSchema = Yup.object({
    username : Yup.string().min(2).max(20).required('username is required!'),
    email : Yup.string().required('email is required!').email(),
    password : Yup.string().min(8).max(20).required('password is required!'),
    confirm_password : Yup.string().required().oneOf([Yup.ref('password')],'password must match!')
})

const AuthenticationPage = (props) => {
    const {fetchOffers,login,signup,checkLogin,offers} = useContext(AppContext)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const validation = ()=>{
        if (props.type === 'login'){
            return loginSchema
        }else{
            return signupSchema
        }
    }

    const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
        initialValues : {
            username : '',
            email : '',
            password : '',
            confirm_password : ''
        },
        validationSchema : validation,
        onSubmit : (data)=>{
            if (props.type === 'login'){
                console.log(data)
                setLoading(true)
                login(values.username,values.password).then((res)=>{
                    setLoading(false)
                    if(res===true){
                        navigate('/')
                    }
                })

            }else{
                setLoading(true)
                signup(values.username,values.email,values.password).then((res)=>{
                    setLoading(false)
                    if(res===true){
                        login(username,password).then((res)=>{if(res===true){navigate('/')}})
                    }
                })
            }
        }
    })

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
                <form onSubmit={handleSubmit}>
                    <div className="auth-body d-flex j-center direction-col">
                        <input 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        name='username' 
                        placeholder='Username' 
                        className='form-input' 
                        type="text" 
                        value={values.username}
                        />
                        <label className='label-alert' htmlFor="">{errors.username && touched.username?errors.username:null}</label>
                        
                        {props.type==='login'?'':
                        <>
                        <input 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        name='email' 
                        placeholder='Email' 
                        className='form-input' 
                        type="email" 
                        value={values.email}
                        />
                        <label className='label-alert' htmlFor="">{errors.email && touched.email?errors.email:null}</label>
                        </>
                        }
                    
                        <input 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        name='password' 
                        placeholder='Password' 
                        className='form-input' 
                        type="password" 
                        value={values.password}
                        />
                        <label className='label-alert' htmlFor="">{errors.password && touched.password?errors.password:null}</label>

                        
                        {props.type==='login'?'':
                        <>
                        <input 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        name='confirm_password' 
                        placeholder='Confirm Password' 
                        className='form-input' 
                        type="password" 
                        value={values.confirm_password}
                        />
                        <label className='label-alert' htmlFor="">{errors.confirm_password && touched.confirm_password?errors.confirm_password:null}</label>
                        </>
                        
                        }

                        <label style={{margin:'1rem 0 '}}>Already have an account ! <Link to={props.type==='login'?'/auth/signup':'/auth/login'} >{props.type==='login'?'Signup':'Login'}</Link> </label>

                        <button className='btn-outline-primary'>
                        {props.type==='login'?'Login':'Signup'}
                        {loading?<i className="fa-solid fa-spinner spinner"></i>:''}

                        </button>
                    </div>
                </form>
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
