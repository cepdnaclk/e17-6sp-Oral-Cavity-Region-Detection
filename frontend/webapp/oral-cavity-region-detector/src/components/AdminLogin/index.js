import React from 'react'
import {Link} from 'react-router-dom'

// Styles
import {Wrapper, Navbar, Container, Img, Form, Border} from '../Login/Login.styles'

const AdminLogin = () => {
  return (
    <Wrapper>
        <Navbar>
        <Link to="/">Back</Link>
        </Navbar>
        <Container>
        <Img/>
        <Form>
        <Border>
            <h2>Admin</h2>
            <br/>
            <table>
                <td>Register Number:</td>
                <tr>
                    <input></input>
                </tr>
                <tr>Password:</tr>
                <tr>
                    <input></input>
                </tr>
            </table>
        </Border>
        </Form>
        </Container>
    </Wrapper>

  )
}

export default AdminLogin