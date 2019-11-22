<template>
  <div class="container">
    <app-question></app-question>
  </div>
</template>

<script>
import QuestionApp from './components/QuestionApp.vue'

export default {
  name: 'app',
  components: {
    'app-question': QuestionApp
  }
}
</script>

<style>
@import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css)
</style>
