import React,{useState, useEffect, useRef, createRef} from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios'

import {Wrapper, Section, Grid, Table} from '../Upload/Upload.styles'
import UserNavbar from '../UserNavbar'
import {TextArea} from '../Inputs'

const Collection = () => {

  const districtRef = createRef();
  const patientRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();

  const handleFetch = async(e)=>{
    e.preventDefault()

    axios.get("http://localhost:5000/api/user/image/all",
      { headers: {
        'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken
      },
      params:{
        patient_age: 40,
        patient_district: "Kandy",
      }
    }
      ).then(res=>{
           console.log(res.data)
        }).catch(err=>{
            console.log(err)
        }) 
  }

  return (
    <>
    <UserNavbar/>
    <Wrapper>
      <Section style={{borderRight: "2px solid #D3D3D3"}}>
      </Section>
      <Section style={{minHeight:"100vh"}}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="selectpatient-tab" data-bs-toggle="tab" data-bs-target="#selectpatient" type="button" role="tab" aria-controls="selectpatient" aria-selected="true">Filters</button>
      </li>
      </ul>
      <br/>
      <div className="tab-content" id="myTabContent" style={{display: 'flex', justifyContent: 'center'}}>
      <div className="tab-pane fade show active" id="selectpatient" role="tabpanel" aria-labelledby="selectpatient-tab">
      
       <button onClick={handleFetch}>Get</button>   
      </div>
      </div>
      </Section>
    </Wrapper>
    </>    
  )
}

export default Collection