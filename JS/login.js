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

let error_message = document.getElementById('error_message')
let title = document.getElementById('form_title')

const form = document.getElementById('login_user');
const loginUser = async (e) => {
    e.preventDefault();
    const doc = {
        email: form.email.value,
        password: form.password.value,
    }

    let user = await fetch('https://evelynemybrandbackend.up.railway.app/users/auth', {
        method: 'POST',
        headers: { Accept: "application/json", "Content-Type": "application/json", },
        body: JSON.stringify(doc)
    })

    let loggedUser = await user.json()

    if (loggedUser.status === 200){
        localStorage.setItem('token', JSON.stringify(loggedUser.token))
        if (loggedUser.data.role === 'user') {
            window.history.back()
        } else {
            window.location.replace('/dashboard.html');
        }
    }

    Toastify({
        text: loggedUser.message,
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
}
form.addEventListener('submit', loginUser);


