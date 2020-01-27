<template>
  <div>
    <v-card max-width="600" class="mx-auto" :style="{background: changeColor}">
      <div class="question-content">
        <div class="title" >
          <v-card-title class="headline" v-text="question.description"></v-card-title>
        </div>

        <v-row>
          <v-col cols="9">
            <div class="subtitle">
              <v-card-subtitle v-text="question.description"></v-card-subtitle>
            </div>
          </v-col>

          <v-col cols="3">
            <div class="icon">
              <span v-if="question.theme.type == 'JAVA'">
                <font-awesome-icon :icon="['fab', 'java']" style="color:#FBC02D" />
              </span>
              <span v-if="question.theme.type == 'SPRING'">
                <font-awesome-icon :icon="['fas', 'leaf']" style="color:#00E676" />
              </span>
            </div>
          </v-col>
        </v-row>

        <div class="action">
          <v-card-actions>
            <v-flex>
              <v-btn text class="ma-2 px-0" @click="selectedQuestion = question">Sprawdź</v-btn>
            </v-flex>
            <v-flex class="text-right" v-if="this.$store.getters.loggedIn">
              <v-btn text @click="know">umiem</v-btn>
              <v-btn text @click="notKnow">nie umiem</v-btn>
            </v-flex>
          </v-card-actions>
        </div>
      </div>
    </v-card>

    <v-dialog v-if="selectedQuestion" v-model="selectedQuestion" max-width="500px">
      <v-card>
        <v-card-title>
          <span>{{ selectedQuestion.description }}</span>
          <v-spacer></v-spacer>
          <v-menu bottom left></v-menu>
        </v-card-title>
        <v-card-text>{{ selectedQuestion.answer }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="selectedQuestion = false">Zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      selectedQuestion: null,
      changeColor: '',
    }
  },
  props: ["question"],
  methods: {
    async know() {
      this.changeColor = "#8BC34A";
      await this.$emit("changeNameTransition", "know");
      this.updateQuestionAnswered(true);
    },
    async notKnow() {
      this.changeColor = "#FF5722";
      await this.$emit("changeNameTransition", "notKnow");
      this.updateQuestionAnswered(false);
    },
    removeQuestion() {
      this.$store.getters.questionsPagination.splice(this.$store.getters.questionsPagination.indexOf(this.question),1);
    },
    updateQuestionAnswered(isKnow) {
      let index = this.$store.getters.questionAnswer.findIndex(
        item => item.userId === localStorage.getItem("userId") && item.questionId === this.question.id)
      if( index === -1) {
        this.$store.commit('addQuestionAnswer',
          {
            id : {
              userId : localStorage.getItem("userId"),
              questionId : this.question.id
            },
            user : {
              id : localStorage.getItem("userId")
            },
            question : {
              id : this.question.id
            },
            know : isKnow
          }
        )
      } else {
        let questionAnswerUpdate =  this.$store.getters.questionAnswer.find((item) => {
          return item.user.id === localStorage.getItem("userId") && item.question.id ===this.question.id;
        })
        questionAnswerUpdate.know = isKnow;
      }
      this.removeQuestion();
    }
  },
};
</script>

<style scoped>
.icon {
  font-size: 400%;
}
</style>