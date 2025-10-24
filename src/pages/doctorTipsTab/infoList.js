export default [{
    id: 2222,
    medicineList: [
        {
            id: 111,
            name: '氯化钠注射液',
            specifications: '300ml 双阀',
            number: 1
        },
        {
            id: 112,
            name: '康艾注射液',
            specifications: '20ml',
            number: 3
        },
    ],
    startTime: '2024-05-13 13:00',
    endTime: '2024-05-13 14:10',
    startNurseName: '刘静',
    endNurseName: '刘静',
    planTime: '2024-05-13 12:40',
    type: '静滴',
    status: '已执行',
    identification: 'bid'
},{
    id: 3333,
    medicineList: [
        {
            id: 111,
            name: '氯化钠注射液',
            specifications: '100ml:0.5g',
            number: 1
        },
        {
            id: 112,
            name: '头孢注射液',
            specifications: '0.75g',
            number: 6
        },
        {
            id: 123,
            name: '吉它霉素注射液',
            specifications: '50ml',
            number: 2
        },
    ],
    startTime: '2024-05-13 10:00',
    endTime: '2024-05-13 11:10',
    startNurseName: '陈静文',
    endNurseName: '王辉',
    planTime: '2024-05-13 07:40',
    type: '静滴',
    status: '已执行',
    identification: 'bid'
}]

export const doctorAdviceList = [{
    id: 1,
    name: "药品医嘱",
    selected: true,
}, {
    id: 2,
    name: "配置医嘱",
    selected: false,
}, {
    id:3,
    name: "检验医嘱",
    selected: false,
}, {
    id: 4,
    name: "诊疗医嘱",
    selected: false,
}, {
    id:5,
    name: "中药医嘱",
    selected: false,
}]


export const periodList = [{
   id: 1,
   name: "长期",
   selected: true
},{
    id: 2,
   name: "临时",
   selected: false
},{
    id: 3,
   name: "全部",
   selected: false
}]

export const stopList = [{
    id: 1,
    name: "未停",
    selected: true
},{
    id: 2,
    name: "已停",
    selected: false
},{
    id: 3,
    name: "已撤销",
    selected: false
},{
    id: 4,
    name: "全部",
    selected: false
}]

export const allOptionsList=[
    {
        id: 1,
        name: "全部",
        selected: true
    },{
        id: 2,
        name: "静滴",
        selected: false
    },{
        id: 3,
        name: "静推",
        selected: false
    },{
        id: 4,
        name: "肌注",
        selected: false
    },{
        id: 5,
        name: "口服",
        selected: false
    },{
        id: 6,
        name: "皮下注射",
        selected: false
    },{
        id: 7,
        name: "微泵",
        selected: false
    },{
        id: 8,
        name: "雾化",
        selected: false
    },{
        id: 9,
        name: "外用",
        selected: false
    },{
        id: 10,
        name: "皮试",
        selected: false
    },{
        id: 11,
        name: "其他",
        selected: false
    }
]