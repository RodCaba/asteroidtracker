const earthMass = 5.972e24;

const earthRadious = 6371;
const earthVelocity = 107208;
const earthVelocityVector = [
    0.01681162005220229,
    0.0017431316879820316,
    0.0007559737671361461
];

const perKMVector = [
    1.1835748792270e-8,
    6.0386473429954e-9,
    3.6231884057971e-9
]

//As clay is the composition of most asteroids. Kg/ km3
const clayDensity = 1702000



let modelData = {
    planets: [
        {
            x: [
                0.004502508845301258,
                0.0007670734814646406,
                0.0002660563278120356
              ],
              v: [
                -3.5174423541454e-7,
                0.00000517762777222281,
                0.00000222910220557907
              ],
              m: 1,
              r: 1,
              color: '#e4e80e',
              map: 0
        }
    ],
    "G": 2.95912208286e-4
}

function transformData(data){
    // If there are records in the days queried. 
    const {element_count} = data;
    if(element_count > 0){
        //Get the data of asteroids, destructure in a list of dataDay keys. 
        const {near_earth_objects} = data;
        const dataDayKeys = Object.keys(near_earth_objects);
        const hazardousAsteroids = [];
        
        dataDayKeys.forEach((key) => {
            //Returning a list of JSON objects
            near_earth_objects[key].forEach((entry) => {
                if(entry["is_potentially_hazardous_asteroid"] === true){
                    //Velocity data
                    const asteroidAbsoluteVelocity = entry.
                    close_approach_data[0].
                    relative_velocity.
                    kilometers_per_hour
                    const velocityFactor = asteroidAbsoluteVelocity / earthVelocity;
                    const velocityVector = earthVelocityVector.map(dim => dim * velocityFactor);
                    //Position data
                    const miss_distance = entry.
                                        close_approach_data[0].
                                        miss_distance.
                                        kilometers;
                    const posVector = perKMVector.map(dim => {
                        let constant = Math.random();
                        if(constant > 0.5){
                            
                            return (dim * miss_distance) * 10;

                        }else{
                            
                            return (dim * miss_distance) * -10;
                        }
                    }
                        );
                    //Mass data
                    const asteroidRadius = entry.estimated_diameter.kilometers.estimated_diameter_max / 2;
                    const asteroidVolume = (((Math.pow(asteroidRadius, 3)) * Math.PI) * 4) / 3;
                    const asteroidMass = clayDensity * asteroidVolume;
    
                    const hazardousAsteroid = {
                        name: entry.name,
                        x: posVector,
                        v: velocityVector,
                        m: asteroidMass / earthMass ,
                        r: asteroidRadius/earthRadious,
                        color: "#d5dedb",
                        map: Math.floor(Math.random() * 4),
                        dateForCard: entry.close_approach_data[0].close_approach_date_full,
                        diameterForCard: new Intl.NumberFormat([],{maximumSignificantDigits: 3}).format(
                            entry.estimated_diameter.kilometers.estimated_diameter_max
                        ),
                        missDistanceForCard: new Intl.NumberFormat([], {maximumSignificantDigits: 4}).format(
                            miss_distance
                        ),
                        velocityForCard: new Intl.NumberFormat([], {maximumSignificantDigits: 3}).format(
                            asteroidAbsoluteVelocity
                        )
                    }
                    hazardousAsteroids.push(hazardousAsteroid);
                    hazardousAsteroids.filter(obj => {
                        if(obj.name !== hazardousAsteroid.name){
                            return true;
                        }else{
                            return false;
                        }
                    })
                }
            })
        })

        return hazardousAsteroids;
    }
}

module.exports = transformData;
