import '../App.css';
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faTrashAlt);




const ProductsPage=()=>{
    
    const navigate=useNavigate()
    const storedApiData=JSON.parse(localStorage.getItem("apiData"));
   const products=storedApiData.productsPage.products 

    const[checkList,setCheckList]=useState([])
    const[productsList,setProductsList]=useState(products)


    const handleNavigateAddNewProduct=()=>{
        
        navigate('/addProduct')
    }
    
    const handleCheckBox=(e)=>{
        const {checked,name}=e.target
        if(checked) {setCheckList((prevItems)=>[...prevItems,name])}
        else{
            setCheckList((prevItem)=>prevItem.filter((item)=>item!==name))
        }
    }

    const handleDeleteSelected=()=>{
        setProductsList((prevItems)=>prevItems.filter((item)=>!checkList.includes(item.name)))
        setCheckList([])
    }
    const handleDeleteIcon=(name)=>{
        setProductsList((prevItem)=>prevItem.filter((item)=>item.name!==name))
    }
   
    useEffect(()=>{

       Object.keys(storedApiData.productsPage).map((key)=>{
        if(key==='products'){
            return storedApiData.productsPage[key]=productsList
        }else return storedApiData.productsPage[key]})
        localStorage.apiData=JSON.stringify(storedApiData)
    },[productsList])

 
    return(
        <div className='productpage' >
            <div className='producttablediv'>
            <div className='producttable'>
            <table className='table '>
                <thead>
                    <tr>
                    <th></th>
                    <th>PRODUCT NAME</th>
                    <th>UNIT SOLD</th>
                    <th>IN STOCK</th>
                    <th>EXPIRE DATE</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody className='tablebody'>
                    {
                        productsList.map((eachProduct,index)=>{
                            const{name,unitSold,stock,expireDate}=eachProduct
                            return(
                            <tr key={index}>
                            <td><input type="checkbox" name={name} checked={checkList.includes(name)} 
                            onChange={handleCheckBox}/></td>
                            <td>{name}</td>
                            <td>{unitSold}</td>
                            <td>{stock}</td>
                            <td>{expireDate}</td>
                            <td >
                            <div style={{backgroundColor:"#394e64"}} className='binicondiv'
                             onClick={()=>handleDeleteIcon(name)}>
                            <FontAwesomeIcon icon="far fa-trash-alt" size="lg" style={{color: "#ffffff",}} />
                            </div></td>
                            </tr>
                        )})
                    }
                    
                </tbody>
            </table>
            </div>
            <div className='buttondiv'>
                <button onClick={handleNavigateAddNewProduct}>ADD NEW PRODUCT</button>
                <button onClick={handleDeleteSelected}>DELETE SETLECTED PRODUCT</button>
            </div>
            </div>
            <CategoriesTab />
        </div>
    )
}

function CategoriesTab(){
    const storedApiData=JSON.parse(localStorage.getItem("apiData"));
     const categories=storedApiData.productsPage.categories
     
    const[categoriesList,setCategoriesList]=useState(categories)
    const[popup,setPopup]=useState(false)
    const[newCategory,setNewCategory]=useState("")

    const handleDeleteCategories=(clickItem)=>{
        setCategoriesList((prevItems)=>prevItems.filter((item)=>item!==clickItem))
    }

    const handleAddCategory=()=>{
        if(!categoriesList.includes(newCategory) && newCategory.length>3){
        setCategoriesList((prevItem)=>[...prevItem,newCategory])
        alert("category added successfully.")
        setPopup(false)
        setNewCategory("")
        } else if(categoriesList.includes(newCategory)){ alert("category alredy exists")}
        else if(newCategory.length<=3){ alert("please enter a correct category")}
    }

        useEffect(()=>{
                Object.keys(storedApiData.productsPage).map((each)=>{
                    if(each==="categories"){
                        return storedApiData.productsPage[each]=categoriesList   
                    }else return storedApiData.productsPage[each]
                })
            
            localStorage.setItem('apiData',JSON.stringify(storedApiData))
        },[categoriesList])
        

    return(
        <>
        <div className='catogery'>
            <h2>Product Categories</h2>
        <div className='producttable'>
        {  <div>
        <table className='table'>
        <tbody className='tablebody'>
                {
                    categoriesList.map((eachCat,index)=>{
                       return <tr key={index}>
                        <td>{eachCat}</td>
                       <td><div style={{backgroundColor:"#394e64"}}  className='binicondiv'
                       onClick={()=>handleDeleteCategories(eachCat)}>
                       <FontAwesomeIcon icon="far fa-trash-alt" size="lg" style={{color: "#ffffff",}} />
                         </div>
                        </td>
                        </tr>
                    })
                }
            </tbody>
        </table> 
        </div>
         } 
        </div> 
        <button onClick={()=>setPopup(true)} >ADD NEW CATEGORIES</button> 
        </div>
        <div >
            { popup && 
            <div className='popup-container'>
                <div className='popup'>
                <input type="text" name="new category" placeholder="enter a category" value={newCategory}
                onChange={(e)=>setNewCategory(e.target.value)}/>
                <button onClick={handleAddCategory}>Add</button>
                <button onClick={()=>{setPopup(false);setNewCategory("")}}>cancel</button>
                </div>
            </div>

            }
           
        </div>
        </>
    )
}

export default ProductsPage