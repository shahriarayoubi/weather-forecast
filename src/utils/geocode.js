const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZW5yaWNvcmF5IiwiYSI6ImNqdDAzamU1czByeXY0OXBoM2c5bHBlaWEifQ.XXU2B7ZGmhtzNPZjQRE8kg`;

    request({
             url,
             json: true
         }, 
         (error, {body}) => {
            if (error) {
                callback('Unable to connect to location services.', undefined);
            } else if (body.message || body.features.length === 0) {
                callback('Unable to find the supplied location.', undefined);
            } else {
                const latitude = body.features[0].center[1];
                // const latitude = body.message;
                const longitude = body.features[0].center[0];
                // const longitude = body.features[0];
                const location = body.features[0].place_name;

                callback(undefined, {longitude: longitude, latitude: latitude, location: location});
            }
        });           
};

module.exports = geocode;