import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ResearcherNavbar from '../ResearcherNavbar';
import NoImage from '../../images/noimage.jpg';
import MedButton from '../Buttons';
import DownloadIcon from '@mui/icons-material/Download';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import axios from 'axios'
const JSZip = require("jszip");
import { saveAs } from 'file-saver';
import path from '../json/path.json'

import {Wrapper, Grid} from './Segment.styles'
import Filters from "./Filters"

const Segment = ({data, setStep}) => {

    //const categories= ["Enemal","Hard Plate","Mole","Soft Plate","Tongue","Stain","Uvula","Gingiva","Pigmentation","Lips"]
    
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [categories, setCategories] = useState([]);
    const [mask, setMask] = useState('');
    const [userinfo, setUserInfo] = useState({
      filters: [],
    });
  
    useEffect(() => {
      if(userinfo.filters.length==0){
        setMask(`${path[0]['imgpath']}/${data[activeStep][0].original}`)
        return
      }

      var masks = []
      for (var index = 0; index < userinfo.filters.length; index++) {
        masks.push(data[activeStep][0].mask[userinfo.filters[index]])
      }

      setMask(`${path[0]['imgpath']}/${masks[masks.length - 1]}`)
      return 
      axios.post('http://localhost:5000/mask',{
        masks: masks,
        original: data[activeStep][0].original
      }
      ).then(function(response){
          var image = new Image();
          image.src = response.data
          setMask(image.src)
          //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
          //Perform action based on error
        });
    },[userinfo.filters]);

      useEffect(() => {
        setUserInfo({filters:[]})
        var cat = []
        var masks = data[activeStep][0].mask
        if(masks){
          for (var key of Object.keys(masks)) {
            cat.push(key)
          }
        }
        setCategories(cat)
      },[activeStep])

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleDownload = async() => {
      var zip = new JSZip();

      // Fetch the image and parse the response stream as a blob
      var imageBlob = await fetch(`${path[0]['imgpath']}/${data[activeStep][0].original}`).then(response => response.blob());

      // create a new file from the blob object
      var imgData = new File([imageBlob], data[activeStep][0].original);

      var img = zip.folder("images");
      img.file(data[activeStep][0].original, imgData, { base64: true });

      var masks = data[activeStep][0].mask
      if(masks){
        for (var key of Object.keys(masks)) {
          imageBlob = await fetch(`${path[0]['imgpath']}/${masks[key]}`).then(response => response.blob());
          imgData = new File([imageBlob], masks[key]);
          img.file(masks[key], imgData, { base64: true });
        }
        
      }

      zip.generateAsync({type:"blob"}).then(function(content) {
          // see FileSaver.js
          saveAs(content, data[activeStep][0]._id+".zip");
      });   
    
    };

    const handleCheckbox = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { filters } = userinfo;
        
    // Case 1 : The user checks the box
    if (checked) {
        setUserInfo({
        filters: [...filters, value]
        });
    }
    
    // Case 2  : The user unchecks the box
    else {
        setUserInfo({
        filters: filters.filter((e) => e !== value)
        });
    }
    };

  return (
    <>
    <ResearcherNavbar/>
    <Wrapper>
    <Grid>{categories.map((name, index) =>{
            return (<Filters key={activeStep+name} name={name} handleCheckbox={handleCheckbox}/>)
    })}
    </Grid>
    <Box sx={{ flexGrow: 1, border: "2px solid #D3D3D3" }}>
      <Stack spacing={2} direction="row">
      <Box sx={{ width: '100%', aspectRatio: "3/2" , pt: 2 , pl:2}}>
        <img 
        src={`${path[0]['imgpath']}/${data[activeStep][0].original}`} 
        onError={e => {
          e.target.src = NoImage;
        }}
        style={{width: '100%', height: '100%'}}/>
      </Box>
      <Box sx={{ width: '100%', aspectRatio: "3/2" , pt: 2 , pr:2}}>
        <img 
        src={mask}
        onError={e => {
          e.target.src = `${path[0]['imgpath']}/${data[activeStep][0].original}`;
        }}
        style={{width: '100%', height: '100%'}}/>
        {/* {steps[activeStep].description} */}
      </Box>
      </Stack>
      <MobileStepper
        variant="text"
        steps={data.length}
        position="static"
        activeStep={activeStep}
        sx={{py:2}}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === data.length - 1 || data.length ===0}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0 || data.length ===0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Prev
          </Button>
        }
      />
      <Stack spacing={2} direction="row">
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          py: 2 ,
          pl:2,
          width: '100%',
        }}
      >
        <div style={{backgroundColor: "#F3F3F3", padding: "10px", width: "100%"}}>
        <table>
        <tbody>
        <tr><th>Name:</th><th>{data[activeStep][0].patient_name}</th></tr>
        <tr><th>District:</th><th> {data[activeStep][0].patient_district}</th></tr>
        <tr><th>Age:</th><th> {data[activeStep][0].patient_age}</th></tr>
        <tr><th>Gender:</th><th> {data[activeStep][0].patient_gender}</th></tr>
        <tr><th style={{verticalAlign: "top"}}>Habits:</th><th> {
        data[activeStep][0].patient_habits.map((a,index)=>{
          return <p key={index} style={{padding:0, margin:0}}>{a}</p>
        })}</th></tr>
        </tbody>
        </table>
        </div>
      </Paper>
      <Box sx={{ width: '100%', py: 2 , pr:2 }}>
        <Button variant="contained" color="success" endIcon={<AutoFixHighIcon/>} sx={{width: "100%", height: 50}}>Segment</Button>        
        <br/><br/>
        <MedButton variant="contained" sx={{width: "100%", height: 50}} endIcon={<DownloadIcon/>} onClick={handleDownload}>Download</MedButton>
        <br/><br/>
        <MedButton variant="contained" sx={{width: "100%", height: 50}} onClick={()=>setStep(0)}>Go Back To Collection</MedButton>
      </Box>
      </Stack>
    </Box>
    </Wrapper>
    </>
  )
}

export default Segment