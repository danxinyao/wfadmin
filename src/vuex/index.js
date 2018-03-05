import promisePolyfill from 'es6-promise'   // es6 promise polyfill
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import * as types from './mutationTypes'
import { cloneDeep } from 'lodash'

promisePolyfill.polyfill()
Vue.use(Vuex)

import demo from './modules/demo'
import loading from './modules/loading'
import config from './modules/config'
import auth from './modules/auth'
import qiniu from './modules/qiniu'

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        demo,
        loading,
        config,
        auth,
        qiniu
    }
})