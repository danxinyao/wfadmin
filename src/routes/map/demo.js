const Main = () => import('views/main/index.vue') // 主页框架
const Demo = () => import('views/demo/index.vue') // demo

export default [
    {
        path: '/',
        name: 'Demo',
        component: Main,
        meta: {
            auth: true
        },
        children: [
            {
                path: '/demo',
                name: 'demo',
                component: Demo,
                meta: {
                    auth: true
                }
            }  
        ]
    }
]