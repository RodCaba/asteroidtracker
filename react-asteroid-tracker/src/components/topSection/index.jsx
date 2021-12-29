import React from "react";
import styled from "styled-components";

const TopSectionContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 50px;
`;

const Title = styled.h1`
    margin: 0;
    color: #fff;
    font-weight: 700;
    font-size: 35px;
`
const SubTitle = styled.h2`
    margin: 0;
    color: #fff;
    font-weight: 500;
    font-size: 20px;
`

export function TopSection(props){
    return <TopSectionContainer>
        <Title>Hazardous Asteroid Tracker</Title>
        {props.dataFetched &&
            <SubTitle>Refresh the page to select new dates</SubTitle>
        }
    </TopSectionContainer>
}
