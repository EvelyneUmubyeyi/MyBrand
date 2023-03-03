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

let renderBlogs = async()=>{
    console.log('loaded')
    let uri = 'http://localhost:3000/blogs'
    let res = await fetch(uri)
    let blogs = await res.json()

    let template = ''
    let table_bodcardsy = document.getElementById('cards');

    if(blogs !== 0){ 
        console.log(blogs, blogs.length, blogs[0])  
        for(let i = 0; i<blogs.length; i++){
            console.log(blogs[i])
            template +=`
            <div class="card blog_card">
                <img src=${blogs[i].image} alt="">
                <div class="blog_text">
                    <p class="blog_title">${blogs[i].title}</p>
                    <p class="shrt_description">${blogs[i].hook}</p>
                </div>
                <button onclick="window.location = '/article.html?id=${blogs[i].id}'"><a>Read</a></button>
            </div>
            ` 
        }   
        
        cards.innerHTML = template
    }
}

window.addEventListener('DOMContentLoaded', renderBlogs)