import React from 'react'
import {useNavigate} from 'react-router-dom'

import {Wrapper,Border} from './Styles'
import MedButton from './Buttons'

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Border>
                Unauthorized Access!
                <br/>
                <br/>
                <MedButton variant="contained" onClick={()=> navigate(-1)}>Go Back</MedButton>
            </Border>
        </Wrapper>
  )
}

export default Unauthorized