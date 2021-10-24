const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://www.bbcgoodfood.com/recipes/chicken-madras'

const loadRecipes = () => {
    try{
        const dataBuffer = fs.readFileSync('recipes.json')
        const dataJSON = dataBuffer.toString()
        //return (dataJSON)
        console.log(JSON.parse(dataJSON))
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const getBBCRecipe = async url => {
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    let ingredients = [] 
    $('.pb-xxs').each((i, el) => {
        const ingredient = $(el).text()
        ingredients.push(ingredient)
    })

    let steps = []
    $('.pb-xs > .editor-content').each((i, el) => {
        const step = $(el).text()
        steps.push(step)
    })

    return {"ingredients": ingredients, "steps": steps}
    //return {"ingredients": convertToObject(ingredients), "steps": convertToObject(steps)}
}

const convertToObject = (array) => {
    const obj = Object.assign({}, array)
    return obj
}

module.exports = {
    loadRecipes: loadRecipes,
    getBBCRecipe: getBBCRecipe
}