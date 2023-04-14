# A JavaScript Quiz
A timed, multiple-choice quiz to test your JavaScript knowledge

# Installation
The quiz can be accessed at benjstorlie.github.io/javascript-quiz

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Comments

1. I know that most multiple-choice quizzes show 4-5 choices per item. In my teacher education program, I  learned that research showed that having 3 choices was sufficient to assess a student's knowledge.  Unfortunately, I do not, off-hand, have a source for this. However, the only part where it is relevant in the actual code is the shuffling function in the JavaScript file.  I had it only accept an array with 3 elements, to avoid more complication than necessary.


2. I really wanted the quiz items to be classes, because I wanted `shuffle` to be a method on the quiz item objects, and I did not want to copy and paste it into each one.

    So I had to go learn how to use classes in JavaScript, since I was only familiar with classes in Python.

3. I don't like how the top of my JavaScript file is cluttered up by my class definition and all the text of the quiz items.  I kept getting errors the diffrent ways tried to move them to the bottom.  Can I move them to another `.js` file?  Will it still recognize variables defined in a separate file?

## Ideas for the Future

1. I think it would be neat to make an option for the user to make their own questions to quiz themself on.  I think I would have to have the `quiz` array in local storage, and then extract it at the start of a quiz.  Then I would add a new section for the user to add, remove, and edit the quiz items.

    I could have the timer length be a function of the number of items, or allow the user to make their own timer length, or choose no timer at all.

    The high scores would have to be cleared every time the quiz is edited, so I would add a warning for that before the user chooses to edit.

2. I think I want the high scores page to be restricted to viewport height, to make it easy to access the buttons.  Right now I have it display all of the high scores ever.  I could use all the various component heights to calculate a maximum number of high scores to display.  Since the high scores are stores in a `grid`, I wonder if there is some grid property I could use to implement the same goal.

3. The page is not as accessible as it could be.

## Credits

1. I got the quiz items from Dani's post in Slack.