import React from 'react'
import {Wrapper, Button} from './Card.styles'

const Card = ({name,email,regno}) => {

  function handleAccept(event){
    console.log(event)
  }
  
  return (

    <Wrapper>
        <p>Name: <span style={{fontWeight: 'bold'}}>{name}</span></p>
        <p>Email: {email}</p>
        <p>Register No:{regno}</p>
        <Button onClick={()=>handleAccept(regno)}>Accept</Button>
        <Button>Reject</Button>
    </Wrapper>
  )
}

export default Card