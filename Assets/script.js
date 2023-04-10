const quiz = [
  {
    question: "What's up?",
    answers: ["A","B","C"],
    correct: "A",
    shuffle: function () {this.answers = shuffle3(this.answers)}
  },
  {
    question: "I'm a question?",
    answers: ["E","F","G"],
    correct: "E",
    shuffle: function () {this.answers = shuffle3(this.answers)}
  },
  {
    question: "Lorem ipsum?",
    answers: ["I","J","K"],
    correct: "K",
    shuffle: function () {this.answers = shuffle3(this.answers)}
  },
  {
    question: "Toby?",
    answers: ["M","N","O"],
    correct: "N",
    shuffle: function () {this.answers = shuffle3(this.answers)}
  },
  {
    question: "You're taking a quiz?",
    answers: ["P","Q","R"],
    correct: "Q",
    shuffle: function () {this.answers = shuffle3(this.answers)}
  },
];

// index is which question you're on
let index = 0;
let secondsLeft;
let timerLength = 35;

let startQuizButton = document.getElementById("start");
let highScoresButton = document.getElementById("view-highscores");
let timer = document.getElementById("timer");
let timeLeft = document.getElementById("time-left");

let questionEl = document.getElementById("question");
let answersEl = [,,];
for (i=0;i<3;i++) {
  answersEl[i]=document.getElementById("ans"+i);
}
let answerButtons = document.getElementById("answer-box").children;

// Sections
let welcome = document.getElementById("welcome");
let questionCard = document.getElementById("question-card");
let endQuiz = document.getElementById("endQuiz");
let highscoresCard = document.getElementById("highscores-card");


init();

function init() {
  welcome.style.display = "block"
  questionCard.style.display = "none";
  endQuiz.style.display = "none";
  highscoresCard.style.display = "none";
  startQuizButton.addEventListener("click",startQuiz);
  highScoresButton.addEventListener("click",viewHighScores);
}

function resetTimer() {
  secondsLeft = timerLength;
}

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeLeft.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}

function startQuiz() {
  welcome.style.display = "none";
  questionCard.style.display = "block";
  endQuiz.style.display = "none";
  highscoresCard.style.display = "none";
}



function viewHighScores() {
  welcome.style.display = "none";
  questionCard.style.display = "none";
  endQuiz.style.display = "none";
  highscoresCard.style.display = "block";
}

function setAnswerListeners() {
  for (i=0;i<3;i++) {
    answerButtons[i].addEventListener("click", function() {
      if (isCorrect(answersEl[i].textContent)) {
        // correct function
      } else {
        // incorrect function
      }
      index++
      setQuestion()
    })
  }
}

function isCorrect(str) {
  return str === quiz[index].correct;
}

function setQuestion() {
  questionEl.textContent = quiz[index].question;
  quiz[index].shuffle();
  for (i=0;i<3;i++) {
    answersEl[i].textContent =quiz[index].answers[i];
  }
}

function gotCorrect() {
  // Display correct
}

function gotIncorrect() {
  // Display incorrect
  // Show correct answer, or guess again?
  // Decrement timer
}




function shuffle3(array) {
  // This function will return a shuffled array with exactly 3 elements
  // The other option for how to do this would just be to list out the six permutations

  // Pick which element will be first
  const first = Math.floor(3*Math.random());

  // Pick the second element, either the one before or after the first one chosen.
  // "direction" will be either +1 or -1
  const direction = 2*Math.floor(2*Math.random())-1;

  newArray = [,,];
  newArray[0] = array[first];
  newArray[1] = array[(first + direction) % 3];
  newArray[2] = array[(first - direction) % 3];

  return newArray;
}