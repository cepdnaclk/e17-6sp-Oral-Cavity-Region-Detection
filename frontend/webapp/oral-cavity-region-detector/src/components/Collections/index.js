import React,{useState, useEffect, useRef, createRef} from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios'
import GetImg from './GetImg'
import ShowCase from '../ShowCase'
import Filters from './Filters'

import {Wrapper, Section, Grid, Table} from './Collections.styles'

import UserNavbar from '../UserNavbar'
import {LinearColor} from '../Buttons'

const Collection = () => {
  const [files, setFiles] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  return (
    <>
    <UserNavbar/>
    <Wrapper>
      <Section style={{borderRight: "2px solid #D3D3D3"}}>
        {isFetching?<LinearColor/>: null}        
        {files.length !== 0? <Grid>{files.map((image, index) =>{
            return (<ShowCase key={index} details={image}/>)
        })}
        </Grid>:
        <div style={{height:'80%' , display: "flex", justifyContent: "center", alignItems: "center", color: "#D3D3D3"}}>No images available</div>}
        
      </Section>
      <Section style={{minHeight:"100vh"}}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="selectpatient-tab" data-bs-toggle="tab" data-bs-target="#selectpatient" type="button" role="tab" aria-controls="selectpatient" aria-selected="true">Patient</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="selectfilter-tab" data-bs-toggle="tab" data-bs-target="#selectfilter" type="button" role="tab" aria-controls="selectfilter" aria-selected="true">Filters</button>
      </li>
      </ul>
      <br/>
      <div className="tab-content" id="myTabContent" style={{display: 'flex', justifyContent: 'center'}}>
      <div className="tab-pane fade show active" id="selectpatient" role="tabpanel" aria-labelledby="selectpatient-tab">
        <GetImg setFiles={setFiles} setIsFetching={setIsFetching}/>
      </div>
      <div className="tab-pane fade show" id="selectfilter" role="tabpanel" aria-labelledby="selectfilter-tab">
        <Filters setFiles={setFiles} setIsFetching={setIsFetching}/>
      </div>
      </div>
      </Section>
    </Wrapper>
    </>    
  )
}

export default Collection