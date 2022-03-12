import {React , useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Card from '../Card'

//styles
import { Wrapper, Border } from './AdminPortal.styles'
import {Navbar} from '../Navbar'

const AdminPortal = () => {

  const[requests, setRequests] = useState([]);
  const[message, setMessage] = useState("No new request");

  useEffect(()=>{
      axios.get("http://localhost:5000/api/admin/requests",
      { headers: {
        'Authorization': 'BEARER '+ sessionStorage.getItem("aatoken")
      }},
      {
        email: "admin1@gmail.com",
        username: "admin1"
      }
      ).then(res=>{
            setMessage(res.data.message)
            setRequests(res.data)
            console.log(res.data)
        }).catch(err=>{
            if(err.response) setMessage(err.response.data.message)
            else setMessage(err)
        }) 
  },[])

  return (
    <>
    <Navbar>
    <Link to="/adminlogin">Logout</Link>
    </Navbar>
    <Wrapper>
        <Border>
        <h2>Requests</h2>
        <br/>
        <p style={{color: "lightgray"}}>{message}</p>
        {requests.map((request, index )=>(
          <Card key={index} name={request.username} email={request.email} regno={request.reg_no}/>
        ))}
        </Border>
    </Wrapper>
    </>
  )
}

export default AdminPortal