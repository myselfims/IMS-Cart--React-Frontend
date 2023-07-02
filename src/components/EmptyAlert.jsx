import React from 'react'

const EmptyAlert = (props) => {
  return (
    <div className="no-items-div d-flex j-center full-width">
        <div>
        <h1 style={{textAlign:'center',margin:'2rem'}}>{props.message}</h1>
        <img style={{width:'40rem'}} src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png" alt="" />
        </div>
    </div>
  )
}

export default EmptyAlert
