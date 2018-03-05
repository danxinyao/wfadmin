import demo from './demo/demo.vue'
import operations from './operations/index.vue'
import pagination from './pagination/index.vue'
import search from './search/index'
import box from './box/index.vue'
import groupTitle from './groupTitle/index.vue'
import editTitle from './editTitle/index.vue'
import content from './contentTpl/contentTpl.vue'
import rowLink from './rowLink/index.vue'
import imgUpload from './imgUpload/index.vue'
import img from './img/index.vue'
import editor from './editor/index.vue'
import imgLibrary from './imgLibrary/index.vue' // 图片库
import imgSelection from './imgSelection/index.vue' // 图片选择
import region from './region/index.vue' // 省市区
import icon from './icon/index.vue'
import importExcel from './importExcel/index.vue' // 导入组件

const install = function (Vue) {
    Vue.component(demo.name, demo)
    Vue.component(operations.name, operations)
    Vue.component(pagination.name, pagination)
    Vue.component(search.name, search)
    Vue.component(box.name, box)
    Vue.component(groupTitle.name, groupTitle)
    Vue.component(editTitle.name, editTitle)
    Vue.component(content.name, content)
    Vue.component(rowLink.name, rowLink)
    Vue.component(imgUpload.name, imgUpload)
    Vue.component(img.name, img)
    Vue.component(editor.name, editor)
    Vue.component(imgLibrary.name, imgLibrary)
    Vue.component(imgSelection.name, imgSelection)
    Vue.component(region.name, region)
    Vue.component(icon.name, icon)
    Vue.component(importExcel.name, importExcel)
}

export default install