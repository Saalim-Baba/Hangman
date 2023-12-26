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
                console.log(arraytest)
                arraytest.join("", arraytest)
            })
            .catch(error => console.error('Fetch Error:', error));
    }
});
