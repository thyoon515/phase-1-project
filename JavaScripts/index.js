
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
    const h1 = document.createElement('h1');
    const img = document.createElement('img');
    h1.className = 'center-align';
    h1.innerText = "Welcome to Cocktail Recipe";
    img.src = 'https://customneon.com/media/catalog/product/cache/1d858328874ebd6a1883e32a918ffc61/c/o/cocktail-glass-turnedon-customneon.jpg'
    img.setAttribute('style', 'margin-top: 100px')
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
    form.id = 'search-by-name-form';
    input.id = "text-input";
    btn.id = "search-by-name-submit";
    input.setAttribute('type', 'text');
    label.setAttribute('for', 'Cocktail_Name');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'POST');
    h1.innerText = 'Search Cocktail Recipe by Name';
    label.innerText = 'Cocktail Name';
    btn.innerText = 'search'; 
    
    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        fetchSearchByName(e.target[0].value); //target input field to pass in input value to search the API
        form.reset();
    })

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
    const img = document.createElement('img'); 
    const h4Recipe = document.createElement('h4');
    const h4Instruction = document.createElement('h4');
    const ul = document.createElement('ul');
    div.className = 'card';
    h1.innerText = 'SURPRISE!!';
    h4Recipe.innerText = cocktail.drinks[0].strDrink;
    h4Instruction.innerText = cocktail.drinks[0].strInstructions
    img.src = cocktail.drinks[0].strDrinkThumb;
    
    for(let i=1; i<16; i++){
        //iterate through each ingredients and measurements
        if(cocktail.drinks[0][`strIngredient${i}`] == null){
            break;
        }
        let li = document.createElement('li');
        li.innerHTML = cocktail.drinks[0][`strIngredient${i}`] + ': ' + cocktail.drinks[0][`strMeasure${i}`]
        ul.appendChild(li);
    }
    mainDiv().append(h1, div);
    div.append(img, h4Recipe, h4Instruction);
    h4Recipe.append(ul);  
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
        const cardDiv = document.createElement('div');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const h4Ins = document.createElement('h4');
        const h4 = document.createElement('h4');
        const ul = document.createElement('ul');
        cardDiv.className = 'card';
        img.src = data.drinks[0].strDrinkThumb;
        h3.innerText = data.drinks[0].strDrink;
        h4Ins.innerText = data.drinks[0].strInstructions;
                
        for(let i=1; i<16; i++){
            if(data.drinks[0][`strIngredient${i}`] == null){
                break;
            }
            let li = document.createElement('li');
            li.innerHTML = data.drinks[0][`strIngredient${i}`] + ': ' + data.drinks[0][`strMeasure${i}`]
            ul.appendChild(li);
        }
        mainDiv().append(cardDiv);
        cardDiv.appendChild(h3);
        cardDiv.appendChild(img);
        cardDiv.appendChild(h4);
        h4.appendChild(ul);
        cardDiv.appendChild(h4Ins);
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