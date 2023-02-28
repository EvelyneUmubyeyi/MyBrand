let article_id = new URLSearchParams(window.location.search).get("id")
let newItem = document.createElement("img");
let imageInput = document.getElementById("image");
newItem.style.cursor = 'pointer'
newItem.addEventListener('click', (e) => {
    e.preventDefault()
    imageInput.click()
})

let inner_text = document.getElementById("inner_text")
let imageContainer = document.getElementById("image_container");
let form = document.getElementById('article_form')
let article;
let imageStored;

async function renderArticle() {
    let res = await fetch(`http://localhost:3000/blogs/${article_id}`)
    article = await res.json()

    form.title.value = article.title
    form.hook.value = article.hook
    newItem.src = article.image
    imageStored = article.image
    inner_text.classList.add("hide_element");
    imageContainer.appendChild(newItem);
    imageContainer.classList.add("preview-img-container")
    newItem.classList.add("preview-img");
    form.content.value = article.body
}

if (article_id !== null) {
    renderArticle()
}

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

let toolbar_options = [
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'blockquote', 'code-block', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }]

]

let quill = new Quill('#blog_content', {
    modules: {
        toolbar: toolbar_options,
    },
    theme: "snow",
    placeholder: 'Write the article body here ...',
})


async function uploadProcess(imageToUpload) {

    const data = new FormData();
    data.append("file", imageToUpload);
    data.append("upload_preset", "marketMedia");
    data.append("cloud_name", "doxc03jzw");

    const Http = new XMLHttpRequest();
    const url = "https://api.cloudinary.com/v1_1/doxc03jzw/image/upload";
    Http.open("POST", url);
    Http.send(data);

    Http.onreadystatechange = (e) => {
        let res = JSON.parse(Http.responseText);
        imageStored = res.url;
    }
}

imageInput.onchange = event => {
    console.log(event.target.files);
    const file = event.target.files[0];
    let image = URL.createObjectURL(file);

    newItem.src = image;

    inner_text.classList.add("hide_element");
    imageContainer.appendChild(newItem);
    imageContainer.classList.add("preview-img-container")
    newItem.classList.add("preview-img");
    uploadProcess(file);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.title.value.trim() !== '' && form.hook.value.trim() !== '' && form.content.value.trim() !== '' && imageStored !== '') {

        let today = new Date()
        let today_date = today.getDate() + " " + today.toLocaleString('default', { month: 'short' }) + " " + today.getFullYear()
        if (article_id !== null) {
            const doc = {
                title: form.title.value,
                hook: form.hook.value,
                image: imageStored,
                body: form.content.value,
                date_published: article.date_published,
                likes: article.likes,
                author_name: article.author_name,
                author_image: article.author_image,
                comments: article.comments,
                comments_list: article.comments_list,
                like_emails:article.like_emails
            }
            await fetch(`http://localhost:3000/blogs/${article_id}`, {
                method: 'PUT',
                body: JSON.stringify(doc),
                headers: { 'Content-Type': 'application/json' }
            })
            window.location.replace('/blogsList.html')
        } else {
            const doc = {
                title: form.title.value,
                hook: form.hook.value,
                image: imageStored,
                body: form.content.value,
                date_published: today_date,
                likes: 0,
                comments: 0,
                author_name: "Umubyeyi Evelyne",
                author_image: "https://res.cloudinary.com/doxc03jzw/image/upload/v1676989584/IMG-20210617-WA0028_2_mqc8ne.jpg",
                comments_list: [],
                like_emails:[]
            }
            await fetch('http://localhost:3000/blogs', {
                method: 'POST',
                body: JSON.stringify(doc),
                headers: { 'Content-Type': 'application/json' }
            })
            window.location.replace('/blogsList.html')

        }
    }
})
