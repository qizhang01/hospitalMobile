export const mockData = [
    {
        id: 0,
        date: '2025-09-18 5:45',
        doctor: '王秋林',
        data: {
            temperature: '36.8(耳温)*C',
            pulse: '88 次/分',
            breathe: '20 次/分'
        }
    },
    {
        id: 1,
        date: '2025-09-18 5:45',
        doctor: '刘春霞',
        data: {
            painScore: '2分',
        }
    },
    {
        id: 3,
        date: '2025-09-18 5:45',
        doctor: '王秋林',
        data: {
            temperature: '36.8(耳温)*C',
            pulse: '88 次/分',
            breathe: '30 次/分'
        }
    }
]


export const typeOption = [
    {  id: 1,
        selected: true,
        name: '按时间'
    }, {  id: 2,
        selected: false,
        name: '按项目'
    },
]
export const timeOption = [
    {  id: 1,
        selected: true,
        name: '近三天'
    }, {  id: 2,
        selected: false,
        name: '近一周'
    },
    {  id: 3,
        selected: false,
        name: '近半月'
    }, {  id: 4,
        selected: false,
        name: '近一月'
    },
]

export const translateObj={
    temperature: '体温',
    pulse: '脉搏',
    breathe: '呼吸',
    painScore: '疼痛得分'
}