import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ResearcherNavbar from '../ResearcherNavbar';
import NoImage from '../../images/noimage.jpg';
import MedButton from '../Buttons';

import {Wrapper, Grid} from './Segment.styles'
import Filters from "./Filters"

const Segment = ({data, setState}) => {

  const steps = [
    {
      label: 'Select campaign settings',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];
    const categories= ["Enemal","Hard Plate","Mole","Soft Plate","Tongue","Stain","Uvula","Gingivitis","Pigmentation","Lips"]
    
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = data? data.length: 0;

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const [userinfo, setUserInfo] = useState({
    filters: [],
    });

    useEffect(() => {
      // console.log(location.state);
    },[])

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
    <MedButton onClick={setState(false)}>Collection</MedButton>
    <Grid>{categories.map((name, index) =>{
            return (<Filters key={index} name={name} handleCheckbox={handleCheckbox}/>)
    })}
    </Grid>
    {maxSteps !==0?
    <Box sx={{ flexGrow: 1, border: "2px solid #D3D3D3" }}>
      <Stack spacing={2} direction="row">
      <Box sx={{ width: '100%', aspectRatio: "3/2" , pt: 2 , pl:2}}>
        <img src={NoImage} style={{width: '100%', height: '100%'}}/>
      </Box>
      <Box sx={{ width: '100%', aspectRatio: "3/2" , pt: 2 , pr:2}}>
        <img src={NoImage} style={{width: '100%', height: '100%'}}/>
        {/* {steps[activeStep].description} */}
      </Box>
      </Stack>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{py:2}}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1 || maxSteps ===0}
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
          <Button size="small" onClick={handleBack} disabled={activeStep === 0 || maxSteps ===0}>
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
          alignItems: 'center',
          p: 2,
          width: '100%',
        }}
      >
        <div style={{backgroundColor: "lightgray", padding: "5px", width: "100%"}}>
        <table>
        <tbody>
        <tr><td>Name:</td><td>{steps[activeStep].label}</td></tr>
        <tr><td>District:</td><td> {steps[activeStep].label}</td></tr>
        <tr><td>Age:</td><td> {steps[activeStep].label}</td></tr>
        <tr><td>Gender:</td><td> {steps[activeStep].label}</td></tr>
        <tr><td>Habbits:</td><td> {steps[activeStep].label}</td></tr>
        <tr><td>District:</td><td> {steps[activeStep].label}</td></tr>
        </tbody>
        </table>
        </div>
      </Paper>
      <Box sx={{ width: '100%', p: 2 }}>
        <MedButton variant="contained" sx={{width: "100%", height: 80}}>Segment</MedButton>
        <br/><br/>
        <MedButton variant="contained" sx={{width: "100%", height: 50}}>Download</MedButton>
      </Box>
      </Stack>
    </Box>
    :<p>hi</p>}


    </Wrapper>
    </>
  )
}

export default Segment