<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="ID" width="150">
      <template slot-scope="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column label="文件名" min-width="100" align="left">
      <template slot-scope="scope">
        {{ scope.row.fileName }}
      </template>
    </el-table-column>
    <el-table-column label="日期" max-width="100" align="right">
      <template slot-scope="scope">
        {{ scope.row.createTime | dateFilter }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'
import { parseTime } from '@/utils'

export default {
  filters: {
    dateFilter(time) {
      const date = new Date(time)
      return parseTime(date)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList({ page: 1, size: 4 }).then(response => {
        const data = response.data
        this.list = data.content
      })
    }
  }
}
</script>
