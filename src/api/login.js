// 密码登录
const mainUrl = process.env.NODE_ENV === 'development'? '': "https://infusion.us.to:8443"

const loginUrl = mainUrl + '/api/login';

const logoutUrl = mainUrl +'/api/logout';

const codeTypeUrl = mainUrl +'/api/codes'

const wardsUrl = mainUrl +'/api/wards'

const taskUrl= mainUrl +'/api/task'

const vitalUrl = mainUrl +'/api/vital'

const taskStatesUrl = mainUrl + '/api/task_states'
const workflowsUrl = mainUrl +  '/api/workflows'
const suppliesUrl = mainUrl + '/api/supplies'
const usersUrl = mainUrl + '/api/users'
const wardUrl = mainUrl + '/api/ward'
const inpatientUrl= mainUrl + '/api/inpatient'

const getInpatientTasksById =(id)=>{
    return `${mainUrl}/api/inpatient/${id}/tasks`
}

export {
	loginUrl,
	logoutUrl,
    codeTypeUrl,
    wardsUrl,
    taskUrl,
    taskStatesUrl,
    workflowsUrl,
    suppliesUrl,
    usersUrl,
    wardUrl,
    vitalUrl,
    inpatientUrl,
    getInpatientTasksById
};
