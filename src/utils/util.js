export function formatTime() {
    let date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date..getUTCDate()
    cosnt hour = date.getHours()
    const minute = date.getMinutes()
    return `${year}-${month}-${day} ${hour}: ${minute}`
}   