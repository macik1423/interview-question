<template>
  <div id="app">
    <v-app id="inspire">
      <add-dialog-component></add-dialog-component>
      
      <v-expansion-panels>
        <v-expansion-panel
          v-for="question in questions"
          :key="question.id"
        >
          <v-expansion-panel-header>{{ question.id }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ question.description }}
            <v-btn @click="removeQuestion(question.id)">usun</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-app>
  </div>
</template>

<script>
import AddDialogComponent from './AddDialogComponent.vue';
export default {
  name: "Questions",
  data() {
    return {
      message: null,
    };
  },
  components: {
    AddDialogComponent,
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    }
  },
  methods: {
    removeQuestion(id) {
      this.$store.dispatch('deleteQuestion', id);
    },
    fetchQuestions() {
      this.$store.dispatch('retrieveQuestions');
    }
  }, 
  mounted() {
    this.fetchQuestions();
  },
};
</script>

<style>
</style>