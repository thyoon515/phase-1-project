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
    const img = document.createElement('img');
    h1.className = 'center-align';
    h1.innerText = "Welcome to Find Cocktail Recipe";
    img.src = 'https://customneon.com/media/catalog/product/cache/1d858328874ebd6a1883e32a918ffc61/c/o/cocktail-glass-turnedon-customneon.jpg'
    mainDiv().appendChild(h1);
    h1.appendChild(img);
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
    const div = document.createElement('div');
    const image = document.createElement('img'); 
    const h2 = document.createElement('h2');
    const ul = document.createElement('ul');
    const p = document.createElement('p');
    
    h1.innerText = 'SURPRISE!!';
    image.src = cocktail.drinks[0].strDrinkThumb;
    h2.innerText = cocktail.drinks[0].strDrink;
    ul.className = 'card';
    p.className = 'card';
    
    for(let i=1; i<16; i++){
        //iterate through each ingredients and measurements
        if(cocktail.drinks[0][`strIngredient${i}`] == null){
            break;
        }
        let li = document.createElement('li');
        li.innerHTML = cocktail.drinks[0][`strIngredient${i}`] + ': ' + cocktail.drinks[0][`strMeasure${i}`]
        ul.appendChild(li);
    }

    p.innerText = cocktail.drinks[0].strInstructions

    mainDiv().appendChild(h1);
    h1.appendChild(div);
    div.append(image, h2);
    h2.appendChild(ul);
    div.append(p)    
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