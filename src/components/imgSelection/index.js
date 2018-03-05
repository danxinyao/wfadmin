import { qiniu as ajax } from 'services'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'PgImgSelection',
    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
        files: {
            type: Array,
            default() {
                return []
            }
        },
        file: { // 单个图片对象，包含id、url
            type: Object,
            default() {
                return {}
            }
        },
        tip: {
            type: String,
            default: ''
        },
        orderNo: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            fileList: [],
            isShowUpload: true, // 选择图片功能是否显示
            isShowImgLibrary: false, // 资源库是否显示
            dialogVisibleBigImage: false, // 原图是否显示
            dialogImageUrl: '' // 原图地址
        }
    },
    watch: {
        files() {
            this.checkFiles()
        },
        file() {
            this.checkFile()
        },
        fileList() {
            if (!this.multiple && this.fileList.length > 0) {
                this.isShowUpload = false
            }
            //最多上传四张
            else if(this.fileList.length > 3) {
                this.isShowUpload = false
            }
            else {
                this.isShowUpload = true
            }
        }
    },
    mounted() {
        this.checkFile()
        this.checkFiles()
    },
    methods: {
        checkFile() {
            if (!this.multiple) {
                this.fileList = []
                if (!this.util.isEmptyObject(this.file)) {
                    if (this.file.url && this.file.url != '' && this.file.url != undefined) {
                        this.fileList.push(this.file)
                    }
                }
            }
        },
        checkFiles() {
            if (this.multiple) {
                this.fileList = this.files
            }
        },
        handleClick() {
            this.isShowImgLibrary = true
        },
        changeImg(file) {
            if (this.multiple) {
                this.fileList.push(file)
            }
            else {
                this.fileList = []
                this.fileList.push(file)
            }

            this.handleSuccess()
        },
        handleSuccess() {
            this.$emit('success', this.multiple ? this.fileList : (this.fileList.length > 0 ? this.fileList[0] : {}), this.orderNo)
        },
        handlePreview(url) {
            this.dialogVisibleBigImage = true
            this.dialogImageUrl = url
        },
        handleRemove(file) {
            console.log(file)
            this.fileList.splice(this.fileList.indexOf(file), 1)
            this.handleSuccess()
        }
    }
}