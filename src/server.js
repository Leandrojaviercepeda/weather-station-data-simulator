const express = require('express');
const app = express()
const port = 3260

const axios = require('axios')
const { WERATHERST_API_URL } = require('./constants')

const { registerMeasurement } = require('./measurement')

const postDataOnWeatherSt = async () => {
    const resGetStations = await axios.get(`${WERATHERST_API_URL}/stations`)
    const { stations } = resGetStations.data

    registerMeasurement(stations[1]).then(res => console.log(res)).catch(error => console.log(error))
    registerMeasurement(stations[3]).then(res => console.log(res)).catch(error => console.log(error))
    registerMeasurement(stations[4]).then(res => console.log(res)).catch(error => console.log(error))
    registerMeasurement(stations[5]).then(res => console.log(res)).catch(error => console.log(error))
    registerMeasurement(stations[6]).then(res => console.log(res)).catch(error => console.log(error))
    registerMeasurement(stations[7]).then(res => console.log(res)).catch(error => console.log(error))
    registerMeasurement(stations[8]).then(res => console.log(res)).catch(error => console.log(error))
    registerMeasurement(stations[9]).then(res => console.log(res)).catch(error => console.log(error))

}

function intervalFunc() {
  console.log('Post weather data on WeatherSt!');
  postDataOnWeatherSt()
}

setInterval(intervalFunc, 1000 * 60 * 10);

app.listen(port, (err) => {
    if (err) throw new Error(err)
    console.log(`Sever listening at port ${port}`)
});