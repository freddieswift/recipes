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

app.get('', (req, res) => {
    res.render('index')
})

app.get('/bbc', (req, res) => {
    if(!req.query.url){
        return res.send({
            error: 'You must enter a URL'
        })
    }
    recipe.getBBCRecipe(req.query.url)
        .then((recipe) => {
            res.send(recipe)
        })
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
