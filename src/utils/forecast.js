const request = require('request')
const forecast = (latitude,longitude,callback)=>{

     const url ='http://api.weatherstack.com/current?access_key=c6f9c1e037e27a3c9368c6c257d178a2&query=' + latitude +','+ longitude + '&units=f'
   
     request({url,json:true},(error,{body})=>{
         if(error){
            callback('Unable to connect',undefined)
         }else if(body.error){
            callback('Unable to find Location',undefined)
         }else{
             console.log(body.current.weather_descriptions[0] +'. Its is currently ' + body.current.temperature +' degree out. It feels like '+body.current.feelslike+' degree out.')
         }
     })

}



module.exports = forecast;