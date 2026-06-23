export const typeOption = [
    {  id: 1,
        selected: true,
        name: '体温待测'
    }, {  id: 2,
        selected: false,
        name: '体重待测'
    }, {  id: 3,
        selected: false,
        name: '血压待测'
    }, {  id: 4,
        selected: false,
        name: '大便待测'
    },
]
export const timeOption = [
    {  id: 1,
        selected: true,
        name: '2:00'
    }, {  id: 2,
        selected: false,
        name: '6:00'
    },
    {  id: 3,
        selected: false,
        name: '10:00'
    }, {  id: 4,
        selected: false,
        name: '14:00'
    }, {  id: 5,
        selected: false,
        name: '18:00'
    }, {  id: 6,
        selected: false,
        name: '22:00'
    },
]

export const mockData = [
    {
        id: 0,
        bedNo: '1245',
        name: '钱有声',
        gender: '男',
        age: '69',
        MRNumber: '199508'
    },
    {
        id: 1,
        bedNo: '1247',
        name: '张颖',
        gender: '女',
        age: '69',
        MRNumber: '134508'

    },
    {
        id: 3,
        bedNo: '1248',
        name: '刘声',
        gender: '男',
        age: '49',
        MRNumber: '345508'
    }
]

export const temperatureType = [
    {
        id: 0,
        label: '耳温'
    },{
        id: 1,
        label: '腋温'
    }, {
        id: 2,
        label: '口温'
    },    {
        id: 3,
        label: '肛温'
    },    {
        id: 4,
        label: '请假'
    },    {
        id: 5,
        label: '外出'
    },    {
        id: 6,
        label: '不在'
    },    {
        id: 7,
        label: '不升'
    },    {
        id: 8,
        label: '拒测'
    },
]

export const pulseType  =[{
    id: 0,
    label: '正常'
},{
    id: 1,
    label: '短绌'
}]

export const breatheType =[{
    id: 0,
    label: '正常'
},{
    id: 1,
    label: '呼吸机'
}]

export const stoneType = [{
    id: 0,
    label: '正常'
},{
    id: 1, 
    label: '※'
},{
    id: 2,
    label: '⭐'
},{
    id: 3,
    label: '1/E'
},{
    id: 4,
    label: '0/E'
}]

export const urinateType = [{
    id: 0,
    label:'正常'
}, {
    id: 1,
    label: '※'
},{
    id: 2,
    label: 'C'
}]

export const pulseConditionType = [{
    id: 0,
    label: '正常'
},{
    id: 1,
    label: '脉滑'
},{
    id: 2,
    label: '脉浮紧'
},{
    id: 3,
    label: '脉浮数'
},{
    id: 4,
    label: '脉弦'
},{
    id: 5,
    label: '脉数'
}, {
    id: 6,
    label: '脉细弦'
},{
    id: 7,
    label: '脉细'
},{
    id: 8,
    label: '脉细数'
}]

export const temperature=["耳温","腋温","口温","肛温","请假","外出","不在","不升", "拒测"]
export const pulse = ['正常','短绌']
export const timePeriod=['02','06','10','14','18','22']
export const breatheWay = ['正常',"呼吸机"]
export const allergy= ['正常', "TAT(+)","TAT(-)","碘试验(+)","碘试验(-)","青霉素皮试阳性史","青霉素过敏史","头孢过敏史","OT(+)","OT(-)"]
export const pulseCondition=["脉滑","脉浮紧","脉浮数","脉弦","脉数","脉细弦","脉细", "脉细数"]
export const tongueCondition = ['正常',"质淡红苔黄腻","质淡红苔白腻","质淡红苔薄白","质淡红苔薄白腻","质红苔黄"]
export const climate = ['正常',"冬至","小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋", "处暑","白露","秋分","寒露", "霜降","立冬","小雪","大雪"]
export const other = ["Sp02%","腹围"]
export const diGaoXin = ["地高辛","地高辛"]
export const eventName = ["入院","手术","分娩","出院","死亡","明日手术","转出","正在手术","明日分娩","病危","病重","转入","转科"]