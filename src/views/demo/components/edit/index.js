import { cloneDeep } from 'lodash'
export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object
    },
    data() {
        return {
            form: {},
            // 初始表单
            initForm: {
                teamname: '',
                name: '',
                content: 'abcd',
                active: '',
                imgurl: ''
            },
            actives: [
                {
                    label: 'aaa',
                    value: '1'
                },
                {
                    label: 'bbb',
                    value: '2'
                }
            ],
            uploadFiles: '',
            // 输入验证
            rules: {
                teamname: [
                    { required: true, message: '请输入所属团队', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入分销客户名称', trigger: 'blur' },
                ],
                active: [
                    { required: true, message: '请填写完成', trigger: 'number' }
                ]
            },
            isShowSKU: false
        }
    },
    watch: {
        editForm(editForm) {
            this.setForm(this.editForm)
        }
    },
    mounted() {
        if (!this.isEdit) {
            this.resetForm()
        }
    },
    created() {
        this.setForm(this.editForm)
    },
    methods: {
        resetForm() {
            this.form = cloneDeep(this.initForm)
        },
        setForm(editForm) {
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
            }
            else {
                this.resetForm()
            }
        },
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    console.log(this.form)
                    console.log('success')
                    // 验证通过
                }
            })
        },
        selectChange(selections) {
            console.log(selections)
        },
        // 图片旋转完成
        uploadSuccess(file) {
            console.log(file)
        }
    }
}