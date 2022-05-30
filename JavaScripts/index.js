/** Global Variables **/
const form = () => document.createElement('form');
let drinks = [];

/** Nodes **/
const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');
const searchByNameLink = () => document.getElementById('search-by-name-link');
const searchByIngredientLink = () => document.getElementById('search-by-ingredient-link');
const surpriseMeLink = () => document.getElementById('surprise-me-link');

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
function surpriseMeLinkEvent(){
    surpriseMeLink().addEventListener('click', fetchSurpriseMe)
}

/** Event Handlers **/
function renderHomePage(){
    resetMainDiv();
    //reset the page everytime it renders
    const h1 = document.createElement('h1');
    h1.className = 'center-align';
    h1.innerText = "Welcome to Find Cocktail Recipe";
    mainDiv().appendChild(h1);
}

function renderSearchByName(){
    resetMainDiv();
    const h1 = document.createElement('h1');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const input = document.createElement('input');
    h1.className = 'center-align';
    div1.className = 'row container';
    div2.className = 'input-field';
    input.className = 'validate';
    input.id = "cocktail-name";
    input.type = "text";
    h1.innerText = 'Search Cocktail Recipe by Name';
    mainDiv().appendChild(h1);
    mainDiv().appendChild(form()).appendChild(div1).appendChild(div2).appendChild(input);
}


function renderSearchByIngredient(){
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'Search Cocktail Recipe by Ingredients'
    mainDiv().appendChild(h1);
}

function renderSurpriseMe(drinks){
    resetMainDiv();
    const h1 = document.createElement('h1');
    const div = document.createElement('div');
    h1.innerText = 'SURPRISE!!';
    div.innerHTML = drinks;
    mainDiv().appendChild(h1);
    mainDiv().appendChild(div);
}

function fetchSurpriseMe(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(resp => resp.json())
    .then(data => {
        renderSurpriseMe(data)
    })
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
    searchByIngredientLinkEvent();
    surpriseMeLinkEvent();
})