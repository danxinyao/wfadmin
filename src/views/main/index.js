import { menuList } from '../../data/menu.js'
import { mapGetters, mapActions } from 'vuex'
import { account as ajax, role } from 'services'

export default {
    data() {
        return {
            sysName: '后台管理系统',
            menuList: [],
            currentMenus: [],
            currentParentIndex: 0
        }
    },
    computed: {
        ...mapGetters([
            'account'
        ])
    },
    mounted() {
        // 获取菜单
        this.menuList = menuList
        this.saveMenuList(this.menuList)
        // this.getRoleMenuPowerList()

        // 获取登陆者信息
        this.getAccount()
    },
    methods: {
        ...mapActions([
            'saveMenuList',
            'removeAuth',
            'setAccount'
        ]),
        getAccount() {
            ajax.getAccount().then((result) => {
                this.setAccount(result)
            })
        },
        getRoleMenuPowerList() {
            role.getRoleMenuPowerList().then((result) => {
                this.menuList = result
                this.saveMenuList(this.menuList)
            })
        },
        // 一级菜单选择
        parentMenusClick(index, children) {
            this.currentParentIndex = index
            this.currentMenus = children
        },
        // 退出登录
        logOut() {
            this.$confirm('确定退出吗？', '提示', { type: 'warning' }).then(() => {
                this.$message({
                    message: '退出登录成功',
                    type: 'success'
                })
                this.removeAuth()
                this.$router.push('/login')
            }).catch(() => {

            })
        },
        // 修改密码
        changePassword() {
            this.$router.push('/modifyPwd')
        }
    }
}