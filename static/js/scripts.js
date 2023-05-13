let mode = "serious";
let code = "";

window.addEventListener('DOMContentLoaded', event => {

    function remove_backslash(str) {
        str = str.slice(1, -1);
        str = str.replace(/\\n/g, "<br>");
        return str.replace(/([^\\]|^)\\([^n])/g, "$1$2");
    }

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
            "languages": "Python, C" 
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

    document.getElementById("submit_meme").addEventListener("click", function() {
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
            //bubbles()  
        } else {
            mode = "serious"
            document.getElementById("header").classList.remove("masthead_fun");
            document.getElementById("header").classList.add("masthead");
            document.getElementById("fun_mode").innerHTML = "Fun Mode"
            document.getElementById("enter_button").classList.remove("btn-fun");
            document.getElementById("quote").innerHTML = "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking."
            document.getElementById("title").innerHTML = "Code Asssistant"
            document.getElementById("submit_button_explain").style.visibility = "visible";
            document.getElementById("submit_button_translate").style.visibility = "visible";
            document.getElementById("submit_button_structure").style.visibility = "visible";
            document.getElementById("submit_button_debug").style.visibility = "visible";
            document.getElementById("dropdowns").style.visibility = "visible";
            document.getElementById("code").style.visibility = "visible";
            document.getElementById("submit_meme").style.visibility = "hidden";
            document.getElementById("meme_div").innerHTML = "";
            document.getElementById("meme_div").style.visibility = "hidden";
            document.getElementById("projects").style.display = "block";
            document.getElementById("smaller_title").innerText = "Enter your code";
            //bubbles()  
        }
    });




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