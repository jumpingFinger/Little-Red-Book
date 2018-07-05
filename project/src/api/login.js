import axios from './index';


// =>login
// //=>登录
// export function loginEnterAPI(item){
//     return axios.post('/personal/login',item);
// }
//
// //=>注册
// export function loginRegister(item){
//     return axios.post('/personal/register',item);
// }

//登陆
export function loginEnterAPI(item) {
    return axios.post("/login/enter", item);
}
//注册
export function loginRegister(item) {
    return axios.post("/login/register",item);
}