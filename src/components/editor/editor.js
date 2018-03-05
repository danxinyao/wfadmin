import WangEditor from 'wangeditor'
import { qiniuCDN } from '../../services/fetch/config'

export default {
    props: ['initContent', 'insertImg'],
    data() {
        return {
            content: '',
            editor: ''
        }
    },
    watch: {
        /**
         * initContent有变动时,重新更新editor中的内容
         */
        initContent() {
            this.updateEidtor()
        },
        insertImg() {
            if (this.insertImg != '' && this.insertImg != undefined) {
                this.editor.cmd.do('insertHtml', '<img src="'+ qiniuCDN + this.insertImg +'" style="max-width:100%;" />')
                this.$emit('update:insertImg', '')
            }
        }
    },
    mounted() {
        this.createEditor()
        this.updateEidtor()
    },
    methods: {
        /**
         * 创建editor
         */
        createEditor() {
            const editor = new WangEditor(this.$el)
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'table',  // 表格
                'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ]
            editor.customConfig.debug = false
            editor.customConfig.onchange = (html) => {
                this.content = html
                this.change()
            }

            editor.create()
            this.editor = editor
        },
        updateEidtor() {
            this.content = this.initContent
            this.editor.txt.html(this.initContent)
        },
        change() {
            this.$emit('onchange', this.content)
        }
    }
}