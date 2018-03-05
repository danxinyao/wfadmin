export default {
    demoList: (state) => state.demo.demoList,
    isShowFullLoading: (state) => state.loading.isShowFullLoading, // 显示全局加载动画
    localLoading: (state) => state.loading.localLoading, // 显示局部加载动画
    menuList: (state) => state.config.menuList, // 菜单列表
    powers: (state) => state.config.power[state.route.path] || [], // 按钮权限组
    authToken: (state) => state.auth.authToken, // 登录token
    account: (state) => state.auth.account,
    qiniuUploadToken: (state) => state.qiniu.uploadToken, // 七牛上传资源token
}