class Auth{
    constructor(pagename){
        const auth = localStorage.getItem('token')
        this.validateUser(auth,pagename)
    }

    // validateUser(user){
    //     if(user.role === 'admin'){
    //         window.location.replace('.Dasboard')
    //     }
    // }

    async validateUser(token){
        let user = await fetch('https://evelyneportfolioapi.up.railway.app/users/verify', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    
    let newUser = await user.json()
    if (newUser.status === 200){
        window.location.replace('.Dasboard')
    }
    }
}