<template>
  <div>
    <el-row class="tool-bar">
      <el-upload
        action="http://localhost:8763/files"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
        auto-upload
        name="file"
      >
        <el-button type="primary" icon="el-icon-upload">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-row class="item-container">
      <cloud-file v-for="(index, item) in list" :key="index" :data="item" @click.native="handleFileClick(item)" />
    </el-row>
  </div>
</template>

<script>
import CloudFile from '@/components/Files'
import { list } from '@/api/file'

export default {
  components: {
    CloudFile
  },
  data: () => {
    return {
      list: [{
        id: 1,
        icon: 'folder',
        filename: 'text book'
      },
      {
        id: 2,
        icon: 'folder',
        filename: 'sec book'
      }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.list = list()
    },
    handleFileClick(item) {
      // goto path
      console.log('Received click:', item)
    },
    handlePreview() {
      console.log('handle preview...')
    },
    handleRemove() {
      console.log('handle remove...')
    },
    beforeRemove() {
      console.log('before remove...')
    },
    handleExceed() {
      console.log('handle exceed...')
    }
  }
}

</script>

<style scoped>
  .item-container {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 .5rem 1rem;
  }
  .tool-bar {
    width: 100%;
    padding: 1rem 1rem .5rem;
  }
</style>
