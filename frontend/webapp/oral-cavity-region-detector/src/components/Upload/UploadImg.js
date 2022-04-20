import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import {Border} from './Upload.styles'
import MedButton from '../Buttons'
import _ from 'lodash';
import path from '../json/path.json'

export default function UploadImg({files, setFiles, setIsFetching}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [userDetails, setUserDetails] = React.useState()
  const [error, setError] = React.useState("")

  const loading = open && options.length === 0;


  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
    
    axios.get(`${path[0]['path']}/api/user/patient/all`,
    { headers: {
        'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
        'email': JSON.parse(sessionStorage.getItem("info")).email
    }},
    {
        email: JSON.parse(sessionStorage.getItem("info")).email,
        reg_no: JSON.parse(sessionStorage.getItem("info")).reg_no
    }
    ).then(res=>{
        if(res.data.patients.length===0) setOpen(false)
        else setOptions(JSON.parse(JSON.stringify(res.data.patients)))
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


  const handleUpload = async(e) => {
      if(!files){
        setError("Please choose images to upload")
        setTimeout(() => {
          setError("")  
        }, 3000)

        return
      }
      setIsFetching(true)
      const reg_no = JSON.parse(sessionStorage.getItem('info')).reg_no
      const info = []
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        var filename = reg_no+Date.now()+i+files[i].name
        data.append('files', files[i], filename);
        info.push({patient_id:userDetails._id, original:filename, examiner_reg_no:reg_no})
      }
  
      // for (var pair of data.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]); 
      // }
      axios.post(`${path[0]['path']}/api/user/image/add`,
      {
          email: JSON.parse(sessionStorage.getItem("info")).email,
          info : info
      },
      { headers: {
        'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
        'email': JSON.parse(sessionStorage.getItem("info")).email
      }}
      ).then(res=>{
            axios.post(`${path[0]['path']}/api/user/upload`,{
              data:data
            }
            ).then(res=>{
              setError("Images uploaded successfully");
              setFiles(null)
              setIsFetching(false)

              setTimeout(() => {
                setError("")  
              }, 10000); 


            }).catch(err=>{
              console.log(err)
              setIsFetching(false)
            });
      }).catch(err=>{
          console.log(err)
          setIsFetching(false)
      }) 
  }

  return (
    <>
    <p style={{color: "red"}}>{error}</p>
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
          InputLabelProps={{ required: false, style:{color:"#616161"} }} 
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          sx={{ 
            "& .MuiOutlinedInput-root": {
              "& > fieldset": {
                borderColor: "#0A9396 !important",
                color: "#0A9396 !important"
              }
            }
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
      <tr><td>Description:</td><td>{userDetails.description}</td></tr>
      </tbody>
      </table>
    </Border>
    <br/>
    <MedButton  variant="contained" type="button" onClick={handleUpload} sx={{width:"100%"}}>Upload</MedButton>
    </>
    : <p></p>}
    </>
  );
}