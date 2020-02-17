<template>
  <div>
    <menu-panel></menu-panel>
    <go-top :size="50" :bottom="50"></go-top>
    <v-container>
      <v-spacer class="mb-3"></v-spacer>
      <transition :name = 'name' >
        <question-component v-if="name === 'know'"  :question = "randomQuestionPagination" @changeNameTransition = 'updateNameTransition($event)'></question-component>
      </transition>
      <transition :name = 'name' >
        <question-component v-if="name === 'notKnow'" :question = "randomQuestionPagination" @changeNameTransition = 'updateNameTransition($event)'></question-component>
      </transition>
      <transition :name = 'name' >
        <question-component v-if="name === 'list'" :question = "randomQuestionPagination" @changeNameTransition = 'updateNameTransition($event)'></question-component>
      </transition>
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
      name: 'list',
      page: 0,
      changedComponent: false
    };
  },
  computed: {
    questionsPagination() {
      return this.$store.getters.questionsPagination;
    },
    randomQuestionPagination() {
      return this.$store.getters.randomQuestionPagination;
    },
    
  },
  methods: {
    updateNameTransition(updatedName) {
      this.name = updatedName;
    },
    showLoggedInSnackbar() {
      if (this.$store.state.token !== null && this.$store.state.fromLoginPage) {
        this.snackbar = true;
      }
    }
  },
  created() {
    this.$store.dispatch("retrieveQuestionsPagination",0);
    this.$store.dispatch("retrieveTotalPagesPagination");
    this.page = 1; //przy wczytaniu pierwszej strony pokazywana jest pages?page=0 wiec w tym miejscu ustawiam this.page = 1
    this.showLoggedInSnackbar();
  },
  watch: {
    questionsPagination() {
      this.name = 'list';
      this.$store.commit("retrieveRandomQuestionPagination");
      this.changedComponent = !this.changedComponent;
      if(this.questionsPagination.length === 0 && this.page < this.$store.getters.totalPagesPagination) {
        this.$store.dispatch("retrieveQuestionsPagination", this.page++);
      } 
      else if (this.questionsPagination.length === 0 && this.page === this.$store.getters.totalPagesPagination) {
        this.$store.dispatch("retrieveQuestionsPagination", 0);
        this.page = 1;
      }
    },
      
  },
  components: {
    MenuPanel,
    GoTop,
    QuestionComponent
  }
};
</script>

<style scoped>
.list-enter-active {
  transition: 1s;
  opacity: 0;
}

.know-leave-active {
  transition: 1s;
}
.know-leave-to {
  opacity: 0;
  transform: translateX(-200px);
  background: #8BC34A;
}

.notKnow-leave-active {
  transition: 1s;
}
.notKnow-leave-to {
  opacity: 0;
  transform: translateX(200px);
  background: #FF5722;
}

</style>
