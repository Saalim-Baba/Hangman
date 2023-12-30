document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById("start");
    if (startButton) {
        startButton.addEventListener("click", function() {
            window.location.href = 'main_game.html'; // Redirect to the game page
        });
    }

    let guessField = document.getElementById("Guess_Field");
    if (guessField) {
        fetch("https://random-word-api.vercel.app/api?words=1")
            .then(res => res.json())
            .then(json => {
                const wordy = json[0];

                let word_array = wordy.split('')
                let arraytest = []
                for (i=0; i < word_array.length; i++)(
                    arraytest.push("_")
                )
                console.log(word_array)

                display_array()
                function display_array() {
                    if (JSON.stringify(arraytest) === JSON.stringify(word_array)){
                        document.getElementById("main_game").style.display = "none"
                        let end_screen = document.getElementById("end_screen")
                        end_screen.style.display = "inline"
                        document.getElementById("word_reveal").innerText = "The word was: " + wordy
                    }
                    console.log("Displaying array: ", arraytest);
                    arraytest.forEach(letter => {
                        const letterElement = document.createElement('span');
                        letterElement.textContent = letter;
                        letterElement.classList.add('letter');
                        guessField.appendChild(letterElement);
                    });
                }
                function delete_array() {
                    while (guessField.firstChild) {
                        guessField.removeChild(guessField.firstChild);
                    }
                }
let count = 1
let used = []



                function useInput() {
                    let inputField = document.getElementById('myInput');
                    let error = document.getElementById("already_used");
                    error.innerText = "";
                    let inputValue = inputField.value;
                    let is_used = check_used(inputValue);
                    function check_used(inputValue) {
                        if (used.includes(inputValue) || arraytest.includes(inputValue)) {
                            error.innerText = "Already used";
                            return true;
                        }
                        else if (inputValue === " "){
                            error.innerText = "Already used";
                            return true;
                        }
                        else  if (inputValue.trim() === '') {
                            error.innerText = "Must Fill";
                            return true}

                        else {
                            return false;}
                    }

                    if (!is_used) {
                        check_input();
                    }

                    function check_input() {
                        if (count < 8) {
                            let found = false;
                            for (let i = 0; i < word_array.length; i++) {
                                if (inputValue === word_array[i]) {
                                    arraytest[i] = inputValue;
                                    found = true;
                                }
                            }
                            delete_array();
                            display_array();
                            if (!found) {
                                count++;
                                let hangman_img = document.getElementById("hangman");
                                hangman_img.src = `./stage${count}.png`;
                                used.push(inputValue);
                                document.getElementById("used").innerText = used.join(', ');
                            }
                            inputField.value = '';
                        } else {
                            alert("YOU LOST");
                        }

                    }

                }
                let button = document.getElementById("guess")
                button.addEventListener("click", useInput)

            })
            .catch(error => console.error('Fetch Error:', error));
    }
});
