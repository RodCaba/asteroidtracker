import React, { useState } from "react";
import { Button } from "@mui/material";
import ReactLoading from "react-loading"
export function GetDataButton(props){

    const [buttonPress, handleButtonPress] = useState(false);
    
    function fetchData(){
        const initialDateApi = new Intl.DateTimeFormat("az").format(props.initialDate);
        const endDateApi = new Intl.DateTimeFormat("az").format(props.endDate);
        props.fetchData(initialDateApi, endDateApi);
        handleButtonPress(true);
    }

    return <>
    <Button onClick={fetchData} size="large">
        Go!
    </Button>
    {buttonPress &&
        <ReactLoading 
        type="bars"
        />
    }
    </>
}