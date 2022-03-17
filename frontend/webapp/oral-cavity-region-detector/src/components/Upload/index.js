import React from 'react'

import {Wrapper, Section, Grid} from './Upload.styles'
import UserNavbar from '../UserNavbar'

import noImg from '../../images/noimage.jpg'

const Upload = () => {
  return (
    <>
    <UserNavbar/>
    <Wrapper>
      <Section>
      <Grid>
        <div>
          <input type="checkbox" id="myCheckbox1" />
          <label htmlFor="myCheckbox1">
          <img  src="https://picsum.photos/500/200" alt=""/>
          </label>
        </div>
        <div><img  src="https://picsum.photos/200/350" alt=""/></div>
        <div><img src="https://picsum.photos/200/200" alt=""/></div>
        <div><img   src="https://picsum.photos/600/600" alt=""/></div>
        <div><img  src="https://picsum.photos/250/400" alt=""/></div>
        <div><img  src="https://picsum.photos/400/150" alt=""/></div>
        <div><img src="https://picsum.photos/200/220" alt=""/></div>
        <div><img  src="https://picsum.photos/450/200" alt=""/></div>
        <div><img src="https://picsum.photos/220/250" alt=""/></div>
        <div><img src="https://picsum.photos/250/200" alt=""/></div>
	    </Grid>
      </Section>
      <Section style={{ position: "sticky",top: 70}}>
        <div>hello</div>
      </Section>
    </Wrapper>
    </>    
  )
}

export default Upload