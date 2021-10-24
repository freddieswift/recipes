//const BBCForm = document.querySelector('bbc-form')
const searchField = document.querySelector('#bbc-search-field')
const searchButton = document.querySelector('button')
const ingredients = document.querySelector('#ingredients')
const steps = document.querySelector('#steps')


searchButton.addEventListener('click', (e) => {
    e.preventDefault()

    const url = '/bbc?url=' + searchField.value
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                ingredients.textContent = data.error
            }
            else{
                // let ingredientsTitle = document.createElement('p')
                // ingredientsTitle.innerText = "Ingredients"
                // document.body.appendChild(ingredientsTitle)
                addDivs('ingredient', data.ingredients)
                addDivs('step', data.steps)
            }
        })
    })
})

const addDivs = (className, array) => {
    $('<div class="title" />').text(className + 's').appendTo('body')
    for (let i = 0; i < array.length; i++){
        $('<div class="' + className + '" />').text(array[i]).appendTo('body')
    }


}