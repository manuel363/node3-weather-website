const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=39fb526fee909496cf7bec3ae0624547&query=' + longitude + ',' + latitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location: ' + body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ': It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast