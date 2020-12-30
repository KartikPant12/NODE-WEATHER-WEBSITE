const request = require('request')


// http://api.weatherstack.com/current?access_key=c6f9c1e037e27a3c9368c6c257d178a2&query=28.644800,77.216721

const geocode = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + (address)+ '.json?access_token=pk.eyJ1Ijoia3BrYXJ0aWsiLCJhIjoiY2tpeGZ0b20xMXkzajJybjQ3b2M5OWJjNSJ9.yF6kYjiv3vcHvBwADrzHTg&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Connect to location services!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find Location.Try another search',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}


module.exports =geocode


// //Github
// Untracked file    src/app.js  readme.md   
// Unstaged Changes
// Staged Changes
// Commits

