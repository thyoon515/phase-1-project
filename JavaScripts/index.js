/** Global Variables **/


/** Node Getters **/
const mainDiv = () => document.getElementById('main');
//set variables as function to lower bug issues
const homeLink = () => document.getElementById('home-link');

/** Event Listeners **/
//3 question rules: When? Cause? Effect?
const homePageLinkEvent = () => {
    homeLink().addEventListener('click', loadHomePage)
}


/** Event Handlers **/
const loadHomePage = () =>{
    resetMainDiv();
    //resetting the page everytime it's loads
    const h1 = document.createElement('h1');
    h1.className = 'center-align';
    h1.innerText = "Welcome to 24hr Cocktail Bar";

    mainDiv().appendChild(h1);
}


/** Misc. **/
const resetMainDiv = () => {
    mainDiv().innerHTML= '';
//instead of adding, this will reset the page
}


/** Startup **/

document.addEventListener('DOMContentLoaded', function(){
    loadHomePage();
    homePageLinkEvent();
})