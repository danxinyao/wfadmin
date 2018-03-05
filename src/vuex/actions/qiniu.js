import * as types from '../mutationTypes'

export default {
    /**
     * 保存登录token
     */
    setQiniuUploadToken: ({ commit }, token) => {
        commit(types.QINIU_UPLOAD_TOKEN, token)
    }
}