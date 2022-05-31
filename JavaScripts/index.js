/** Global Variables **/

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
    const form = document.createElement('form');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const btn = document.createElement('button');
    h1.className = 'center-align';
    form.className = 'col s12';
    div1.className = 'row container';
    div2.className = 'input-field col s6';
    input.className = 'validate';
    btn.className = 'waves-effect waves-light btn'
    form.id = 'form';
    input.id = "cocktail-name";
    btn.id = "search-by-name-submit";
    input.setAttribute('type', 'text');
    label.setAttribute('for', 'Cocktail_Name');
    h1.innerText = 'Search Cocktail Recipe by Name';
    label.innerText = 'Name';
    btn.innerText = 'search';
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e.target[0].value}`)
            .then(resp => resp.json())
            .then(data => {
                for(let i=1; i<16; i++){
                    //iterate through each ingredients and measurements
                    if(data.drinks[0][`strIngredient${i}`] == null){
                        break;
                    }
                    const h2 = document.createElement('h2');
                    //const ul = document.createElement('ul');
                    let li = document.createElement('li');
                    h2.innerText = data.drinks[0].strDrink;
                    li.innerHTML = data.drinks[0][`strIngredient${i}`] + ': ' + data.drinks[0][`strMeasure${i}`]
                    mainDiv().appendChild(h2);
                    h2.appendChild(li);
                    //ul.appendChild(li);
                }
            })
            resetMainDiv();
            e.target[0].value = ""
    })

    mainDiv().appendChild(h1);
    mainDiv().appendChild(form)
    form.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(input);
    div2.appendChild(label);
    div2.appendChild(btn);
}

function renderSearchByIngredient(){
    resetMainDiv();
    const h1 = document.createElement('h1');
    const form = document.createElement('form');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const btn = document.createElement('button');
    h1.className = 'center-align';
    form.className = 'col s12';
    div1.className = 'row container';
    div2.className = 'input-field col s6';
    input.className = 'validate';
    btn.className = 'waves-effect waves-light btn'
    input.id = "cocktail-ingredients";
    input.setAttribute('type', 'text');
    label.setAttribute('for', 'Cocktail_ingredients');
    h1.innerText = 'Search Cocktail Recipe by Ingredients'
    label.innerText = 'Ingredient';
    btn.innerText = 'search';
    mainDiv().appendChild(h1);
    mainDiv().appendChild(form)
    form.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(input);
    div2.appendChild(label);
    div2.appendChild(btn);
}

function renderSurpriseMe(cocktail){
    resetMainDiv();
    const h1 = document.createElement('h1');
    const div = document.createElement('div');
    const image = document.createElement('img'); 
    const h3 = document.createElement('h3');
    const ul = document.createElement('ul');
    const h4 = document.createElement('h4');
    
    h1.innerText = 'SURPRISE!!';
    image.src = cocktail.drinks[0].strDrinkThumb;
    h3.innerText = cocktail.drinks[0].strDrink;
    ul.className = 'card';
    h4.className = 'card';
    
    for(let i=1; i<16; i++){
        //iterate through each ingredients and measurements
        if(cocktail.drinks[0][`strIngredient${i}`] == null){
            break;
        }
        let li = document.createElement('li');
        li.innerHTML = cocktail.drinks[0][`strIngredient${i}`] + ': ' + cocktail.drinks[0][`strMeasure${i}`]
        ul.appendChild(li);
    }

    h4.innerText = cocktail.drinks[0].strInstructions

    mainDiv().append(h1, div);
    div.append(image, h3, h4);
    h3.append(ul);  
}

function fetchSurpriseMe(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(resp => resp.json())
    .then(data => renderSurpriseMe(data))
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