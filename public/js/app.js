const searchField = document.querySelector('#bbc-search-field')
const searchButton = document.querySelector('button')

//make call to bbc webscaping endpoint when user clicks search
//and populate the page with ingredients and steps from the page specified in the search box
searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    //url query param = value in search field
    const url = '/bbc?url=' + searchField.value
    fetch(url).then((response) => {
        //get response data
        response.json().then((data) => {
            //show error to user
            if(data.error){
                $('<div class="error" />').text(data.error).appendTo('body')
            }
            //show ingredients and steps to user
            else{
                addDivs('ingredient', data.ingredients)
                addDivs('step', data.steps)
            }
        })
    })
})

//populate page with contents of array
const addDivs = (className, array) => {
    //add title to page i.e. Ingredients/Steps
    $('<div class="title" />').text(className + 's').appendTo('body')
    //popluate page with contents of array
    for (let i = 0; i < array.length; i++){
        $('<div class="' + className + '" />').text(array[i]).appendTo('body')
    }
}