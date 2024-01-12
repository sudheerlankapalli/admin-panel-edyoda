import '../App.css'

import React,{ useEffect, useState} from "react";
import Role from "../accountsComponent/useRole";





const AccountPage=()=>{
const storApiData=JSON.parse(localStorage.getItem("apiData"))
const accountsPage=storApiData.accountsPage
const accountsPageKey=Object.keys(accountsPage)

    const [selectedAccount, setSelectedAccount] = useState("");
 

    const handleSelect = (e) => {
      setSelectedAccount(e.target.value);
    };

    let data=storApiData.accountsPage[selectedAccount];
    useEffect(()=>{
         data=storApiData.accountsPage[selectedAccount];
    },[selectedAccount])

       
    function handlestoreData(formData){
       accountsPageKey.map((key)=>{
           if(key===selectedAccount){
                return storApiData.accountsPage[key]=formData;
                
            }else return storApiData.accountsPage[key]
        })
        localStorage.apiData=JSON.stringify(storApiData)
        alert(`${selectedAccount} data updated successfully`)
    }



    return(
        <div className='accountPage'>
        <div className='selectDiv'>
            <h2>List of Accounts</h2>
            <p>Accounts</p>
            <form>
                <select name="user" onChange={handleSelect} className='custom-select'>
                    <option value="">Select Account</option>
                    {
                        accountsPageKey.map((key)=><option key={key} value={key} >{key}</option>)
                    }
                </select>
            </form>
        </div>
       <Role data={data}  handlestoreData={handlestoreData}/>
        </div>
    )
}

export default AccountPage