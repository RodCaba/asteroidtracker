require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const transformData = require("./test-transform.js");
const app = express();
const PORT = process.env.PORT || 8080;
const fetch = require("node-fetch")

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));



let asteroidData = {
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
          color: '#e4e80e'
    }
    ],
    "G": 2.95912208286e-4  
};

const fetchData = async(startDate, endDate) =>{
  asteroidData = {
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
          color: '#e4e80e'
    }
    ],
    "G": 2.95912208286e-4  
  };
  const dataJSON = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`, {mode: 'cors'})
                              .catch(err => console.log(err))
                              .then(res => res.json())
                              .then(data => transformData(data))
                              .then(res => asteroidData.planets.push(...res)).catch(err => console.log(err));
  return dataJSON;
}

app.post("/api", (req, res) => {
    asteroidData = {
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
              color: '#e4e80e'
        }
        ],
        "G": 2.95912208286e-4  
    };
    const payload = req.body;
    fetchData(payload.startDate, payload.endDate).then(() => {
      res.send(asteroidData);
    });
});

app.get("/api", (req, res) => {
    const payload = asteroidData;
    //const finalData = transformData(payload);
    res.send(payload);
})

if(process.env.NODE_ENV === "production"){
  app.use(express.static("react-asteroid-tracker/build"));
}

app.listen(PORT, console.log(`App runing on port ${PORT}`));

    