<template>
  <div class="send-comment">
    <div class="panel">
      <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="30%"
        :lock-scroll="false"
        :before-close="handleClose"
      >
        <span>This is a message</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleClose"
        >Confirm</el-button
        >
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendComment",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('closed', true)
    }
  }
}
</script>

<style scoped>

</style>
