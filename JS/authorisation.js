let token = localStorage.getItem('token')
let token_parsed = JSON.parse(token)
async function validateUser(token_parsed) {
    let user = await fetch('https://evelyneportfolioapi.up.railway.app/users/verify', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    let newUser = await user.json()
    if (newUser.status !== 200) {
        window.location.replace('./pageError.html?id=401')
    }
}

