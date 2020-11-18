import { reqgoodsCount, reqgoodsList } from '../../utils/http'
const state = {
    list: [],
    page: 1,
    size: 2,
    total: 0
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changePage(state, page) {
        state.page = page
    },
    changeTotal(state, total) {
        state.total = total
    }
}
const actions = {
    reqList(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        reqgoodsList(params).then(res => {
            let list = res.data.list ? res.data.list : []

            if (list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1)
                context.dispatch("reqList");
                return;
            }

            context.commit("changeList", list)
        })
    },
    reqCount(context) {
        reqgoodsCount().then(res => {
            context.commit('changeTotal', res.data.list[0].total)
        })
    },
    changePage(context, page) {
        context.commit('changePage', page)

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