import React, { useEffect, useContext, useState } from 'react'
import AppContext from '../context/AppContext';
import axios from 'axios';



const ProfilePage = () => {
    const {fetchUser,setLoading,baseUrl,checkLogin,showAlert} = useContext(AppContext)
    const [user,setUser] = useState(undefined)
    const [edit,setEdit] = useState(true)
    const [first_name,setFirstName] = useState('')
    const [last_name,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [mobile,setMobile] = useState('')
    const [gender,setGender] = useState('')
    const [address,setAddress] = useState('')
    const [city,setCity] = useState('')
    const [pincode,setPincode] = useState('')
    const [state,setState] = useState('')
    

    const handleFirstName = (e)=>{
        setFirstName(e.target.value)
    }

    const handleLastName = (e)=>{
        setLastName(e.target.value)
    }

    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }

    const handleMobile = (e)=>{
        if (e.target.value.length <= 10){
            setMobile(e.target.value)

        }
    }

    const handleGender = (e)=>{
        setGender(e.target.value)
    }

    const handleAddress = (e)=>{
        setAddress(e.target.value)
    }

    const handleCity = (e)=>{
        setCity(e.target.value)
    }

    const handlePincode = (e)=>{
        
        setPincode(e.target.value)
    }

    const handleState = (e)=>{
        setState(e.target.value)
    }



    const updateProfile =  ()=>{
        if (!edit){   
            setLoading(true)
            axios.put(baseUrl+'getuser/',{
                first_name:first_name,
                last_name:last_name,
                email:email,
                mobile : mobile,
                gender : gender,
                address : address,
                city : city,
                pincode : pincode,
                state : state
            },{
                headers : {
                    "Authorization": 'Bearer '+localStorage.getItem('token')
                }

            }).then((res)=>{
                setLoading(false)
                setEdit(true)
                
            }).catch((err)=>{
                setLoading(false)
                if (err.response.status===401){
                    checkLogin()
                }else{
                    showAlert('danger','Something went wrong please refresh the page!')
                }
                checkLogin()
                
            })
            
        }else{
            setEdit(false)
        }
    }

    useEffect(()=>{
        fetchUser().then((res)=>{
            if (res.user.email==="" || res.user.mobile==="" || res.user.first_name==="" || res.address.length === 0){
                showAlert('warn',"Please complete your profile here!")
            }
            setFirstName(res.user.first_name)
            setLastName(res.user.last_name)
            setEmail(res.user.email)
            setGender(res.address[0].gender)
            setAddress(res.address[0].address)
            setMobile(res.address[0].mobile)
            setCity(res.address[0].city)
            setPincode(res.address[0].pincode)
            setState(res.address[0].state)
        })
    },[])

  return (
    <>
    
    <div className='profile-div'>
    <div className='profile-body'>
        <div className="profile-header border d-flex">
            <span><h2>{localStorage.getItem('username').slice(0,1).toLocaleUpperCase()}</h2></span>
            <label htmlFor="">Hello, {localStorage.getItem('username')} </label>
        </div>
       
        <div className="personal-info">
            <div className="d-flex j-between full-width">
                <h2>Personal Information</h2>
                <button onClick={updateProfile} className='btn-outline-primary full-width'>{!edit?'Save':'Edit'}</button>

            </div>
            <div className="d-flex j-between">
                <div className='d-flex direction-col '>
                    <label htmlFor="">First name</label>
                    <input onChange={handleFirstName} disabled={edit} value={first_name} type="text" className="form-input" />
                </div>
                <div className='d-flex direction-col'>
                    <label htmlFor="">Last name</label>
                    <input onChange={handleLastName} disabled={edit} value={last_name} type="text" className="form-input" />
                </div>
            </div>
            <div>
                <div className='d-flex j-between'>
                    <div className='d-flex direction-col'>
                        <label htmlFor="">Email</label>
                        <input onChange={handleEmail} disabled={edit} value={email} type="text" className="form-input" />
                    </div>
                    <div className='d-flex direction-col'>
                        <label htmlFor="">Mobile</label>
                        <input onChange={handleMobile} disabled={edit} value={mobile} type="text" className="form-input" />
                    </div>
                </div>
            </div>
            <div>
                <div className='d-flex gender-div direction-col'>
                    <label htmlFor="">Gender</label>
                    <div className='d-flex j-between'>
                        <div className='align-center d-flex'>
                            <input onChange={handleGender} value={'Male'} disabled={edit} checked={gender==='Male'?true:false} className='radio' type="radio" name='gender'/> <label htmlFor=""> Male</label>
                        </div>
                        <div className='align-center d-flex'>
                            <input onChange={handleGender} value={'Female'} disabled={edit} checked={gender==='Female'?true:false} className='radio' type="radio" name='gender'/> <label htmlFor=""> Female</label> 
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <h2>Address</h2>
            
                <div className='d-flex direction-col '>
                    <label htmlFor="">Address</label>
                    <input onChange={handleAddress} disabled={edit} value={address} type="text" className="form-input" />
                </div>
                <div className='d-flex j-between'>
                    <div className='d-flex direction-col'>
                        <label htmlFor="">City</label>
                        <input onChange={handleCity} disabled={edit} value={city} type="text" className="form-input" />
                    </div>
                    <div className='d-flex direction-col'>
                        <label htmlFor="">Pincode</label>
                        <input onChange={handlePincode} disabled={edit} value={pincode} type="text" className="form-input" />
                    </div>
                </div>
                <div className='d-flex direction-col'>
                    <label htmlFor="">State</label>
                    <input onChange={handleState} disabled={edit} value={state} type="text" className="form-input" />
                </div>
        </div>
    </div>
    </div>

    </>
  )
}

export default ProfilePage
