let mode = "serious";
let code = "";

window.addEventListener('DOMContentLoaded', event => {

    // // Navbar shrink function
    // var navbarShrink = function () {
    //     const navbarCollapsible = document.body.querySelector('#mainNav');
    //     if (!navbarCollapsible) {
    //         return;
    //     }
    //     if (window.scrollY === 0) {
    //         navbarCollapsible.classList.remove('navbar-shrink')
    //     } else {
    //         navbarCollapsible.classList.add('navbar-shrink')
    //     }

    // };

    // Shrink the navbar 
    // navbarShrink();

    // Shrink the navbar when page is scrolled
    // document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    // const mainNav = document.body.querySelector('#mainNav');
    // if (mainNav) {
    //     new bootstrap.ScrollSpy(document.body, {
    //         target: '#mainNav',
    //         rootMargin: '0px 0px -40%',
    //     });
    // };

    // Collapse responsive navbar when toggler is visible
    // const navbarToggler = document.body.querySelector('.navbar-toggler');
    // const responsiveNavItems = [].slice.call(
    //     document.querySelectorAll('#navbarResponsive .nav-link')
    // );
    // responsiveNavItems.map(function (responsiveNavItem) {
    //     responsiveNavItem.addEventListener('click', () => {
    //         if (window.getComputedStyle(navbarToggler).display !== 'none') {
    //             navbarToggler.click();
    //         }
    //     });
    // });



    document.getElementById("submit_button_explain").addEventListener("click", function() {
        code = document.getElementById("code").value

        fetch('http://localhost:8080/api/explain', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "code": code,
            "input_language" : "C"
            })
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    });

    document.getElementById("submit_button_translate").addEventListener("click", function() {
        code = document.getElementById("code").value

        fetch('http://localhost:8080/api/translate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "code": code,
            "input_language" : "C",
            "output_language" : "python"  
            })
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    });

    document.getElementById("submit_button_structure").addEventListener("click", function() {
        code = document.getElementById("code").value

        fetch('http://localhost:8080/api/generate_structure', {
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

    const fun_mode = document.getElementById("fun_mode");

    fun_mode.addEventListener("click", function() {
        if (mode === "serious") {
            mode = "fun" 
            document.getElementById("header").classList.remove("masthead");
            document.getElementById("header").classList.add("masthead_fun");
            document.getElementById("fun_mode").innerHTML = "Serious Mode"
            document.getElementById("enter_button").classList.add("btn-fun");
            document.getElementById("submit_button").classList.add("btn-fun");
            document.getElementById("quote").innerHTML = "For every man's action there's a woman's overreaction."
            document.getElementById("title").innerHTML = "Meme Asssistant"

            //bubbles()  
        } else {
            mode = "serious"
            document.getElementById("header").classList.remove("masthead_fun");
            document.getElementById("header").classList.add("masthead");
            document.getElementById("fun_mode").innerHTML = "Fun Mode"
            document.getElementById("enter_button").classList.remove("btn-fun");
            document.getElementById("submit_button").classList.remove("btn-fun");
            document.getElementById("quote").innerHTML = "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking."
            document.getElementById("title").innerHTML = "Code Asssistant"
            
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