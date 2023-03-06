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

let login_text = document.getElementsByClassName("login_text")
for(let i=0; i<login_text.length;i++){
    login_text[i].addEventListener('click',()=>{
        localStorage.removeItem('user')
    })
}

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
async function renderQueries() {
    const res = await fetch("http://localhost:3000/queries?_sort=date&_order=desc")
    let queries = await res.json()
    template = ''

    if (queries.length !== 0) {
        current_date = queries[0].date
        template += `
                    <div class="date"><span>${current_date}</span></div>
                `
        for (let i = 0; i < queries.length; i++) {
            if (queries[i].date !== current_date) {
                current_date = queries[i].date
                template += `
                    <div class="date"><span>${current_date}</span></div>
                `
            }
            template += `
            <div class="card">
            <div class="name">
                <p class="name_label">Name: <span class="name_val">${queries[i].name}</span></p>
            </div>
            <div class="email">
                <p class="email_label">Email: <span class="email_val">${queries[i].email}</span></p>
            </div>
            <div class="phone">
                <p class="phone_label">Phone number: <span class="phone_val">${queries[i].phone}</span></p>
            </div>
            <div class="message">
                <p class="message_label">Message: <span class="message_val">${queries[i].message}</span></p>
            </div>
            </div>
            `
        }
        let container = document.getElementById('container')
        container.innerHTML=template
    }
}

window.addEventListener('DOMContentLoaded', renderQueries())