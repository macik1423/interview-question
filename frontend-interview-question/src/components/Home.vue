<template>
  <div>
    <menu-panel></menu-panel>
    <go-top :size="50" :bottom="50"></go-top>
    <v-container>
      <v-spacer class="mb-3"></v-spacer>
      <transition-group name="list" tag="p">
        <v-col v-for="question in questions" :key="question.id">
          <question-component :question="question"></question-component>
        </v-col>
      </transition-group>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">
        Zamknij
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
      text: "Zalogowano",
      timeout: 2000,
      isAdmin: localStorage.getItem("isAdmin") || null, 
    };
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    },
  },
  created() {
    this.$store.dispatch("retrieveQuestions");
    if (this.$store.state.token !== null && this.$store.state.fromLoginPage) {
      this.snackbar = true;
    }
  },
  components: {
    MenuPanel,
    GoTop,
    QuestionComponent
  }
};
</script>

<style scoped>
.list-leave-active, .list-enter-active {
  transition: all 1s;
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
.list-enter {
  opacity: 0;
  transform: translateY(50px);
}

</style>
