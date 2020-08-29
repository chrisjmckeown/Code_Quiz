var startQuizId = document.querySelector("#start-Quiz");

startQuizId.addEventListener("click", goToQuiz);
function goToQuiz() {
    window.location.href = "quiz.html";
}