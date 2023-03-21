let res_nav = document.getElementById("responsive_nav");
let hum = document.getElementById("fa-bars");
let login_text = document.getElementsByClassName("login_text")
let popup_container = document.getElementById('popup_container')

for (let i = 0; i < login_text.length; i++) {
    login_text[i].addEventListener('click', () => {
        localStorage.removeItem('user')
        window.location.replace('./login.html')
    })
}
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

    console.log('clicked');

    if (window.getComputedStyle(res_nav).visibility === "hidden") {
        res_nav.style.visibility = 'visible'
        document.body.classList.add('stop-scrolling')
    } else if (window.getComputedStyle(res_nav).visibility === "visible") {
        res_nav.style.visibility = 'hidden'
        document.body.classList.remove('stop-scrolling')
    }
}

async function deleteBlog(blogId) {
    console.log('In delete function', blogId)
    await fetch(`https://evelynemybrandbackend.up.railway.app/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token_parsed}`}
    })
    popup_container.style.visibility = 'hidden'
    renderBlogs()
}


function deleteBlogFn(blogId) {
    popup_container.style.visibility = 'visible'
}

let resNavMenuItem = document.getElementsByClassName("res_menu_item")
for (let i = 0; i < resNavMenuItem.length; i++) {
    resNavMenuItem[i].addEventListener('click', toggleNavBar);
}

let renderBlogs = async () => {
    console.log('loaded')
    let uri = 'https://evelynemybrandbackend.up.railway.app/blogs'
    let res = await fetch(uri)
    let blogs = await res.json()
    let blogs_list = blogs.data

    let template = ''
    let table_body = document.getElementById('table_body');

    if (blogs_list.length !== 0) {
        // console.log(blogs_list, blogs_list.length, blogs_list[0])  
        for (let i = 0; i < blogs_list.length; i++) {
            // console.log(blogs_list[i])
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let date_array = blogs_list[i].createdAt.split('-')
            let day_array = date_array[2].split('T')
            let day = day_array[0]
            let publish_date = day + ' ' + months[parseInt(date_array[1]) - 1] + ' ' + date_array[0]
            // console.log('date', publish_date)
            template += `
            <tr class="article_row" id="article_row">
                    <td class="col_first" data-label="No">${i + 1}</td>
                    <td data-label="Name" class="blog_title_cell"><span class="blog_name" onclick="window.location = '/article.html?id=${blogs_list[i]._id}'">${blogs_list[i].title}</span></td>
                    <td data-label="Date published">${publish_date}</td>
                    <td data-label="Likes" class="likes">${blogs_list[i].likes}</td>
                    <td data-label="Comments" class="comments">${blogs_list[i].comments}</td>
                    <td data-label="Action" class="icons last_colmn">
                        <div class="edit" onclick="window.location = '/blogForm.html?id=${blogs_list[i]._id}'">
                            <i class="fa-solid fa-pencil"></i>
                        </div>
                        <div class="delete" onclick = deleteBlog('${blogs_list[i]._id}')>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </td>
                </tr>
            `
        }

        table_body.innerHTML = template
    }
}

window.addEventListener('DOMContentLoaded', renderBlogs)

let close_popup = document.getElementById('close_popup')
close_popup.addEventListener('click', () => {
    popup_container.style.visibility = 'hidden'
})

let confirm_delete = document.getElementById('confirm_delete_button')
confirm_delete.addEventListener('click', () => {
    deleteBlog()
})