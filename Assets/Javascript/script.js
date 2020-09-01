var log = console.log;
var dir = console.dir;
// Buttons
var startQuizBtn = document.querySelector("#start-Quiz");
var viewScoresBtn = document.querySelector("#view-Scores");
var retakeTestBtn = document.querySelector("#retake-Test");
var retakeTestHeaderBtn = document.querySelector("#retake-Test-Header");
var clearHighScoresBtn = document.querySelector("#clear-High-Scores");
var adminBtn = document.querySelector("#edit-Questions");
var addQuestionBtn = document.querySelector("#add-question");
var resetQuestionBtn = document.querySelector("#reset-question");
var saveQuestionBtn = document.querySelector("#save-question");
var addOptionBtn = document.querySelector("#add-option");
var cancelQuestionBtn = document.querySelector("#cancel-question");
//pages
var startPageEl = document.querySelector("#start");
var highScoresPageEl = document.querySelector("#high-Scores");
var quizPageEl = document.querySelector("#quiz");
var savePageEl = document.querySelector("#save");
var adminPageEl = document.querySelector("#admin-Questions");
// Elements
var highScoresCountId = document.querySelector("#high-Scores-Count");
var highScoresListId = document.querySelector("#high-Scores-List");
var timeId = document.querySelector("#time");
var questionId = document.querySelector("#question");
var optionsId = document.querySelector("#options");
var feedbackId = document.querySelector("#feedback");
var modalId = document.querySelector("#modal-container");
var newQuestionId = document.querySelector("#new-question");
var optionListId = document.querySelector("#option-list");
var newAnswerId = document.querySelector("#new-answer");


var questionListId = document.querySelector("#question-List");

// Variables
var highScores = [];

var questionListDefault;
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

// first function called to setup the page
setPage("start");

// function that turns on and off div's depending on the page required.
function setPage(page) {
    questionListDefault = [...questionList];
    clearInterval(interval);
    switch (page) {
        case "start":
            startPageEl.style.display = "block";
            highScoresPageEl.style.display = "none";
            quizPageEl.style.display = "none";
            savePageEl.style.display = "none";
            adminPageEl.style.display = "none";
            break;
        case "quiz":
            startPageEl.style.display = "none";
            highScoresPageEl.style.display = "none";
            quizPageEl.style.display = "block";
            savePageEl.style.display = "none";
            adminPageEl.style.display = "none";
            startQuiz();
            break;
        case "save":
            startPageEl.style.display = "none";
            highScoresPageEl.style.display = "none";
            quizPageEl.style.display = "none";
            savePageEl.style.display = "block";
            adminPageEl.style.display = "none";
            initSave();
            break;
        case "admin":
            startPageEl.style.display = "none";
            highScoresPageEl.style.display = "none";
            quizPageEl.style.display = "none";
            savePageEl.style.display = "none";
            adminPageEl.style.display = "block";
            initQuestion();
            break;
        default: //highscore
            startPageEl.style.display = "none";
            highScoresPageEl.style.display = "block";
            quizPageEl.style.display = "none";
            savePageEl.style.display = "none";
            adminPageEl.style.display = "none";
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

// Quiz variables
var secondsPerQuestion = 6;
var totalTime;
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
    // leaving code for future development of storing questions in localStorage
    var storedQuestionList = JSON.parse(localStorage.getItem("questionList"));
    // check contents, if not null set to variable highscore to list else if null to empty
    if (storedQuestionList !== null) {
        questionList = storedQuestionList;
    }

    totalTime = questionList.length * secondsPerQuestion
    secondsElapsed = totalTime;
    timeId.textContent = totalTime;
    questionIndex = 0;
    complete = false;
    correct = 0;
    wrong = 0;
    // Start timer and display first question
    startTimer();
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
var inputId = document.querySelector("#initials-input");
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
    var timeTaken = parseInt(timeId.textContent);

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
retakeTestHeaderBtn.addEventListener("click", retakeTest);
adminBtn.addEventListener("click", adminClick);

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
        li.setAttribute("data-index", i);
        highScoresListId.appendChild(li);

        // Create a button for individual removal and add to list item
        var button = document.createElement("button");
        button.textContent = "Remove";
        li.appendChild(button);
        // add text in a span for styling button to the right
        var span = document.createElement("span");
        span.textContent = message;
        li.appendChild(span);
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

// set the admin page. A page to add, remove, edit questions, options and answer, just for fun ;)
function adminClick() {
    setPage("admin");
}
// #endregion

// #region admin

questionListId.addEventListener("click", questionListClick);
addQuestionBtn.addEventListener("click", addQuestion);
resetQuestionBtn.addEventListener("click", resetQuestion);
saveQuestionBtn.addEventListener("click", saveQuestion);
addOptionBtn.addEventListener("click", addOption);
cancelQuestionBtn.addEventListener("click", cancelQuestion);

// Function called to setup question page, get local storage and render the page
function initQuestion() {

    // Get from local storage
    var storedQuestionList = JSON.parse(localStorage.getItem("questionList"));
    // check contents, if not null set to variable question to list else if null to empty
    if (storedQuestionList !== null) {
        questionList = storedQuestionList;
    }
    //call function to render the Admin page
    renderQuestions();
}

// Save "Questions" in localStorage
function storeQuestions() {
    // Set to local storage
    localStorage.setItem("questionList", JSON.stringify(questionList));
}

// Clear all Questions from localStorage and render page
function resetQuestions() {
    //set variable highscores to empty, then store and render

    questionList = [...questionListDefault];
    storeQuestions();
    renderQuestions();
}

// Renders the Questions page
function renderQuestions() {
    // Clear question element
    questionListId.innerHTML = "";

    // Render a new li for each question
    for (var i = 0; i < questionList.length; i++) {
        // Create element, set text, set data index (for individual removal) and append to ul
        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        questionListId.appendChild(li);

        // Create a button for edit and delete and add to list item
        var buttonEdit = document.createElement("button");
        buttonEdit.textContent = "Edit";
        li.appendChild(buttonEdit);
        var buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Delete";
        li.appendChild(buttonDelete);
        // add text in a span for styling button to the right
        var span = document.createElement("span");
        span.textContent = questionList[i].question;
        li.appendChild(span);
    }
}

// When a element inside of the QuestionsList is clicked...
function questionListClick(event) {
    // Get the target element
    var element = event.target;

    // If that element is a button...            
    var index = element.parentElement.getAttribute("data-index");
    if (element.matches("button") === true) {
        // check if button was edit or delete
        if (element.innerHTML === "Edit") {
            var quest = questionList[index];
            editQuestion(quest); // edit
        }
        else if (element.innerHTML === "Delete") {
            // Get its data-index value and remove the Questions element from the list
            questionList.splice(index, 1); //delete
        }

        // Store updated Questions in localStorage, render the page
        storeQuestions();
        renderQuestions();
    }
}

// add a new question to the list
function editQuestion(quest) {
    modalId.style.display = "block";
    // clear the list, question and answer inputs
    optionListId.innerHTML = "";
    newQuestionId.value = "";
    newAnswerId.value = "";
    // set the values for Question and Answer based on past in value
    newQuestionId.value = quest.question;
    newAnswerId.value = quest.answer;
    // foreach option, create a list item
    for (var i = 0; i < quest.options.length; i++) {
        var li = document.createElement("li");
        optionListId.appendChild(li);
        var input = document.createElement("input");
        input.value = quest.options[i]
        li.appendChild(input);
    }
}

// add a new question to the list
function addQuestion() {
    log(questionList);
    // clear the list, question and answer inputs
    modalId.style.display = "block";
    optionListId.innerHTML = "";
    newQuestionId.value = "";
    newAnswerId.value = "";
    // add two options, must be at least two possible answers to make a questions ;)
    addOption();
    addOption();
}

// reset the question list to the defaults
function resetQuestion() {
    resetQuestions();
    alert("Questions reset");
}

// save the question list to the defaults
function saveQuestion() {
    // create variables
    var newQuestion = newQuestionId.value;
    var optionList = [];
    var newAnswer = newAnswerId.value;

    //run checks to make sure inputs are ok
    // get the contents of the list
    for (i = 0; i < optionListId.children.length; i++) {
        var value = optionListId.children[i].firstChild.value;
        // don't allow any blank values
        if (value === "") {
            alert("Potential answers can not be blank.");
            return;
        }
        optionList.push(value);
    }
    // don't allow any blank question or answer
    if (newQuestion === "" || newAnswer === "") {
        alert("Question or Answer can not be blank.");
        return;
    }
    var inc = optionList.includes(newAnswer);
    if (inc === false) {
        alert("Answer must match one question.");
        return;
    }

    // check/find an existing question in the list
    var temp = questionList.find(x => x.question === newQuestion);
    // if found then update the existing question, else create an new
    if (temp === undefined) {
        // Add new question to questionList array, clear the input
        var question = {
            question: newQuestion,
            options: optionList,
            answer: newAnswer,
        }
        questionList.push(question);
        log("new question: " + question);
    }
    else {
        // update existing question
        temp.options = optionList;
        temp.answer = newAnswer;
        log("update question: " + temp);
    }

    // store and render the page
    storeQuestions();
    renderQuestions();
    // hide the modal part of the page
    modalId.style.display = "none";
    log(questionList);
}

// add a possible answer
function addOption() {
    // create a list item and render to the page along with input field
    var li = document.createElement("li");
    optionListId.appendChild(li);
    var input = document.createElement("input");
    li.appendChild(input);
}

// cancel, hide the modal div
function cancelQuestion() {
    modalId.style.display = "none";
}

// #endregion