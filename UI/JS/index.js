let user = localStorage.getItem('user')
let user_parsed = JSON.parse(user)
let projects;

let login_text = document.getElementsByClassName("login_text")

let popup = document.getElementById("popup_container")
let closePopup = document.getElementById("close_popup")

async function openSkillsPopup(skill_id) {
    console.log(skill_id)
    const res = await fetch(`https://evelyneportfolioapi.up.railway.app/skills/${skill_id}`)
    let skill = await res.json()
    template_skills = ""

    const single_skill = skill.data
    for (let j = 0; j < single_skill.specific_skills.length; j++) {
        template_skills +=
            `
            <div class="card">
                <p>${single_skill.specific_skills[j]}</p>
            </div>
            `
    }
    let container = document.getElementById('specific_skills_container')
    container.innerHTML = template_skills
    popup.style.visibility = "visible";
}

function closePopupFn() {
    popup.style.visibility = "hidden";
}

closePopup.addEventListener('click', closePopupFn)

// cards slider
document.getElementById('next').onclick = function () {
    const widthItem = document.getElementById('skill_category_card').offsetWidth + 32;
    document.getElementById('skills_cards_container').scrollLeft += widthItem;
}
document.getElementById('prev').onclick = function () {
    const widthItem = document.getElementById('skill_category_card').offsetWidth + 32;
    document.getElementById('skills_cards_container').scrollLeft -= widthItem;
}

document.getElementById('next_work').onclick = function () {
    const widthItem = document.getElementById('work_category_card').offsetWidth + 32;
    document.getElementById('work_cards_container').scrollLeft += widthItem;
}
document.getElementById('prev_work').onclick = function () {
    const widthItem = document.getElementById('work_category_card').offsetWidth + 32;
    document.getElementById('work_cards_container').scrollLeft -= widthItem;
}

let res_nav = document.getElementById("responsive_nav");
let hum = document.getElementById("fa-bars");

function toggleNavBar() {
    if (window.getComputedStyle(res_nav).visibility === "hidden") {
        res_nav.style.visibility = 'visible'
        document.body.classList.add('stop-scrolling')
    } else if (window.getComputedStyle(res_nav).visibility === "visible") {
        res_nav.style.visibility = 'hidden'
        document.body.classList.remove('stop-scrolling')
    }
}

hum.addEventListener('click', toggleNavBar)

let about_li = document.getElementById('about_me_li')
let about = document.getElementById('about_me')

let resNavMenuItem = document.getElementsByClassName("res_menu_item")
for (let i = 0; i < resNavMenuItem.length; i++) {
    resNavMenuItem[i].addEventListener('click', toggleNavBar);
}

let sections = document.getElementsByClassName('section');
let navLinks = document.querySelectorAll("nav .nav_content ul li");

window.onscroll = () => {
    let current = "";

    for (let i = 0; i < sections.length; i++) {
        let sectionTop = sections[i].offsetTop
        let sectionHeight = sections[i].offsetHeight
        if (pageYOffset >= (sectionTop - (sectionHeight / 2))) {
            current = sections[i].getAttribute("id");
        }
    }

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
        if (navLinks[i].classList.contains(current)) {
            navLinks[i].classList.add("active");
        }
    }

};

let blogs_container = document.getElementById('blogs_cards_container')
async function loadBlogs() {
    const res = await fetch('https://evelyneportfolioapi.up.railway.app/blogs')
    let blogs = await res.json()
    let template = ''

    for (let i = 0; i <= 2; i++) {
        template += `
        <div class="card blog_card">
        <img src=${blogs.data[i].image} alt="">
        <div class="blog_text">
            <p class="blog_title">${blogs.data[i].title}</p>
            <p class="shrt_description">${blogs.data[i].hook}</p>
        </div>
        <button onclick="window.location = '/UI/article.html?id=${blogs.data[i]._id}'"><a>Read</a></button>
    </div>
        `
    }

    blogs_container.innerHTML = template
}

async function loadSkills() {
    const res = await fetch('https://evelyneportfolioapi.up.railway.app/Skills/')
    let skills = await res.json()
    const skill_set = skills.data
    template = ""
    for (let i = 0; i < skill_set.length; i++) {
        template += `
        <div id="skill_category_card" class="card skill_category" onclick="openSkillsPopup('${skill_set[i]._id}')">
        <p>${skill_set[i].category}</p>
        </div>
        `

    }
    let category_container = document.getElementById('skills_category_container')
    category_container.innerHTML = template
}

let projects_popup = document.getElementById("popupContainer")
let likes = document.getElementById('project_likes')

async function likefn(project_id) {
    if (user === null) {
        projects_popup.style.visibility = 'visible'
    } else {
        const res = await fetch(`http://localhost:3000/projects/${project_id}`)
        let project = await res.json()

        if (project.like_emails.includes(user_parsed.email) === false) {
            project.likes += 1
            project.like_emails.push(user_parsed.email)

            await fetch(`http://localhost:3000/projects/${project_id}`, {
                method: 'PATCH',
                body: JSON.stringify({ "likes": project.likes, "like_emails": project.like_emails }),
                headers: { 'Content-Type': 'application/json' }
            }).then(
                response => response.json()
            ).then(
                json => likes.innerText = project.likes
            )
        } else {
            project.likes -= 1
            let index = project.like_emails.indexOf(user_parsed.email)
            if (index > -1) {
                project.like_emails.splice(index, 1)
            }
            await fetch(`http://localhost:3000/projects/${project_id}`, {
                method: 'PATCH',
                body: JSON.stringify({ "likes": project.likes, "like_emails": project.like_emails }),
                headers: { 'Content-Type': 'application/json' }
            }).then(
                response => response.json()
            ).then(
                json => likes.innerText = project.likes
            )
        }

    }
}

async function loadProjects() {
    const res = await fetch("https://evelyneportfolioapi.up.railway.app/projects")
    projects = await res.json()
    let template = ""

    const projects_list = projects.data
    for (let i = 0; i < projects_list.length; i++) {
        if (user_parsed && projects_list[i].like_emails.includes(user_parsed.email)) {
            console.log('here')
            template +=
                `
            <div class="card work_card" id="work_category_card">
                        <img src=${projects_list[i].image} alt="project_image">
                        <div class="links">
                            <div class="likes">
                                <i class="fa-solid fa-heart" style="font-weight:700" onclick="likefn('${projects_list[i].id}')"></i>
                                <p id="project_likes">${projects_list[i].likes}</p>
                            </div>
                            <a href=${projects_list[i].link} target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                        <p class="project_name">${projects_list[i].title}</p>
                    </div>
            `
        } else if (!user_parsed || !projects_list[i].like_emails.includes(user_parsed.email)) {
            console.log('here 2')
            template +=
                `
            <div class="card work_card" id="work_category_card">
                        <img src=${projects_list[i].image} alt="project_image">
                        <div class="links">
                            <div class="likes">
                                <i class="fa-regular fa-heart" onclick="likefn('${projects_list[i].id}')"></i>
                                <p id="project_likes">${projects_list[i].likes}</p>
                            </div>
                            <a href=${projects_list[i].link} target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                        <p class="project_name">${projects_list[i].title}</p>
                    </div>
            `
        }
    }

    let container = document.getElementById('projects_cards_container')
    container.innerHTML += template
}


window.addEventListener('DOMContentLoaded', () => {
    if (user_parsed !== null) {
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
    loadSkills()
    loadProjects()
    loadBlogs()
})

let form = document.getElementById("contact_form")
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (form.name.value.trim() !== '' && form.email.value.trim() !== '' && form.phone.value.trim() !== '' && form.message.value.trim() !== '') {
        let today = new Date()
        let today_date = today.getDate() + " " + today.toLocaleString('default', { month: 'short' }) + " " + today.getFullYear()
        const doc = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            message: form.message.value,
            date: today_date
        }
        await fetch('https://evelyneportfolioapi.up.railway.app/queries', {
            method: 'POST',
            body: JSON.stringify(doc),
            headers: { 'Content-Type': 'application/json' }
        })

        let newQuery = await user.json()

        if (newQuery.status === 201) {
            Toastify({
                text: 'Message sent!',
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#1dd882",
                },
            }).showToast();
        }

        Toastify({
            text: newQuery.message,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ff9494",
            },
        }).showToast();
    }
})
