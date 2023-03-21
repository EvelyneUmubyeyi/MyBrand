// const { response } = require("../../server");

let res_nav = document.getElementById("responsive_nav");
let hum = document.getElementById("fa-bars");

hum.addEventListener('click', () => {

    console.log('clicked')

    if (window.getComputedStyle(res_nav).visibility === "hidden") {
        res_nav.style.visibility = 'visible'
        document.body.classList.add('stop-scrolling')
    } else if (window.getComputedStyle(res_nav).visibility === "visible") {
        res_nav.style.visibility = 'hidden'
        document.body.classList.remove('stop-scrolling')
    }
})

function toggleNavBar() {

    console.log('clicked');

    if (window.getComputedStyle(res_nav).visibility === "hidden") {
        res_nav.style.visibility = 'visible'
        document.body.classList.add('stop-scrolling')
    } else if (window.getComputedStyle(res_nav).visibility === "visible") {
        res_nav.style.visibility = 'hidden'
        document.body.classList.remove('stop-scrolling')
    }
}

let resNavMenuItem = document.getElementsByClassName("res_menu_item")
for (let i = 0; i < resNavMenuItem.length; i++) {
    resNavMenuItem[i].addEventListener('click', toggleNavBar);
}

let emailExists = async (email) => {
    let uri = 'http://localhost:3000/users?email='
    uri += `${email}`
    const res = await fetch(uri)
    const user = await res.json();

    if (user.length === 0) {
        return false
    }
    return true
}

let error_message = document.getElementById('error_message')
let title = document.getElementById('form_title')

const form = document.getElementById('create_user');
const createUser = async (e) => {
    e.preventDefault();
    const doc = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        role: "user",
    }

    let user = await fetch('https://evelynemybrandbackend.up.railway.app/users', {
        method: 'POST',
        headers: { Accept: "application/json", "Content-Type": "application/json", },
        body: JSON.stringify(doc)
    })
    
    let newUser = await user.json()

    if (newUser.message === 'New user created succesfully') {
        Toastify({
            text: newUser.message,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#1dd882",
            },
        }).showToast(); 
        setTimeout(()=>window.location.replace('/login.html'), 3000)
        
    }

    Toastify({
        text: newUser.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#ff9494",
        },
    }).showToast();

    // user_details = {name: form.name.value,email: form.email.value, role: 'user'}
    // localStorage.setItem('user',JSON.stringify(user_details))
    // }

}
form.addEventListener('submit', createUser);

let password_view = document.getElementById("p-viewer");
let password_input = document.getElementById('password')
password_view.addEventListener('click', () => {
    if (password_input.type === "password") {
        password_input.type = "text";
        password_view.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
    } else {
        password_input.type = "password";
        password_view.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>'
    }
})
