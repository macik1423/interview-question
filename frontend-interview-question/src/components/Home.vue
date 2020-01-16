<template>
  <div>
    <menu-panel></menu-panel>
    <go-top :size="50" :bottom="50"></go-top>
    <v-container>
      <v-spacer class="mb-3"></v-spacer>
      <transition-group :name = 'name' tag="p">
        <v-col v-for="question in questionsPagination" :key="question.id">
          <question-component :question="question" @changeNameTransition = 'updateNameTransition($event)'></question-component>
        </v-col>
      </transition-group>
      <v-row class="justify-center" v-if="reload" @click="reloadContent">
        <v-btn text icon color="green">
          <v-icon style="font-size: 500%">mdi-cached</v-icon>
        </v-btn>
      </v-row>
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
      reload: false,
    };
  },
  computed: {
    questionsPagination() {
        return this.$store.getters.questionsPagination;
    },
  },
  methods: {
    updateNameTransition(updatedName) {
      this.name = updatedName;
    },
    reloadContent() {
      this.reload = false;
      this.$store.dispatch("retrieveQuestionsPagination",0);
      this.page = 1; 
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
      if(this.questionsPagination.length === 0 && this.page < this.$store.getters.totalPagesPagination) {
        this.$store.dispatch("retrieveQuestionsPagination", this.page++);
      } 
      else if (this.questionsPagination.length === 0 && this.page === this.$store.getters.totalPagesPagination) {
        this.reload = true;
      }
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
.list-enter {
  opacity: 0;
  transform: translateY(50px);
}

.know-leave-active {
  transition: all 1s;
}
.know-leave-to {
  opacity: 0;
  transform: translateX(-150px);
}

.notKnow-leave-active {
  transition: all 1s;
}
.notKnow-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.v-icon {
  transition: transform .3s ease-out;
}
.v-icon:hover {
  transform: rotate(-90deg);
}

</style>
