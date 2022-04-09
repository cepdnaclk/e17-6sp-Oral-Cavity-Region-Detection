import React, {useState} from 'react';
import Segment from '../Segment'
import Collections from '../Collections'

const steps = ['Image Selection', 'Image Tool'];

export default function Tool() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState([]);

    function getStepContent(step){
        switch (step) {
            case 0:
            return (
                <Collections setStep={setStep} setData={setData}/>
            );
            case 1:
            return (
                <Segment data={data} setStep={setStep} />
            );
            default:
            return 'Unknown step';
        }
    }
    
  return (
    <>{getStepContent(step)}</>
  );
}
