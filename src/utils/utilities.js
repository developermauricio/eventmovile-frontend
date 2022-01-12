
export function isLoggedIn() {
    const token = localStorage.getItem('_current_token') || false;
    return token ? true : false;
}