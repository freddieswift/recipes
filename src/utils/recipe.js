const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://www.bbcgoodfood.com/recipes/chicken-madras'


//load recipes from json file
//returns an object containing recipe details
//if there is an error, the function returns an emply array
const loadRecipes = () => {
    try{
        const dataBuffer = fs.readFileSync('recipes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}


//function to web scrape bbc good food recipes
const getBBCRecipe = async url => {

    //get html of bbc page
    const response = await axios.get(url)
    const html = response.data

    const $ = cheerio.load(html)

    //find each ingredient and add them to an array
    let ingredients = [] 
    $('.pb-xxs').each((i, el) => {
        //get text of elemant containing ingredient
        const ingredient = $(el).text()
        ingredients.push(ingredient)
    })

    //find each step and add them to an array
    let steps = []
    $('.pb-xs > .editor-content').each((i, el) => {
        //get text of element containing step
        const step = $(el).text()
        steps.push(step)
    })

    return {"ingredients": ingredients, "steps": steps}
}

module.exports = {
    loadRecipes: loadRecipes,
    getBBCRecipe: getBBCRecipe
}