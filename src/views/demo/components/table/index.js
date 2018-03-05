import { mapGetters, mapActions } from 'vuex'
import {goods as ajax} from 'services'

export default {
    props: {
        list: Array
    },
    data() {
        return {
            rowLink: [
                {
                    name: '编辑',
                    action: 'edit',
                    type: 'primary'
                },
                {
                    name: '删除',
                    action: 'del',
                    type: 'danger',
                    isConfirm: true
                }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'localLoading'
        ])
    },
    methods: {
        handleClick(row, action) {
            this.$emit(action, row)
        },
        selectChange(val) {
            this.$emit('select-change', val)
        }
    }
}