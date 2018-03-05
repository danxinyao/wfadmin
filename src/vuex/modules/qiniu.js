// 登录token
import * as types from '../mutationTypes'

const state = {
    // token
    uploadToken: ''
}

const mutations = {
    /**
     * token
     */
    [types.QINIU_UPLOAD_TOKEN] (state, token) {
        state.uploadToken = token
    }
} 

export default{
    state,
    mutations
}