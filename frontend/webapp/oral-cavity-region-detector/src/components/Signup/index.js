import React, { useState, createRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import path from '../json/path.json'

// Styles
import {Wrapper,Container, Img, Form, Border} from '../Login/Login.styles'
import  LoginNavbar from "../LoginNavbar"
import MedButton from "../Buttons"
import Password, {TextInput} from '../Inputs'


const Signup = () => {

    const usernameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const regnoRef = createRef();
    const confirmpasswordRef = createRef();

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
        axios.post(`${path[0]['path']}/api/auth/signup`,{
              username: usernameRef.current.value,
              email: emailRef.current.value,
              reg_no: regnoRef.current.value,
              password: passwordRef.current.value,
        }).then(res=>{
            setMessage(res.data.message)
            setSuccess(true)
        }).catch(err=>{
            if(err.response) setMessage(err.response.data.message)
            else alert(err)
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
                <tr>
                <th><TextInput ref={usernameRef} required={true} label="Full Name"></TextInput></th>
                </tr>
                <tr>
                <th><TextInput ref={regnoRef} required={true} label="Reg No"></TextInput></th>
                </tr>
                <tr>
                <th><TextInput ref={emailRef} required={true} label="Email"></TextInput></th>
                </tr>
                <tr>
                <th><Password ref={passwordRef} required={true} label="Password"></Password></th>
                </tr>
                <tr>
                <th><Password ref={confirmpasswordRef} required={true} label="Confirm Password"></Password></th>
                </tr>
                <tr>
                <th>
                  <br/>
                  <MedButton  variant="contained" type="submit" sx={{width:"100%"}} disabled={isfetching} autoComplete="off">Request to sign up</MedButton></th>
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