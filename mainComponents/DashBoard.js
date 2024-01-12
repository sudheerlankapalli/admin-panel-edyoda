import '../App.css'
import React from "react";
import LineChart from "../charts/LineChart";
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';



const DashBoard=()=>{
  const storedApiData=JSON.parse(localStorage.getItem("apiData"))||{}
const notifications=storedApiData?.dasbhoardPage?.notifications||[]
const orders=storedApiData?.dasbhoardPage?.orders ||[]

    return(
        <div className='dashboard' >
        <div className='row'><p className='tittle'>Welcome back, <strong>Admin</strong></p></div>
        <div className='cards'>
        <div className='con'><h2>Latest Hits</h2><LineChart /></div>
        <div className='con'><h2>Performance</h2><BarChart  /></div>
        <div className='con'><h2>Storage Information</h2><PieChart  /></div>
        <div className='con'>
          <h2>Notification List</h2>
        
          {
            notifications.map((eachNotification,index)=>{
              const {pic,message,time}=eachNotification;
              return(
                <div key={index} className='noti1'>
                  <div className='imgdiv'><img src={pic} alt="userpic"  className='notificationImage'/></div>
                  <div><p>{message}</p>
                  <div>{time} ago.</div></div>
                </div>
              )
            })
          }
        </div>
        </div>
        <div className='tablediv'>
          <h2>Orders List</h2>
          <table className='table'>
            <thead>
              <tr>
              <th>ORDER NO.</th>
              <th>STATUS</th>
              <th>OPERATORS</th>
              <th>LOCATION</th>
              <th>DISTANCE</th>
              <th>START DATE</th>
              <th>EST DELIVERY DUE</th>
              </tr>
            </thead>
            <tbody className='tablebody'>
              {
                orders.map((eachOrder)=>{
                  const{orderNo,status,operators,location,distance,startDate,deliveryDate}=eachOrder
                  return(
                    <tr key={orderNo}>
                      <td>#{orderNo}</td>
                      <td><div></div>{status}</td>
                      <td>{operators}</td>
                      <td>{location}</td>
                      <td>{distance} km</td>
                      <td>{startDate}</td>
                      <td>{deliveryDate}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        </div>
    )
}


export default DashBoard