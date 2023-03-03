let error_code = new URLSearchParams(window.location.search).get('id')

let container = document.getElementById('container')
window.onmousemove = function(e){
    let x = - e.clientX/5
    let y = - e.clientY/5

    container.style.backgroundPositionX = x + 'px'
    container.style.backgroundPositionY = y + 'px'
}

let back = document.getElementById('back')
back.addEventListener('click', ()=>{
    window.history.back()
})

let code = document.getElementById('code')
let subtitle = document.getElementById('subtitle')
let description = document.getElementById('description')

async function renderContent(){
    if(error_code === "404"){
        code.innerText = 404
        subtitle.innerText = "Oops! Page not found"
        description.innerText = "The page you're looking for does not exist! You might have mistyped the url address or the page was moved."
    }else if(error_code === "401"){
        code.innerText = 401
        subtitle.innerText = "Oops! You can't access this page"
        description.innerText = "You are not authorized to access the page you're looking for. Make sure you're logged in, if you think you should be able to access it."
    }
}

window.addEventListener('DOMContentLoaded', renderContent())