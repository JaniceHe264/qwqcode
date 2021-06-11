<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="box">
      <p>测试文字</p>
      <span class="iconfont icon-dianzan"></span>
    </div>
  </div>
</template>

<script>
import {getName} from '@/utils'
import {testSendRequest} from '@/api/test'

export default {
  data() {
    return {}
  },
  created() {
  },
  methods: {}
}

</script>

<style lang="scss" scoped>
.box {
  p {
    font-size: 50px;
  }
}
</style>
