import axios from './index';


//=>登录
export function loginEnterAPI(item){
    return axios.post('/personal/login',item);
}

//=>注册
export function loginRegister(item){
    return axios.post('/personal/register',item);

}