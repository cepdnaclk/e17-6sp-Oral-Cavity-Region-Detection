import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import MedButton from '../Buttons'
import {CheckboxInput, SelectInput, NumberInput,MultipleSelectChip} from '../Inputs'
import {Table} from './Collections.styles'

const districts = ["Colombo","Gampaha","Kalutara","Kandy","Matale","Nuwara Eliya","Galle","Matara","Hambantota","Jaffna","Kilinochchi","Mannar","Vavuniya","Mullaitivu","Batticaloa","Ampara","Trincomalee","Kurunegala","Puttalam","Anuradhapura","Polonnaruwa","Badulla","Moneragala","Ratnapura","Kegalle"]
const gender = ["Male","Female"] 
const habits = ["Smoking","Chewing Betel Quid", "Alchohol"]

export default function GetImg({setFiles, setIsFetching}) {

  const [options, setOptions] = React.useState([]);
  const [userDetails, setUserDetails] = React.useState()
  const [error, setError] = React.useState("")
  const habitRef = React.createRef("");
  const districtRef = React.createRef("");
  const minAgeRef = React.createRef("");
  const maxAgeRef = React.createRef("");
  const genderRef = React.createRef("");

  const [isSegmented, setIsSegmented] = React.useState(false)

  const handleGet = async(e) => {
      setIsFetching(true)
      setFiles([])
      const reg_no = JSON.parse(sessionStorage.getItem('info')).reg_no

      var params = {segmented: isSegmented, minAge: '0', maxAge:'100'}
      if(districtRef.current.value !== "") params['patient_district'] = districtRef.current.value
      if(minAgeRef.current.value !== "") params['minAge'] = minAgeRef.current.value 
      if(maxAgeRef.current.value !== "") params['maxAge'] = maxAgeRef.current.value
      if(genderRef.current.value !== "") params['patient_gender'] = genderRef.current.value
      params['habits'] = habitRef.current.value
      
      console.log(params)
      axios.get("http://localhost:5000/api/user/image/get",
      { headers: {
        'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
        'email': JSON.parse(sessionStorage.getItem("info")).email
      },
      params: params
    }
      ).then(res=>{
           console.log(res.data)
           setFiles(JSON.parse(JSON.stringify(res.data.data)))
           setIsFetching(false)
        }).catch(err=>{
            console.log(err)
            setIsFetching(false)
        }) 
  }

  return (
    <>
    <p style={{color: "red"}}>{error}</p>
    <Table>
      <tbody>
      <tr>
      <td colSpan="2">
        <MultipleSelectChip label="Habits" options={habits} ref={habitRef}/>
      </td>
      </tr>
      <tr>
      <td colSpan="2">
        <SelectInput label="District" required={false} options={districts} ref={districtRef}/>
      </td>
      </tr>
      <tr>
      <td>
      <NumberInput ref={minAgeRef} required={false} label="Min Age Limit"></NumberInput>
      </td>
      <td>
      <NumberInput ref={maxAgeRef} required={false} label="Max Age Limit"></NumberInput>
      </td>
      </tr>
      <tr colSpan="2">
      <td>
      <SelectInput label="Gender" required={false} options={gender} ref={genderRef}/>
      </td>
      </tr>
      <tr>
      <td colSpan="2">
      <CheckboxInput label="Segmented" setIsSegmented={setIsSegmented}/>
      </td>
      </tr>
      </tbody>
    </Table>
     <br/>   
    <MedButton  variant="contained" type="button" onClick={handleGet} sx={{width:"100%"}}>Get Images</MedButton>
    </>
  );
}