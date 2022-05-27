/** Global Variables **/


/** Nodes **/
const mainDiv = () => document.getElementById('main');
//set variables as function to lower bug issues
const homeLink = () => document.getElementById('home-link');
const searchByNameLink = () => document.getElementById('search-by-name-link');
const searchByIngredientLink = () => document.getElementById('search-by-ingredient-link');
const surpriseMeLink = () => document.getElementById('surprise-me');

/** Event Listeners **/
//3 question rules: When? Cause? Effect?
const homePageLinkEvent = () => {
    homeLink().addEventListener('click', loadHomePage)
}
const searchByNameLinkEvent = () => {
    searchByNameLink().addEventListener('click', loadSearchByName)
}
const searchByIngredientLinkEvent = () => {
    searchByIngredientLink().addEventListener('click', loadSearchByIngredient)
}
const surpriseMeLinkEvent = () => {
    surpriseMeLink().addEventListener('click', fetchSurpriseCocktail)
}

/** Event Handlers **/
const loadHomePage = () =>{
    resetMainDiv();
    //resetting the page everytime it's loads
    const h1 = document.createElement('h1');
    h1.className = 'center-align';
    h1.innerText = "Welcome to Automated Cocktail Bar";
    mainDiv().appendChild(h1);
}

const loadSearchByName = event => {
    event.preventDefault();
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'Search Cocktail Recipe by Name';
    mainDiv().appendChild(h1);
}

const loadSearchByIngredient = event => {
    event.preventDefault();
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'Search Cocktail Recipe by Ingredients'
    mainDiv().appendChild(h1);
}

function loadSurpriseMe(surprise){
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'SURPRISE!!'
    mainDiv().appendChild(h1);
}

const fetchSurpriseCocktail = () => {
    fetch("http://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(resp => resp.json())
        .then(console.log(data));
        }



/** Helper **/
const resetMainDiv = () => {
    mainDiv().innerHTML= '';
//instead of adding, this will reset the page
}


/** Startup **/

document.addEventListener('DOMContentLoaded', function(){
    loadHomePage();
    homePageLinkEvent();
    searchByNameLinkEvent();
    searchByIngredientLinkEvent();
    surpriseMeLinkEvent();
})