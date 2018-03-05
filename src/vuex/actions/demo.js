import * as types from '../mutationTypes'

export default {
    setDemo: ({ commit }, data) => {
        commit(types.DEMO_SET, data)
    }
}