export function formatTime() {
    let date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getUTCDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${year}-${month}-${day} ${hour}: ${minute}`
}   

export function  getAgeByBirthdate(birthDate){
    const today = new Date()
    return today.getFullYear() - Number(birthDate.slice(0,4))
}