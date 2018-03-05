<template>
    <el-button-group v-if="isGroup">
        <el-tooltip 
            effect="dark" 
            :content="btn.name" 
            placement="top" 
            v-for="btn in limitList" 
            :key="btn.action"
            v-if="!hide || !btn.show">
            <el-button
                class="pg_button_icon"
                size="mini"
                :type="btn.type"
                :disabled="disabled"
                @click.native="handleClick(btn)">
                <pg-icon :icon="btn.icon" v-if="btn.icon"></pg-icon>
                <span v-else>{{btn.name}}</span>
            </el-button>
        </el-tooltip>
    </el-button-group>
    <div v-else>
        <el-tooltip 
            effect="dark" 
            :content="btn.name" 
            placement="top" 
            v-for="btn in limitList" 
            :key="btn.action">
            <el-button
                size="mini"
                :type="btn.type"
                :disabled="disabled"
                @click.native="handleClick(btn)">
                <pg-icon :icon="btn.icon" v-if="btn.icon"></pg-icon>
                <span v-else>{{btn.name}}</span>
            </el-button>
        </el-tooltip>
    </div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .pg_button_icon {
        padding: 4px 8px;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>