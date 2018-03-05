import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        list: Array
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'localLoading'
        ])
    },
    methods: {
        handleSelect(item) {
            this.$emit('change', item)
        }
    }
}