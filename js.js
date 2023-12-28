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


                display_array()
                function display_array(){
                    console.log(word_array)
                    console.log(arraytest)
                    arraytest.forEach(letter => {
                        const letterElement = document.createElement('span');
                        letterElement.textContent = letter;
                        letterElement.classList.add('letter');
                        guessField.appendChild(letterElement);

                    });

                }
                function delete_array(){
                    arraytest.forEach(letter => {
                        guessField.removeChild(guessField.firstChild)

                    });

                }
let count = 1

                function useInput() {
                    if (count < 7){
                        let next_step = true
                        let inputField = document.getElementById('myInput');
                        let inputValue = inputField.value
                        for (i=0; word_array.length > i; i++){
                            if (inputValue === word_array[i]){
                                arraytest[i] = inputValue
                                delete_array()
                                display_array()
                                next_step = false
                            }
                        }
                        if (next_step === true) {
                            count++
                            let hangman_img = document.getElementById("hangman")
                            hangman_img.src = `./stages/stage${count}.png`
                        }
                        inputField.value = '';
                    }
                    else{
                        alert("YOU LOST")
                    }
                }
                let button = document.getElementById("guess")
                button.addEventListener("click", useInput)

            })
            .catch(error => console.error('Fetch Error:', error));
    }
});
