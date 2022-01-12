import { isLoggedIn } from './utils/utilities'

const isAuthenticatedGuard = async(to, from, next) =>{
    return new Promise(() =>{
        /*let token = localStorage.getItem('_current_token')
        if (token){
            next()
        }else{
            next({name: 'Login'})
        } */

        document.title = to.meta.title
        const requiresAuth = to.meta.requiresAuth

        if (!requiresAuth && isLoggedIn()) next({name: 'Home'})

        if (requiresAuth && !isLoggedIn()) next({name: 'Login'})
        else next()        
    })
}

export default isAuthenticatedGuard