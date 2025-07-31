/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (const game of games) {
        const gameCard = document.createElement('div');
        gameCard.classList.add("game-card");
        gameCard.innerHTML = ` <img src="${game.img}" class="game-img"/> <strong> ${game.name} </strong> <p> ${game.pledged.toLocaleString('en-US')} </p> <p> ${game.description} </p>`;
        gamesContainer.appendChild(gameCard);
    }


}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, GAMES_JSON) => {
    return acc + GAMES_JSON.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString('en-US')}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalAmount = GAMES_JSON.reduce((acc, GAMES_JSON) => {
    return acc + GAMES_JSON.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `${totalAmount.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    let UnfundedList = GAMES_JSON.filter( (game) => 
        game.pledged < game.goal
    );
    addGamesToPage(UnfundedList);
    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let FundedList = GAMES_JSON.filter( (game) => 
        game.pledged >= game.goal
    );
    addGamesToPage(FundedList);

    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to count the number of unfunded games
const totalUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const totalFunded = GAMES_JSON.filter(game => game.pledged >= game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const Str = `A total of $${totalAmount.toLocaleString('en-US')} has been raised for ${totalFunded} games. Currently ${totalUnfunded} ${totalUnfunded > 1 ? "games" : "game"}  
remains unfunded. We need your help to fund these amazing games!"`

// create a new DOM element containing the template string and append it to the description container
const template = document.createElement("p");
template.innerHTML=Str;
descriptionContainer.appendChild(template);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// sort the games by pledged amount in descending order
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);
// use destructuring to grab the first and second games
const [firstGame, secondGame] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameContainer = document.getElementById("first-game");
const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);
// do the same for the runner up item
const secondGameContainer = document.getElementById("second-game");
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);
