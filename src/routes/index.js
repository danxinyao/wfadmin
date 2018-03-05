const Main = () => import('views/main/index.vue') // 主页框架

import Demo from './map/demo'
import Login from './map/log'

export default [
    ...Demo,
    ...Login,
    {
        path: '/main',
        name: 'main',
        component: Main,
        meta: {
            title: '管理系统',
            auth: true
        }
    }
]