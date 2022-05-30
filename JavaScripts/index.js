/** Global Variables **/
const form = () => document.createElement('form');

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
    const label = document.createElement('label');
    h1.className = 'center-align';
    div1.className = 'row container';
    div2.className = 'input-field';
    input.className = 'validate';
    input.id = "cocktail-name";
    input.setAttribute('type', 'text');
    label.setAttribute('for', 'Cocktail-Name');
    h1.innerText = 'Search Cocktail Recipe by Name';
    label.innerText = 'Cocktail Name'
    mainDiv().appendChild(h1);
    mainDiv().appendChild(form()).appendChild(div1).appendChild(div2).appendChild(input).appendChild(label);
}


function renderSearchByIngredient(){
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'Search Cocktail Recipe by Ingredients'
    mainDiv().appendChild(h1);
}

function renderSurpriseMe(cocktail){
    resetMainDiv();
    const h1 = document.createElement('h1');
    const divCard = document.createElement('div');
    const divCardImg = document.createElement('div');
    const image = document.createElement('img');
    const span = document.createElement('span');
    divCardImg.className = 'card-image';
    divCard.className = 'card';
    span.className = 'card-title';
    h1.innerText = 'SURPRISE!!';
    span.innerText = cocktail.drinks[0].strDrink;
    image.src = cocktail.drinks[0].strDrinkThumb;
    mainDiv().appendChild(h1);
    h1.appendChild(divCard);
    divCard.appendChild(divCardImg);
    divCardImg.appendChild(image);
    divCardImg.appendChild(span);
    
//     <div class="card">

//     <div class="card-image">
//       <img src="https://www.thecocktaildb.com/images/media/drink/sih81u1504367097.jpg">
//       <span class="card-title">Tia-Maria</span>
//     </div>
//     <div class="card-content">
//       <p>I am a very simple card. I am good at containing small bits of information.
//       I am convenient because I require little markup to use effectively.</p>
//     </div>
//     <div class="card-action">
//       <a href="#">Add to my favorite</a>
//     </div>
// </div>
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