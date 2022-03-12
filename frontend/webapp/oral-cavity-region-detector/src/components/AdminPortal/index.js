import React from 'react'
import {Link} from 'react-router-dom'
//styles
import { Wrapper, Border } from './AdminPortal.styles'
import {Navbar} from '../Navbar'

const AdminPortal = () => {
  return (
    <>
    <Navbar>
    <Link to="/adminlogin">Logout</Link>
    </Navbar>
    <Wrapper>
        <Border>
        <h2>Requests</h2>
           <p>hey</p> 
           <p>hey</p> 
           <p>hey</p> 
           <p>hey</p> 
           <p>hey</p> 
        </Border>
    </Wrapper>
    </>
  )
}

export default AdminPortal