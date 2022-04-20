import React,{useState, useEffect, useRef} from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import {Wrapper, Section, Grid, Table} from './Upload.styles'
import UploadImg from './UploadImg'
import UserNavbar from '../UserNavbar'
import AddPatient from './AddPatient'
import {LinearColor} from '../Buttons'

const Upload = () => {
  
  const [img , setImg] = useState([]);
  const [imgFiles , setImgFiles] = useState();
  const [isFetching, setIsFetching] = useState(false)

  var imgArray = []
  let files ;

  const fileSelectedHandler = async(e) => {
      e.preventDefault();
      files = e.target.files;
      setImgFiles(files)  
  }   
  
  useEffect(() => {
    if(imgFiles){
      let file;
      for (let i=0; i<imgFiles.length ; i++){
        let reader = new FileReader();
        file = imgFiles [i];
        reader.readAsDataURL(file)
        reader.onload = (file) => {
        imgArray.push(reader.result);
      }   
      } 
    }

    setTimeout(() => {
      setImg(imgArray)  
    }, 100);   
  },[imgFiles])


  return (
    <>
    <UserNavbar/>
    <Wrapper>
      <Section style={{borderRight: "2px solid #D3D3D3"}}>
      {isFetching?<LinearColor/>:
      <label htmlFor="icon-button-file">
      <input accept="image/*" id="icon-button-file" type="file"  style={{display: 'none'}}
      onChange={fileSelectedHandler}
      multiple
      />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
      </label>
      }
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
      </Section>
      <Section style={{minHeight:"100vh"}}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="selectpatient-tab" data-bs-toggle="tab" data-bs-target="#selectpatient" type="button" role="tab" aria-controls="selectpatient" aria-selected="true">Upload</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="newpatient-tab" data-bs-toggle="tab" data-bs-target="#newpatient" type="button" role="tab" aria-controls="newpatient" aria-selected="false">New Patient</button>
      </li>
      </ul>
      <br/>
      <div className="tab-content" id="myTabContent" style={{display: 'flex', justifyContent: 'center'}}>
      <div className="tab-pane fade show active" id="selectpatient" role="tabpanel" aria-labelledby="selectpatient-tab">
          <UploadImg files={imgFiles} setFiles={setImgFiles} setIsFetching={setIsFetching}/>
      </div>
      <div className="tab-pane fade" id="newpatient" role="tabpanel" aria-labelledby="newpatient-tab">
          <AddPatient/>
      </div>
      </div>
      </Section>
    </Wrapper>
    </>    
  )
}

export default Upload
