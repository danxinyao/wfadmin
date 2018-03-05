<template>
    <div class="source">
        <div>
            <ul class="el-upload-list el-upload-list--picture-card">
                <li class="el-upload-list__item is-success" v-for="file in fileList" :key="file.url">
                    <transition name="el-fade-in-linear">
                        <pg-img class="el-upload-list__item-thumbnail" :src="file.url"></pg-img>
                    </transition>
                    <span class="el-upload-list__item-actions" v-if="file.url">
                        <span
                            class="el-upload-list__item-preview"
                            @click="handlePreview(file.url)">
                            <i class="el-icon-view"></i>
                        </span>
                        <span 
                            class="el-upload-list__item-delete" 
                            @click="handleRemove(file)">
                            <i class="el-icon-delete"></i>
                        </span>
                    </span>
                </li>
            </ul>
            <div 
                class="el-upload el-upload--text"
                @click="handleClick" v-show="isShowUpload">
                <span class="avatar-img-size-tip">{{tip}}</span>
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </div>
        <pg-img-library :show.sync="isShowImgLibrary" @change="changeImg"></pg-img-library>
        <el-dialog :visible.sync="dialogVisibleBigImage" append-to-body size="tiny">
            <pg-img width="100%" :src="dialogImageUrl"></pg-img>
        </el-dialog>
    </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
    .source {
        padding: 24px 24px 0 0;
    }
    .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }
    .el-upload-list--text {
        margin: 0;
        padding: 0;
        list-style: none;
        .el-upload-list__item {
            height: 30px;
            transition: all .5s cubic-bezier(.55,0,.1,1);
            font-size: 14px;
            color: #48576a;
            line-height: 1.8;
            margin-top: 5px;
            box-sizing: border-box;
            border-radius: 4px;
            width: 100%;
            position: relative;
            &:first-child {
                margin-top: 10px;
            }
            &-name {
                color: #48576a;
                display: block;
                margin-right: 40px;
                overflow: hidden;
                padding-left: 4px;
                text-overflow: ellipsis;
                transition: color .3s;
                white-space: nowrap;
                text-decoration: none;
                .el-icon-document {
                    color: #97a8be;
                    margin-right: 7px;
                    height: 100%;
                    line-height: inherit;
                }
            }
            .el-icon-close {
                display: block;
                position: absolute;
                top: 5px;
                right: 5px;
                cursor: pointer;
                opacity: .75;
                color: #48576a;
                transform: scale(.7);
            }
        }
    }
    .avatar-img-size-tip {
        font-size: 12px;
        color: red;
        position: absolute;
        bottom: 40%;
        left: 0;
        height: 30px;
        text-align: center;
        width: 100%;
    }
    .el-upload {
        background: #fbfdff;
        border: 1px dashed #d9d9d9;
        border-radius: 5px;
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        line-height: 98px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        vertical-align: top;
    }
    .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 98px;
        text-align: center;
    }
    .__input {
        display: none;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>