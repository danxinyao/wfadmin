<template>
    <el-col :span="24" class="toolbar clearfix">
        <el-button 
            size="small" 
            :type="btn.type" 
            @click.native="handleClick(btn)" 
            v-for="btn in limitList" 
            :key="btn.action"
            :loading="localLoading === btn.localLoading">
            {{ btn.name }}
        </el-button>
    </el-col>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>