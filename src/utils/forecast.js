const request = require('request')


const forecast = (latitude,longitude,callback) => {
    const url='https://api.darksky.net/forecast/75ea044f075736937abe7f579e953d81/' + latitude  + ',' + longitude  + '?units=si'
    //const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
//37.8267',-122.4233

// request ({url : url,json:true},(error,response) => {
    
//               if (error){
//                   callback('Unable to connect to weather service!',undefined)
//               }
//               else if (response.body.error)
//               {
//                   callback ('Unable to find location',undefined)
//               }
//               else{
//                   callback(undefined,response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//               }           
     
//             })
//         }

// module.exports = forecast

    request ({url,json:true},(error,{body}) => {
    
        if (error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if (body.error)
        {
            callback ('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }           

      })
  }

module.exports = forecast