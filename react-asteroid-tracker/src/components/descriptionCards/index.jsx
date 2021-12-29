import React from "react";
import styled from "styled-components";
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import Box from "@mui/material/Box"
import { DatePicker } from "../datePicker";
import { Stack } from "@mui/material";
import "./descriptionCards.css"

const DescriptionCardDiv = styled.div`
`;

export function DescriptiveCardDiv(props){

    function fetchData(startDate, endDate){
        props.fetchData(startDate, endDate);
    }


    return <DescriptionCardDiv className="descriptionCardDiv">
        <Box
        component="span"
        sx={{display: "inline-block", mx: "2px", transform: "scale(0.8)", opacity: "0.7"}}
        >
        <Card>
            <Stack spacing={2}>
                <CardContent>
                    <Typography variant="h4" className="headerDescription" >
                    Welcome astronaut! 
                    </Typography>
                    <Typography variant="body1">
                        Each day potentially hazardous asteroids are passing through earth. 
                        With this graphical simulation of NASA API's information we can keep track on them.
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText 
                            primary="1. Select a date period of 5 days maximum."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                            primary="2. Some hazardous asteroids would appear on the screen."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                            primary="3. Click on them to get more information."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                            primary="4. You can drag the mouse and wheel to look over space."
                            />
                        </ListItem>
                    </List>
                    <Typography variant="body2" color="text.secondary">
                        Note: The aspect ratio and material of each asteroids are simulated for user experience purposes. E.g. Keeping actual
                        sizes would make the asteroids not visible on the screen. 
                    </Typography>
                </CardContent>
                <CardActions>
                    <DatePicker
                    fetchData = {fetchData} 
                    />
                </CardActions>
            </Stack>
        </Card>
        </Box>
    </DescriptionCardDiv>

}