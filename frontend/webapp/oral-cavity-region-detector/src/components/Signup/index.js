import React from 'react'
import {Link} from 'react-router-dom'

// Styles
import {Wrapper, Navbar, Container, Img, Form, Border} from '../Login/Login.styles'

const Signup = () => {
  return (
    <Wrapper>
        <Navbar>
        <Link to="/adminlogin">Admin</Link>
        </Navbar>
        <Container>
        <Img/>
        <Form>
        <Border>
            <h2>Signup</h2>
            <br/>
            <table>
                <tbody>
                <tr><th>User Name:</th></tr>
                <tr>
                <th><input></input></th>
                </tr>
                <tr><th>Reg No:</th></tr>
                <tr>
                <th><input></input></th>
                </tr>
                <tr><th>Email:</th></tr>
                <tr>
                <th><input></input></th>
                </tr>
                <tr><th>Password:</th></tr>
                <tr>
                <th><input></input></th>
                </tr>
                <tr><th>Confirm Password:</th></tr>
                <tr>
                <th><input></input></th>
                </tr>
                <tr>
                <th><button type="button">Request to Sign up</button></th>
                </tr>
                <tr><th>Already have an account? <Link to="/"><span>Sign in</span></Link></th></tr>
                </tbody>
            </table>
        </Border>
        </Form>
        </Container>
    </Wrapper>

  )
}

export default Signup