import axios from './index';

//=>验证是否登录的方法

export function checkLogin(){
    return axios.get('/personal/login');
}
