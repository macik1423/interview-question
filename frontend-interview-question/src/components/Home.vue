<template>
    <div>
      <go-top :size="50" :bottom="50"></go-top>
      <v-container>
        <menu-panel></menu-panel>
        <v-spacer class="mb-3"></v-spacer>
        <v-col
          v-for="(question, i) in questions"
          :key="i"
        >
          <v-card
              max-width="400"
              class="mx-auto"
          >
            <div class="question-content">
              <div class="title">
                <v-card-title
                  class="headline"
                  v-text="question.description"
                ></v-card-title>
              </div>

              <div class="subtitle">
                <v-card-subtitle v-text="question.description"></v-card-subtitle>
              </div>

              <div class="icon">
                <font-awesome-icon :icon="['fab', 'java']" />
              </div>

              <div class="action">
                <v-card-actions>
                  <v-btn text @click="checkAnswer(question.id)">Sprawdź odpowiedź</v-btn>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-container>
    </div>
</template>

<script>
import QuestionDataService from '../service/QuestionDataService';
import MenuPanel from '../components/MenuPanel.vue';
import GoTop from '@inotom/vue-go-top';

export default {
    data() {
        return {
          questions: [],
          color: ''
        }
    },
    methods: {
        refreshQuestions() {
            QuestionDataService.retrieveAllQuestions()
                .then(response => {
                    this.questions = response.data;
                });
        }, 
        checkAnswer(id) {
            this.$router.push(`/questions/${id}`);
        }, 
        
    },
    components: {
      MenuPanel,
      GoTop
    },
    created() {
        this.refreshQuestions();
    }
}
</script>

<style scoped>
.icon {
  grid-area: i;
  font-size: 400%;
  color:#FBC02D;
}
.question-content {
  display: grid;
  grid-template-areas: 
                      "t t t t"
                      "sb sb sb i"
                      "a a a i"
}
.title{
  grid-area: t;
}
.subtitle {
  grid-area: sb;
}
.action {
  grid-area: a;
}

</style>