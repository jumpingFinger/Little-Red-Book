import axios from './index'

//获取轮播图的数据
export function queryBanner() {
    return axios.get('/shopping/banner')
}

//获取数据列表
export function queryList(payload) {
    return axios.get('/shopping/list',{
        params:payload
    })
}

//获取商品详情
export function queryInfo(shoppingID) {
    return axios.get('/shopping/detail',{
        params:{
            shoppingID
        }
    })
}

//加如购物车
export function addShopCart(shoppingID) {
    return axios.post('/store/add',{
        shoppingID:JSON.stringify(shoppingID)
    })
}

//移除购物车
export function removeShopCart(shoppingID) {
    return axios.post('/store/remove',{
        shoppingID
    })
}

//拉取购物车列表
export function queryShopCart(code=0) {
    return axios.get('/store/info',{
        params:{
            code
        }
    })
}