import Editor from './editor.vue'

export default {
    components: {
        Editor
    },
    name: 'PgEditor',
    props: ['initContent'],
    data() {
        return {
            img: '',
            isShowImgLibrary: false
        }
    },
    methods: {
        editorChange(content) {
            this.$emit('update:initContent', content)
        },
        // 打开资源库
        showImgLibrary() {
            this.isShowImgLibrary = true
        },
        // 插入图片
        changeImg(file) {
            this.img = file.url
        }
    }
}