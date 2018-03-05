import * as types from '../mutationTypes'

export default {
    // 保存菜单列表
    saveMenuList: ({ commit, dispatch }, menuList) => {
        commit(types.SAVE_MENULIST, menuList)
        dispatch('mapPower')
    },
    // 按钮权限映射
    mapPower: ({ commit }) => {
        commit(types.MAP_POWERS)
    }
}