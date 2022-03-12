import React from 'react'
import {Wrapper, Button} from './Card.styles'

const Card = ({name,email,regno}) => {
  return (

    <Wrapper>
        <p>Name: <span style={{fontWeight: 'bold'}}>{name}</span></p>
        <p>Email: {email}</p>
        <p>Register No:{regno}</p>
        <Button>Accept</Button>
        <Button>Reject</Button>
    </Wrapper>
  )
}

export default Card