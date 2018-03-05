<template>
    <pg-box :isShowBox="show" @close="close">
        <pg-edit-title>{{title}}</pg-edit-title>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
            <pg-group-title>分段一</pg-group-title>
            <el-form-item label="所属团队" prop="teamname">
                <el-input v-model="form.teamname"></el-input>
            </el-form-item>
            <el-form-item label="分销客户名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动" prop="active">
                <el-select v-model="form.active">
                    <el-option :label="active.label" :value="active.value" v-for="active in actives" :key="active.value"></el-option>
                </el-select>
            </el-form-item>
            <pg-group-title>图片上传</pg-group-title>
            <el-form-item label="请选择">
                <!-- 多图 -->
                <pg-img-selection multiple @success="uploadSuccess"></pg-img-selection>
                <!-- 单图 -->
                <!-- <pg-img-selection @success="uploadSuccess"></pg-img-selection> -->
            </el-form-item>
            <pg-group-title>图文详情</pg-group-title>
            <el-form-item label="富文本">
                <pg-editor :initContent.sync="form.content"></pg-editor>
            </el-form-item>
            <pg-group-title>质检报告</pg-group-title>
            <el-form-item label=" ">
                <pg-editor :initContent.sync="form.content"></pg-editor>
            </el-form-item>
            <br>
            <el-form-item class="el-form-item_btns">
                <el-button size="small" type="primary" @click="save">保存</el-button>
                <el-button size="small" @click="close">返回</el-button>
            </el-form-item>
        </el-form>
        <pg-sku @selectChange="selectChange" :show.sync="isShowSKU"></pg-sku>
    </pg-box>
</template>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
