import { common as ajax } from 'services'
import { rootPath } from '../../services/fetch/config'
import { mapGetters } from 'vuex'

export default {
    name: 'PgImportExcel',
    props: {
        // 标题
        title: {
            type: String,
            default: '导入'
        },
        // 是否显示
        show: {
            type: Boolean,
            default: false
        },
        // 导入文件类型
        importType: {
            type: Number,
            required: true
        },
        // 是否支持多文件上传
        multiple: {
            type: Boolean,
            default: false
        },
        // 支持上传的文件类型
        accept: {
            type: null,
            default() {
                return '.xls, .xlsx'
            }
        }
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    watch: {
        dialogVisible() {
            this.$emit('update:show', this.dialogVisible)
        },
        show() {
            this.dialogVisible = this.show
        }
    },
    computed: {
        ...mapGetters([
            'authToken',
            'localLoading'
        ]),
        // 导入接口
        action: {
            get() {
                return rootPath + '/Common/Import?type=' + this.importType
            }
        },
        headers: {
            get() {
                return {
                    Authorization: 'Bearer ' + this.authToken
                }
            }
        }
    },
    methods: {
        // 下载模板
        downloadImportTemplate() {
            ajax.downloadImportTemplateFile(this.importType).then((result) => {
                this.util.download(result)
            })
        },
        // 上传成功
        handleSuccess(response) {
            if (response.code !== 0) {
                this.$message.error(response.message)
                this.$refs.upload.clearFiles()
                return
            }

            this.$message.success('导入成功')
            this.$emit('success', response.data)
            this.dialogVisible = false
        },
        // 上传失败
        handleError() {
            this.$message.error('导入失败')
            this.$refs.upload.clearFiles()
        },
        // 导入
        confirm() {
            this.$refs.upload.submit()
        }
    }
}