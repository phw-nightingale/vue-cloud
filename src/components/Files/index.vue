<template>
  <div class="file-item">
    <svg-icon :icon-class="data.icon" class-name="svg-icon" />
    <span class="svg-text ellipsis">{{ data.filename }}</span>
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
        return {}
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: .5rem;
    padding: .5rem 0;
  }

  .file-item:hover {
    cursor: pointer;
    background-color: #99a9bf;
    color: white;
  }

  .svg-icon {
    width: 3rem;
    height: 3rem;
  }

  .svg-text {
    font-size: .75rem;
    text-align: center;
  }

  .ellipsis {
    width: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
