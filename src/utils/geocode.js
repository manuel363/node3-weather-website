const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?language=de&access_token=pk.eyJ1IjoibWFudTM2MyIsImEiOiJja3ZnYm5uZzczeWdnMnBsdWw4amdsZGJjIn0.jZGCXmrMZQVFm6SEdend1w'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0){
            callback('No location found!', undefined)
        } else {
            const location = body.features
            callback(undefined, {
                latitude: location[0].center[0],
                longitude: location[0].center[1],
                name: location[0].place_name_de
            })
        }
    })
}

module.exports = geocode