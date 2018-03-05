import * as types from '../mutationTypes'

const state = {
    menuList: [],
    power: {}
}

const mutations = {
    // 保存菜单列表
    [types.SAVE_MENULIST] (state, menuList) {
        state.menuList = menuList
    },
    // 按钮权限映射
    [types.MAP_POWERS] (state) {
        const power = {}
        state.menuList.forEach((item) => {
            if (item.children) {
                item.children.forEach((subItem) => {
                    if (subItem.children) {
                        subItem.children.forEach((sItem) => {
                            power[sItem.path] = sItem.menuPower
                        })
                    }
                })
            }
        })

        state.power = power
    }
}

export default{
    state,
    mutations
}