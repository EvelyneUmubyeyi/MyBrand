let article_id = new URLSearchParams(window.location.search).get("id")
let article_title = document.getElementById('article_title')
let small_description = document.getElementById('small_description')
let author_name = document.getElementById('author_name')
let author_image = document.getElementById('author_image')
let publish_date = document.getElementById('publish_date')
let cover_photo = document.getElementById('cover_photo')
let article_body = document.getElementById('article_body')
let likes = document.getElementById('no_likes')
let comments = document.getElementById('no_comments')
let comments_list = document.getElementById('comments_list')
let article;

async function renderArticle() {
    let res = await fetch(`http://localhost:3000/blogs/${article_id}`)
    article = await res.json()

    article_title.innerText = article.title
    small_description.innerText = article.hook
    author_name.innerText = article.author_name
    author_image.src = article.author_image
    publish_date.innerText = article.date_published
    cover_photo.src = article.image
    article_body.innerText = article.body
    likes.innerText = article.likes
    comments.innerText = article.comments
    template = ''

    for (let i = 0; i < article.comments_list.length; i++) {
        template += `
        <div class="single_comment">
        <div class="icon_container">
            <i class="fa-solid fa-user"></i>
        </div>
        <div class="text">
            <div class="comment_header">
                <p class="name" id="commenter_name">${article.comments_list[i].name}</p>
                <p class="date" id="commenting_date">${article.comments_list[i].date}</p>
            </div>
            <p class="comment" id="comment_body">${article.comments_list[i].comment}</p>
        </div>
        </div>
        `
    }
    comments_list.innerHTML = template
}

window.addEventListener('DOMContentLoaded', renderArticle)

let refresh_likes = async () => {
    likes.innerHTML = `<p class="no_likes" id="no_likes">${article.likes}</p>`
}

let like_icon = document.getElementById('like_icon')
let likes_div = document.getElementById('likes_div')

like_icon.addEventListener('click', (e) => {
    e.preventDefault()
    if (localStorage.getItem('user') === null) {
        popup_container.style.visibility = 'visible'
    } else {

        let liked = document.createElement('i')
        liked.innerHTML = '<i class="fa-solid fa-heart"></i>'
        likes_div.replaceChild(liked, like_icon)

        article.likes += 1
        fetch(`http://localhost:3000/blogs/${article_id}`, {
            method: 'PATCH',
            body: JSON.stringify({ "likes": article.likes }),
            headers: { 'Content-Type': 'application/json' }
        }).then(
            response => response.json()
        ).then(
            json => likes.innerText = article.likes
        )
    }
})

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

let sendButton = document.getElementById('send_comment')

function showButton() {
    sendButton.style.display = 'block'
}

let popup_container = document.getElementById('popup_container')
let closePopup = document.getElementById("close_popup")
function closePopupFn() {
    popup_container.style.visibility = "hidden";
}

closePopup.addEventListener('click', closePopupFn)
let comment_form = document.getElementById('comment_form')
comment_form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (localStorage.getItem('user') === null) {
        popup_container.style.visibility = 'visible'
    }
    else if (comment_form.comment_content.value.trim() !== '') {
        let user = localStorage.getItem('user')
        let user_parsed = JSON.parse(user)
        let today = new Date()
        let today_date = today.getDate() + " " + today.toLocaleString('default', { month: 'short' }) + " " + today.getFullYear()
        let comment = { email: user_parsed.email, name: user_parsed.name, date: today_date, comment: comment_form.comment_content.value }
        article.comments_list.push(comment)
        await fetch(`http://localhost:3000/blogs/${article_id}`, {
            method: 'PUT',
            body: JSON.stringify(article),
            headers: { 'Content-Type': 'application/json' }
        })
    }
})


