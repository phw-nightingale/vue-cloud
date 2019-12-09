<template>
  <div>
    <el-row class="tool-bar">
      <el-upload
        class="btn-upload"
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
      <el-button type="primary" icon="el-icon-folder-add" class="btn-folder-add">新建文件夹</el-button>
      <file-nav-bar :data="pathStack" @fileNavBarItemClick="handleFileNavBarItemClick" />
    </el-row>
    <el-row class="item-container">
      <el-col v-for="(item, index) in list" :key="index" :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
        <cloud-file v-loading.fullscreen.lock="fullscreenLoading" :data="item" @click.native="handleFileClick(item)" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CloudFile from '@/components/Files'
import FileNavBar from '@/components/FileNavBar'
import { list } from '@/api/file'

export default {
  components: {
    CloudFile, FileNavBar
  },
  data: () => {
    return {
      list: [],
      pathStack: [{ name: '/home', path: '/' }],
      fullscreenLoading: false
    }
  },
  created() {
    let path = this.$route.params.path
    if (typeof path === 'undefined') {
      path = '/'
    }
    this.fetchData(path)
  },
  methods: {
    fetchData(path) {
      const that = this
      if (typeof that.$route.params.path !== 'undefined') {
        path = that.$route.params.path
      }
      list(path).then(res => {
        that.list = res.data
      })
    },
    handleFileClick(item) {
      // goto path
      const that = this
      that.fullscreenLoading = true
      console.log('Received click:', item)
      if (item.fileType === 'folder') {
        // enter the folder
        that.fullscreenLoading = false
        // get list path
        let listPath = ''
        that.pathStack.forEach(e => {
          if (e.path === '/') {
            listPath = e.path + item.fileName
          } else {
            listPath = e.path + '/' + item.fileName
          }
        })
        // request list
        list(listPath).then(res => {
          that.list = res.data
          const path = {}
          that.pathStack.forEach(e => {
            if (e.path === '/') {
              path.path = e.path + item.fileName
            } else {
              path.path = e.path + '/' + item.fileName
            }
          })
          path.name = '/' + item.fileName
          that.pathStack.push(path)
          console.log('add new path:', that.pathStack)
        }).catch(() => {
          that.fullscreenLoading = false
        })
      } else {
        // download files
      }
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
    },
    handleFileNavBarItemClick(data) {
      console.log('handle file nav bar item click:', data)
      const that = this
      that.fullscreenLoading = true
      list(data.item.path).then(res => {
        that.list = res.data
        that.pathStack = that.pathStack.slice(0, data.idx + 1)
        console.log(that.pathStack)
        that.fullscreenLoading = false
      }).catch(() => { that.fullscreenLoading = false })
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
    flex-flow:row wrap;
    padding: 0 .5rem 1rem;
  }
  .tool-bar {
    width: 100%;
    padding: 1rem 1rem .5rem;
    display: flex;
    flex-flow: row wrap;
  }
  .btn-upload {
    display: inline;
    margin-right: .5rem;
  }
  .btn-folder-add {
    margin-right: .5rem;
  }
</style>
