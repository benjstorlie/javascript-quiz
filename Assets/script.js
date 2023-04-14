class QuizItem {
  // This class defines the quiz item.  Its arguments are the question title, the answer, followed by two distractors.
  // The choices are shuffled in the constructor, so you wouldn't be able to tell the answer from the order of this.choices

  //I think I used static correctly. permutations is just the 6 permutations of [0,1,2]. I could define it as a global variable, but it's only being used in the quizItem method shuffle. And it doesn't make sense to define it every time the method is called.
  static permutations = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];

  constructor(title,answer,choice1,choice2) {
    this.title = title;
    this.choices = [answer,choice1,choice2];
    this.answer=answer;
    this.shuffle()
  }
  shuffle() {
    // This function returns a shuffled array of exactly 3 elements.
    // It's easier to just list the 6 permutations and pick from those.
    // I was getting some errors when trying to be clever about it.

    let newIndeces = QuizItem.permutations[Math.floor(6 * Math.random())];

    let newChoices = Array(3);
    for (let i = 0; i < 3; i++) {
      newChoices[i] = this.choices[newIndeces[i]];
    }
    this.choices = newChoices;
  }
}

// quiz is the variable containing all of the multiple choice items.
quiz = [
  new QuizItem(
    'Commonly used data types DO NOT include:',
    'alerts', //answer
    'booleans',
    'numbers'
  ),
  new QuizItem(
    'The condition in an if / else statement is enclosed within ____.',
    'parentheses', //answer
    'curly brackets',
    'square brackets'
  ),
  new QuizItem(
    'Arrays in JavaScript can be used to store ____.',
    'numbers, strings, other arrays, and more', //answer
    'numbers and strings',
    'other arrays'
  ),
  new QuizItem(
    'String values must be enclosed within ____ when being assigned to variables.',
    'quotes', //answer
    'curly brackets',
    'parentheses'
  ),
  new QuizItem(
    'A very useful tool used during development and debugging for printing content to the debugger is:',
    'console.log', //answer
    'terminal / bash',
    'for loops'
  ),
];

// index is which question the player is on. It's defined as 0 in the function startQuiz
let index;
const timerLength = 10;
// decrement is how much time the player loses when answering incorrectly
const decrement = 5;
let secondsLeft = timerLength;
// currentScore is how many questions are answered correctly. It's defined as 0 in the function startQuiz
let currentScore;
// yourName will be the initials the player enters at the end of the quiz
let yourName;

// Define all the html elements as variables

// Define all the button elements
const startQuizButton = document.getElementById("start");
const highScoresButton = document.getElementById("view-highscores");
const clearHighscoresButton = document.getElementById("clear-highscores");
const backButton = document.getElementById("back");
// Define the 3 answer buttons (which are just <div>s not <buttons>)
const answerButtons = document.getElementById("answer-box").children;

// answersEl is the elements holding the text of the 3 answers. This is different from answerButtons, which contain the 1., 2., 3. as well.
const answersEl = Array(3);
for (i = 0; i < 3; i++) {
  answersEl[i] = document.getElementById("ans" + i);
}

const sections = document.querySelectorAll("main > section"); //the 4 sections which display 1 at a time: welcome, question-card, end-quiz, and highscores-card
const timeLeft = document.getElementById("time-left"); //the span element displaying how much time is left
const questionEl = document.getElementById("question"); //the heading with the text of the question
const endQuizHeading = document.getElementById("end-quiz-heading");
const result = document.getElementById("result"); //at the end of the quiz, the span showing how many questions were answered correctly
const yourScore = document.getElementById("your-score");
const nameForm = document.getElementById("name-form");
const yourNameEl = document.getElementById("your-name");
const highscoresEl = document.getElementById("highscores"); 




init();

function init() {
  display(0); // Display the welcome section

  // The page will display the length of the timer, so the user knows that information before the quiz starts.
  // When the quiz starts, it will display how many seconds are left.
  timeLeft.textContent = timerLength;

  // Fill in the description of the quiz rules with the variables of the timer length and number of questions.
  document.getElementById("rules-timer-length").textContent = timerLength;
  document.getElementById("rules-quiz-length").textContent = quiz.length;
  document.getElementById("rules-decrement").textContent = decrement;

  // Add events for all the buttons
  startQuizButton.addEventListener("click", startQuiz);
  highScoresButton.addEventListener("click", viewHighScores);
  clearHighscoresButton.addEventListener("click", clearHighscores);
  backButton.addEventListener("click", function () { display(0) });
  nameForm.addEventListener("submit", function (event) {
    event.preventDefault();
    setScore();
  });
  setAnswerListeners();
}

function setTime() {
  // This is the timer function.  setTime is called at the start of the quiz and starts counting down.
  timeLeft.textContent = secondsLeft;
  // Sets interval in variable
  let timerInterval = setInterval(function () {
    secondsLeft--; // Decrement seconds
    timeLeft.textContent = secondsLeft; // Update the display

    if (secondsLeft <= 0) {
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
  // This function is called when the "start quiz" button is clicked.
  secondsLeft = timerLength;
  currentScore = 0;
  index = 0;
  result.textContent = ""; /* result is where it displays correct or incorrect */
  display(1); /* Display the question card. */

  // The "view high scores" button is hidden during the quiz because, so the user needs to complete the quiz first. This makes things simpler.
  highScoresButton.style.visibility = hidden;

  setQuestion(); // Display the question and choices
  setTime(); // Start the timer
}

function endQuiz(win) {
  // This function is called when the quiz comes to an end.
  // The argument win is a Boolean. It is true if the player completed all the questions, and false if the timer ran out.
  // The only difference is the display.
  if (win) {
    endQuizHeading.textContent = "All Done!"
  } else {
    endQuizHeading.textContent = "Time's Up!"
  }
  display(2); /* display the end quiz section and set the rest to display: none */

  highScoresButton.style.visibility = visible; 

  timeLeft.textContent = timerLength;
  yourScore.textContent = currentScore;
  yourNameEl.select();
}

function setScore() {
  yourName = yourNameEl.value;
  let scores = JSON.parse(localStorage.getItem("scores"));
  if (scores !== null) {
    scores.push({ name: yourName, score: currentScore });
  } else {
    scores = [{ name: yourName, score: currentScore }];
  }

  // Sort the high scores array based on the score
  scores.sort((x, y) => y.score-x.score);

  localStorage.setItem("scores", JSON.stringify(scores));
  viewHighScores();
}

function viewHighScores() {
  display(3); /* show the high scores card and set the other sections to display: none */
  fillHighscores();
}

function setAnswerListeners() {
  for (i = 0; i < 3; i++) {
    answerButtons[i].addEventListener("click", function () {
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
  for (i = 0; i < 3; i++) {
    answersEl[i].textContent = quiz[index].choices[i];
  }
}

function gotCorrect() {
  // Display correct
  result.textContent = "✔️ Correct!"
  // Increment score
  currentScore++
}

function gotIncorrect() {
  // Display incorrect
  result.textContent = "❌ Incorrect!"
  // Show correct answer, or guess again?
  // Decrement timer
  secondsLeft = secondsLeft - decrement;

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
    for (i = 0; i < scores.length; i++) {
      let highscoresName = document.createElement("div");
      let highscoresScore = document.createElement("div");
      highscoresName.classList.add("highscores-name");
      highscoresScore.classList.add("highscores-score");
      highscoresName.textContent = scores[i].name;
      highscoresScore.textContent = scores[i].score;
      highscoresEl.appendChild(highscoresName);
      highscoresEl.appendChild(highscoresScore);
    }
  }
}

function clearHighscores() {
  localStorage.setItem("scores", null);

  fillHighscores();
}

function eraseHighscores() {
  // This only erases the display of the high scores, and does not clear them from local storage

  highscoresEl.replaceChildren(highscoresEl.children[0], highscoresEl.children[1]);

}

function display(n) {
  // Set the nth section under main to display: "block", and set the rest to display: "none"
  for (i = 0; i < sections.length; i++) {
    if (i == n) {
      sections[i].style.display = "block";
    } else {
      sections[i].style.display = "none";
    }
  }
}