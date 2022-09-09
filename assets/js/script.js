//array of question objects to populate the quiz area with...
var questions = [

    {
        question: 'Commonly used data types DO not inclued:',
        answer: 'alerts',
        options: ['strings', 'booleans', 'alerts', 'numbers']
    },

    {
        question: 'The condition in an if/else statement is enclosed with:',
        answer: 'parenthesis',
        options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets']
    },
    
    {
        question: 'Arrays in JavaScript can be used to store:',
        answer: 'all of the above',
        options: ['numbers and strings', 'other arrays', 'booleans', 'all of the above']
    },

    {
        question: 'String values must be enclosed within ______ when being assigned to variables.',
        answer: 'quotes',
        options: ['commas', 'curly brackets', 'quotes', 'parenthesis']
    },


    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answer: 'console.log',
        options: ['JavaScript', 'terminal/bash', 'for loops', 'console.log']
    },

];

//getting DOM elements from the different html sections...
var startQuizEl  = document.getElementById('start-section');
var questionsEl  = document.getElementById('quiz-section');
var scoreboardEl = document.getElementById('scoreboard-section');
var timerEl      = document.getElementById('timer');
var questionEl   = document.getElementById('question');
var answersEl    = document.getElementById('answers');
var responceEl   = document.getElementById('responce');
var scoreEl      = document.getElementById('score');
var startBtn     = document.getElementById('start-button');
var submitBtn    = document.getElementById('enter-score-button');

var questionIndex = 0;
var seconds       = 75;

//kicks of the app with only the start section...
function init() {

    startQuizEl.style.display  = 'flex';
    questionsEl.style.display  = 'none';
    scoreboardEl.style.display = 'none';

}

//gets rid of start info, starts timer and gets the first question...
function startQuiz() {

    startQuizEl.style.display = 'none';
    questionEl.style.display  = 'flex';

    startTime();
    populateQuestion();

}

//timer function to countdown the time element up in the right corner...
function startTime() {

    var timeInterval = setInterval(function() {

        seconds--;

        timerEl.textContent = 'Time: ' + seconds;

        if (seconds === 0 || questionIndex === questions.length) {

            clearInterval(timeInterval);
            showScore();

        }

    }, 1000);

}

//grabs strings from one of the questions objects and fills out the question/answer buttons with them...
function populateQuestion() {

    questionIndex++;

    answersEl.textContent  = '';
    questionEl.textContent = questions[questionIndex].question;

    var answerButtons = questions[questionIndex].options;

    for (var i = 0; i < answerButtons.length; i++) {

        var answerBtn = document.createElement('button');
        answerBtn.textContent = answerButtons[i];
        answersEl.appendChild(answerBtn);

    }

}

//checks the button pressed with the stored answer and retuns a right/wrong responce...
function answerCheck(event) {

    event.preventDefault();

    if (questions[questionIndex].answer === event.target.textContent) {

        responceEl.textContent = 'Correct';
        showResponce(true);

    } else {

        responceEl.textContent = 'Wrong';
        showResponce(true);
        seconds -= 10;

    }

    populateQuestion();

}

//something to show/not show the 'Correct' and 'Wrong' message at the bottom...
function showResponce(b) {

    if (b) {

        responceEl.style.display = 'flex';

    } else {

        responceEl.style.display = 'none';

    }

}

//shuts off the other sections and gets the score...
function showScore() {

    showResponce(false);

    startQuizEl.style.display  = 'none';
    questionEl.style.display   = 'none';
    scoreboardEl.style.display = 'flex';

    scoreEl.textContent = 'Your final score is ' + seconds;

}

//makes a string out of the player initials and the remaining time. Also pushes them onto an array...
function toScoreStr() {

    var initialsEl   = document.getElementById('player-initials').value;
    var scoreObj     = { initials: initialsEl, score: seconds };
    var finalScores  = JSON.parse(localStorage.getItem('finalScores') || '[]');

    finalScores.push(scoreObj);
    localStorage.setItem('finalScores', JSON.stringify(finalScores));

}

//submit your initials button
submitBtn.addEventListener('click', function(event) {

    event.stopPropagation();
    toScoreStr();

    location.href = './scoreboard.html';

});

//(init)ialize game and add eventlisteners...
init();
startBtn.addEventListener('click', startQuiz);
answersEl.addEventListener('click', answerCheck);