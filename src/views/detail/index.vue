<template>
  <div>
    <Question v-if="type == 'question'"/>
    <Idea v-if="type == 'idea'"/>
    <Blog v-if="type == 'blog'"/>
  </div>
</template>

<script>

import Question from './question'
import Idea from './idea'
import Blog from './blog'

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
    Question, Idea, Blog
  }
}
</script>

<style scoped lang="scss"></style>
