 let count = 0;
        let timeLeft = 5;
        let timer;

        const counterDisplay = document.getElementById('counter');
        const timeDisplay = document.getElementById('time');
        const clickButton = document.getElementById('clickButton');

        clickButton.addEventListener('click', () => {
            if (timeLeft > 0) {
                count++;
                counterDisplay.textContent = count;
            }
        });

        function startTimer() {
            timer = setInterval(() => {
                timeLeft--;
                timeDisplay.textContent = timeLeft;

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    clickButton.disabled = true; // Désactiver le bouton après 5 secondes
                    alert("Temps écoulé ! Ton score est : " + count);
                }
            }, 1000);
        }

        startTimer(); // Démarrer le chrono