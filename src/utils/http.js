import axios from 'axios';
import qs from 'qs'
import { errorAlert } from './alert'
import Vue from 'vue'
import router from '../router'
import store from '../store'
// 开发环境
let baseUrl = '/aa'
Vue.prototype.$imgPre = 'http://localhost:3000';

// 打包
// let baseUrl = ''
// Vue.prototype.$imgPre = ''


// 请求拦截
axios.interceptors.request.use(req => {
    if (req.url != baseUrl + '/api/userlogin') {
        req.headers.authorization = store.state.userInfo.token
    }
    return req;
})

// 响应拦截
axios.interceptors.response.use(res => {
    // console.log('======' + res.config.url);
    console.log(res);
    // 响应输出错误信息
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    if (res.data.msg === '登录已过期或访问权限受限') {
        // 删除token
        store.dispatch('changeUser', {})

        router.push('/login')
    }
    return res;
})

// ===================菜单  开始===================
//添加
export const reqMenuAdd = (form) => {
    return axios({    
        url: baseUrl + "/api/menuadd",
            method: "post",
            data: qs.stringify(form)
    })
}

// 列表交互
export const reqMenuList = () => {
    return axios({
        url: baseUrl + '/api/menulist',
        methods: 'get',
        params: {
            istree: true
        }
    })
}

// 删除
export const reqMenuDel = (id) => {
    return axios({ 
        url: baseUrl + "/api/menudelete",
            method: "post",
            data: qs.stringify({      
            id: id   
        })
    })
}

// 获取一条数据
export const reqMenuDetail = (id) => {  
    return axios({    
        url: baseUrl + "/api/menuinfo",
           
        method: "get",
            
        params: {      
            id: id   
        } 
    });
}

//修改
export const reqMenuUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}

// ===================菜单  结束===================

// ===================角色  开始===================

//添加
export const reqRoleAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}


//删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//详情
export const reqRoleDetail = id => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}

// ===================角色  结束===================

// ===================管理员  开始===================

//添加
export const reqUserAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 p={page:1,size:10}
export const reqUserList = (p) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: p
    })
}

//删除
export const reqUserDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}

//详情
export const reqUserDetail = uid => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}



//修改
export const reqUserUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}

//  总数
export const reqUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",

    })
}

//登录
export const reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}

// ===================管理员  结束===================


// ===================分类  开始===================

//添加
export const reqCateAdd = (cate) => {
    // 有文件的时候用
    let d = new FormData()
    for (let i in cate) {
        d.append(i, cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: d
    })
}

//列表
export const reqCateList = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: p
    })
}

//删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//详情
export const reqCateDetail = id => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



//修改
export const reqCateUpdate = (cate) => {
    let d = new FormData();
    for (let i in cate) {
        d.append(i, cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: d
    })
}

// ===================分类  结束===================

// ===========规格接口 开始====================

// 8.添加 文件
export const reqSpecsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//18.列表 p={page:1,size:10}
export const reqSpecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqSpecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqSpecsDetail = id => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqSpecsUpdate = (user) => {

    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}
export const reqSpecsCount = () => {

    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

// ===========规格接口 结束====================

// ===========商品管理接口 开始====================

// 8.添加 文件
export const reqgoodsAdd = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: d
    })
}

//18.列表 
export const reqgoodsList = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqgoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqgoodsDetail = id => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqgoodsUpdate = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: d
    })
}
export const reqgoodsCount = () => {

    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}

// ===========商品管理接口 结束====================


// ===========会员管理 开始====================

// 请求会员列表
export const reqvipList = () => {
    return axios({
        url: baseUrl + '/api/memberlist',
        method: 'get'
    })
}

// 会员获取
export const reqvipDetail = (uid) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        method: 'get',
        params: {
            uid: uid
        }
    })
}

// 会员的修改
export const reqvipUpdate = (user) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: qs.stringify(user)
    })
}

// ===========会员管理 结束====================


// ===========轮播图 开始====================

// 8.添加 文件
export const reqbannerAdd = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: d
    })
}

//18.列表
export const reqbannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get"
    })
}

//26.删除
export const reqbannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqbannerDetail = id => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqbannerUpdate = (user) => {
    let d = new FormData();
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: d
    })
}


// ===========轮播图 结束====================

// ===========秒杀 开始====================

// 8.添加
export const reqseckAdd = (user) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//18.列表 
export const reqseckList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
    })
}

//26.删除
export const reqseckDel = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqseckDetail = id => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 要id
export const reqseckUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(user)
    })
}

// ===========秒杀 结束====================