import React, {useState} from 'react'
import Collection from '../Collections'
import Segment from '../Segment'

const Tool = () => {
    const [data, setData] = useState([]);
    const [state, setState] = useState(false);
    return (
        <>
        {state?
        <Segment data={data} setState={setState}/>
        :
        <Collection setData={setData} setState={setState}/>
        }
        </>
    )
}

export default Tool