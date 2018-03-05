import { account as ajax } from 'services'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            logining: false,
            form: {
                userName: 'xymn',
                password: 'Password1',
                grant_type: 'password',
                scope: 'pc'
            },
            rules: {
                userName: [
                    { 
                        required: true, 
                        message: '请输入账号', 
                        trigger: 'blur' 
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ]
            },
            checked: true
        }
    },
    mounted() {
        // this.handleSubmit()
    },
    methods: {
        ...mapActions([
            'setAuth'
        ]),
        handleSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.logining = true
                    ajax.adminLogin(this.form).then((result) => {
                        if (result) {
                            this.logining = false
                            this.setAuth(result.access_token)
                            this.$router.push('/main')
                        }
                    }).catch((err) => {
                        this.logining = false
                    })
                }
                else {
                    return false
                }
            })
        }
    }
}