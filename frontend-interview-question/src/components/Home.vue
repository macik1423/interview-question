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
  </div>
</template>

<script>
import QuestionDataService from "../service/QuestionDataService";
import MenuPanel from "../components/MenuPanel.vue";
import GoTop from "@inotom/vue-go-top";
import QuestionComponent from "../components/question/QuestionComponent.vue";

export default {
  data() {
    return {
      questions: [],
      color: ""
    };
  },
  methods: {
    refreshQuestions() {
      QuestionDataService.retrieveAllQuestions().then(response => {
        this.questions = response.data;
      });
    }
  },
  components: {
    MenuPanel,
    GoTop,
    QuestionComponent
  },
  created() {
    this.refreshQuestions();
  }
};
</script>

<style scoped>
</style>