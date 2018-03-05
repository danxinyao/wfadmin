const Login = () => import('views/log/login.vue') // 登录

export default [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录',
        }
    }
]