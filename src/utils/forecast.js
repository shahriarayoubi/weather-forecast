const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/46c8aaee8f8e1bc0dad6d13b5d629149/${latitude},${longitude}?units=si`;

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh}, with a low of ${body.daily.data[0].temperatureLow}. There is ${body.currently.precipProbability}% chance of rain.`);
        }
    })
};

module.exports = forecast;