let user = localStorage.getItem('user')
let user_parsed = JSON.parse(user)
if(user===null || user_parsed.role !== "admin"){
    window.location.replace('./pageError.html?id=401')
}