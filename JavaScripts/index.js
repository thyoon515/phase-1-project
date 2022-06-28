
/** Nodes **/
const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');
const searchByNameLink = () => document.getElementById('search-by-name-link');
const surpriseMeLink = () => document.getElementById('surprise-me-link');

/** Event Listeners **/
//3 question rules: When? Cause? Effect?
function homePageLinkEvent(){
    homeLink().addEventListener('click', renderHomePage)
}
function searchByNameLinkEvent(){
    searchByNameLink().addEventListener('click', renderSearchByName)
}
function surpriseMeLinkEvent(){
    surpriseMeLink().addEventListener('click', fetchSurpriseMe)
}

/** Event Handlers **/

function renderHomePage(){
    resetMainDiv(); //reset the page everytime it renders
    const homePageHeader = document.createElement('h1');
    const homePageImage = document.createElement('img');
    homePageHeader.className = 'center-align';
    homePageHeader.innerText = "Welcome to Cocktail Recipe";
    homePageImage.src = 'https://customneon.com/media/catalog/product/cache/1d858328874ebd6a1883e32a918ffc61/c/o/cocktail-glass-turnedon-customneon.jpg'
    homePageImage.setAttribute('style', 'margin-top: 100px')
    mainDiv().appendChild(homePageHeader);
    homePageHeader.appendChild(homePageImage);
}

function renderSearchByName(){
    resetMainDiv();
    const searchByNameHeader = document.createElement('h1');
    const searchForm = document.createElement('form');
    const rowContainerDiv = document.createElement('div');
    const inputFieldDiv = document.createElement('div');
    const formInput = document.createElement('input');
    const inputLabel = document.createElement('label');
    const searchButton = document.createElement('button');
    searchByNameHeader.className = 'center-align';
    searchForm.className = 'col s12';
    rowContainerDiv.className = 'row container';
    inputFieldDiv.className = 'input-field col s6';
    formInput.className = 'validate';
    searchButton.className = 'waves-effect waves-light btn'
    searchForm.id = 'search-by-name-form';
    formInput.id = "text-input";
    searchButton.id = "search-by-name-submit";
    formInput.setAttribute('type', 'text');
    inputLabel.setAttribute('for', 'Cocktail_Name');
    searchForm.setAttribute('action', '#');
    searchForm.setAttribute('method', 'POST');
    searchByNameHeader.innerText = 'Search Cocktail Recipe by Name';
    inputLabel.innerText = 'Cocktail Name';
    searchButton.innerText = 'search'; 
    
    searchForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        fetchSearchByName(e.target[0].value); //target input field to pass in input value to search the API
        searchForm.reset();
    })

    mainDiv().append(searchByNameHeader, searchForm);
    
    searchForm.appendChild(rowContainerDiv);
    rowContainerDiv.appendChild(inputFieldDiv);
    inputFieldDiv.append(formInput, inputLabel, searchButton);
}    
   

function renderSurpriseMe(cocktail){
    resetMainDiv();
    const supriseHeader = document.createElement('h1');
    const cardDiv = document.createElement('div');
    const cocktailImage = document.createElement('img'); 
    const cocktailRecipe = document.createElement('h4');
    const cocktailInstruction = document.createElement('h4');
    const recipeUl = document.createElement('ul');
    cardDiv.className = 'card';
    supriseHeader.innerText = 'SURPRISE!!';
    cocktailRecipe.innerText = cocktail.drinks[0].strDrink;
    cocktailInstruction.innerText = cocktail.drinks[0].strInstructions
    cocktailImage.src = cocktail.drinks[0].strDrinkThumb;

    for(let i=1; i<16; i++){
        //iterate through each ingredients and measurements
        if(cocktail.drinks[0][`strIngredient${i}`] === null | cocktail.drinks[0][`strIngredient${i}`] === ""){
            break;
        }
        let ingredientMeasurementList = document.createElement('li');
        ingredientMeasurementList.innerHTML = cocktail.drinks[0][`strIngredient${i}`] + ': ' + cocktail.drinks[0][`strMeasure${i}`]
        recipeUl.appendChild(ingredientMeasurementList);
    }
    mainDiv().append(supriseHeader, cardDiv);
    cardDiv.append(cocktailImage, cocktailRecipe, cocktailInstruction);
    cocktailRecipe.append(recipeUl);  
}

function fetchSurpriseMe(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(resp => resp.json())
    .then(data => renderSurpriseMe(data))
}

function fetchSearchByName(cocktail){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
        .then(resp => resp.json())
        .then(data => {
        resetMainDiv();
        const div = document.createElement('div');

        data.drinks.forEach(drink => {
            const cardDiv = document.createElement('div');
            const cocktailImage = document.createElement('img');
            const cocktailName = document.createElement('h3');
            const cocktailInstruction = document.createElement('h4');
            const ingredientMeasurementHeader = document.createElement('h4');
            const ingredientMeasurementUl = document.createElement('ul');
            cardDiv.className = 'card';
            cocktailImage.src = drink.strDrinkThumb;
            cocktailName.innerText = drink.strDrink;
            cocktailInstruction.innerText = drink.strInstructions;

            for(let i=1; i<16; i++){
                if(drink[`strIngredient${i}`] === null | drink[`strIngredient${i}`] === ""){
                break;
                }
                let li = document.createElement('li');
                li.innerHTML = drink[`strIngredient${i}`] + ': ' + drink[`strMeasure${i}`]
                ingredientMeasurementUl.appendChild(li);
            }

            ingredientMeasurementHeader.appendChild(ingredientMeasurementUl);
            cardDiv.append(cocktailName, cocktailImage, ingredientMeasurementHeader, cocktailInstruction);
            div.appendChild(cardDiv);
        })
        mainDiv().append(div);
    })
        .catch(error => alert('Result not found, go back to Search By Name and try another name!'))
}
               

/** Helper **/

function resetMainDiv(){
    mainDiv().innerHTML= ""
//reset the page to prevent adding on
}


/** DOMContentLoaded **/

document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();
    homePageLinkEvent();
    searchByNameLinkEvent();
    surpriseMeLinkEvent();   
})


