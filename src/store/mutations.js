export const state = {
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
}
export const mutations = {
    changeUserInfo(state, obj) {
        // vue和本地都存储一份
        state.userInfo = obj
        if (obj.token) {
            // 本地存储
            sessionStorage.setItem('userInfo', JSON.stringify(obj))
        } else {
            // 当obj为空时
            sessionStorage.removeItem('userInfo')
        }
    }
}
export const getters = {
    userInfo(state) {
        return state.userInfo
    }
}