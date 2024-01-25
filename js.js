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

                let word_array = word.split('')
                let blank_array = []
                for (i=0; i < word_array.length; i++)(
                    blank_array.push("_")
                )
                console.log(word_array)

                display_array()
                function display_array() {
                    if (JSON.stringify(blank_array) === JSON.stringify(word_array)){
                        document.getElementById("main_game").style.display = "none"
                        let end_screen = document.getElementById("end_screen")
                        end_screen.style.display = "inline"
                        document.getElementById("word_reveal").innerText = "The word was: " + word
                        document.getElementById("end_butt").style.display = "inline"
                    }

                    console.log("Displaying array: ", blank_array);
                    blank_array.forEach(letter => {
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
                    let error = document.getElementById("error");
                    error.innerText = "";
                    let inputValue = inputField.value;
                    inputValue = inputValue.toLowerCase()
                    let is_used = check_used(inputValue);
                    function check_used(inputValue) {
                        if (used.includes(inputValue) || blank_array.includes(inputValue)) {
                            error.innerText = "Already used";
                            inputField.value = ""
                            return true;
                        }
                        else if (inputValue === " "){
                            error.innerText = "must fill";
                            return true;
                        }
                        else  if (inputValue.trim() === "") {
                            error.innerText = "must fill";
                            return true}

                        else {
                            return false;}
                    }

                    if (!is_used) {
                        check_input();
                    }

                    function check_input() {
                        if (count < 7) {
                            let found = false;
                            for (let i = 0; i < word_array.length; i++) {
                                if (inputValue === word_array[i]) {
                                    blank_array[i] = inputValue;
                                    found = true;
                                }
                            }
                            delete_array();
                            display_array();
                            if (!found) {
                                count++;
                                let hangman_img = document.getElementById("hangman");
                                hangman_img.src = `./images/stage${count}.png`;
                                hangman_img.width = 200
                                used.push(inputValue);
                                document.getElementById("wrong_guesses").innerText = used.join(', ');
                            }
                            inputField.value = '';
                        } else {
                            document.getElementById("main_game").style.display = "none"
                            let lose_screen = document.getElementById("lose_screen")
                            lose_screen.style.display = "inline"
                            document.getElementById("end_butt").style.display = "inline"
                            document.getElementById("game_over_reveal").innerText = word
                        }

                    }

                }
                let guess_button = document.getElementById("guess_button")
                guess_button.addEventListener("click", useInput)
                let enter = document.getElementById("myInput")
                enter.addEventListener("keypress", function (event){
                    if (event.key === "Enter") {
                        event.preventDefault();
                        document.getElementById("guess_button").click();
                    }
                });


            })
            .catch(error => console.error('Fetch Error:', error));
    }
});
