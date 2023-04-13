// list of all questions, choices, and answers
const quiz = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['booleans', 'alerts', 'numbers'],
    answer: 'alerts',
    shuffle: function () {this.choices = shuffle3(this.choices)}
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
    shuffle: function () {this.choices = shuffle3(this.choices)}
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'numbers, strings, other arrays, and more',
    ],
    answer: 'numbers, strings, other arrays, and more',
    shuffle: function () {this.choices = shuffle3(this.choices)}
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
    shuffle: function () {this.choices = shuffle3(this.choices)}
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
    shuffle: function () {this.choices = shuffle3(this.choices)}
  },
];

// index is which question you're on
let index = 0;
const timerLength = 10;
let secondsLeft = timerLength;
let currentScore;
let yourName;

const startQuizButton = document.getElementById("start");
const highScoresButton = document.getElementById("view-highscores");
const clearHighscoresButton = document.getElementById("clear-highscores");
const backButton = document.getElementById("back");
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
const endQuizHeading = document.getElementById("end-quiz-heading");


init();

function init() {
  display(0); /* Display the welcome section */

  // Add events for all the buttons
  startQuizButton.addEventListener("click",startQuiz);
  highScoresButton.addEventListener("click",viewHighScores);
  clearHighscoresButton.addEventListener("click",function () {
    console.log("Clear high scores button calls clearHighscores()");
    clearHighscores();
  });
  backButton.addEventListener("click",function() {display(0)});
  nameForm.addEventListener("submit", function(event) {
    console.log("submit button calls setScore()");
    event.preventDefault();
    setScore();
  });
  setAnswerListeners();
}

function resetTimer() {
  secondsLeft = timerLength;
  timeLeft.textContent = secondsLeft;
  console.log("Reset Timer: "+secondsLeft);
}

function setTime() {
  console.log("setTime function");
  // Sets interval in variable
  let timerInterval = setInterval(function() {
    secondsLeft--;
    timeLeft.textContent = secondsLeft;
    console.log("Time left: "+secondsLeft);

    if(secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      endQuiz(false);
    }
    if (index == quiz.length) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function startQuiz() {
  resetTimer();
  timeLeft.textContent = secondsLeft;
  currentScore = 0;
  index = 0;
  result.textContent=""; /* result is where it displays correct or incorrect */
  display(1); /* Display the question card. */

  console.log("start quiz");

  resetTimer();
  
  setTime();


  setQuestion();
  
}

function endQuiz(win) {
  if (win) {
    endQuizHeading.textContent = "All Done!"
  } else {
    endQuizHeading.textContent = "Time's Up!"
  }
  display(2); /* display the end quiz section and set the rest to display: none */
  resetTimer();
  yourScore.textContent = "Your score: "+currentScore;
  yourNameEl.autofocus;
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
        
        endQuiz(true);
      }
    })
  }
}

function isCorrect(str) {
  return str === quiz[index].answer;
}

function setQuestion() {
  // Displays the question associated with the current index value
  questionEl.textContent = quiz[index].title;
  quiz[index].shuffle();
  for (i=0;i<3;i++) {
    answersEl[i].textContent =quiz[index].choices[i];
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