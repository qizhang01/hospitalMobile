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

export function getDiffDays(endDate) {
    const start = new Date();
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getStandardTime(date){
    const year = date.getFullYear()
    const month = get2Digtal(date.getMonth()+1)
    const day = get2Digtal(date.getDate())
    return  `${year}-${month}-${day}T00:00:00+08:00`
}

export const get2Digtal=(month)=>{
    if(month<10){
        return `0${month}`
    }
    return `${month}`
}

export function getTimePeriodByHour(){
    const hour = new Date().getHours()
    if(hour>=0 && hour<4){
        return 0
    }else if(hour>=4&&hour<8){
        return 1
    }else if(hour>=8&&hour<12){
        return 2
    }else if(hour>=12&&hour<16){
        return 3
    }else if(hour>=16&&hour<20){
        return 4
    }
    return 5
}