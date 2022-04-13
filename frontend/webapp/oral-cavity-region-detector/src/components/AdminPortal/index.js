import {React , useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Card from '../Card'
import {deleteInfo} from '../Userinfo'
import path from '../json/path.json'

//styles
import { Wrapper, Border } from './AdminPortal.styles'
import AdminNavbar from '../AdminNavbar'

const AdminPortal = () => {

  const[requests, setRequests] = useState([]);
  const[message, setMessage] = useState("Loading...");
  const navigate = useNavigate();

  // function handleLogout(){
  //   axios.post(`${path[0]['path']}/api/admin/auth/logout`,
  //     {
  //       email: "admin1@gmail.com",
  //       username: "admin1"
  //     },
  //     { headers: {
  //       'Authorization': 'BEARER '+ sessionStorage.getItem("artoken")
  //     }}
  //     ).then(res=>{
  //       navigate('/adminlogin');
  //     }).catch(err=>{
  //           if(err.response) alert(err.response.data.message)
  //           else alert(err)  
  //     }) 
  // }


  useEffect(()=>{
      axios.get(`${path[0]['path']}/api/admin/requests`,
      { headers: {
        'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
        'email': JSON.parse(sessionStorage.getItem("info")).email,
      }},
      {
        email: JSON.parse(sessionStorage.getItem("info")).email,
        username: JSON.parse(sessionStorage.getItem("info")).username,
      }
      ).then(res=>{
            setRequests(res.data)
            setMessage("")
            if (res.data.length===0) setMessage("No new requests")
        }).catch(err=>{
            if(err.response) setMessage(err.response.data.message)
            else alert(err)
        }) 
  },[])

  return (
    <>
    <AdminNavbar/>
    <Wrapper>
        <Border>
        <h2>Requests</h2>
        <br/>
        <p style={{color: "lightgray"}}>{message}</p>
        {requests.map((request, index )=>(
          <Card key={index} name={request.username} email={request.email} reg_no={request.reg_no} id={request._id}/>
        ))}
        </Border>
    </Wrapper>
    </>
  )
}

export default AdminPortal