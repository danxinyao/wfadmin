// 登录token
import * as types from '../mutationTypes'

const state = {
    // 登录token
    authToken: '',
    account: {}
}

const mutations = {
    /**
     * 登录token
     */
    [types.AUTH] (state, token) {
        state.authToken = token
    },
    [types.REMOVE_AUTH] (state) {
        state.authToken = ''
    },
    [types.SET_ACCOUNT] (state, data) {
        state.account = data
    }
} 

export default{
    state,
    mutations
}