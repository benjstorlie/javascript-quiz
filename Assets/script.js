const quiz = [
  {
    question: "Question?",
    answers: ["A","Bsuperreall y long answer here lal ala lorem ipsuom solor dolsmas dlgnd","C"],
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
let timerLength = 4;
let secondsLeft = timerLength;
let currentScore;
let yourName;

const startQuizButton = document.getElementById("start");
const highScoresButton = document.getElementById("view-highscores");
const clearHighscoresButton = document.getElementById("clear-highscores");
const timer = document.getElementById("timer");
const timeLeft = document.getElementById("time-left");

const questionEl = document.getElementById("question");
const answersEl = Array(3);
for (i=0;i<3;i++) {
  answersEl[i]=document.getElementById("ans"+i);
}
const answerButtons = document.getElementById("answer-box").children;

// Sections
const sections = document.querySelectorAll("main > section");
const result = document.getElementById("result");
const nameForm = document.getElementById("name-form");
const yourScore = document.getElementById("your-score");
const yourNameEl = document.getElementById("your-name");
const submit = document.getElementById("submit");
const highscoresEL = document.getElementById("highscores");
const highscoresHeadings = document.querySelectorAll(".grid-heading");

init();

function init() {
  display(0); /* Display the welcome section */

  // Add events for all the buttons
  startQuizButton.addEventListener("click",startQuiz);
  highScoresButton.addEventListener("click",viewHighScores);
  clearHighscoresButton.addEventListener("click",clearHighscores());
}

function resetTimer() {
  secondsLeft = timerLength;
}

function setTime() {
  // Sets interval in variable
  let timerInterval = setInterval(function() {
    secondsLeft--;
    timeLeft.textContent = secondsLeft;

    if(secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function startQuiz() {
  timeLeft.textContent = secondsLeft;
  currentScore = 0;
  result.textContent=""; /* result is where it displays correct or incorrect */
  display(1); /* Display the question card. */

  console.log("start quiz");

  resetTimer();
  setTime();


  setQuestion();
  setAnswerListeners();
}

function endQuiz() {
  display(2); /* display the end quiz section and set the rest to display: none */
  yourScore.textContent = "Your score: "+currentScore;
  yourNameEl.autofocus;
  nameForm.addEventListener("submit", function(event) {
    event.preventDefault();
    setScore();
  })
}

function setScore() {
  yourName = yourNameEl.value;
  let scores = JSON.parse(localStorage.getItem("scores"));
  if (scores !== null ) {
    scores.push({name: yourName, score: currentScore});
  } else {
    scores = [{name: yourName, score: currentScore}];
  }

  // Sort the high scores array based on the score
  scores.sort((x,y) => x.score - y.score);

  localStorage.setItem("scores",JSON.stringify(scores));
  console.log(yourName + ', ' + currentScore);

  viewHighScores();
}

function viewHighScores() {
  display(3); /* show the high scores card and set the other sections to display: none */
  fillHighscores();
}

function setAnswerListeners() {
  for (i=0;i<3;i++) {
    answerButtons[i].addEventListener("click", function() {
      if (isCorrect(this.children[1].textContent)) {
        gotCorrect();
      } else {
        gotIncorrect();
      }
      index++
      if (index < quiz.length) {
        setQuestion()
      } else {
        index = 0;
        endQuiz();
      }
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
  result.textContent = "✔️ Correct!"
  // Increment score
  currentScore ++
}

function gotIncorrect() {
  // Display incorrect
  result.textContent = "❌ Incorrect!"
  // Show correct answer, or guess again?
  // Decrement timer
  secondsLeft -= 5;
}

function fillHighscores() {
  // Create div elements to fill out the high scores page

  // Erase whatever was displayed previously.
  eraseHighscores();

  // get the scores from local storage, which is an array of objects
  let scores = JSON.parse(localStorage.getItem("scores"));

  // Sort the high scores array based on the score
  // They should be sorted already, so this is a reduncancy
  //scores.sort((x,y) => x.score - y.score);
  if (scores != null) {
    for (i=0;i<scores.length;i++) {
      let highscoresName = document.createElement("div");
      let highscoresScore = document.createElement("div");
      highscoresName.textContent = scores[i].name;
      highscoresScore.textContent = scores[i].score;
      highscoresEL.appendChild(highscoresName);
      highscoresEL.appendChild(highscoresScore);
    }
  }
}

function clearHighscores() {
  localStorage.setItem("scores",null);
  console.log(localStorage.getItem("scores"));
  fillHighscores();
}

function eraseHighscores() {
  // This only erases the display of the high scores, and does not clear them from local storage

  highscoresEL.replaceChildren(highscoresHeadings[0], highscoresHeadings[1]);

}

function display(n) {
  // Set the nth section under main to display: "block", and set the rest to display: "none"
  for (i=0; i<sections.length; i++) {
    if (i==n) {
      sections[i].style.display = "block";
    } else {
      sections[i].style.display = "none";
    }
  }
}

const permutations = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];

function shuffle3(array) {
  // This function returns a shuffled array of exactly 3 elements.
  // It's easier to just list the 6 permutations and pick from those.
  // I was getting some errors when trying to be clever about it.

  let newIndeces = permutations[Math.floor(6*Math.random())];

  newArray = [,,];
  for (i=0;i<3;i++) {
    newArray[i]=array[newIndeces[i]];
  }

  return newArray;
}