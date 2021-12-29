import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs"
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import HaumeaMap from "../../assets/textures/2k_haumea_fictional.jpg"
import CeresMap from "../../assets/textures/4k_ceres_fictional.jpg"
import ErisMap from "../../assets/textures/4k_eris_fictional.jpg"
import MakeMakeMap from "../../assets/textures/4k_makemake_fictional.jpg"



export default function Asteroids(props){  

    //Get total number of asteroids in the array
    const numberOfPlanets = props.data.planets.length;

    //Get the initial position of each asteroid 
    const x_initialArray = props.data.planets.map(planet => planet.x);
    //Get initial velocity of each asteroid
    const v_initialArray = props.data.planets.map(planet => planet.v);
    //Get mass of asteroids
    const masses = props.data.planets.map(planet => planet.m)
    
    //Make 2d tensors for position and velocity
    const xInitial = tf.tensor2d(x_initialArray, [numberOfPlanets, 3]);
    const vInitial = tf.tensor2d(v_initialArray, [numberOfPlanets, 3]);
    
    //Escalar tensor of G
    const G = tf.scalar(props.data.G);

    const [pos, setPos] = useState(x_initialArray);

    // Not rerender as soon as the frame
    const x = useRef(xInitial);
    const v = useRef(vInitial);

    const dtTensor = useMemo(() => tf.scalar(props.dt), [props.dt])

    const compute = useCallback(() => {
        const [newX, newV] = tf.tidy(() => {
            const a = calcA(x.current);
            //Determine new Pos
            const newX = x.current.add(tf.mul(v.current, dtTensor));
            const newV = v.current.add(tf.mul(a, dtTensor));
            return[newX, newV];
        })
        tf.dispose([x.current, v.current]);
        //Replace
        x.current = newX;
        v.current = newV;

        newX.array().then(newPos => {
            setPos(newPos);
        });
        //Add dependencies of compute function
        // eslint-disable-next-line
    }, [x, v, dtTensor])

    useEffect(() => {
        requestAnimationFrame(() => {
            //Calls compute function on each frame 
            compute();
        })
    }, [pos, compute]);

    // Function to calculate acceleration by position
    function calcA(x) {
        //unstack pos tensor
        const unstackedX = tf.unstack(x);
        //Save acc in 1d tensor
        const accelerations = Array(numberOfPlanets).fill(tf.tensor1d([0,0,0]));

        for(let i = 0; i < numberOfPlanets; i++){
            const iX = unstackedX[i];
            for(let j = i + 1; j < numberOfPlanets; j++){
                const jX = unstackedX[j];
                const vector = tf.sub(jX, iX);
                const r = tf.norm(vector);

                const force = G.mul(masses[i])
                                .mul(masses[j])
                                .div(tf.pow(r, 3))
                                .mul(vector);
                accelerations[i] = accelerations[i].add(force);
                accelerations[j] = accelerations[j].sub(force)
            }

            accelerations[i] = accelerations[i].div(masses[i]);
        }

        //Transform to 2d vectors
        return tf.stack(accelerations);
    }

    const asteroidRef = useRef();

    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();
        asteroidRef.current.rotation.y = elapsedTime / 3;
    })

    const [haumeaMap, ceresMap, erisMap, makemakeMap] = useLoader(TextureLoader,
        [HaumeaMap, CeresMap, ErisMap, MakeMakeMap]);


    function randomAsteroidMap(map){
        switch (map) {
            case 0:
                return haumeaMap;
            case 1:
                return ceresMap;
            case 2:
                return erisMap;
            case 3:
                return makemakeMap;
            default:
                return haumeaMap;
        } 
    }

    return <group>
        {pos.map((xPos, i) => {
            let asteroidMap = randomAsteroidMap(props.data.planets[i].map);
            return <mesh key={i} 
                        position={i === 0 ? [0,0,2.5] : xPos} 
                        ref={asteroidRef}
                        onClick={(e) => {
                            props.zoomToView(e.object.position)
                            props.selectedAsteroidIndex(i);
                        }
                        }
                        >
                {/* <Text>
                    {props.data.planets[i].name}
                </Text> */}
                <sphereBufferGeometry 
                args={i === 0 ? [0.2, 30, 30] :[Math.min(props.data.planets[i].r * 2000, 0.1), 30, 30]}
                attach="geometry"
                />
                <meshStandardMaterial 
                map={asteroidMap}
                metalness={0.2}
                roughness={0.8}
                attach="material"
                />
            </mesh>
        })}
    </group>
}