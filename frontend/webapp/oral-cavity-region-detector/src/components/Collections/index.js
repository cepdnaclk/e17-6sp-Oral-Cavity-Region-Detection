import React,{useState, useEffect, useRef} from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios'

import {Wrapper, Section, Grid, Table} from '../Upload/Upload.styles'
import UserNavbar from '../UserNavbar'

const Collection = () => {
  useEffect(() => {
    axios.get("http://localhost:5000/api/user/images/all",
      { headers: {
          'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken
      }},
      {
          email: JSON.parse(sessionStorage.getItem("info")).email,
          reg_no: JSON.parse(sessionStorage.getItem("info")).reg_no
      }
      ).then(res=>{
          console.log(res)
      }).catch(err=>{
          console.log(err)
      }) 
  })

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
          
      </div>
      </div>
      </Section>
    </Wrapper>
    </>    
  )
}

export default Collection