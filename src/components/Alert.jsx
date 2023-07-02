import React, { useEffect } from 'react'
import AppContext from '../context/AppContext';
import { useContext } from 'react';

const Alert = () => {
    const {alert,setAlert} = useContext(AppContext)
    useEffect(()=>{
        setTimeout(() => {
            setAlert({alert:false,type:'',icon:'',color:'',message:''})
        }, 2000);
    })
  return (
    <div className="alert-div">
        <div className='a-center alert-body d-flex'>
            <div style={{marginRight:'1rem'}} className="alert-icon">
                <i style={{fontSize:'2rem',color:alert.color}} className={alert.icon}></i>
            </div>
            <div className="alert-message d-flex direction-col">
                <h3>{alert.type}</h3>
                <label htmlFor="">{alert.message}</label>
            </div>
        </div>
        <div style={{backgroundColor:alert.color}} className="alert-progress">

        </div>
    </div>
  )
}

export default Alert
