import('tailwindcss').Config

document.addEventListener("DOMContentLoaded", function (){

    let boy;
    function start(){
        fetch("https://random-word-api.vercel.app/api?words=1").then((res) => res.json()).then(
            json => {boy = json; console.log(boy)})


    }
    let start_button = document.getElementById("start")
    start_button.addEventListener("click", start())
})