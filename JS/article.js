let article_id = new URLSearchParams(window.location.search).get("id")
let token = localStorage.getItem('token')
let token_parsed = JSON.parse(token)
let login_text = document.getElementsByClassName("login_text")

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
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload;
}

let user_details = decodeJWT(token_parsed)

async function renderComments() {
    const res = await fetch(`https://evelyneportfolioapi.up.railway.app/blogs/${article_id}/comments`)
    let comment_list = await res.json()
    let comments = comment_list.data
    template = ''

    if (comments.length > 0) {
        for (let i = 0; i < comments.length; i++) {
            let res = await fetch(`https://evelyneportfolioapi.up.railway.app/users/${comments[i].userId}`)
            let response = await res.json()

            let date_array = comments[i].createdAt.split('-')
            let day_array = date_array[2].split('T')
            let day = day_array[0]
            let comment_date = day + ' ' + months[parseInt(date_array[1]) - 1] + ' ' + date_array[0]

            template += `
        <div class="single_comment">
        <div class="icon_container">
            <i class="fa-solid fa-user"></i>
        </div>
        <div class="text">
            <div class="comment_header">
                <p class="name" id="commenter_name">${response.data.name}</p>
                <p class="date" id="commenting_date">${comment_date}</p>
            </div>
            <p class="comment" id="comment_body">${comments[i].comment}</p>
        </div>
        </div>
        `
        }
        comments_list.innerHTML = template
    }
}


async function renderArticle() {
    let res = await fetch(`https://evelyneportfolioapi.up.railway.app/blogs/${article_id}`)
    let article_res = await res.json()
    article = article_res.data

    let commentsRes = await fetch(`https://evelyneportfolioapi.up.railway.app/blogs/${article_id}/comments`)
    let commentsResponse = await commentsRes.json()
    comments_Array = commentsResponse.data

    if (JSON.stringify(article) !== '{}') {
        article_title.innerText = article.title
        small_description.innerText = article.hook
        author_name.innerText = article.author_name
        author_image.src = article.author_image

        let date_array = article.createdAt.split('-')
        let day_array = date_array[2].split('T')
        let day = day_array[0]

        publish_date.innerText = day + ' ' + months[parseInt(date_array[1]) - 1] + ' ' + date_array[0]
        cover_photo.src = article.image
        article_body.innerText = article.body
        if (token_parsed) {
            if (article.like_emails.includes(user_details.email)) {
                like_icon.classList.add('fa-solid', 'fa-heart')
            } else {
                like_icon.classList.add('fa-regular', 'fa-heart')
            }
        } else {
            like_icon.classList.add('fa-regular', 'fa-heart')
        }
        likes.innerText = article.likes
        comments.innerText = article.comments
        template = ''

        if (comments_Array.length > 0) {
            for (let i = 0; i < comments_Array.length; i++) {
                let res = await fetch(`https://evelyneportfolioapi.up.railway.app/users/${comments_Array[i].userId}`)
                let response = await res.json()

                let date_array = comments_Array[i].createdAt.split('-')
                let day_array = date_array[2].split('T')
                let day = day_array[0]
                let comment_date = day + ' ' + months[parseInt(date_array[1]) - 1] + ' ' + date_array[0]

                template += `
        <div class="single_comment">
        <div class="icon_container">
            <i class="fa-solid fa-user"></i>
        </div>
        <div class="text">
            <div class="comment_header">
                <p class="name" id="commenter_name">${response.data.name}</p>
                <p class="date" id="commenting_date">${comment_date}</p>
            </div>
            <p class="comment" id="comment_body">${comments_Array[i].comment}</p>
        </div>
        </div>
        `
            }
            comments_list.innerHTML = template
        }

    } else {
        window.location.replace('./pageError.html?id=404')
    }
}

window.addEventListener('load', (e) => {
    e.preventDefault()
    if (article_id === null) {
        window.location.replace('./pageError.html?id=404')
    } else {
        if (token_parsed !== null) {
            for (let i = 0; i < login_text.length; i++) {
                login_text[i].innerText = "Log out"
                login_text[i].addEventListener('click', () => {
                    localStorage.removeItem('user')
                    window.location.replace('./login.html')
                })
            }
        } else {
            for (let i = 0; i < login_text.length; i++) {
                login_text[i].addEventListener('click', () => {
                    window.location.replace('./login.html')
                })
            }
        }
        renderArticle()
    }
})

let refresh_likes = async () => {
    likes.innerHTML = `<p class="no_likes" id="no_likes">${article.likes}</p>`
}

let likes_div = document.getElementById('likes_div')

async function likefn() {
    if (token_parsed === null) {
        popup_container.style.visibility = 'visible'
    } else {
        if (article.like_emails.includes(user_details.email) === false) {
            article.likes += 1
            article.like_emails.push(user_details.email)

            const res = await fetch(`https://evelyneportfolioapi.up.railway.app/blogs/${article_id}/likes`, {
                method: 'PATCH',
                body: JSON.stringify({ "id": user_details.id }),
                headers: { Authorization: `Bearer ${token_parsed}`, 'Content-Type': 'application/json' }
            })

            likes.innerText = article.likes

        } else {
            article.likes -= 1
            let index = article.like_emails.indexOf(user_details.email)
            if (index > -1) {
                article.like_emails.splice(index, 1)
            }
            const res = await fetch(`https://evelyneportfolioapi.up.railway.app/blogs/${article_id}/likes`, {
                method: 'PATCH',
                body: JSON.stringify({ "id": user_details.id }),
                headers: { Authorization: `Bearer ${token_parsed}`, 'Content-Type': 'application/json' }
            })
            likes.innerText = article.likes
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
    if (token_parsed === null) {
        popup_container.style.visibility = 'visible'
    }
    else if (comment_form.comment_content.value.trim() !== '') {
        let comment_val = comment_form.comment_content.value
        let comment = { userId: user_details.id, blogId: article_id, comment: comment_val }
        // article.comments_list.push(comment)
        article.comments += 1

        const res = await fetch(`https://evelyneportfolioapi.up.railway.app/blogs/${article_id}/comments`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: { Authorization: `Bearer ${token_parsed}`, 'Content-Type': 'application/json' }
        })

        const commentRes = await res.json()
        let date_array = commentRes.data.createdAt.split('-')
        let day_array = date_array[2].split('T')
        let day = day_array[0]

        comment_date = day + ' ' + months[parseInt(date_array[1]) - 1] + ' ' + date_array[0]
        // comments.innerText = article.comments
        comment_form.reset()
        sendButton.style.display = 'none'
        template += `
        <div class="single_comment">
        <div class="icon_container">
            <i class="fa-solid fa-user"></i>
        </div>
        <div class="text">
            <div class="comment_header">
                <p class="name" id="commenter_name">${user_details.name}</p>
                <p class="date" id="commenting_date">${comment_date}</p>
            </div>
            <p class="comment" id="comment_body">${commentRes.data.comment}</p>
        </div>
        </div>
        `
    }
    comments.innerText = article.comments
    comments_list.innerHTML += template
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
