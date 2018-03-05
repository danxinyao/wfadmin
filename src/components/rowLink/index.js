import { mapGetters } from 'vuex'
import { isArray } from 'lodash'

export default {
    name: 'PgRowLink',
    props: {
        btns: {
            type: Array,
            default() {
                return []
            }
        },
        powerType: {
            type: String,
            default() {
                return 'pageList'
            }
        },
        isGroup: {
            type: Boolean,
            default: true // 是否为按钮组
        },
        disabled: {
            type: Boolean,
            default: false
        },
        hide: {
            type: Boolean,
            default: false
        },
        row: null, // 当前行
        parentRow: null // 上级行
    },
    computed: {
        ...mapGetters([
            'powers'
        ]),
        limitList: {
            get() {
                const powers = this.powers[this.powerType]
                if (isArray(powers)) {
                    return this.btns.filter((item) => powers.indexOf(item.name) > -1)
                }
                else {
                    return this.btns
                }
            }
        }
    },
    methods: {
        handleClick(btn) {
            if (btn.isConfirm) {
                this.$confirm('确定'+ btn.name +'吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit(btn.action, this.row, btn.action, this.parentRow)
                }).catch(() => {

                })
            }
            else {

                this.$emit(btn.action, this.row, btn.action, this.parentRow)
            }
        }
    }
}