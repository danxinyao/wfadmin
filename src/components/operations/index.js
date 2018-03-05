import { mapGetters } from 'vuex'
import { isArray } from 'lodash'

export default {
    name: 'PgOperations',
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
                return 'page'
            }
        }
    },
    computed: {
        ...mapGetters([
            'powers',
            'localLoading'
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
                    this.$emit(btn.action)
                }).catch(() => {

                })
            }
            else {
                this.$emit(btn.action)
            }
        }
    }
}