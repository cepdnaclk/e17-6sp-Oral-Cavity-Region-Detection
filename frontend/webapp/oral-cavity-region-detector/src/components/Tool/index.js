import React, {useState} from 'react'
import ResearcherNavbar from '../ResearcherNavbar'

import {Wrapper, Grid} from './Tool.styles'
import Filters from "./Filters"

const Tool = () => {

    const categories= ["Enemal","Hard Plate","Mole","Soft Plate","Tongue","Stain","Uvula","Gingivitis","Pigmentation","Lips","Select All"]
    const [userinfo, setUserInfo] = useState({
    filters: [],
    });

    const handleCheckbox = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { filters } = userinfo;
    console.log(`${value} is ${checked}`);
        
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
    <div style={{display: 'flex', flexDirection:"row"}}>
        <div style={{width: '100%', height: '100px', border: '1px solid red'}}></div>
        <div style={{width: '100%', height: '100px', border: '1px solid red'}}></div>
    </div>
    </Wrapper>
    </>
  )
}

export default Tool