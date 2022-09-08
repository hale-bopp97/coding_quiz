var leaderBoardEl = document.getElementById('leader-board');
var returnBtn     = document.getElementById('return');
var clearBtn      = document.getElementById('clear-scores');

finalScores   = JSON.parse(localStorage.getItem('finalScores') || '[]');

finalScores.sort(function(x, y) {

    return x.score - y.score;

});

for (var i = 0; i < finalScores; i++) {

    var listElements = document.createElement('li');

    listElements.textContent = finalScores[i].initials + " --- " + finalScores[i].score;

    leaderBoardEl.appendChild(listElements);

}

returnBtn.addEventListener('click', function() {

    history.back();

});

clearBtn.addEventListener('click', function() {

    localStorage.clear();
    history.back();

});
