var log = console.log;
var dir = console.dir;
// Buttons
var submitId = document.querySelector("#submit");

//Elements
var inputId = document.querySelector("#input");
var scoreId = document.querySelector("#score");

var highScores = [];
var storedhighScores = JSON.parse(localStorage.getItem("highScores"));
var storedhighScore = JSON.parse(localStorage.getItem("user"));

init();

function init() {
    highScores = storedhighScores;
    scoreId.textContent = storedhighScore.score;
};

function store() {
    // Add code here to stringify the highScores array and save it to the "highScores" key in localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

submitId.addEventListener("click", addHighScores);
function addHighScores(event) {
    event.preventDefault();

    var tempUserName = (inputId.value).trim();
    var user = {
        userName: tempUserName,
        score: storedhighScore.score,
    };
     //var temp = findObjectByKey(highScores, tempUserName);
    var temp = highScores.find(x => x.userName === tempUserName);
    log(temp);
    if (temp === undefined) {
        // Add new user to highScores array, clear the input
        highScores.push(user);
        log("new user: " + user);
    }
    else {
        temp.score = user.score;
        temp.time = user.time;
        log("update user: " + user);
    }
    store();

    window.location.href = "highScores.html";
}

function findObjectByKey(array, value) {
    for (var i = 0; i < array.length; i++) {
        log("1 " + array[i]["userName"]);
        if (array[i]["userName"] === value) {
            return array[i];
        }
    }
    return null;
}