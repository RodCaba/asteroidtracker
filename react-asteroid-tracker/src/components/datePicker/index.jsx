import React, { useState } from "react";
import styled from "styled-components"
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { DesktopDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { GetDataButton } from "./getData";
import { Stack } from "@mui/material";

const DatePickerDiv = styled.div`

`;

export function DatePicker(props){
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());

    const changeInitialDate = (newInitialDate) => {
        setInitialDate(newInitialDate);
    }

    const changeFinalDate = (newFinalDate) => {
        setFinalDate(newFinalDate);
    }

    function fetchData(startDate, endDate){
        props.fetchData(startDate, endDate);
    }


    return <DatePickerDiv>
        <Stack direction="row" spacing={2} alignItems="center">
        <Stack spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker 
            label="Select an starting date"
            value={initialDate}
            onChange={changeInitialDate}
            renderInput={(params) => <TextField {...params}/>}
            />

            <DesktopDatePicker 
            label="Select a final date"
            value={finalDate}
            onChange={changeFinalDate}
            renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        </Stack>
        <GetDataButton
        fetchData = {fetchData} 
        initialDate = {initialDate}
        endDate = {finalDate}
        />
        </Stack>
    </DatePickerDiv>
}
