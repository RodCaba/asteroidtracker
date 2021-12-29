import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { Card, Stack, CardContent, Typography, CardActions, Button, List, ListItem, ListItemText } from "@mui/material";

const DescriptionCardDiv = styled.div`

`;

export default function InformativeCard(props){

    return <DescriptionCardDiv className="informativeCardDiv">
                <Box
                    component="span"
                    sx={{display: "inline-block", mx: "2px", transform: "scale(0.8)", opacity: "0.7"}}
                    >
                    <Card>
                        <Stack spacing={2}>
                            <CardContent>
                                <Typography variant="h4">
                                    {props.data.name}
                                </Typography>

                                <List>
                                    <ListItem>
                                        <ListItemText primary="Close approach date: " secondary={props.data.dateForCard}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Diameter in km: " secondary={props.data.diameterForCard}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Miss distance in km: " secondary={props.data.missDistanceForCard}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Speed in km/hr: " secondary={props.data.velocityForCard}/>
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardActions>
                                <Button onClick={props.backToSpaceClick} size="large">
                                    Back to space
                                </Button>      
                            </CardActions>
                        </Stack>
                    </Card>
                    </Box>
    </DescriptionCardDiv>
}


