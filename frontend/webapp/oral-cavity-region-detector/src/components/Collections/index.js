import React,{useState, useEffect, useRef, createRef} from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios'
import GetImg from './GetImg'
import ShowCase from '../ShowCase'

import {Wrapper, Section, Grid, Table} from './Collections.styles'

import ResearcherNavbar from '../ResearcherNavbar'
import {LinearColor} from '../Buttons'

const Collection = () => {
  const [files, setFiles] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [userinfo, setUserInfo] = useState({
    images: [],
  });

  const handleCheckbox = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { images } = userinfo;
    console.log(`${value} is ${checked}`);
     
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        images: [...images, value]
      });
    }
  
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        images: images.filter((e) => e !== value)
      });
    }
  };

  return (
    <>
    <ResearcherNavbar/>
    <Wrapper>
      <Section style={{borderRight: "2px solid #D3D3D3"}}>
        {isFetching?<LinearColor/>: null}        
        {files.length !== 0? <Grid>{files.map((image, index) =>{
            return (<ShowCase key={index} details={image} handleCheckbox={handleCheckbox}/>)
        })}
        </Grid>:
        <div style={{height:'80%' , display: "flex", justifyContent: "center", alignItems: "center", color: "#D3D3D3"}}>No images available</div>}
        
      </Section>
      <Section style={{minHeight:"100vh"}}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="selectpatient-tab" data-bs-toggle="tab" data-bs-target="#selectpatient" type="button" role="tab" aria-controls="selectpatient" aria-selected="true">Filter</button>
      </li>
      </ul>
      <br/>
      <div className="tab-content" id="myTabContent" style={{display: 'flex', justifyContent: 'center'}}>
      <div className="tab-pane fade show active" id="selectpatient" role="tabpanel" aria-labelledby="selectpatient-tab">
        <GetImg setFiles={setFiles} setIsFetching={setIsFetching}/>
      </div>
      </div>
      </Section>
    </Wrapper>
    <button type="button" onClick={()=>{console.log(userinfo)}}>Print the stuff</button>
    </>    
  )
}

export default Collection