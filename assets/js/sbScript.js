var leaderBoardEl = document.getElementById('leader-board');
var returnBtn     = document.getElementById('return');
var clearBtn      = document.getElementById('clear-scores');

//repeats what was done in script.js if the score array isn't already there...
finalScores = JSON.parse(localStorage.getItem('finalScores') || '[]');

//sort scores...
finalScores.sort(function(x, y) {

    return x.score - y.score;

});

//makes strings out of the player initials/scores for the scoreboard...
for (var i = 0; i < finalScores.length; i++) {

    var listElements = document.createElement("li");
    console.log(listElements + 'list elements...');

    listElements.textContent = finalScores[i].initials + " --- " + finalScores[i].score;
    console.log(listElements.textContent);

    leaderBoardEl.appendChild(listElements);

}

//return to start button...
returnBtn.addEventListener('click', function() {

    history.back();

});

//get rid of all the scores...
clearBtn.addEventListener('click', function() {

    localStorage.clear();
    history.back();

});
