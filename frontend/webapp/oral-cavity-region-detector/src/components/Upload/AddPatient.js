import {React, useState, createRef} from 'react'
import axios from 'axios'

import {Table} from './Upload.styles'
import MedButton from '../Buttons'
import Password, {TextInput, SelectInput, NumberInput, TextArea,MultipleSelectChip} from '../Inputs'
import path from '../json/path.json'

const districts = ["Colombo","Gampaha","Kalutara","Kandy","Matale","Nuwara Eliya","Galle","Matara","Hambantota","Jaffna","Kilinochchi","Mannar","Vavuniya","Mullaitivu","Batticaloa","Ampara","Trincomalee","Kurunegala","Puttalam","Anuradhapura","Polonnaruwa","Badulla","Moneragala","Ratnapura","Kegalle"]
const gender = ["Male","Female"]
const habits = ["Smoking","Chewing Betel Quid", "Alchohol"]

const AddPatient = () => {

    const nameRef = createRef("");
    const ageRef = createRef("");
    const genderRef = createRef("");
    const districtRef = createRef("");
    const contactRef = createRef("");
    const descriptionRef = createRef("");
    const habitRef = createRef("");

    const[message,setMessage] = useState("");
    const[isfetching, setIsFetching] = useState(false);


    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsFetching(true)
        setMessage("");
      
        axios.post(`${path[0]['path']}/api/user/patient/add`,{
              email: JSON.parse(sessionStorage.getItem("info")).email,
              reg_no: JSON.parse(sessionStorage.getItem("info")).reg_no,
              patient_name: nameRef.current.value,
              patient_habits : habitRef.current.value,
              patient_district: districtRef.current.value,
              patient_contact_no: contactRef.current.value,
              patient_gender: genderRef.current.value,
              patient_age: ageRef.current.value,
              description: descriptionRef.current.value,
              patient_photo: ""
        },
        { headers: {
          'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
          'email': JSON.parse(sessionStorage.getItem("info")).email
        }},
        ).then(res=>{
            setMessage(res.data.message)
            setIsFetching(false)

            setTimeout(() => {
              setMessage("")  
            }, 10000); 

        }).catch(err=>{
            if(err.response) setMessage(err.response.data.message)
            else alert(err)

            setIsFetching(false)
            
            setTimeout(() => {
              setMessage("")  
            }, 30000); 
        }) 
      
      }

  return (
    <>
      <p style={{color: "red", maxWidth: 300}}>{message}</p>
            <Table>
              <tbody>
              <tr>
              <td colSpan="2"><TextInput ref={nameRef} required={true} label="Patient Name"></TextInput></td>
              </tr>
              <tr>
              <td colSpan="2">
              <SelectInput ref={districtRef} required={true} label="District" options={districts}>
              </SelectInput>
              </td>
              </tr>
              <tr>
              <td><NumberInput ref={ageRef} required={false} label="Age"></NumberInput></td>
              <td>
               <SelectInput ref={genderRef} required={false} label="Gender" options={gender}>
               </SelectInput>
              </td>
              </tr><tr>
              <td colSpan="2"><TextInput ref={contactRef} required={false} label="Contact Number"></TextInput></td>
              </tr><tr>
              <td colSpan="2"><MultipleSelectChip ref={habitRef} label="Habits" options={habits}></MultipleSelectChip></td>
              </tr>
              <tr>
              <td colSpan="2"><TextArea ref={descriptionRef} label="Description"></TextArea></td>
              </tr>
              </tbody>
          </Table>
          <br/>
          <MedButton  variant="contained" type="submit" onClick={handleSubmit} disabled={isfetching} sx={{width:"100%"}}>Save</MedButton>
        </> 
  )
}

export default AddPatient