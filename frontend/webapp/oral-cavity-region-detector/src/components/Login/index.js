import {React, useRef, useState, createRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {saveInfo} from '../Userinfo'
import path from '../json/path.json'

// Styles
import {Wrapper, Container, Img, Form, Border} from './Login.styles'
import  LoginNavbar from "../LoginNavbar"
import MedButton from '../Buttons'
import Password, {TextInput} from '../Inputs'

const Login = () => {

    const emailRef = createRef();
    const passwordRef = createRef();
    const navigate = useNavigate();

    const[message,setMessage] = useState("");
    const[isfetching, setIsFetching] = useState(false);

    const handleNavigate = (role) =>{
        if(role.includes(1)){
            navigate('/admin/portal');
        }else if(role.includes(2)){
            navigate('/researcher/collections');
        }else if(role.includes(3)){
            navigate('/user/uploads')
        }  
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsFetching(true)
        setMessage("");
        axios.post(`${path[0]['path']}/api/auth/login`,{
                email: emailRef.current.value,
                password: passwordRef.current.value 
        }).then(res=>{
            setMessage(res.data.message)
            saveInfo(res.data.username,res.data.email,res.data.role,res.data.reg_no,res.data.access_token)
            handleNavigate(res.data.role)

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
        <h2>Login</h2>
        <form id="login" onSubmit={handleSubmit}>
            <p style={{color: 'red'}}>{message}</p>
            <table>
                <tbody>
                <tr>
                   <th><TextInput label="Email" required={true} ref={emailRef}/></th>
                </tr>
                <tr>
                    <th><Password label="Password" required={true} ref={passwordRef}/></th>
                </tr>
                <tr>
                    <th>
                        <br/>
                        <MedButton  variant="contained" sx={{width:"100%"}} type="submit" disabled={isfetching} autoComplete="off">Sign in</MedButton></th>
                </tr>
                <tr><th>
                    Don't have an account? <Link to="/user/signup"><span>Sign up</span></Link></th></tr>
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