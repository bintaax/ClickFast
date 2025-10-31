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

let score = 0;
let timeLeft = 5;
let timerStarted = false;
let countdown;

// Fonction de gestion du clic sur le bouton principal
button.addEventListener('click', () => {
  // Démarre le chrono au premier clic
  if (!timerStarted) {
    timerStarted = true;
    startTimer();
  }

button.addEventListener('keydown', () => {
    if(!timerStarted & "keydown" === 'Space') {
        timerStarted =true;
        startTimer();
    }
}  )

  // Incrémente le score tant que le temps n'est pas écoulé
  if (timeLeft > 0) {
    score++;
    scoreDisplay.textContent = "Score : " + score;
  }
});

// Fonction de démarrage du chrono
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

// Fonction appelée quand le temps est écoulé
function endGame() {
  button.disabled = true;
  timerDisplay.textContent = "Temps écoulé !";
  scoreDisplay.textContent = "Score final : " + score;
  replayButton.style.display = "inline-block"; // Affiche le bouton "Rejouer"
}

// Fonction pour recommencer une partie
replayButton.addEventListener('click', resetGame);

function resetGame() {
  // Réinitialisation des valeurs
  score = 0;
  timeLeft = 5;
  timerStarted = false;

  // Mise à jour de l'affichage
  scoreDisplay.textContent = "Score : 0";
  timerDisplay.textContent = "Temps restant : 5s";
  button.disabled = false;
  replayButton.style.display = "none";
}
