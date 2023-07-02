import React, { useEffect, useState,useContext } from 'react'
import AppContext from '../context/AppContext'

const Sort = (props) => {
  const {products,setProducts,fetchProducts} = useContext(AppContext)
  const [disabledBtn, setDisabledBtn] = useState('')
  const [clearBtn,setClearBtn] = useState(true)
  const [colors, setColors] = useState([])
  const [colorbtn,setColorBtn] = useState(false)

  const applyFilters = (filter)=>{
    setClearBtn(false)
    const sorted = [...products]
    if (filter==='AToZ'){
      setDisabledBtn('AToZ')
      setProducts(sorted.sort((a, b) => a.name.localeCompare(b.name)))

    }
    else if(filter==='ZToA'){
      setDisabledBtn('ZToA')
      setProducts(sorted.sort((a,b)=> b.name.localeCompare(a.name)))
    }
    else if(filter==='LToH'){
      setDisabledBtn('LToH')
      setProducts(sorted.sort((a,b)=> a.price - b.price))

    }else if(filter==='HToL'){
      setDisabledBtn('HToL')
      setProducts(sorted.sort((a,b)=> b.price - a.price))

    }
  }


  const clearFilters = (e)=>{
    setDisabledBtn('')
    setColorBtn(false)
    props.refresh()
    setClearBtn(true)
  }

  const handleColor = (e)=>{
    setProducts(products.filter((prod)=>prod.color===e.target.value))
    setColorBtn(true)
    setClearBtn(false)
  }

  useEffect(()=>{
    let tcolors = []
    products.forEach((prod)=>{
      tcolors.push(prod.color)
    })
    setColors(tcolors.filter((color,index)=>tcolors.indexOf(color)===index))
  },[disabledBtn])

  return (
    <div className='sort-div'>
      <div className="filters-div">
        <label htmlFor="">Sort By </label>
        <button disabled={disabledBtn==='LToH' ? true:false} onClick={()=>applyFilters('LToH')}>Price - Low to High <i className="fa-solid fa-up-long"></i></button>

        <button disabled={disabledBtn==='HToL' ? true:false} onClick={()=>applyFilters('HToL')}>Price - High to Low <i className="fa-solid fa-down-long"></i></button>

        <button disabled={disabledBtn==='AToZ' ? true:false} onClick={()=>applyFilters('AToZ')}>A - Z <i className="fa-solid fa-down-long"></i> </button>

        <button disabled={disabledBtn==='ZToA' ? true:false} onClick={()=>applyFilters('ZToA')}>Z - A <i className="fa-solid fa-up-long"></i></button>

        <select disabled={colorbtn} onChange={handleColor} name="" id="">
            <option defaultChecked><i className="fa-solid fa-palette"></i> Color <i className="fa-solid fa-chevron-down"></i></option>

            {colors.map((color)=>{
              return(<option key={color} value={color}> {color}  </option>)
            })}
        </select>

        <button onClick={clearFilters} disabled={clearBtn}> <i className="fa-solid fa-xmark"></i> Clear</button>
      </div>
    </div>
  )
}

export default Sort
