
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


// ------- PARTIE 5 --------

// Envoyer le score à l'api



const postData = async () => {
  const url = "https://6908aa592d902d0651b1453b.mockapi.io/scores/:endpoint";

  const data = {
    createdAt: new Date().toISOString(),
    username: "bintaax",
    avatar:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
    score: 100,
    website_url: "bintaax.github.io/ClickFast",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Data posted successfully:", result);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

postData();


// Lire le score 

const getData = async () => {
  const url = "";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Data retrieved successfully:", data);
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

getData();

// Remplacer un score

const usernameToDelete = "bintaax";

const deleteUserByUsername = async (username) => {
  const url = "https://6908aa592d902d0651b1453b.mockapi.io/scores/:endpoint";

  try {
    // Étape 1 : Récupérer les utilisateurs avec le même username
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();
    const usersToDelete = users.filter(
      (user) => user.username === username
    );

    // Étape 2 : Supprimer chaque utilisateur trouvé
    for (const user of usersToDelete) {
      const deleteResponse = await fetch(`${url}/${user.id}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        console.error(
          `Error deleting user with ID ${user.id}:`,
          deleteResponse.statusText
        );
      } else {
        console.log(`User with ID ${user.id} deleted successfully.`);
      }
    }

    // Étape 3 : Ajouter un nouvel utilisateur
    const newUserData = {
      createdAt: new Date().toISOString(),
      username: "bintaax", // Vous pouvez changer le nom d'utilisateur si nécessaire
      avatar:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
      score: 100,
      website_url: "bintaax.github.io/ClickFast",
    };

    const postResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    if (!postResponse.ok) {
      throw new Error("Network response was not ok");
    }

    const newUserResult = await postResponse.json();
    console.log("New user posted successfully:", newUserResult);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Appel de la fonction pour supprimer et ajouter un utilisateur
deleteUserByUsername(usernameToDelete);