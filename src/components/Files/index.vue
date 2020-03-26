<template>
  <div class="main" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
    <div class="file-check">
      <el-checkbox v-show="onHover" v-model="data.checked" />
    </div>
    <div class="file-item" @click="handleIconClick">
      <svg-icon :icon-class="data.fileType" class-name="svg-icon" />
      <span class="svg-text ellipsis">{{ data.fileName }}</span>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'CloudFile',
  components: {
    SvgIcon
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
          checked: false
        }
      }
    }
  },
  data: () => {
    return {
      onHover: false,
      style: 'file-check'
    }
  },
  methods: {
    handleMouseOver() {
      this.onHover = true
    },
    handleMouseOut() {
      this.onHover = false
    },
    handleIconClick() {
      const that = this
      that.$emit('iconClick', that.data)
    }
  }
}
</script>

<style scoped>
  .main {
    margin: .5rem;
    padding: .5rem;
    border-radius: 5px;
    position: relative;
  }
  .file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main:hover {
    cursor: pointer;
    background-color: #99a9bf;
    color: white;
    transition: all .2s ease-in-out;
  }

  .svg-icon {
    width: 3rem;
    height: 3rem;
  }

  .svg-text {
    font-size: .75rem;
    text-align: center;
    margin-top: .5rem;
  }

  .ellipsis {
    width: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-check {
    position: relative;
    height: 14px;
    width: 14px;
    left: 0;
    top: 0;
  }
</style>
