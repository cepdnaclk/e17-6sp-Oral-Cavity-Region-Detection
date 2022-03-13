import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Button } from '../Card/Card.styles';

import {Wrapper,Border} from './Unauthorized.styles'

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Border>
                Unauthorized Access!
                <Button onClick={()=> navigate(-1)}>Go Back</Button>
            </Border>
        </Wrapper>
  )
}

export default Unauthorized