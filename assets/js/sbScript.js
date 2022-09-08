var leaderBoardEl = document.getElementById('leader-board');
var returnBtn     = document.getElementById('return');
var clearBtn      = document.getElementById('clear-scores');

finalScores = JSON.parse(localStorage.getItem('finalScores') || '[]');///LOOK HERE FOR BUG
console.log(finalScores[0].score + ' final scores...');

finalScores.sort(function(x, y) {

    return x.score - y.score;

});

for (var i = 0; i < finalScores.length; i++) {

    var listElements = document.createElement("li");
    console.log(listElements + 'list elements...');

    listElements.textContent = finalScores[i].initials + " --- " + finalScores[i].score;
    console.log(listElements.textContent);

    leaderBoardEl.appendChild(listElements);

}

returnBtn.addEventListener('click', function() {

    history.back();

});

clearBtn.addEventListener('click', function() {

    localStorage.clear();
    history.back();

});
