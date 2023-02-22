let res_nav = document.getElementById("responsive_nav");
let hum = document.getElementById("fa-bars");

hum.addEventListener('click',()=>{

    console.log('clicked')

    if(window.getComputedStyle(res_nav).visibility==="hidden"){
        res_nav.style.visibility = 'visible'
        document.body.classList.add('stop-scrolling')
    }else if(window.getComputedStyle(res_nav).visibility==="visible"){
        res_nav.style.visibility = 'hidden'
        document.body.classList.remove('stop-scrolling')
    }
})

function toggleNavBar(){

    console.log('clicked');

    if(window.getComputedStyle(res_nav).visibility==="hidden"){
        res_nav.style.visibility = 'visible'
        document.body.classList.add('stop-scrolling')
    }else if(window.getComputedStyle(res_nav).visibility==="visible"){
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
password_view.addEventListener('click',()=>{
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
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(form.email.value.match(validRegex)){
        let uri = 'http://localhost:3000/users?email='
        uri += `${form.email.value}`
        const res = await fetch(uri)
        const user = await res.json();

        if(user[0]){
            if(user[0].password === form.password.value){
                user_details = {email: user[0].email, role: user[0].role}
                localStorage.setItem('user',JSON.stringify(user_details))
                if(user[0].role === 'user'){
                    window.location.replace('/index.html');
                }else{
                    window.location.replace('/dashboard.html');
                }
            }else{
                title.classList.add('edit_title')
                error_message.innerText = 'Password incorrect'
            }
        }else{
            title.classList.add('edit_title')
            error_message.innerText = 'User not registered'
        }
    }else{
        title.classList.add('edit_title')
        error_message.innerText = 'Invalid email'
    }
}
form.addEventListener('submit', loginUser);


