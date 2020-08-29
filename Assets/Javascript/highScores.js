var log = console.log;
var dir = console.dir;
// Buttons
var homePageId = document.querySelector("#home-Page");
var clearHighScoresId = document.querySelector("#clear-High-Scores");
var addHighScoresId = document.querySelector("#add-High-Scores");

//Elements
var highScoresId = document.querySelector("#high-Scores-list");
var highScoresCountId = document.querySelector("#high-Scores-count");
var highScoresListId = document.querySelector("#high-Scores-list");

var highScores = [];

init();
function init() {
    var storedhighScores = JSON.parse(localStorage.getItem("highScores"));
    console.log(storedhighScores);
    if (storedhighScores !== null) {
        highScores = storedhighScores;
    }
    // Render todos to the DOM
    render();
}

function render() {
    // Clear high Scores element
    highScoresId.innerHTML = "";
    highScoresCountId.textContent = highScores.length;

    // Render a new li for each high score
    for (var i = 0; i < highScores.length; i++) {
        var message =
            i + ": " +
            highScores[i].userName + " - Score: " +
            highScores[i].score;

        var li = document.createElement("li");
        li.textContent = message;
        li.setAttribute("data-index", i);
        highScoresId.appendChild(li);

        var button = document.createElement("button");
        button.textContent = "Remove";

        li.appendChild(button);
        highScoresId.appendChild(li);
    }
}

homePageId.addEventListener("click", goToHomePage);
function goToHomePage() {
    window.location.href = "index.html";
}

function store() {
    // Add code here to stringify the highScores array and save it to the "highScores" key in localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

clearHighScoresId.addEventListener("click", clearHighScores);
function clearHighScores() {
    event.preventDefault();
    //localStorage.removeItem("highScores");
    highScores = [];
    store();
    render();
}

//for testing
addHighScoresId.addEventListener("click", addHighScores);
function addHighScores(event) {
    //event.preventDefault();

    var user = {
        userName: "Chris",
        score: 10,
    };

    // Add new user to highScores array, clear the input
    highScores.push(user);

    // Store updated highScores in localStorage, re-render the list
    store();
    render();
}

// When a element inside of the highScoresList is clicked...
highScoresListId.addEventListener("click", function (event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {
        // Get its data-index value and remove the highScores element from the list
        var index = element.parentElement.getAttribute("data-index");
        highScores.splice(index, 1);

        // Store updated highScores in localStorage, re-render the list
        store();
        render();
    }
});