import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import {Border} from './Upload.styles'
import MedButton from '../Buttons'
import _ from 'lodash';

export default function UploadImg({images}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [userDetails, setUserDetails] = React.useState()
  
  const loading = open && options.length === 0;


  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
    
    axios.get("http://localhost:5000/api/user/patient/all",
    { headers: {
        'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken
    }},
    {
        email: JSON.parse(sessionStorage.getItem("info")).email
    }
    ).then(res=>{
            setOptions(JSON.parse(JSON.stringify(res.data.patients)))
        }).catch(err=>{
            console.log(err)
        }) 
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
    <p style={{color: "red"}}> </p>
    <Autocomplete
      id="asynchronous-demo"
      sx={{width: 300}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option["patient_name"] === value["patient_name"]}
      getOptionLabel={(option) => option["patient_name"]}
      onChange={(event, value) => setUserDetails(value)}
      options={options}
      loading={loading}
      renderInput={(params) => {
        return (
        <TextField
          {...params}
          label="Select the patient"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}}
    />
    {userDetails? 
    <>
     <br/>
    <Border>
      <table style={{width: "100%"}}>
        <tbody>
      <tr><td>Name:</td><td>{userDetails.patient_name}</td></tr>
      <tr><td>District:</td><td>{userDetails.patient_district}</td></tr>
      <tr><td>Age: </td><td>{userDetails.patient_age}</td></tr>
      <tr><td>Gender: </td><td>{userDetails.patient_gender}</td></tr>
      <tr><td>Contact No:   </td><td>{userDetails.patient_contact_no}</td></tr>
      <tr><td>Address:</td><td>{userDetails.patient_address}</td></tr>
      </tbody>
      </table>
    </Border>
    <br/>
    <MedButton  variant="contained" type="button" sx={{width:"100%"}}>Upload</MedButton>
    </>
    : <p></p>}
    </>
  );
}