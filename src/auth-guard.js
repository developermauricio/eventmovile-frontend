const isAuthenticatedGuard = async(to, from, next) =>{
    return new Promise(() =>{
        let token = localStorage.getItem('_current_token')
        if (token){
            next()
        }else{
            next({name: 'Login'})
        }
    })
}

export default isAuthenticatedGuard