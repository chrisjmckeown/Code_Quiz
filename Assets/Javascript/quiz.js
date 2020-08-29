var log = console.log;
var dir = console.dir;
// Buttons

//Elements
var timeId = document.querySelector("#time");
var questionId = document.querySelector("#question");
var optionsId = document.querySelector("#options");
var feedbackId = document.querySelector("#feedback");

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

var secondsElapsed = 10;
var interval;
var questionIndex = 0;
var complete;
var correct = 0;
var wrong = 0;

startQuiz();

function startQuiz() {
    complete = false;
    secondsElapsed = 10;
    timeId.textContent = secondsElapsed;
    startTimer();
    displayQuestion();
};

function displayQuestion() {
    optionsId.innerHTML = "";
    // feedbackId.textContent = "";

    var question = questionList[questionIndex];
    questionId.textContent = question.question;

    for (var i = 0; i < question.options.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("question", "question");
        optionsId.appendChild(li);

        var button = document.createElement("button");
        li.setAttribute("question", "question");
        button.textContent = i + ". " + question.options[i];;
        li.appendChild(button);
    }
};

function startTimer() {
    // Start the timer
    interval = setInterval(function () {

        if (secondsElapsed < 1) {
            timeEnded(false);
        }
        else {
            secondsElapsed--;
            calculateSeconds();
        }
    }, 1000);
}

function timeEnded(state) {
    complete = true;
    if (!state) {
        alert("Time's up!!!");
    }
    clearInterval(interval);

    log("correct " + correct);
    log("wrong " + wrong);
    log("total " + questionList.length);

    var unanswered = questionList.length - (wrong + correct);
    
    var user = {
        score: correct,
        time: secondsElapsed,
    };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "savedScore.html";
}

function calculateSeconds() {
    var seconds = secondsElapsed;
    log(secondsElapsed);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    timeId.textContent = seconds;
}

// When question option is clicked...
optionsId.addEventListener("click", function (event) {
    log(complete);
    if (!complete) {
        var element = event.target;
        // If that element is a button...
        if (element.matches("button") === true) {
            var question = questionList[questionIndex];
            dir(element.innerHTML);
            if (element.innerHTML.includes(question.answer)) {
                correct++;
                feedbackId.textContent = "Correct";
                setTimeout(() => {
                    feedbackId.textContent = "";
                }, 1000);
            }
            else {
                wrong++;
                secondsElapsed -= 2;
                feedbackId.textContent = "Wrong!";
                setTimeout(() => {
                    feedbackId.textContent = "";
                }, 1000);
            }
            questionIndex++;
            //if completed stop
            if (questionIndex === questionList.length) {
                log("ending");
                timeEnded(true);
            }
            else {
                displayQuestion();
            }
        }
    }
});