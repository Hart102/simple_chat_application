export const Session = () => {
    if(!localStorage.getItem('mySession')) return false
    return JSON.parse(localStorage.getItem('mySession')).response
}