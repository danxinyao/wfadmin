<template>
    <div 
        id="app"
        v-loading="isShowFullLoading"
        element-loading-text="加载中">
        <router-view></router-view>
    </div>
</template>

<script type="text/babel">    
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'isShowFullLoading'
            ])
        }
    }
</script>

