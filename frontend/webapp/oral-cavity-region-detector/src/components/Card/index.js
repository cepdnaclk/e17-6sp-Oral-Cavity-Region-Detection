import {React , useState} from 'react'
import axios from 'axios'

//styles
import {Wrapper, Button} from './Card.styles'

const Card = ({name,email,regno, id}) => {

  const[message, setMessage] = useState("");
  const[success, setSuccess] = useState(false)
  const[isFetching, setIsFetching] = useState(false)

  function handleReject(id){
    setIsFetching(true)
    axios.delete(`http://localhost:5000/api/admin/requests/${id}`,
      { headers: {
        'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken
      }},
      {
        email: JSON.parse(sessionStorage.getItem("info")).email,
        username: JSON.parse(sessionStorage.getItem("info")).username
      }
      ).then(res=>{
            setMessage(res.data.message)
            setSuccess(true)
        }).catch(err=>{
            if(err.response) setMessage(err.response.data.message)
            else setMessage(err)
            setSuccess(false)
            setIsFetching(false)
        }) 
  }

  function handleAccept(id){
    setIsFetching(true)
    axios.post(`http://localhost:5000/api/admin/accept/${id}`,
      {
        email: JSON.parse(sessionStorage.getItem("info")).email,
        username: JSON.parse(sessionStorage.getItem("info")).username
      },
      { headers: {
        'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken
      }}
      ).then(res=>{
            setMessage(res.data.message)
            setSuccess(true)
        }).catch(err=>{
            if(err.response) setMessage(err.response.data.message)
            else setMessage(err)
            setSuccess(false)
            setIsFetching(false)
        }) 
  }

  
  
  return (

    <Wrapper>
        <p style={{color: 'red'}}>{message}</p>
        {success===false?
          <>
          <p>Name: <span style={{fontWeight: 'bold'}}>{name}</span></p>
          <p>Email: {email}</p>
          <p>Register No:{regno}</p>
          <Button onClick={()=>handleAccept(id)} disabled={isFetching}>Accept</Button>
          <Button onClick={()=>handleReject(id)} disabled={isFetching}>Reject</Button>
        </>:<></>}
        
    </Wrapper>
  )
}

export default Card