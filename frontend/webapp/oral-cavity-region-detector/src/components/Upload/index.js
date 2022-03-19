import {React, useState, useEffect, useRef} from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios'

import {Wrapper, Section, Grid, Table} from './Upload.styles'
import UploadImg from './UploadImg'
import UserNavbar from '../UserNavbar'
import MedButton from '../Buttons'
import AddPatient from './AddPatient'

const Upload = () => {
  
  const [img , setImg] = useState([]);
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
        <input accept="image/*" id="icon-button-file" type="file"  style={{display: 'none'}}
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
      <Section style={{ position: "sticky",top: 70, borderLeft:"2px solid lightgray"}}>
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
          <UploadImg images={img}/>
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