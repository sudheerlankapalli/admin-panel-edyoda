import '../App.css';
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faTrashAlt);



const Role=(props)=>{
    const navigate=useNavigate();
    
    const data=props.data
    const{name,email,password,phone,profilePic}=data || ""

    const[picstate,setPicState]=useState("")
    const[rePassword,setRePassword]=useState("")
    const[match,setmatch]=useState(false)
    const[image,setImage]=useState("")
    const[formData,setFormData]=useState({
        profilePic:"",
        name:"",
        email:"",
        password:"",
        phone:""
    })
    useEffect(()=>{
        if(data){
        setPicState(data.profilePic);
        setFormData({
            profilePic:profilePic,
            name:name,
            email:email,
            password:password,
            phone:phone
        })
    }
    },[data])
    const fileInputRef=useRef(null);

    function handleFileUpload(){
        fileInputRef.current.click();
    }

    function handleFileChange(e){
        const file=e.target.files[0];

        if(file){
            const allowedTypes=['image/jpeg', 'image/png', 'image/bmp', 'image/svg+xml', 'image/webp'];
            if(!allowedTypes.includes(file.type)){
                alert('Only JPG, PNG, BMP, SVG, and WEBP files are allowed.');
                return
            }
            const maxSize=1024*1024;
            if(file.size>maxSize){
                alert('File size cannot exceed 1MB.');
                return
            }
            const reader=new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend=()=>{
                setImage(reader.result)
                setPicState(reader.result)
                setFormData({...formData,profilePic:reader.result})
            }
        }else {
            setImage("")
        }
    }
    function handleRePassword(e){
        setRePassword(e.target.value)    
    }
    function handleIconClick(){
        setPicState("")
        setImage("");
    }

    function handleSubmit(e){
        e.preventDefault();
        if(match){
            alert("password does not match");
            return
        }
        if(!image && !picstate){alert("please upload a image");  return}
        
        props.handlestoreData(formData)

        setImage("")
    }
  
    useEffect(()=>{
        formData.password===rePassword ?setmatch(false):setmatch(true)
    },[rePassword])

    return(
        <div>
            <form  onSubmit={handleSubmit}>
                <div className='row phdiv'>
                <div className='photodiv'>
                    <h2>Change Avatar</h2>
                <div  style={{  backgroundColor:image===""?"#aaa" : "transparent", 
                border:"1px solid black", width:"250px" }} className='photocon'>
               <div className='deleteicondiv'>
                <FontAwesomeIcon icon="far fa-trash-alt" className='deleteicon'
                size="lg" style={{color: "#ffffff",}} 
                onClick={handleIconClick}/></div>
                    {!image && <img src={picstate} alt="" style={{width:"250px"}}/> }
                    {image &&   <img src={image} alt="" style={{width:"250px"}} />}
                </div>
                <div>
                    <input type="file" name="profilePic" ref={fileInputRef} 
                    style={{display:"none"}} onChange={handleFileChange}/>
                    <input type="button" onClick={handleFileUpload}
                    className='button' value="UPLOAD NEW PHOTO"/>
                </div>
                </div>

            <div className='details'>
                <div className='detail'>
                 <h2>Account Settings</h2><br/>
                <div className='detail1'>
                <div>
                <label>Account Name</label><br/>
                <input type="text" name="name"  value={formData.name} className='account-input'
                onChange={(e)=>setFormData({...formData,name:e.target.value})} required/>
                </div>
                <div>
                    <label>Account Email</label><br/>
                    <input type="email" name="email" value={formData.email} className='account-input'
                     onChange={(e)=>setFormData({...formData,email:e.target.value})}
                     required/>
                </div>
                <div>
                    <label>Password</label><br/>
                    <input type="password" name="password" value={formData.password} required
                    className='account-input'
                     onChange={(e)=>{setFormData({...formData,password:e.target.value});
                     setmatch(true)}} />
                </div>
                <div>
                    <label>Re-enter Password</label><br/>
                    <input type="password" name="password" value={rePassword} 
                    required={match} className='account-input'
                    onChange={handleRePassword}/>
                    {match && <p>password does not match</p>}
                </div>
                <div>
                    <label>Phone</label><br/>
                    <input  type="text" name="phone"  maxLength="10" pattern="[0-9]{10}"  
                    value={formData.phone} required className='account-input'
                    title="Please enter a 10-digit phone number" 
                    onChange={(e)=>setFormData({...formData,phone:e.target.value})} />                    
                </div>
                <div style={{marginTop:'30px'}}>
                    <input type="submit" value="UPDATE YOUR PROFILE"  className='button'  />
                </div>
                </div>
                </div>
                </div>
                </div>
            </form>
        </div>
    )
}

export default Role