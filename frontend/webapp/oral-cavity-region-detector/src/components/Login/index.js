import {React, useRef, useState, createRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {saveInfo} from '../Userinfo'

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

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsFetching(true)
        setMessage("");
        axios.post("http://localhost:5000/api/auth/login",{
                email: emailRef.current.value,
                password: passwordRef.current.value 
        }).then(res=>{
            setMessage(res.data.message)
            saveInfo(res.data.username,res.data.email,[2],res.data.reg_no,res.data.access_token)
            navigate('/user/collections');
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
                        <MedButton  variant="contained" sx={{width:"100%"}} type="submit" disabled={isfetching}>Sign in</MedButton></th>
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