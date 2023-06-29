<template>
  <div class="supplement">
    <div class="search">
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker type="date" placeholder="Select date" style="width: 150px"></DatePicker>
        <span style="margin-left: 10px;">至</span>
        <DatePicker type="date" placeholder="Select date" style="width: 150px"></DatePicker>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">查询</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">新建</Button>
      </div>
      <div class="option-wrapper">
        <Button type="success" @click="exportCSV">导出为csv</Button>
      </div>
      <div class="option-wrapper">
        <Button type="success" @click="exportEXCEL">导出为excel</Button>
      </div>
      <div class="option-wrapper">
        <input type="file" @change="readFile" style="width:0;" ref="upload" />
        <Button type="primary" @click="upload">导入</Button>
      </div>
    </div>
    <div class="table-wrapper">
      <Table
        :columns="columns1"
        :data="data1"
        stripe
        border
        draggable
        ref="table"
        @on-drag-drop="dragDrop"
        @on-cell-click="cellClick"
        max-height="650"
        :loading="loading"
        :row-class-name="rowClassName"
      >
        <template slot-scope="{ row }" slot="name">
          <strong v-show="!row.showName">{{ row.name }}</strong>
          <Input
            v-model="row.name"
            v-show="row.showName"
            @on-blur="nameChange(row)"
            :ref="row.name"
          ></Input>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <div style="display: flex;justify-content: space-between;">
            <Button type="primary" @click="displayEdit(row)">编辑</Button>
            <Button type="error" @click="deleteRow(row, index)">删除</Button>
          </div>
        </template>
      </Table>
      <div class="page">
        <Page
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          :total="total"
          show-elevator
          show-sizer
        />
      </div>
    </div>
    <r-edit :showModal="showModal" @closeModal="closeModal" :row="curData" />
  </div>
</template>
<script>
import { sideSupplement } from '@/services/dataMaintenance'
import page from '@/mixins/common/page'
import expand from './extend'
import XLSX from 'xlsx'
import { excel2json, json2excel } from '@/utils/tools'
import edit from './edit'
// import { Tooltip } from 'view-design'
export default {
  components: {
    'r-edit': edit
    // Tooltip
  },
  mixins: [page],
  data () {
    return {
      showModal: false,
      curData: {},
      columns1: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expand, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          type: 'index',
          width: 80,
          align: 'center',
          renderHeader: (h, params) => {
            return h('span', '序号')
          }
        },
        {
          title: '日期',
          key: 'date',
          align: 'center'
        },
        {
          title: '线路名称',
          key: 'name',
          align: 'center',
          resizable: true,
          width: 180,
          tooltip: true
        },
        {
          title: '应补电量',
          key: 'elect',
          align: 'center'
        },
        {
          title: '开始时间',
          key: 'startTime',
          align: 'center'
        },
        {
          title: '结束时间',
          key: 'endTime',
          align: 'center'
        },
        {
          title: '原因',
          key: 'reason',
          align: 'center'
        },
        {
          title: '调度员',
          key: 'dispatcher',
          align: 'center'
        },
        {
          title: 'Action',
          slot: 'action',
          align: 'center',
          width: 160
        }
      ],
      data1: [],
      loading: false,
      total: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    nameChange (row) {
      row.showName = false
    },
    displayEdit (row) {
      this.curData = row
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    cellClick (row, col, data) {
      if (col.slot === 'name') {
        if (!row.showEdit) {
          row.showName = true
          this.$nextTick(() => {
            this.$refs[row.name].focus()
          })
        }
      }
    },
    getData () {
      this.loading = true
      sideSupplement().then((res) => {
        this.loading = false
        this.data1 = res.data.map((v, index) => {
          if (index === 0) {
            v._expanded = true
          }
          v.showName = false
          return v
        })
        this.total = res.total
      })
    },
    rowClassName (row, index) {
      // if (index === 1) {
      //   return 'demo-table-info-row'
      // } else if (index === 3) {
      //   return 'demo-table-error-row'
      // }
      // return ''
    },
    dragDrop (old, newVal) {
      // console.log(this.data1.splice(newVal, 1, this.data1[old]))
      this.$set(
        this.data1,
        old,
        this.data1.splice(newVal, 1, this.data1[old])[0]
      )
    },
    exportCSV () {
      this.$refs.table.exportCsv({
        filename: 'The original data'
      })
    },
    exportEXCEL () {
      json2excel(XLSX, this.data1)
    },
    readFile (ev) {
      let file = ev.target.files[0]
      excel2json(file, XLSX).then((res) => {
        console.log(res)
      })
    },
    deleteRow (row, index) {
      this.data1.splice(index, 1)
    },
    upload () {
      this.$refs.upload.click()
    }
  }
}
</script>
<style lang="stylus" scoped>
.table-wrapper /deep/.ivu-table-tip
  overflow-x hidden
.supplement
  width 100%
  height 100%
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
  background-color #fff
  padding 15px
  padding-top 0
  border-radius: 5px
  .search
    width: 100%
    box-sizing: border-box
    display: flex
    justify-content flex-start
    align-items flex-start
    flex-wrap wrap
    padding-bottom 20px
    border-bottom 1px solid #eee
    .option-wrapper
      display flex
      justify-content flex-start
      align-items center
      margin-right: 10px
      span
        margin-right: 10px
  .table-wrapper
    width: 100%
    margin-top: 30px
    box-sizing: border-box
    .page
      margin-top: 10px
      display: flex
      justify-content: flex-end
.test /deep/ .ivu-table .demo-table-info-row td
  background-color: #2db7f5
  color: #fff
.test /deep/.ivu-table .demo-table-error-row td
  background-color: #ff6600
  color: #fff
.test /deep/.ivu-table td.yellow
  background-color: yellow
</style>
