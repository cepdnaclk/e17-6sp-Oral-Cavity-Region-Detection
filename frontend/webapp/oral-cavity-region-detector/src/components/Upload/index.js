import {React, useState, useEffect, useRef} from 'react'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios'

import {Wrapper, Section, Grid, Table} from './Upload.styles'
import UserNavbar from '../UserNavbar'
import MedButton from '../Buttons'

import noImg from '../../images/noimage.jpg'

const Input = styled('input')({
  display: 'none',
});

const Upload = () => {
  
  const [img , setImg] = useState([]);
  const [patientId, setPatientId] = useState("")

  const nameRef = useRef("");
  const ageRef = useRef("");
  const genderRef = useRef("");
  const districtRef = useRef("");
  const contactRef = useRef("");
  const descriptionRef = useRef("");
  const addressRef = useRef("");

  const[message,setMessage] = useState("");
  const[isfetching, setIsFetching] = useState(false);


  var imgArray = []
  let files ;


  const fileSelectedHandler = async(e) => {
      e.preventDefault();

      
      let file;
      files = e.target.files;

      for (let i=0; i<files.length ; i++){
            let reader = new FileReader();
            file = files [i];
            reader.readAsDataURL(file)
            reader.onload = (file) => {
              imgArray.push(reader.result);
          }   
      } 

      setTimeout(() => {
        setImg(imgArray)  
      }, 100);     
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setIsFetching(true)
    setMessage("");
  
    axios.post("http://localhost:5000/api/user/patient/add",{
          email: JSON.parse(sessionStorage.getItem("info")).email,
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
        setPatientId(res.data._id)
        setIsFetching(false)
    }).catch(err=>{
        if(err.response) setMessage(err.response.data.message)
        else setMessage(err)
        console.log(err)
        setIsFetching(false)
    }) 
  
  }
  
  const handleUpload = async(e)=>{
    e.preventDefault()

    if(files !==""){
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name",filename)
        data.append("file",file)
        newPost.photo = filename
        try{
            await axios.post("/upload",data);
        }catch(err){}
    }
    
}


  return (
    <>
    <UserNavbar/>
    <Wrapper>
      <Section>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" 
        onChange={fileSelectedHandler}
        multiple
        />

        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
        
      <form>
      <Grid>
        {img.map((image, index )=>{
          return (<img key={index} src={image}/>)
        })}

        {/* <div>
          <input type="checkbox" id="myCheckbox1" />
          <label htmlFor="myCheckbox1">
          <img  src="https://picsum.photos/500/200" alt=""/>
          </label>
        </div> */}
	    </Grid>
      </form>
      </Section>
      <Section style={{ position: "sticky",top: 70, display: "flex", justifyContent: "center",borderLeft:"2px solid lightgray"}}>
      <form id="login" onSubmit={handleSubmit} style={{textAlign: "left"}}>
      <p style={{color: "red"}}>{message}</p>
            <Table>
              <tbody>
              <tr><th>Patient Name:</th></tr>
              <tr>
              <th colSpan="2"><input ref={nameRef} required type="text" maxLength={128} style={{width: "100%"}} autoComplete="off"></input></th>
              </tr>
              <tr><th>District:</th></tr>
              <tr>
              <th colSpan="2"><input ref={districtRef} required type="text" maxLength={128} style={{width: "100%"}} autoComplete="off"></input></th>
              </tr>
              <tr><th>Age:</th><th>Gender:</th></tr>
              <tr>
              <th><input ref={ageRef} type="text" maxLength={128} autoComplete="off"></input></th>
              <th><input ref={genderRef} type="text" maxLength={128} autoComplete="off"></input></th>
              </tr>          
              <tr><th>Contact number:</th></tr>
              <tr>
              <th colSpan="2"><input ref={contactRef} type="text" style={{width: "100%"}} maxLength={128} autoComplete="off"></input></th>
              </tr>
              <tr><th>Address:</th></tr>
              <tr>
              <th colSpan="2"><input ref={addressRef} type="text" style={{width: "100%"}} maxLength={128} autoComplete="off"></input></th>
              </tr>
              <tr><th>Description:</th></tr>
              <tr>
              <th colSpan="2"><textarea ref={descriptionRef} type="text" style={{width: "100%"}} autoComplete="off"></textarea></th>
              </tr>
              <tr>
              <th><MedButton  variant="contained" type="submit" disabled={isfetching}>Save</MedButton></th>
              <th><MedButton  variant="contained" type="button" disabled={patientId===""} onClick={handleUpload}>Upload</MedButton></th>
              </tr>
              </tbody>
          </Table>
        </form> 
      </Section>
    </Wrapper>
    </>    
  )
}

export default Upload