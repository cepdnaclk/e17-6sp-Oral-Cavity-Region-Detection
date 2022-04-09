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
const JSZip = require("jszip");
import { saveAs } from 'file-saver';

import {Wrapper, Grid} from './Segment.styles'
import Filters from "./Filters"

const Segment = ({data, setStep}) => {

    const categories= ["Enemal","Hard Plate","Mole","Soft Plate","Tongue","Stain","Uvula","Gingivitis","Pigmentation","Lips"]
    
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDownload = async() => {
      var zip = new JSZip();

      // Fetch the image and parse the response stream as a blob
      const imageBlob = await fetch(`http://localhost:5000/Storage/images/${data[activeStep][0].original}`).then(response => response.blob());

      // create a new file from the blob object
      const imgData = new File([imageBlob], data[activeStep][0].original);

      var img = zip.folder("images");
      img.file(data[activeStep][0].original, imgData, { base64: true });

      zip.generateAsync({type:"blob"}).then(function(content) {
          // see FileSaver.js
          saveAs(content, data[activeStep][0]._id+".zip");
      });   
    
    };

    const [userinfo, setUserInfo] = useState({
    filters: [],
    });

    useEffect(() => {
    })
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
            return (<Filters key={index} name={name} handleCheckbox={handleCheckbox}/>)
    })}
    </Grid>
    <Box sx={{ flexGrow: 1, border: "2px solid #D3D3D3" }}>
      <Stack spacing={2} direction="row">
      <Box sx={{ width: '100%', aspectRatio: "3/2" , pt: 2 , pl:2}}>
        <img src={`http://localhost:5000/Storage/images/${data[activeStep][0].original}`} style={{width: '100%', height: '100%'}}/>
      </Box>
      <Box sx={{ width: '100%', aspectRatio: "3/2" , pt: 2 , pr:2}}>
        <img src={NoImage} style={{width: '100%', height: '100%'}}/>
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
          p: 2,
          width: '100%',
        }}
      >
        <div style={{backgroundColor: "lightgray", padding: "5px", width: "100%"}}>
        <table>
        <tbody>
        <tr><td>Name:</td><td>{data[activeStep][0].patient_name}</td></tr>
        <tr><td>District:</td><td> {data[activeStep][0].patient_district}</td></tr>
        <tr><td>Age:</td><td> {data[activeStep][0].patient_age}</td></tr>
        <tr><td>Gender:</td><td> {data[activeStep][0].patient_gender}</td></tr>
        <tr><td style={{verticalAlign: "top"}}>Habits:</td><td> {
        data[activeStep][0].patient_habits.map((a,index)=>{
          return <p style={{padding:0, margin:0}}>{a}</p>
        })}</td></tr>
        </tbody>
        </table>
        </div>
      </Paper>
      <Box sx={{ width: '100%', p: 2 }}>
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