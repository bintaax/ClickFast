
console.log("Script lancé !");
// Attendre que le DOM soit chargé en utilisant l'écouteur d'évènements DOMContentLoaded

document.addEventListener('DOMContentLoaded', function () {
    console.log('Page entièrement chargée');
});


// Sélection des éléments HTML
const button = document.getElementById('clickButton');
const container = document.getElementById('container');

// Création et ajout des éléments pour afficher le score et le chrono
const scoreDisplay = document.createElement('p');
scoreDisplay.textContent = "Score : 0";
container.appendChild(scoreDisplay);

const timerDisplay = document.createElement('p');
timerDisplay.textContent = "Temps restant : 5s";
container.appendChild(timerDisplay);

// Création du bouton "Rejouer" (invisible au début)
const replayButton = document.createElement('button');
replayButton.textContent = "Rejouer";
replayButton.style.display = "none";
container.appendChild(replayButton);

// --- VARIABLES ---
let score = 0;
let timeLeft = 5;
let timerStarted = false;
let countdown;

// --- FONCTIONS PRINCIPALES ---
function startTimer() {
  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = "Temps restant : " + timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
}

function endGame() {
  button.disabled = true;
  timerDisplay.textContent = "Temps écoulé !";
  scoreDisplay.textContent = "Score final : " + score;
  replayButton.style.display = "inline-block";
}

function resetGame() {
  score = 0;
  timeLeft = 5;
  timerStarted = false;

  scoreDisplay.textContent = "Score : 0";
  timerDisplay.textContent = "Temps restant : 5s";
  button.disabled = false;
  replayButton.style.display = "none";
}

// --- ÉVÉNEMENTS ---
button.addEventListener('click', () => {
  if (!timerStarted) {
    timerStarted = true;
    startTimer();
  }

  if (timeLeft > 0) {
    score++;
    scoreDisplay.textContent = "Score : " + score;
  }
});

replayButton.addEventListener('click', resetGame);

// --- EXPORTS POUR LES TESTS ---
if(typeof module !== "undefined" && modules.exports) {
  module.exports = {
  startTimer,
  endGame,
  resetGame,
  getState: () => ({ score, timeLeft, timerStarted })
};
};