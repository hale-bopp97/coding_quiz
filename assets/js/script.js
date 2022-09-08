//array of question objects to populate the quiz area with...
var questions = [

    {
        question: 'what\'s up?',
        answer: 'not much',
        options: ['I don\'t have change', 'what?', 'you too!', 'not much']
    },

    {
        question: 'what is 2 + 2 = ?',
        answer: '4',
        options: ['4', '3', '2', '1']
    },
    
    {
        question: 'what is 2 * 3 = ?',
        answer: '6',
        options: ['2', '4', '6', '8']
    },

    {
        question: 'what is 10^2 = ?',
        answer: '100',
        options: ['1000', '100', '10', '1']
    },


    {
        question: 'what car should I get?',
        answer: 'toyota... it\'s always toyota',
        options: ['my ford cvt is disintegrating', '4', 'toyota... it\'s always toyota', 'My nissan\'s wiring harness is moody:(']
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

var questionIndex = -1;
var seconds       = 75;

//kicks of the app with only the start section...
function init() {

    startQuizEl.style.display  = 'flex';
    questionsEl.style.display  = 'none';
    scoreboardEl.style.display = 'none';

}

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

function showResponce(b) {

    if (b) {

        responceEl.style.display = 'flex';

    } else {

        responceEl.style.display = 'none';

    }

}

function showScore() {

    showResponce(false);

    startQuizEl.style.display  = 'none';
    questionEl.style.display   = 'none';
    scoreboardEl.style.display = 'flex';

    scoreEl.textContent = 'Your final score is ' + seconds;

}

function toScoreStr() {

    var initialsEl   = document.getElementById('player-initials');
    var scoreObj     = { initials: initialsEl, score: seconds };
    var finalScores   = JSON.parse(localStorage.getItem('finalScores') || '[]');

    finalScores.push(scoreObj);
    localStorage.setItem('finalScores', JSON.stringify(finalScores));

}

submitBtn.addEventListener('click', function(event) {

    event.stopPropagation();
    toScoreStr();

    location.href = './scoreboard.html';

});

//(init)ialize game and add eventlisteners...
init();
startBtn.addEventListener('click', startQuiz);
answersEl.addEventListener('click', answerCheck);