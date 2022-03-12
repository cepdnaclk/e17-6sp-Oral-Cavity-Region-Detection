import {React, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

// Styles
import {Wrapper, Navbar, Container, Img, Form, Border} from './Login.styles'

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const[message,setMessage] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setMessage("");
        axios.post("http://localhost:5000/api/auth/login",{
                email: emailRef.current.value,
                password: passwordRef.current.value 
        }).then(res=>{
            setMessage(res.data.message)
            navigate('/collections');
        }).catch(err=>{
            if(err.response) setMessage(err.response.data.message)
            else setMessage(err)
        }) 

    }

    return (
    <Wrapper>
        <Navbar>
        <Link to="/adminlogin">Admin</Link>
        </Navbar>
        <Container>
        <Img/>
        <Form>
        <Border>
        <form id="login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <p style={{color: 'red'}}>{message}</p>
            <table>
                <tbody>
                <tr><th>Email:</th></tr>
                <tr>
                   <th> <input ref={emailRef} required type="email" maxLength={128}></input></th>
                </tr>
                <tr><th>Password:</th></tr>
                <tr>
                    <th><input ref={passwordRef} required type="password" maxLength={128}></input></th>
                </tr>
                <tr>
                    <th><button type="submit">Sign in</button></th>
                </tr>
                <tr><th>Don't have an account? <Link to="/signup"><span>Sign up</span></Link></th></tr>
                </tbody>
            </table>
        </form>
        </Border>
        </Form>
        </Container>
    </Wrapper>

  )
}

export default Login