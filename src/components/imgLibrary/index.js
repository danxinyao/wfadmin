import PgTable from './components/table/index.vue'

import { fileManager as ajax } from 'services'
import { mapGetters } from 'vuex'
import { cloneDeep, isEmpty } from 'lodash'

export default {
    components: {
        PgTable
    },
    name: 'PgImgLibrary',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            query: {
                groupId: '', // 文件分组id
                isDefault: true, // 是否默认分组,true:是,false:否
                fileType: 1, // 文件类型
                name: '', // 文件名
                sort: { // 排序,0:按上传时间,1:按修改时间,2:按大小
                    type: 0,
                    desc: true
                }
            },
            total: 0, // 总条数
            page: 1, // 当前页
            pageSize: 18, // 每页条数
            fileList: [],
            groupList: [],
            dialogVisible: false,
            isUpload: false,
            initForm: {
                groupId: '',
                name: '',
                url: '',
                fileType: 1,
                size: '',
                note: ''
            },
            form: {
                groupId: '',
                name: '',
                url: '',
                fileType: 1,
                size: '',
                note: ''
            }
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
            'localLoading'
        ]),
        // 搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'select',
                        label: '分组',
                        model: 'groupId',
                        text: 'name',
                        value: 'id',
                        options: this.groupList
                    },
                    {
                        type: 'select',
                        label: '类型',
                        model: 'fileType',
                        text: 'text',
                        value: 'value',
                        options: [
                            {
                                text: '图片',
                                value: 1
                            },
                            {
                                text: '视频',
                                value: 2
                            },
                            {
                                text: '文件',
                                value: 3
                            }
                        ]
                    },
                    {
                        type: 'input',
                        label: '图片名',
                        model: 'name'
                    }
                ]
            }
        }
    },
    mounted() {
        this.search()
        this.getGroupList()
    },
    methods: {
        getPageList() {
            ajax.getPageList(this.page, this.pageSize, this.query).then((result) => {
                this.fileList = result.data
                this.total = result.totalCount
            })
        },
        getGroupList() {
            ajax.getGroupList().then((result) => {
                this.groupList = result
            })
        },
        // 搜索
        search() {
            this.page = 1
            this.getPageList()
        },
        // 分页-当前页数更新触发
        currentChange(current) {
            this.page = current
            this.getPageList()
        },
        // 分页-每页条数更改时触发
        sizeChange(size) {
            this.pageSize = size
            this.getPageList()
        },
        // 选择
        change(item) {
            this.dialogVisible = false
            this.$emit('change', item)
        },
        // 关闭
        close() {
            if (this.isUpload) {
                this.isUpload = false
            }
            else {
                this.dialogVisible = false
            }
        },
        // 上传图片切换
        upload() {
            if (this.isUpload) {
                ajax.save(this.form).then((result) => {
                    this.$message.success('文件上传成功')
                    this.isUpload = false

                    this.search()
                })
            }
            else {
                this.form = cloneDeep(this.initForm)
                this.isUpload = true
            }
        },
        // 图片上传成功
        uploadSuccess(file) {
            if (isEmpty(file)) {
                return
            }
            this.form.name = file.key.split('/').pop()
            this.form.url = file.key
            this.form.size = file.fsize
        }
    }
}