import React, { useState, useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

// Styles
import {Wrapper,Container, Img, Form, Border} from '../Login/Login.styles'
import  LoginNavbar from "../LoginNavbar"
import MedButton from "../Buttons"


const Signup = () => {

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const regnoRef = useRef();
    const confirmpasswordRef = useRef();

    const[message,setMessage] = useState("");
    const[isfetching, setIsFetching] = useState(false);
    const[success, setSuccess] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsFetching(true)
        setMessage("");
        if(passwordRef.current.value!==confirmpasswordRef.current.value){
          setMessage("Passwords don't match");
          setIsFetching(false)
          return
        }
        axios.post("http://localhost:5000/api/auth/signup",{
              username: usernameRef.current.value,
              email: emailRef.current.value,
              reg_no: regnoRef.current.value,
              password: passwordRef.current.value,
        }).then(res=>{
            setMessage(res.data.message)
            setSuccess(true)
        }).catch(err=>{
            if(err.response) setMessage(err.response.data.message)
            else setMessage(err)
            setIsFetching(false)
        }) 

    }

  return (
    <Wrapper>
        <LoginNavbar role={2}/>
        <Container>
        <Img/>
        <Form>
        <Border>
        <form id="login" onSubmit={handleSubmit}>
            {success? 
            <>
            <p style={{color: 'green', fontWeight:"500"}}>Your request has been sent successfully!</p>
            <p>Please wait for Admin approval</p>
            <br/>
            <p style={{color: "var(--medColor)"}}><Link to="/">Login</Link></p>
            </>
              :
              <><p style={{color: "red"}}>{message}</p>
              <table>
                <tbody>
                <tr>
                </tr>
                <tr><th>Full Name:</th></tr>
                <tr>
                <th><input ref={usernameRef} required type="text" maxLength={128} autoComplete="off"></input></th>
                </tr>
                <tr><th>Reg No:</th></tr>
                <tr>
                <th><input ref={regnoRef} required type="text" maxLength={128} autoComplete="off"></input></th>
                </tr>
                <tr><th>Email:</th></tr>
                <tr>
                <th><input ref={emailRef} required type="email" maxLength={128} autoComplete="off"></input></th>
                </tr>
                <tr><th>Password:</th></tr>
                <tr>
                <th><input ref={passwordRef} required type="password" maxLength={128} autoComplete="off"></input></th>
                </tr>
                <tr><th>Confirm Password:</th></tr>
                <tr>
                <th><input ref={confirmpasswordRef} required type="password" maxLength={128} autoComplete="off"></input></th>
                </tr>
                <tr>
                <th><MedButton  variant="contained" type="submit" disabled={isfetching}>Request to sign up</MedButton></th>
                </tr>
                <tr><th>Already have an account? <Link to="/user/login"><span>Sign in</span></Link></th></tr>
                </tbody>
            </table></>}
          </form>
        </Border>
        </Form>
        </Container>
    </Wrapper>

  )
}

export default Signup