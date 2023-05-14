let mode = "serious";
let code = "";

let new_meme_generator_count=0;
let listen_to_work_press = null;

window.addEventListener('DOMContentLoaded', event => {

    // Remove backslash from post request response
    function remove_backslash(str) {
        str = str.slice(1, -1);
        str = str.replace(/\\n/g, "<br>");
        return str.replace(/([^\\]|^)\\([^n])/g, "$1$2");
    }

    // Add event listeners to explain button, calls explain endpoint
    document.getElementById("submit_button_explain").addEventListener("click", function() {
        code = document.getElementById("code").value

        let input_language = document.getElementById("dropdown1").value;

        fetch('http://localhost:8080/api/explain', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "code": code,
            "input_language" : input_language,
            })
        })
        .then(response => response.json())
        .then(response => document.getElementById("content").innerHTML = remove_backslash(JSON.stringify(response.explanation)))
    });

    // Add event listeners to translate button, calls translate endpoint
    document.getElementById("submit_button_translate").addEventListener("click", function() {
        code = document.getElementById("code").value

        let input_language = document.getElementById("dropdown1").value;
        let output_language = document.getElementById("dropdown2").value;

        fetch('http://localhost:8080/api/translate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "code": code,
            "input_language" : input_language,
            "output_language" : output_language  
            })
        })
        .then(response => response.json())
        .then(response => document.getElementById("content").innerHTML = remove_backslash(JSON.stringify(response.explanation)))
    });

    // Add event listeners to debug button, calls debug endpoint
    document.getElementById("submit_button_debug").addEventListener("click", function() {
        code = document.getElementById("code").value

        let input_language = document.getElementById("dropdown1").value;

        fetch('http://localhost:8080/api/debug', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "code": code,
            "input_language" : input_language,
            })
        })
        .then(response => response.json())
        .then(response => document.getElementById("content").innerHTML = remove_backslash(JSON.stringify(response.explanation)))
    });

    // Add event listeners to structure button, calls structure endpoint
    document.getElementById("submit_button_structure").addEventListener("click", function() {
        code = document.getElementById("code").value

        let language = document.getElementById("dropdown1").value;

        fetch('http://localhost:8080/api/structure', {
        method: 'POST',
        headers: {
            'Accept': 'application/zip',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "description": code,
            "languages": "Python" 
            })
        })
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Request failed.');
            }
        })
        .then(blob => {
            // Create a temporary <a> element to trigger the download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'data_structure.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(error => {
            console.log(error);
        });
    });
    });

    // Add event listeners to meme button, calls meme endpoint
    document.getElementById("submit_meme").addEventListener("click", function() {
        new_meme_generator_count++;
        code = document.getElementById("code").value

        fetch('https://meme-api.com/gimme', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        })
        .then(response => response.json())
        .then(response => document.getElementById("meme_div").innerHTML = "<img src=" + response.preview[response.preview.length - 1] + " alt='meme' width='500' height='600'>")

        sound = new Audio('static/assets/sounds/laugh.mp3');
        sound.play();
        document.getElementById("saso").style.visibility = "visible";
        button = document.getElementById("offensive_meme");
        button.style.visibility = "visible";
        button.style.position = "absolute";
        button.style.left = "";
        button.style.top = "";
        if(!check_number_of_opened_memes(new_meme_generator_count)){
            // to do : add a message that says YOU HAVE TO GET BACK TO WORK
            document.getElementById("stop").style.visibility = "visible";
        }
    });

    // Evasive button
    document.getElementById('offensive_meme').addEventListener('mouseover', function() {
        const randomButton = this;
        const container = document.getElementById('meme_container');
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const buttonWidth = randomButton.clientWidth;
        const buttonHeight = randomButton.clientHeight;
    
        const randomX = Math.floor(Math.random() * (containerWidth - buttonWidth));
        const randomY = Math.floor(Math.random() * (containerHeight - buttonHeight));
    
        randomButton.style.left = randomX + 'px';
        randomButton.style.top = randomY + 'px';

        sound = new Audio('static/assets/sounds/fart.mp3');
        sound.play();
    });

    const saso_btn = document.getElementById("saso");
    saso_btn.addEventListener("click", function() {
        // redirect user to saso yt podcast
        window.open("https://www.youtube.com/watch?v=Qz9WkFdscKs&ab_channel=Ares%2CTEGAneve%C5%A1%3F", "_blank");
    });
      

    const fun_mode = document.getElementById("fun_mode");

    fun_mode.addEventListener("click", function() {
        if (mode === "serious") {
            mode = "fun" 
            document.getElementById("header").classList.remove("masthead");
            document.getElementById("header").classList.add("masthead_fun");
            document.getElementById("fun_mode").innerHTML = "Serious Mode"
            document.getElementById("enter_button").classList.add("btn-fun");
            document.getElementById("quote").innerHTML = "For every man's action there's a woman's overreaction."
            document.getElementById("title").innerHTML = "Meme Asssistant"
            document.getElementById("submit_button_explain").style.visibility = "hidden";
            document.getElementById("submit_button_translate").style.visibility = "hidden";
            document.getElementById("submit_button_structure").style.visibility = "hidden";
            document.getElementById("submit_button_debug").style.visibility = "hidden";
            document.getElementById("dropdowns").style.visibility = "hidden";
            document.getElementById("code").style.visibility = "hidden";
            document.getElementById("submit_meme").style.visibility = "visible";
            document.getElementById("meme_div").style.visibility = "visible";
            document.getElementById("projects").style.display = "none";
            document.getElementById("smaller_title").innerText = "Generate your meme !";
            document.getElementById("page-top").classList.add("fun_mode");
            document.querySelectorAll('.buton_smile').forEach(el => el.classList.add('buton_smile_fun'));
            new_meme_generator_count=0;
            listen_to_work_press = null;
            //bubbles()  
        } else {
            mode = "serious"
            document.getElementById("stop").style.visibility = "hidden";
            document.getElementById("header").classList.remove("masthead_fun");
            document.getElementById("header").classList.add("masthead");
            document.getElementById("fun_mode").innerHTML = "Fun Mode"
            document.getElementById("enter_button").classList.remove("btn-fun");
            document.getElementById("quote").innerHTML = "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking."
            document.getElementById("title").innerHTML = "Code Assistant"
            document.getElementById("submit_button_explain").style.visibility = "visible";
            document.getElementById("submit_button_translate").style.visibility = "visible";
            document.getElementById("submit_button_structure").style.visibility = "visible";
            document.getElementById("submit_button_debug").style.visibility = "visible";
            document.getElementById("dropdowns").style.visibility = "visible";
            document.getElementById("code").style.visibility = "visible";
            document.getElementById("submit_meme").style.visibility = "hidden";
            document.getElementById("offensive_meme").style.visibility = "hidden";
            document.getElementById("meme_div").innerHTML = "";
            document.getElementById("saso").style.visibility = "hidden";
            document.getElementById("meme_div").style.visibility = "hidden";
            document.getElementById("projects").style.display = "block";
            document.getElementById("smaller_title").innerText = "Enter your code";
            document.getElementById("page-top").classList.remove("fun_mode");
            document.querySelectorAll('.buton_smile').forEach(el => el.classList.remove('buton_smile_fun'));
            //bubbles()  
        }
    });


function check_number_of_opened_memes(count){
    if (count > 5){
       return false;
    }
    return true;
}

function pressFirstButton() {
    var btn = document.getElementById("fun_mode");
    btn.click();
}

// function bubbles() {
//     if (mode === "fun") {
//         bubbles_id = setInterval(() => {
//             const randomWidth = Math.floor(Math.random() * 100 + 40)
//             const randomPosition = Math.floor(Math.random() * screen.width  - randomWidth*2)
//             const randomSpeed = Math.floor(Math.random() * 4000 + 2000)

//             const spanEl = document.createElement('span')

//             spanEl.style.width = `${randomWidth}px`
//             spanEl.style.left = `${randomPosition}px`
//             spanEl.style.animationDuration = `${randomSpeed}ms`

//             document.body.append(spanEl)
//         }, 400)
//     } else {
//         clearInterval(bubbles_id)
//     }
// }