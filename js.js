document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById("start");
    if (startButton) {
        startButton.addEventListener("click", function() {
            window.location.href = 'main_game.html';
        });
    }

    let guessField = document.getElementById("Guess_Field");
    if (guessField) {
        fetch("https://random-word-api.vercel.app/api?words=1")
            .then(res => res.json())
            .then(json => {
                const word = json[0];
                if (localStorage.getItem("high") !== null) {
                    document.getElementById("high_score").innerText = "Highscore: " + localStorage.getItem("high");
                }
                document.getElementById("score").innerText = "Lives: " + 8;

                let wordArray = word.split('');
                let blankArray = Array(wordArray.length).fill('_');
                let count = 0;
                let usedLetters = [];

                console.log(wordArray);

                function displayArray() {
                    if (JSON.stringify(blankArray) === JSON.stringify(wordArray)) {
                        document.getElementById("main_game").style.display = "none";
                        let endScreen = document.getElementById("end_screen");
                        endScreen.style.display = "inline";
                        document.getElementById("word_reveal").innerText = "The word was: " + word;
                        document.getElementById("end_butt").style.display = "inline";
                        if (count > localStorage.getItem("high")) {
                            localStorage.setItem("high", 8 - (count - 1));
                        }
                        document.getElementById("high_score").innerText = "Highscore: " + localStorage.getItem("high");
                    }

                    console.log("Displaying array: ", blankArray);

                    guessField.innerHTML = '';
                    blankArray.forEach(letter => {
                        const letterElement = document.createElement('span');
                        letterElement.textContent = letter;
                        letterElement.classList.add('letter');
                        guessField.appendChild(letterElement);
                    });
                }

                function lose() {
                    count = 8;
                    document.getElementById("main_game").style.display = "none";
                    let loseScreen = document.getElementById("lose_screen");
                    document.getElementById("lose_title").innerText = "YOU GAVE UP";
                    loseScreen.style.display = "inline";
                    document.getElementById("end_butt").style.display = "inline";
                    document.getElementById("game_over_reveal").innerText = word;
                }

                document.getElementById("give_up").addEventListener("click", lose);

                function useInput() {
                    let inputField = document.getElementById('myInput');
                    let error = document.getElementById("error");
                    error.innerText = "";
                    let inputValue = inputField.value.trim().toLowerCase();

                    if (!inputValue || usedLetters.includes(inputValue) || blankArray.includes(inputValue)) {
                        error.innerText = inputValue ? "Already used" : "Must fill";
                        inputField.value = "";
                        return;
                    }

                    if (count < 8) {
                        let found = false;
                        for (let i = 0; i < wordArray.length; i++) {
                            if (inputValue === wordArray[i]) {
                                blankArray[i] = inputValue;
                                found = true;
                            }
                        }

                        if (!found) {
                            count++;
                            document.getElementById("score").innerText = "Lives: " + (8 - count);
                            let hangmanImg = document.getElementById("hangman");
                            hangmanImg.src = `./images/stage${count+1}.png`;
                            usedLetters.push(inputValue);
                            document.getElementById("wrong_guesses").innerText = usedLetters.join(', ');
                            if (count === 8) {
                                lose();
                            }
                        }
                        displayArray();
                        inputField.value = '';
                    } else {
                        lose();
                    }
                }

                let guessButton = document.getElementById("guess_button");
                guessButton.addEventListener("click", useInput);

                let inputField = document.getElementById("myInput");
                inputField.addEventListener("keypress", function (event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        guessButton.click();
                    }
                });

                displayArray();
            })
            .catch(error => console.error('Fetch Error:', error));
    }
});
