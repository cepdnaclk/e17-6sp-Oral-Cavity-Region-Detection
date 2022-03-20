import {React , useState} from 'react'
import axios from 'axios'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//styles
import {Wrapper} from './Card.styles'
import {MedButton, OutlinedButton} from '../Buttons'

const Card = ({name,email,reg_no, id}) => {

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
          <p>Register No:{reg_no}</p>
          <br/>
          <Stack spacing={2} direction="row">
          <MedButton variant="contained" onClick={()=>handleAccept(id)} disabled={isFetching}>Accept</MedButton>
          <OutlinedButton variant="outlined" onClick={()=>handleReject(id)} disabled={isFetching}>Reject</OutlinedButton>
          </Stack>
        </>:<></>}
        
    </Wrapper>
  )
}

export default Card