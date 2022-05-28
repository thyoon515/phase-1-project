/** Global Variables **/


/** Nodes **/
const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');
const searchByNameLink = () => document.getElementById('search-by-name-link');
const searchByIngredientLink = () => document.getElementById('search-by-ingredient-link');
const surpriseMeLink = () => document.getElementById('surprise-me');

/** Event Listeners **/
//3 question rules: When? Cause? Effect?
function homePageLinkEvent(){
    homeLink().addEventListener('click', renderHomePage)
}
function searchByNameLinkEvent(){
    searchByNameLink().addEventListener('click', renderSearchByName)
}
function searchByIngredientLinkEvent(){
    searchByIngredientLink().addEventListener('click', renderSearchByIngredient)
}
// function surpriseMeLinkEvent(){
//     surpriseMeLink().addEventListener('click', fetchSurpriseCocktail())
// }

/** Event Handlers **/
function renderHomePage(){
    resetMainDiv();
    //reset the page everytime it renders
    const h1 = document.createElement('h1');
    h1.className = 'center-align';
    h1.innerText = "Welcome to Automated Cocktail Bar";
    mainDiv().appendChild(h1);
}

function renderSearchByName(){
    
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'Search Cocktail Recipe by Name';
    mainDiv().appendChild(h1);
}

function renderSearchByIngredient(){
    
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'Search Cocktail Recipe by Ingredients'
    mainDiv().appendChild(h1);
}

function renderSurpriseMe(){
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'SURPRISE!!'
    mainDiv().appendChild(h1);
}

// function fetchSurpriseCocktail(){
//     fetch("http://www.thecocktaildb.com/api/json/v1/1/random.php")
//         .then(resp => resp.json())
//         .then(console.log(data));
//         }



/** Helper **/
function resetMainDiv(){
    mainDiv().innerHTML= ""
//instead of adding, this will reset the page
}


/** Startup **/

document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();
    homePageLinkEvent();
    searchByNameLinkEvent();
    searchByIngredientLinkEvent();
    //surpriseMeLinkEvent();
})