export default {
  data () {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0
    }
  },
  methods: {
    initPage () {
      this.pageNum = 1
    },
    pageChange (val) {
      this.pageNum = val
      this.getData()
    },
    pageSizeChange (val) {
      this.pageSize = val
      this.getData()
    }
  }
}
