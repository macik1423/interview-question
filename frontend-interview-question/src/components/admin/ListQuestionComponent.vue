<template>
  <div id="app">
    <v-app id="inspire">
      <menu-panel></menu-panel>
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
import MenuPanel from '../../components/MenuPanel.vue';
import AddDialogComponent from './AddDialogComponent.vue';
export default {
  name: "Questions",
  data() {
    return {
      message: null,
    };
  },
  components: {
    MenuPanel,
    AddDialogComponent,
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    },
  },
  methods: {
    removeQuestion(id) {
      this.$store.dispatch('deleteQuestion', id);
    }
  },
  created() {
    this.$store.dispatch('retrieveQuestions');
  }
};
</script>

<style>
</style>