import axios from './index';


//=>登录
export function loginEnterAPI(item){
    return axios.post('/login/enter',item);
}

//=>注册
export function loginRegister(item){
    return axios.post('/login/register',item);
}

//退出
export function loginOut(item){
    return axios.get('/login/out',item);
}
