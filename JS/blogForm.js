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

// let quill = new Quill('#blog_content', {
//     modules: {
//         toolbar: toolbar_options,
//     },
//     theme: "snow",
//     placeholder: 'Write the article body here ...',
// })

let imageStored;

async function uploadProcess(imageToUpload) {

    const data = new FormData();
    data.append("file", imageToUpload);
    data.append("upload_preset", "marketMedia");
    data.append("cloud_name", "doxc03jzw");

    const Http = new XMLHttpRequest();
    // Http.setRequestHeader("Content-Type", "application/xml");
    const url = "https://api.cloudinary.com/v1_1/doxc03jzw/image/upload";
    Http.open("POST", url);
    Http.send(data);

    Http.onreadystatechange = (e) => {
        let res = JSON.parse(Http.responseText);
        console.log(res)
        console.log(res.url)
        imageStored = res.url;
    }
}

let inner_text = document.getElementById("inner_text")
let imageInput = document.getElementById("image");
let imageContainer = document.getElementById("image_container");
let newItem = document.createElement("img");

imageInput.onchange = event => {
    console.log(event.target.files);
    const file = event.target.files[0];
    let image = URL.createObjectURL(file);

    newItem.src = image;
    newItem.style.cursor = 'pointer'
    newItem.addEventListener('click',(e)=>{
        e.preventDefault()
        imageInput.click()
    })

    inner_text.classList.add("hide_element");
    imageContainer.appendChild(newItem);
    imageContainer.classList.add("preview-img-container")
    // imageContainer.style.backgroundImage = url(image);
    newItem.classList.add("preview-img");
    uploadProcess(file);
}


let form = document.getElementById('article_form')
form.addEventListener('submit',  async (e) =>{
    e.preventDefault();
    if (form.title.value.trim() !== '' && form.hook.value.trim() !== '' && form.content.value.trim() !== '' && imageStored!==''){
        
        let today = new Date()
        let today_date = today.getDate() + " " + today.toLocaleString('default', { month: 'short' }) + " "+ today.getFullYear()
        
        const doc = {
            title:form.title.value,
            hook:form.hook.value,
            image:imageStored,
            body: form.content.value,
            date_published: today_date,
            likes: 0,
            comments: 0,
        }
        await fetch('http://localhost:3000/blogs',{
            method:'POST',
            body:JSON.stringify(doc),
            headers: { 'Content-Type': 'application/json' }
        })

        window.location.replace('./blogsList.html')
    } 
})