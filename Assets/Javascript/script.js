var log = console.log;
var dir = console.dir;
// Buttons
var startQuizBtn = document.querySelector("#start-Quiz");
var viewScoresBtn = document.querySelector("#view-Scores");
var retakeTestBtn = document.querySelector("#retake-Test");
var clearHighScoresBtn = document.querySelector("#clear-High-Scores");
//pages
var startPageEl = document.querySelector("#start");
var highScoresPageEl = document.querySelector("#high-Scores");
var quizPageEl = document.querySelector("#quiz");
var savePageEl = document.querySelector("#save");
// Elements
var highScoresCountId = document.querySelector("#high-Scores-Count");
var highScoresListId = document.querySelector("#high-Scores-List");
var timeId = document.querySelector("#time");
var questionId = document.querySelector("#question");
var optionsId = document.querySelector("#options");
var feedbackId = document.querySelector("#feedback");

// first function called to setup the page
setPage("start");

// Variables
var highScores = [];

// function that turns on and off div's depending on the page required.
function setPage(page) {
    clearInterval(interval);
    switch (page) {
        case "start":
            startPageEl.style.display = "block";
            highScoresPageEl.style.display = "none";
            quizPageEl.style.display = "none";
            savePageEl.style.display = "none";
            break;
        case "quiz":
            startPageEl.style.display = "none";
            highScoresPageEl.style.display = "none";
            quizPageEl.style.display = "block";
            savePageEl.style.display = "none";
            startQuiz();
            break;
        case "save":
            startPageEl.style.display = "none";
            highScoresPageEl.style.display = "none";
            quizPageEl.style.display = "none";
            savePageEl.style.display = "block";
            initSave();
            break;
        default: //highscore
            startPageEl.style.display = "none";
            highScoresPageEl.style.display = "block";
            quizPageEl.style.display = "none";
            savePageEl.style.display = "none";
            initHighScores();
    }
};

// #region global events
viewScoresBtn.addEventListener("click", viewScores);
function viewScores() {
    setPage("highscore");
}
// #endregion

// #region start
//start listener
startQuizBtn.addEventListener("click", startPage);
function startPage() {
    // set the quiz page up ready for test
    setPage("quiz");
}
//#endregion

// #region quiz

// List of questions
var questionList = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        options: ["quotes", "curly brackets", "parentheses", "sqare brackets"],
        answer: "curly brackets",
    },
    {
        question: "Arrays in JavaScipt can be used to store _____.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    {
        question: "String values must be enclosed within _____ when being assigned to valiables.",
        options: ["commas", "curley brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console log"],
        answer: "console log",
    },
];

// Quiz variables
var totalTime = 30
var secondsElapsed;
var interval;
var questionIndex;
var complete;
var correct;
var wrong;

//quiz listeners
optionsId.addEventListener("click", answerSelected);

// Function to set up the quiz, set complete to false, seconds and visual counter to 30
function startQuiz() {
    secondsElapsed = totalTime;
    timeId.textContent = totalTime;
    questionIndex = 0;
    complete = false;
    correct = 0;
    wrong = 0;
    // Start timer and display first question
    //startTimer();
    displayQuestion();
};

// display the question
function displayQuestion() {
    // clear the previous question
    optionsId.innerHTML = "";

    //get the next quesions in the list, note questionIndex is initiated to 0 in start quiz
    var question = questionList[questionIndex];
    // set question
    questionId.textContent = question.question;

    // loop through all possible options/answer and add to the list
    for (var i = 0; i < question.options.length; i++) {
        // Create list element, note no text, this is within the button
        var li = document.createElement("li");
        li.setAttribute("question", "question");
        li.textContent = i + ". " + question.options[i];;
        optionsId.appendChild(li);
    }
};

// Starts the timers
function startTimer() {
    // Start the timer
    interval = setInterval(function () {
        // check to see if time has elapsed
        if (secondsElapsed < 1) {
            // if yes set time end variables
            timeEnded(false);
        }
        else {
            // if no, reduce seconds elapsed and display time
            secondsElapsed--;
            calculateSeconds();
        }
    }, 1000);
}

// Either time has run out, or all questions have been answered
function timeEnded(state) {
    //set complete to true
    complete = true;
    // if time is up then out a message to say time is up
    if (!state) {
        alert("Time's up!!!");
    }
    // clear the timer
    clearInterval(interval);
    // initialize the save page
    setPage("save");
}

// Formats the displayed seconds
function calculateSeconds() {
    var seconds = secondsElapsed;
    log(secondsElapsed);
    // if less than 10 pad with a leading 0
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    timeId.textContent = seconds;
}

// When question option is clicked...
function answerSelected(event) {
    // only process if not complete
    if (!complete) {
        var element = event.target;
        dir(element);
        // If that element is a button...
        if (element.matches("li") === true) {
            // get the current question
            var question = questionList[questionIndex];
            dir(element.innerHTML);
            // check if the button selected contains the correct answer
            if (element.innerHTML.includes(question.answer)) {
                // correct, increase correct by 1
                correct++;
                // set feedback text to correct
                feedbackId.textContent = "Correct";
                // leave feedback text for 1 second before clearing
                setTimeout(() => {
                    feedbackId.textContent = "";
                }, 1000);
            }
            else {
                // incorrect, increase correct by 1
                wrong++;
                secondsElapsed -= 2;
                // set feedback text to correct
                feedbackId.textContent = "Wrong!";
                // leave feedback text for 1 second before clearing
                setTimeout(() => {
                    feedbackId.textContent = "";
                }, 1000);
            }
            // increase the index by 1
            questionIndex++;
            //if completed the end the quiz, else display the next question
            if (questionIndex === questionList.length) {
                timeEnded(true);
            }
            else {
                displayQuestion();
            }
        }
    }
};
// #endregion

// #region save
// Buttons
var submitId = document.querySelector("#submit");

//Elements
var inputId = document.querySelector("#input");
var scoreId = document.querySelector("#score");

//quiz listeners
submitId.addEventListener("click", addHighScores);

// initiates the save
function initSave() {
    // present the score (correct value)
    scoreId.textContent = correct;
};

// saves the to localStorage
function storeHighScore() {
    // Add code here to stringify the highScores array and save it to the "highScores" key in localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function addHighScores(event) {
    event.preventDefault();
    // get the input user name and trim it
    var tempUserName = (inputId.value).trim();
    var timeTaken = parseInt( timeId.textContent);

    // create the user object
    var user = {
        userName: tempUserName,
        score: correct,
        time: timeTaken,
    };
    // check/find an existing user in the list
    var temp = highScores.find(x => x.userName === tempUserName);
    log(temp);
    // if found then update the existing user, else create an new
    if (temp === undefined) {
        // Add new user to highScores array, clear the input
        highScores.push(user);
        log("new user: " + user);
    }
    else {
        // update existing user
        temp.score = user.score;
        temp.time = user.time;
        temp.time = timeTaken;
        log("update user: " + user);
    }
    // store to localStorage.
    storeHighScore();
    // load highScore page
    setPage("highscore");
}
// #endregion

// #region highscore
//high scores listeners
clearHighScoresBtn.addEventListener("click", clearHighScores);
highScoresListId.addEventListener("click", highScoresListClick);
retakeTestBtn.addEventListener("click", retakeTest);

// Function called to setup highScores page, get local storage and render the page
function initHighScores() {
    // Get from local storage
    var storedhighScores = JSON.parse(localStorage.getItem("highScores"));
    // check contents, if not null set to variable highscore to list else if null to empty
    if (storedhighScores !== null) {
        highScores = storedhighScores;
    }
    else {
        highScores = [];
    }
    //call function to render the highScores page
    renderHighScores();
}

// Save "highScores" in localStorage
function storeHighScores() {
    // Set to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Clear all scores from localStorage and render page
function clearHighScores() {
    //set variable highscores to empty, then store and render
    highScores = [];
    storeHighScores();
    renderHighScores();
}

// Renders the highScore page
function renderHighScores() {
    // Clear highScores element and set highScores count
    highScoresListId.innerHTML = "";
    highScoresCountId.textContent = highScores.length;

    // Render a new li for each high score
    for (var i = 0; i < highScores.length; i++) {
        // building string for the list, id, user name and score
        var message =
            i + ": " +
            highScores[i].userName + " - Score: " +
            highScores[i].score + " - Time remaining: " +
            highScores[i].time;

        // Create element, set text, set data index (for individual removal) and append to ul
        var li = document.createElement("li");
        li.textContent = message;
        li.setAttribute("data-index", i);
        highScoresListId.appendChild(li);

        // Create a button for individual removal and add to list item
        var button = document.createElement("button");
        button.textContent = "Remove";
        li.appendChild(button);
        highScoresListId.appendChild(li);
    }
}

// When a element inside of the highScoresList is clicked...
function highScoresListClick(event) {
    // Get the target element
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {
        // Get its data-index value and remove the highScores element from the list
        var index = element.parentElement.getAttribute("data-index");
        highScores.splice(index, 1);

        // Store updated highScores in localStorage, render the page
        storeHighScores();
        renderHighScores();
    }
}

// set the start page up ready for retake
function retakeTest() {
    setPage("start");
}
// #endregion