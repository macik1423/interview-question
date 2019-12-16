<template>
  <div>
    <menu-panel></menu-panel>
    <go-top :size="50" :bottom="50"></go-top>
    <v-container>
      
      <v-spacer class="mb-3"></v-spacer>
      <v-col
        v-for="question in questions"
        :key="question.id"
      >
        <v-card
            max-width="500"
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
              <span v-if="question.theme.themeType == 'JAVA'" >
                <font-awesome-icon :icon="['fab', 'java']" style="color:#FBC02D"/>
              </span>
              <span v-if="question.theme.themeType == 'SPRING'" >
                <font-awesome-icon :icon="['fas', 'leaf']" style="color:#00E676"/>
              </span>
            </div>

            <div class="action">
              <v-card-actions>
                <v-flex>
                  <v-btn text class="ma-2 px-0" @click="selectedQuestion = question">
                    Sprawdź
                  </v-btn>  
                </v-flex>
                <v-flex class="text-right">
                  <v-btn text>umiem</v-btn>
                  <v-btn text>nie umiem</v-btn>
                </v-flex>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-dialog 
        v-if="selectedQuestion"
        v-model="selectedQuestion"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span>{{ selectedQuestion.description }}</span>
            <v-spacer></v-spacer>
            <v-menu
              bottom
              left
            >
            </v-menu>
          </v-card-title>
          <v-card-text>
            {{ selectedQuestion.answer }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="selectedQuestion = false"
            >
              Zamknij
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
          color: '',
          dialog: false, 
          selectedQuestion: null
        }
    },
    methods: {
        refreshQuestions() {
            QuestionDataService.retrieveAllQuestions()
                .then(response => {
                    this.questions = response.data;
                });
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
}
.question-content {
  display: grid;
  grid-template-areas: 
                      "t t t t"
                      "sb sb sb i"
                      "a a a a"
}
.title {
  grid-area: t;
}
.subtitle {
  grid-area: sb;
}
.action {
  grid-area: a;
}

</style>