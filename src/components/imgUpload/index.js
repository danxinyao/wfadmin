import { qiniuCDN } from '../../services/fetch/config'
import { qiniu as ajax } from 'services'
import { mapGetters, mapActions } from 'vuex'
import 'qiniu-js/dist/qiniu.min'
import { getResourceKey } from '../../services/modules/qiniu'

export default {
    name: 'PgImgUpload',
    props: {
        multiple: { // 多文件，默认为false
            type: Boolean,
            default: false,
        },
        accept: { // 文件类型
            type: String,
            default() {
                return '*'
            }
        },
        files: { // 默认文件
            type: Array,
            default() {
                return []
            }
        },
        tip: { // 说明
            type: String,
            default: ''
        },
        isImgFile: { // 是否为图片，默认为true
            type: Boolean,
            default: true // true为图片 false为其他
        }
    },
    data() {
        return {
            fileList: [],
            isShowUpload: true,
            uploader: null
        }
    },
    computed: {
        ...mapGetters([
            'qiniuUploadToken'
        ])
    },
    watch: {
        files() {
            const tempFiles = []
            this.files.forEach((item) => {
                if (item != '' && item != null) {
                    tempFiles.push({
                        imgUrl: item,
                        isSuccess: true
                    })
                }
            })
            this.fileList = tempFiles
        },
        fileList() {
            if (!this.multiple && this.fileList.length > 0) {
                this.isShowUpload = false
            }
            else {
                this.isShowUpload = true
            }
        },
        qiniuUploadToken() {
            this.getUploadToken()
        },
        isImgFile() {
            if (!this.isImgFile) {
                // 获取到uptoken之后，加载七牛大文件上传
                this.qiniuChunkUpload()
            }
        }
    },
    mounted() {
        this.getUploadToken()
    },
    methods: {
        ...mapActions([
            'setQiniuUploadToken'
        ]),
        // 获取七牛上传token
        getUploadToken() {
            if (this.qiniuUploadToken == '') {
                ajax.getUploadToken().then((result) => {
                    this.setQiniuUploadToken(result)
                    if (!this.isImgFile) {
                        // 获取到uptoken之后，加载七牛大文件上传
                        this.qiniuChunkUpload()
                    }
                })
            }
        },
        handleClick() {
            this.$refs.input.click()
        },
        handleChange(e) {
            const files = e.target.files
            if (!files)
                return

            this.uploadFiles(files)
            this.$refs.input.value = null
        },
        uploadFiles(files) {
            let postFiles = Array.prototype.slice.call(files)
            if (postFiles.length === 0)
                return
            if (!this.multiple)
                postFiles = postFiles.slice(0, 1)

            postFiles.forEach(file => {
                this.upload(file)
            })
        },
        upload(file) {
            // if (!this.isImgFile) {
            //     if (file.size / 1024 / 1024 > 10) {
            //         this.$message.error(file.name + '超过10M的限制！')
            //         return
            //     }
            // }
            if (this.multiple) {
                this.fileList.push({
                    isSuccess: false,
                    imgUrl: file
                })
            }
            else {
                this.fileList = []
                this.fileList.push({
                    isSuccess: false,
                    imgUrl: file
                })
            }

            ajax.uploadImg(file).then((result) => {
                this.handleSuccess(result, file)
            }).catch((error) => {
                // 上传错误时重新请求上传token
                this.setQiniuUploadToken('')
                this.getUploadToken()

                this.handleError(file, '上传失败，请重试')
                
            })
        },
        handleSuccess(res, file) {
            const files = this.fileList
            const tempFiles = []
            files.forEach((item) => {
                if (item.isSuccess) {
                    tempFiles.push(item.imgUrl)
                }
                if (file == item.imgUrl) {
                    item.isSuccess = true
                    item.imgUrl = res.key
                    tempFiles.push(item.imgUrl)
                }
            })
            this.$emit('upload-success', this.multiple ? tempFiles : res)
        },
        handleError(file, errTip) {
            this.$message.error(errTip)
            this.fileList.forEach((item, index) => {
                if (file == item.imgUrl) {
                    this.fileList.splice(index, 1)
                }
            })
        },
        handleRemove(file) {
            this.fileList.splice(this.fileList.indexOf(file), 1)
            const tempFiles = []
            this.fileList.forEach((item) => {
                if (item.isSuccess) {
                    tempFiles.push(item.imgUrl)
                }
            })
            this.$emit('upload-success', this.multiple ? tempFiles : (tempFiles[0] ? tempFiles[0] : ''))
        },
        // 七牛大文件上传
        qiniuChunkUpload() {
            let _this = this
            if (_this.uploader == null) {
                setTimeout(() => {
                    console.log('大文件上传')
                    let uploader = Qiniu.uploader({
                        disable_statistics_report: true, // 禁止自动发送上传统计信息到七牛
                        runtimes: 'html5', // 上传模式，依次退化
                        browse_button: 'chunk_upload', // 上传选择按钮
                        uptoken: _this.qiniuUploadToken, // 上传token
                        domain: qiniuCDN, // bucket域名
                        // container: 'chunk_upload', // 上传点击区域
                        max_file_size: '100mb', // 上传最大体积
                        multi_selection: false, // 不允许多文件上传
                        flash_swf_url: '', // 引入上传flash,
                        max_retries: 3, // 上传失败后最大重试次数
                        chunk_size: '4mb', // 分片上传，每块体积
                        auto_start: true, // 选择文件后自动上传
                        init: {
                            'FilesAdded': function(up, files) {
                                // 文件被添加到队列中
                                console.log('FilesAdded')
                                files.forEach((file) => {
                                    if (_this.multiple) {
                                        _this.fileList.push({
                                            isSuccess: false,
                                            imgUrl: file,
                                            percent: 0
                                        })
                                    }
                                    else {
                                        _this.fileList = []
                                        _this.fileList.push({
                                            isSuccess: false,
                                            imgUrl: file,
                                            percent: 0
                                        })
                                    }
                                })
                            },
                            'BeforeUpload': function(up, file) {
                                // 每个文件上传前
                                console.log('BeforeUpload')
                            },
                            'UploadProgress': function(up, file) {
                                // 每个文件的上传进度
                                console.log('上传进度 ' + file.percent + '%')
                                _this.fileList.forEach((item, index) => {
                                    if (file == item.imgUrl) {
                                        item.percent = file.percent
                                        console.log(item.percent)
                                    }
                                })
                            },
                            'FileUploaded': function(up, file, info) {
                                // 每个文件上传成功后
                                // info 为文件上传成功后，服务器返回的json
                                console.log('FileUploaded: ' + JSON.parse(info.response))
                                _this.handleSuccess(JSON.parse(info.response), file)
                            },
                            'Error': function(up, err, errTip) {
                                // 文件上传出错
                                console.log(err)
                                _this.handleError(err.file, errTip)
                            },
                            'UploadComplete': function() {
                                // 队列文件处理完毕
                                console.log('UploadComplete')
                            },
                            'Key': function(up, file) {
                                // 生成新的文件名
                                return getResourceKey(file)
                            }
                        }
                    })

                    _this.uploader = uploader
                }, 200)
            }
        }
    }
}