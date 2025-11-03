const { startTimer, endGame, resetGame, getState } = require("./script.js");


test("Vérifier que tout fonctionne", () => {
  // Ici on peut mettre :
  // - le DOM factice
  // - le code à exécuter en JS
  document.body.innerHTML = `
  <div id="score">0</div>
  <div id="timer">5</div>
  <button id="button-clicker">Click me!</button>
  <button id="button-reset">Reset</button>
`;

  // 1️⃣ exécuter la fonction JS que tu veux tester
  resetGame();

  // 2️⃣ vérifier l'état
  const state = getState();
  expect(state.score).toBe(0);
  expect(state.timeLeft).toBe(5);
  expect(state.timerStarted).toBe(false);

  // 3️⃣ vérifier le DOM si nécessaire
  const scoreDiv = document.getElementById("score");
  expect(scoreDiv.textContent).toBe("0");

  const timerDiv = document.getElementById("timer");
  expect(timerDiv.textContent).toBe("5");

});

