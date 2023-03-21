// let token = localStorage.getItem('token')
// let token_parsed = JSON.parse(token)

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

let login_res = document.getElementById('login_res')
let login_des = document.getElementById('login_des')

window.addEventListener('DOMContentLoaded', ()=>{
    if (token_parsed){
        login_res.innerText = 'Log out'
        login_des.innerText = 'Log out'
    }
})

function logout(){
    localStorage.removeItem('token')
    window.location.replace('./login.html')
}

login_des.addEventListener('click',logout)
login_res.addEventListener('click',logout)
let queries_p = document.getElementById('queries_nbr')
let blogs_p = document.getElementById('blogs_nbr')

async function getStats(){
    const blogs = await fetch('https://evelynemybrandbackend.up.railway.app/blogs')
    let blogs_res = await blogs.json()
    console.log(blogs_res)
    let blogs_nbr = JSON.parse(JSON.stringify(blogs_res.data)).length

    let queries = await fetch('https://evelynemybrandbackend.up.railway.app/queries', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token_parsed}`,
        },
    })

    let queries_res = await queries.json()
    console.log(queries_res)
    let queries_nbr = JSON.parse(JSON.stringify(queries_res.data)).length
    blogs_p.innerText = blogs_nbr
    queries_p.innerText = queries_nbr
}

window.addEventListener('DOMContentLoaded', getStats())