<template>
  <div>
    <Question v-if="type == 'question'"/>
    <Idea v-if="type == 'idea'"/>
  </div>
</template>

<script>

import Question from './question'
import Idea from './idea'

export default {
  name: 'Detail',
  data() {
    return {
      type: 'question'
    }
  },
  created() {
    this.type = this.$route.query.type
  },
  methods: {},

  components: {
    Question, Idea
  }
}
</script>

<style scoped lang="scss"></style>
