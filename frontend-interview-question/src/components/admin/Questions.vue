<template>
    <div id="app">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="question in questions"
          :key="question.id"
        >
          <v-expansion-panel-header>Id pytania {{ question.id }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            Pytanie: {{ question.description }}
            <v-btn @click="removeQuestion(question.id)">usun</v-btn>
            <!-- <v-btn @click="editQuestion(question)">edytuj</v-btn> -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
     
      <add-dialog-component></add-dialog-component>

      <!-- nie moze byc udpate jesli jakis uzytkownik juz odpowie na pytanie - przemyslec -->
      <!-- <v-dialog v-if="questionToEdit" v-model="questionToEdit" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Edytuj pytanie
          </v-card-title>

          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="themes"
                      v-model="theme"
                      item-text="type"
                      return-object
                      label="Kategoria"
                    >{{ questionToEdit.theme.type }}</v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="description"
                      label="Opis"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col md="10">
                    <v-textarea
                      v-model="answer"
                      label="Odpowiedz"
                      required
                    ></v-textarea>
                  </v-col>
                  <v-btn @click="sendEdit(questionToEdit.id)">edytuj</v-btn> 
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog> -->
  </div>
</template>

<script>
import AddDialogComponent from './AddDialogComponent.vue';
export default {
  name: "Questions",
  data() {
    return {
      message: null,
      questionToEdit: null,
      answer: null, 
      description: null, 
      theme: null
    };
  },
  components: {
    AddDialogComponent,
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    },
    themes() {
      return this.$store.getters.themes;
    },
  },
  methods: {
    removeQuestion(id) {
      this.$store.dispatch('deleteQuestion', id);
    },
    fetchQuestions() {
      this.$store.dispatch('retrieveQuestions');
    },
    // editQuestion(question) {
    //   this.questionToEdit = question;
    //   this.answer = question.answer;
    //   this.description = question.description;
    //   this.theme = question.theme.type;
    // },
    // sendEdit(id) {
    //   let question = {
    //     id: id,
    //     theme: {
    //       id: this.theme.id,
    //       type: this.theme.type
    //     },
    //     description: this.description,
    //     answer: this.answer
    //   }
    //   this.$store.dispatch('updateQuestion', id, question);
    // }
  }, 
  mounted() {
    this.fetchQuestions();
  },
};
</script>

<style>
</style>