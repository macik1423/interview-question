<template>
  <div>
    <menu-panel></menu-panel>
    <go-top :size="50" :bottom="50"></go-top>
    <v-container>
      <v-spacer class="mb-3"></v-spacer>
      <v-col v-for="question in questions" :key="question.id">
        <question-component :question="question"></question-component>
      </v-col>
    </v-container>
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
      >
        {{ text }}
        <v-btn
          color="blue"
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import MenuPanel from "../components/MenuPanel.vue";
import GoTop from "@inotom/vue-go-top";
import QuestionComponent from "../components/question/QuestionComponent.vue";

export default {
  data() {
    return {
      color: "",
      snackbar: false,
      text: 'Zalogowano',
      timeout: 2000,
      
    };
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    },
  },
  created() {
    this.$store.dispatch('retrieveQuestions');
    if(this.$store.state.token !== null && this.$store.state.fromLoginPage) {
      this.snackbar = true;
    }
  },
  components: {
    MenuPanel,
    GoTop,
    QuestionComponent
  },
  
};
</script>

<style scoped>
</style>