import { reqSpecsList, reqSpecsCount } from '../../utils/http'
const state = {
    list: [],
    page: 1,
    total: 0,
    size: 5
}
const mutations = {
    // list
    changeList(state, arr) {
        state.list = arr
    },
    // 总数
    changeTotal(state, total) {
        state.total = total
    },
    // 页数
    changePage(state, page) {
        state.page = page
    }
}
const actions = {
    // list
    reqList(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
            //发请求，成功之后，修改list
        reqSpecsList(params).then(res => {
            let list = res.data.list ? res.data.list : []
            if (list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1)
                context.dispatch("reqList");
                return;
            }

            //attrs JSON.parse()
            list.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            })
            context.commit("changeList", list)
        })
    },
    //请总数
    reqCount(context) {
        reqSpecsCount().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    // 页数改变
    changePage(context, page) {
        context.commit('changePage', page);
        context.dispatch('reqList')
    }
}
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}