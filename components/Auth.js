import React, { useState,useContext, useEffect } from "react";

const AuthContext=React.createContext();


export const AuthProvider=({children})=>{
    const[user,setUser]=useState(null);

    const login=(userName)=>{
        window.localStorage.setItem('loginStatus',true)
        setUser(userName)
    }
    const logout=()=>{
        window.localStorage.removeItem('loginStatus')
        setUser(null)
    }

    useEffect(()=>{
      const status=  window.localStorage.getItem('loginStatus')
        if(status==="true"){
            setUser("Admin")
        }
    })
    return( 
    <AuthContext.Provider value={{user,login,logout}} >{children}
    </AuthContext.Provider>
    )
}

export const useAuth =()=>{
    return useContext(AuthContext)
}