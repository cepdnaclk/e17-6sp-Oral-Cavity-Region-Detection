import {React, useState, useRef} from 'react'
import axios from 'axios'

import {Table} from './Upload.styles'
import MedButton from '../Buttons'

const districts = ["Colombo","Gampaha","Kalutara","Kandy","Matale","Nuwara Eliya","Galle","Matara","Hambantota","Jaffna","Kilinochchi","Mannar","Vavuniya","Mullaitivu","Batticaloa","Ampara","Trincomalee","Kurunegala","Puttalam","Anuradhapura","Polonnaruwa","Badulla","Moneragala","Ratnapura","Kegalle"]

const AddPatient = () => {

    const nameRef = useRef("");
    const ageRef = useRef("");
    const genderRef = useRef("");
    const districtRef = useRef("");
    const contactRef = useRef("");
    const descriptionRef = useRef("");
    const addressRef = useRef("");

    const[message,setMessage] = useState("");
    const[isfetching, setIsFetching] = useState(false);


    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsFetching(true)
        setMessage("");
        console.log(e.target[1])
      
        axios.post("http://localhost:5000/api/user/patient/add",{
              email: JSON.parse(sessionStorage.getItem("info")).email,
              reg_no: JSON.parse(sessionStorage.getItem("info")).reg_no,
              patient_name: nameRef.current.value,
              patient_address : addressRef.current.value,
              patient_district: districtRef.current.value,
              patient_contact_no: contactRef.current.value,
              patient_gender: genderRef.current.value,
              patient_age: ageRef.current.value,
              description: descriptionRef.current.value,
              patient_photo: ""
        },
        { headers: {
          'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken
        }},
        ).then(res=>{
            setMessage(res.data.message)
            setIsFetching(false)

            setTimeout(() => {
              setMessage("")  
            }, 10000); 

        }).catch(err=>{
            if(err.response) setMessage(err.response.data.message)
            else setMessage(err)

            setIsFetching(false)
            
            setTimeout(() => {
              setMessage("")  
            }, 30000); 
        }) 
      
      }

  return (
    <form id="login" onSubmit={handleSubmit} style={{textAlign: "left"}}>
      <p style={{color: "red"}}>{message}</p>
            <Table>
              <tbody>
              <tr><td>Patient Name:</td></tr>
              <tr>
              <td colSpan="2"><input ref={nameRef} required type="text" maxLength={128} style={{width: "100%"}} autoComplete="off"></input></td>
              </tr>
              <tr><td>District:</td></tr>
              <tr>
              <td colSpan="2">
              <select ref={districtRef} required style={{width: "100%"}}>
              <option></option>
                  {districts.map((dis, index )=>{
                      return (<option key={index} value={dis}>{dis}</option>)
                  })}
              </select>
              </td>
              </tr>
              <tr><td>Age:</td><td>Gender:</td></tr>
              <tr>
              <td><input ref={ageRef} type="number" min="0" max="100"></input></td>
              <td>
                <select ref={genderRef}>
                <option value=" "></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              </td>
              </tr>          
              <tr><td>Contact number:</td></tr>
              <tr>
              <td colSpan="2"><input ref={contactRef} type="text" style={{width: "100%"}} maxLength={128} autoComplete="off"></input></td>
              </tr>
              <tr><td>Address:</td></tr>
              <tr>
              <td colSpan="2"><input ref={addressRef} type="text" style={{width: "100%"}} maxLength={128} autoComplete="off"></input></td>
              </tr>
              <tr><td>Description:</td></tr>
              <tr>
              <td colSpan="2"><textarea ref={descriptionRef} type="text" style={{width: "100%"}} autoComplete="off"></textarea></td>
              </tr>
              </tbody>
          </Table>
          <br/>
          <MedButton  variant="contained" type="submit" disabled={isfetching} sx={{width:"100%"}}>Save</MedButton>
        </form> 
  )
}

export default AddPatient