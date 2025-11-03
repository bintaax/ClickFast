const { startTimer, endGame, resetGame, getState } = require("./script.js");


test("Vérifier que tout fonctionne", () => {
  // 1️⃣ Le DOM factice
  document.body.innerHTML = `
  <div id="score">0</div>
  <div id="timer">5</div>
  <button id="button-clicker">Click me!</button>
  <button id="button-reset">Reset</button>
`;

  // 2️⃣ les codes js à exécuter
  startTimer();
  endGame();
  resetGame();
  getState();

});

