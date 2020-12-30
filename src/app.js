
// nodemon src/app.js -ejs,hbs

const path = require('path')
const express = require('express')
const hbs = require('hbs');
// const { RSA_PKCS1_OAEP_PADDING } = require('constants');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');
const { getgroups } = require('process');


// console.log(__dirname)
const app = express()

//Define path for Express COnfig
const publicDirectoryPath = (path.join(__dirname,'../public'));
const viewsPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views location

app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))


// -----------------------------------------------
// app.get('',(req,res)=>{
//     res.send('<h1>weather </h1>')
// })
 
// app.get('/help',(req,res)=>{     // express is going to onvert this into String itself
//     //  res.send({
//     //      name :'kp',
//     //      age:27
//     //  })
//     res.send([{
//         name:'Andrew'
//     },{
//         name:'kp'
//     }])

// })


// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })



// -----------------------------------

app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'Weather',
        name:'Hello'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'KP'
    })
})



app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is helpful text',
        title:'Help',
        name:'KP'
        
    })
})


app.get('/weather',(req,res)=>{
if(!req.query.address){
    return res.send({
        error:'You must provide an address'
    })
}

geocode(req.query.address,(error,{latitude,longitude,location} ={})=>{
    if(error){
        return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }

        res.send({
           forecast:forecastData,
           location,
           address:req.query.address

        })
    })
})
    // res.send({
    //     forecast:'it is raining',
    //     location:'india',
    //     address:req.query.address
    // })
})


//app.com
//app.com/help
//app.com/about

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

  console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'KP',
        errorMessage:'Help article not found'
    })
})




app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'KP',
        errorMessage:'Page not found'
    })
})

// app.get('*',(req,res)=>{
//     res.send('My 404 page')
// })
app.listen(3000,()=>{
     console.log('Server is up on port 3000');
})