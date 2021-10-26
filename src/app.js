const express = require('express')
const path = require('path')
const hbs = require('hbs')
const recipe = require('./utils/recipe.js')
const url = 'https://www.bbcgoodfood.com/recipes/bang-bang-cauliflower'

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

//set up handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to server
app.use(express.static(publicDirPath))

//home page
app.get('', (req, res) => {
    res.render('index')
})

//BBCweb scraping end point
//takes in a bbc good food url as a query parameter
app.get('/bbc', (req, res) => {
    //throw error if no url provided
    if(!req.query.url){
        return res.send({
            error: 'You must enter a URL'
        })
    }
    recipe.getBBCRecipe(req.query.url)
        //if promise if resloved, return recipe (ingredients and steps fetched from html of page)
        .then((recipe) => {
            res.send(recipe)
        })
        //if promise if rejected, return error
        .catch((e) => {
            res.send({error: 'Error: You may not be connect to the internet or you may have entered the URL incorrectly...'})
        })
})

// app.get('', (req, res) => {
//     recipe.getBBCRecipe(url)
//         .then((recipe) => {res.send(recipe)})
//         .catch((e) => {console.log("Error")})
// })

// app.get('/recipe', (req, res) => {
//     res.send("get recipe placeholder...")
// })

// app.get('/add', (req, res) => {
//     res.send("add recipe placeholder...")
// })

// app.get('/remove', (req, res) => {
//     res.send("add recipe placeholder...")
// })

app.listen(port, ()=> {
    console.log('listening on port '  + port)
})
