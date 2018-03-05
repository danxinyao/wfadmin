import * as types from '../mutationTypes'
import demo from './demo'
import loading from './loading' // 列表加载动画
import config from './config'
import auth from './auth'
import qiniu from './qiniu'

export default {
    ...demo,
    ...loading,
    ...config,
    ...auth,
    ...qiniu,
}