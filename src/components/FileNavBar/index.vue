<template>
  <div class="nav-container">
    <span v-for="(item, index) in data" :key="index" @click="handleClick(item, index)">{{ item.name }}</span>
  </div>
</template>
<script>
export default {
  name: 'FileNavBar',
  props: {
    data: {
      type: Array[Object],
      require: true,
      default() {
        return [{}]
      }
    }
  },
  methods: {
    handleClick(item, idx) {
      this.$emit('fileNavBarItemClick', { item, idx })
    }
  }
}
</script>

<style scoped>
.nav-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}
.nav-container > span {
  font-size: 1.5rem;
  color: #303133;
  background-color: #ddd;
  margin: .25rem .25rem 0 .125rem;
  padding: .25rem;
  border-radius: .35rem;
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
.nav-container > span:hover {
  cursor: pointer;
  background-color: #99a9bf;
  color: white;
  transition: all .2s ease-in-out;
}
</style>
