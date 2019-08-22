const path = require('path')
const express =require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port = process.env.PORT || 3000

//Define paths for  Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPaths=path.join(__dirname,'../templates/partials')


//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
  res.render('index',{
    title:'Weather app',
    name: 'Anita T'
  })
})

app.get('/about',(req,res) => {
    res.render('about',{
      title:'About me',
      name:'Anita T'
    })
})

app.get('/help',(req,res) => {
  res.render('help',{
    helpText:'This is some helpful text',
    title:'Help',
    name:'Anita T'
    //help:'Help for the app.'
  })
})

app.get('/weather',(req,res) => {
  if(!req.query.address) {
    return res.send ({
      error:'You must provide an address!'
    })
  }
  
  geocode (req.query.address,(error,{latitude,longitude,location}) => {
    if(error){
      return res.send({ error })
    }
    forecast(latitude,longitude,(error, forecastData) => {
       if (error){
         return res.send({error})
       }
       res.send({
         forecast:forecastData,
         location,
         address:req.query.address
       })
    })
  })
})

app.get('/products',(req,res) => {
  if (!req.query.search) {
    return res.send({
      error:'You must provide a search term!'
    })

  }
  console.log(req.query.rating)
  res.send({
    products: []
  })
})

app.get('/help/*',(req,res) => {
  res.render('404',{    
    title:'404',
    name:'Anita T',
    errorText:'Article not found'
  })
})

app.get('*',(req,res) => {
  res.render('404',{
    title:'404',
    name:'Anita T',
    errorText:'Page not found'
  })
})

// app.get('/help',(req,res) => {
//     res.send({
//         name:'Andrew',
//         age:47
//     })
// })

// app.get('/about',(req,res) => {
//     // res.send('<h1><b>About</h1>')
//     res.send()
// })

app.get('/weather',(req,res) => {
    res.send({
        weather:'it is sunny',
        location:'mars'
    })

})

app.listen(port,()=>{
console.log('Server is up on ' + port)
})