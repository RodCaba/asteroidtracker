import React, { Suspense, useState } from "react"
import './App.css';
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Earth } from "./components/earth";
import { TopSection } from "./components/topSection";
import { DescriptiveCardDiv } from "./components/descriptionCards";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { Loader } from "@react-three/drei";
import axios from "axios";
import Asteroids from "./components/asteroids"; 
import Controls from "./components/controls";
import { OrbitControls } from "@react-three/drei";
import InformativeCard from "./components/descriptionCards/informativeCard";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});



function App() {

  const [dataParsed, getDataParsed] = useState({
        planets: [
        {
            x: [
                0,
                0,
                2.5
              ],
              v: [
                -3.5174423541454e-7,
                0.00000517762777222281,
                0.00000222910220557907
              ],
              m: 0.002,
              r: 1,
              color: '#e4e80e',
              map: 0
        },
        ],
        "G": 2.95912208286e-4  
      });

  const [dataFetched, dataFetchedStatus] = useState(false);

  const fetchData = (startDate, endDate) => {
    axios({
      url: "/api",
      method: "POST",
      data: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(res => {
      getDataParsed(res.data);
      dataHasFetched();
    }).catch(err => {
      console.log(err);
    })
    .catch(err => {
      console.log(err);
    })

  }

  function dataHasFetched(){
    dataFetchedStatus(true);
  }

  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  const [asteroidIndex, setAsteroidIndex] = useState(1);

  function selectedAsteroidIndex(index){
    setAsteroidIndex(index);
  }

  function backToSpaceClick(){
    setZoom(false);
  }

  return <CanvasContainer>
    <ThemeProvider 
    theme={darkTheme}>
    <TopSection dataFetched = {dataFetched}/>
    {!dataFetched &&
    <DescriptiveCardDiv
    fetchData = {fetchData} 
    />
    }
    {zoom &&
      <InformativeCard 
      data = {dataParsed.planets[asteroidIndex]}
      backToSpaceClick = {backToSpaceClick}
      />
    }
    <Canvas camera={{position: [0,0,5]}}>
      <Suspense fallback={null}>
        <Earth
        />
        {dataFetched && 
        <Asteroids 
        data = {dataParsed}
        dt = {0.1}
        // eslint-disable-next-line
        zoomToView ={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}
        zoom = {zoom}
        selectedAsteroidIndex = {selectedAsteroidIndex}

        />}
        {
          zoom &&
          <Controls 
          zoom={zoom}
          focus={focus}
          />
        }
        
        {
          !zoom &&
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
        />}
      </Suspense>
    </Canvas>
    <Loader />
    </ThemeProvider>
  </CanvasContainer>

}

export default App;
