class Auth{
    constructor(pagename){
        const auth = localStorage.getItem('user')
        this.validateUser(auth,pagename)
    }

    validateUser(user){
        if(user.role === 'admin'){
            window.location.replace('.Dasboard')
        }
    }
}