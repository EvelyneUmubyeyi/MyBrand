let article_id = new URLSearchParams(window.location.search).get("id")
let user = localStorage.getItem('user')
let user_parsed = JSON.parse(user)

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
let liking_icon = document.getElementById("liking_icon")
let like_icon = document.getElementById('like_icon')
let like_button = document.getElementById('like_button')
let article;

async function renderArticle() {
    console.log('called')
    let res = await fetch(`http://localhost:3000/blogs/${article_id}`)
    article = await res.json()
    if (JSON.stringify(article) !== '{}') {
        console.log(article)
        article_title.innerText = article.title
        small_description.innerText = article.hook
        author_name.innerText = article.author_name
        author_image.src = article.author_image
        publish_date.innerText = article.date_published
        cover_photo.src = article.image
        article_body.innerText = article.body
        if(user_parsed){
            if (article.like_emails.includes(user_parsed.email)) {
                like_icon.classList.add('fa-solid', 'fa-heart')
            } else {
                like_icon.classList.add('fa-regular', 'fa-heart')
            }
        }else{
            like_icon.classList.add('fa-regular', 'fa-heart')
        }
        

        likes.innerText = article.likes
        comments.innerText = article.comments
        template = ''
        if (article.comments_list.length > 0) {
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
        } else {
            console.log('hereeee')
        }
    } else {
        window.location.replace('./pageError.html?id=404')
    }
}

window.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    if (article_id === null) {
        window.location.replace('./pageError.html?id=404')
    } else {
        renderArticle()
    }
})

let refresh_likes = async () => {
    likes.innerHTML = `<p class="no_likes" id="no_likes">${article.likes}</p>`
}

let likes_div = document.getElementById('likes_div')

console.log(like_icon)

like_icon.addEventListener('click',
    async function (e) {
        e.preventDefault()
        await likefn()
    })
async function likefn() {
    if (user === null) {
        popup_container.style.visibility = 'visible'
    } else {
        if (article.like_emails.includes(user_parsed.email) === false) {
            article.likes += 1
            article.like_emails.push(user_parsed.email)

            await fetch(`http://localhost:3000/blogs/${article_id}`, {
                method: 'PATCH',
                body: JSON.stringify({ "likes": article.likes, "like_emails": article.like_emails }),
                headers: { 'Content-Type': 'application/json' }
            }).then(
                response => response.json()
            ).then(
                json => likes.innerText = article.likes
            )
        } else {
            article.likes -= 1
            let index = article.like_emails.indexOf(user_parsed.email)
            if (index > -1) {
                article.like_emails.splice(index, 1)
            }
            await fetch(`http://localhost:3000/blogs/${article_id}`, {
                method: 'PATCH',
                body: JSON.stringify({ "likes": article.likes, "like_emails": article.like_emails }),
                headers: { 'Content-Type': 'application/json' }
            }).then(
                response => response.json()
            ).then(
                json => {
                    console.log(json)
                    likes.innerText = article.likes
                }
            )
        }

    }
}

let res_nav = document.getElementById("responsive_nav");
let hum = document.getElementById("fa-bars");

hum.addEventListener('click', () => {
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
        let today = new Date()
        let today_date = today.getDate() + " " + today.toLocaleString('default', { month: 'short' }) + " " + today.getFullYear()
        let comment = { email: user_parsed.email, name: user_parsed.name, date: today_date, comment: comment_form.comment_content.value }
        article.comments_list.push(comment)
        article.comments += 1
        await fetch(`http://localhost:3000/blogs/${article_id}`, {
            method: 'PUT',
            body: JSON.stringify(article),
            headers: { 'Content-Type': 'application/json' }
        })
    }
})

let prev_icon = document.getElementById('prev')
prev_icon.addEventListener('click', () => {
    window.history.back()
})

let copy_url = document.getElementById("copy_url")
let copied = document.getElementById('copied')

function copiedFn() {
    copied.innerText = ''
    copy_url.style.color = '#ffffff'
}

copy_url.addEventListener('click', () => {
    let url = window.location.href
    let url_input = document.createElement('input')
    document.body.appendChild(url_input)
    url_input.value = url
    url_input.select()
    document.execCommand("copy")
    copied.innerText = 'Copied'
    copy_url.style.color = '#1DD882'
    setTimeout(copiedFn, 2500)
})
