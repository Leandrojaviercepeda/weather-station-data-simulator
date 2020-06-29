const axios = require('axios')
const { OpenWeather } = require('./credentials')
const { WERATHERST_API_URL } = require('./constants')

const getWeatherDataOfPlace = async (city, state, countryCode) => {    
    try {
        const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${countryCode}&units=metric&appid=${OpenWeather}`)
        const weather = resp.data
        
        const weatherData = {
            temperature: weather.main.temp,
            humidity: weather.main.humidity,
            pressure: weather.main.pressure,
            uvRadiation: 0,
            windVel: weather.wind.speed,
            windDir: weather.wind.deg,
            rainMM: weather.rain ? weather.rain['1h'] ? weather.rain['1h'] : weather.rain['3h'] ? weather.rain['3h'] : 0 : 0,
            rainIntensity: weather.clouds.all,
        }        
        
        return { weatherData }
    } catch (error) {
        console.log(error);
    }
}

const registerMeasurement = async (station) => {
    try {       
        const { weatherData } = await getWeatherDataOfPlace(station.city, station.region, 'ARG')
        
        const resPostMeasurement = await axios.post(`${WERATHERST_API_URL}/weather/measurements`, Object.assign({}, weatherData, { stationId: station.id }))
        return resPostMeasurement.status
    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerMeasurement }