const startButton = document.getElementById("start-btn");
const introductionElement = document.getElementById("introduction");
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const quiz = document.getElementById("quiz");
const resetButton = document.getElementById("reset-btn");
const highScoresElement = document.getElementById("high-scores");

//Quiz questions
const questions = [
  {
    question: "How do you write a single-line comment in JavaScript?",
    answers: [
      { text: "//Comment", correct: true },
      { text: "<-Comment->", correct: false },
      { text: "/*Comment*/", correct: false },
      { text: "#Comment", correct: false }
    ],
    correct: "//Comment"
  },
  {
    question: "What does the NaN value represent in JavaScript?",
    answers: [
      { text: "No available Number", correct: false },
      { text: "No additional Name", correct: false },
      { text: "Not a Number", correct: true },
      { text: "Not a Newcomer", correct: false }
    ],
    correct: "Not a Number"
  },
  {
    question: "What is the purpose of the return statement in a function in JavaScript?",
    answers: [
      { text: "To start a loop", correct: false },
      { text: "To comment out code", correct: false },
      { text: "To declare a variable", correct: false },
      { text: "To end the function and return a value to the calling code", correct: true }
    ],
    correct: "To end the function and return a value to the calling code"
  },
  {
    question: "How do you write a conditional statment in JavaScript that checks if a variable x is equal to 5?",
    answers: [
      { text: "If x equals 5", correct: false },
      { text: "If (x == 5)", correct: false },
      { text: "If (x === 5)", correct: true },
      { text: "If (x = 5)", correct: false }
    ], correct: "If (x === 5)"
  },
  {
    question: "What does the JavaScript typeof operator return when applied to 'true'?",
    answers: [
      { text: "Boolean", correct: true },
      { text: "Array", correct: false },
      { text: "String", correct: false },
      { text: "Object", correct: false }
    ], correct: "Boolean"
  },
];

let timer;
let score = 0;
let currentQuestionIndex = 0;
let timeLimit = 60;
let timerElement = document.getElementById("timer-value");

// Load high scores
window.onload = function() {
  loadScores();
}

// Load high scores from localStorage
function loadScores() {
  const existingScores = JSON.parse(localStorage.getItem("quizScores")) || [];
  console.log("High Scores:", existingScores);
}

//Starts Quiz when start button is clicked
function startQuiz() {
  introductionElement.classList.add('hide');
  quiz.classList.remove('hide');
  startTimer();
  showQuestion();
  resetButton.classList.add('hide');
}

//Starts 60 second timer
function startTimer() {
  timer = setInterval(function () {
    if (timeLimit <= 0) {
      clearInterval(timer);
      showScore();
    } else {
      timerElement.textContent = timeLimit;
      timeLimit--;
    }
  }, 1000);
}

 function resetTimer() {
  timeLimit = 0;
  timerElement.textContent = timeLimit;
 }

 // When quiz starts, questions are shown on webpage
function showQuestion() {
  questionElement.textContent = questions[currentQuestionIndex].question

  answerButton.innerHTML = ''

  for (var i = 0; i < questions[currentQuestionIndex].answers.length; i++) {
    var btn = document.createElement('button')
    btn.textContent = questions[currentQuestionIndex].answers[i].text;
    btn.setAttribute('class', 'btn')

    btn.addEventListener('click', selectAnswer)

   
    answerButton.append(btn)

  }
}

//Answer buttons, sends alert when answer is correct or incorrect
function selectAnswer() {
  const selectedBtn = this;
  if (selectedBtn.textContent !== questions[currentQuestionIndex].correct) {
    timeLimit -= 10
    timerElement.textContent = timeLimit;
    alert("That is incorrect!");
  }
  else {
  score++
  alert("That is correct!")
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    showScore()
  } else {
    showQuestion();
  }

}

//Shows the user their score when last question answer is selected
function showScore() {
  clearInterval(timer);
  answerButton.classList.add('hide');
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
 // Add a form to enter initials
 questionElement.innerHTML += `
 <form id="score-form">
   <label for="initials">Enter your initials:</label>
   <input type="text" id="initials" required>
   <button type="button" id="score-form-btn" onclick="saveScore()">Save Score</button>
 </form>
`;
resetTimer();

}

//Saves scores and lists them in console
function saveScore() {
  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value;
  if (initials.trim() !== "") {
    const existingScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    const newScore = { initials, score };
    existingScores.push(newScore);
    localStorage.setItem("quizScores", JSON.stringify(existingScores));
    alert("Score saved!");
  } else {
    alert("Please enter your initials.");
  }
  resetButton.classList.remove('hide');
  
}

 //Reset the quiz from the beginning
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLimit = 0;
  clearInterval(timer);
  timerElement.textContent = timeLimit;
  introductionElement.classList.remove('hide');
  quiz.classList.add('hide');
  answerButton.classList.add('hide');
  resetButton.classList.add('hide');
  startButton.classList.remove('hide');
  startQuiz();
}

startButton.addEventListener("click", startQuiz);
resetButton.addEventListener("click", resetQuiz);
