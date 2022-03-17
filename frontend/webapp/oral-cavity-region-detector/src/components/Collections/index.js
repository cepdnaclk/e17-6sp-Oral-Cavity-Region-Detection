import React from 'react'

import {Wrapper, Collection, Info} from './Collections.styles'
import UserNavbar from '../UserNavbar'

import noImg from '../../images/noimage.jpg'

const Collections = () => {
  return (
    <>
    <UserNavbar/>
    <Wrapper>
      <Collection>
      
      </Collection>
      <Info>
        <img src={noImg} alt="no-image"/>
      </Info>
    </Wrapper>
    </>    
  )
}

export default Collections