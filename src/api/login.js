// 密码登录
const loginUrl = '/api/login';

// 退出登录
const logoutUrl = '/api/logout';

const codeTypeUrl = '/api/codes'

const wardsUrl = '/api/wards'

const taskUrl= '/api/task'

const vitalUrl = '/api/vital'

const getInpatientTasksById =(id)=>{
    return `/api/inpatient/${id}/tasks`
}

export {
	loginUrl,
	logoutUrl,
    codeTypeUrl,
    wardsUrl,
    taskUrl,
    getInpatientTasksById
};
