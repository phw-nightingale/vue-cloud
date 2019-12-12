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
      <el-button type="primary" icon="el-icon-folder-add" class="btn-folder-add" @click="handleNewFolder">新建文件夹</el-button>
      <file-nav-bar :data="pathStack" @fileNavBarItemClick="handleFileNavBarItemClick" />
    </el-row>
    <el-row class="item-container">
      <el-col v-for="(item, index) in list" :key="index" :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
        <cloud-file v-loading.fullscreen.lock="fullscreenLoading" :data="item" @click.native="handleFileClick(item)" />
      </el-col>
    </el-row>
    <!-- Download dialog -->
    <el-dialog
      :title="item.fileName"
      :visible.sync="downloadDialogVisible"
      width="30%"
      center
    >
      <section class="dialog-content">
        <div class="file-item">
          <svg-icon :icon-class="item.fileType" class-name="svg-icon" />
        </div>
        <div class="file-details">
          <section><span>文件名: </span>{{ item.fileName }}</section>
          <section><span>文件大小: </span>{{ parseSize }}</section>
          <section><span>上传时间: </span>{{ item.createTime }}</section>
        </div>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downloadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFileDownload">下 载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CloudFile from '@/components/Files'
import FileNavBar from '@/components/FileNavBar'
import { list, download, mkdir } from '@/api/file'
import { pathStack2Path } from '@/utils'

export default {
  components: {
    CloudFile, FileNavBar
  },
  data: () => {
    return {
      list: [],
      pathStack: [{ name: '/home', path: '/' }],
      fullscreenLoading: false,
      downloadDialogVisible: false,
      item: {}
    }
  },

  computed: {
    parseSize: function() {
      const that = this
      const byte = that.item.size
      if (byte >= 1024 && byte < 1024 * 1024) {
        return (byte / 1024).toFixed(2) + ' KB'
      } else if (byte >= (1024 * 1024)) {
        return (byte / (1024 * 1024)).toFixed(2) + ' MB'
      } else {
        return byte + ' Byte'
      }
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
      // console.log('Received click:', item)
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
          // console.log('add new path:', that.pathStack)
        }).catch(() => {
          that.fullscreenLoading = false
        })
      } else {
        // download files
        console.log('file selected:', item)
        that.fullscreenLoading = false
        that.downloadDialogVisible = true
        that.item = item
      }
    },
    handleFileDownload() {
      const that = this
      console.log('item being downloaded: ', that.item)
      download(that.item)
        .then(res => {
          console.log('Downloaded success: ', res)
          if (res.status !== 200) {
            that.$alert('文件下载出错')
            return false
          }
          // Download File
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', that.item.fileName)
          document.body.appendChild(link)
          link.click()
          that.downloadDialogVisible = false
        })
        .catch(err => {
          console.log(err)
          that.$alert(err)
        })
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
      // console.log('handle file nav bar item click:', data)
      const that = this
      that.fullscreenLoading = true
      list(data.item.path).then(res => {
        that.list = res.data
        that.pathStack = that.pathStack.slice(0, data.idx + 1)
        console.log(that.pathStack)
        that.fullscreenLoading = false
      }).catch(() => { that.fullscreenLoading = false })
    },
    handleNewFolder() {
      const that = this
      that.$prompt('请输入文件夹名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '文件夹名不能为空'
      }).then(({ value }) => {
        that.fullscreenLoading = true
        console.log('current path is: ' + pathStack2Path(that.pathStack))
        mkdir({ name: value, path: pathStack2Path(that.pathStack) }).then(res => {
          console.log('mkdir success:', res.data)
          that.list.push(res.data)
          that.$message({
            type: 'success',
            message: '新建文件夹成功'
          })
          that.fullscreenLoading = false
        }).catch(() => {
          that.fullscreenLoading = false
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '取消输入'
        })
      })
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
  .dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: .5rem;
    padding: .5rem;
    border-radius: 5px;
  }
  .svg-icon {
    width: 5rem;
    height: 5rem;
  }
  .file-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .file-details > section {
    margin: .5rem 0;
    font-size: 1rem;
  }
  .file-details > section > span {
    font-weight: bolder;
  }
</style>
