<template>
    <v-card id="create">
      <v-speed-dial
        v-model="fab"
        bottom
        right
        direction="top"
        fixed
        class="mx-2"
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-pencil</v-icon>
          </v-btn>
        </template>

        <v-btn
          dark
          small
          color="green"
          fab
          @click.stop="dialogPlus = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="dialogPlus" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Dodaj pytanie
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-select
                        :items="themes"
                        v-model="selectedTheme"
                        item-text="type"
                        return-object
                        label="Kategoria"
                      ></v-select>
                    </v-col>
                    <v-col md="12">
                      <v-text-field
                        v-model="description"
                        label="Opis"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col md="12">
                      <v-textarea
                        v-model="answer"
                        label="Odpowiedz"
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                <v-btn @click="addQuestion">Dodaj</v-btn>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn
          dark
          small
          color="indigo"
          fab
          @click.stop = "dialogPlusMultiple = true"
        >
          <v-icon>mdi-plus-box-multiple-outline</v-icon>
        </v-btn>
        <v-dialog v-model="dialogPlusMultiple" width="500">
          <v-card
            class="px-5 py-5"
            max-width="500"
            > 
            <v-file-input v-model="file" show-size counter label="Wybierz plik csv"></v-file-input>
            <v-btn @click="submitFile()">Wyslij</v-btn>
          </v-card>
        </v-dialog>
      </v-speed-dial>
    </v-card>
  
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      fab: false,
      description: '',
      answer: '',
      valid: false,
      dialogPlus: false,
      dialogPlusMultiple: false,
      selectedTheme: {
        id: 0,
        type:'',
      },
      file:[]
    }
  },
  computed: {
    themes() {
      return this.$store.getters.themes;
    },
  },
  methods: {
    addQuestion() {
      this.$store.dispatch('addQuestion', {
        theme: {
          id: this.selectedTheme.id,
          type: this.selectedTheme.type
        },
        description: this.description,
        answer: this.answer
      })
      this.description = '';
      this.answer = '';
      this.selectedTheme = {
        id: 0,
        type:'',
      };
    }, 
    submitFile() {
      let formData = new FormData();
      formData.append('csvFile', this.file);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token;
      let self = this;
      axios.post("/api/admin/newQuestions/upload",
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(function(response) {
          let questions = response.data;
          for(let i = 0; i < questions.length; i++) {
            self.$store.commit("addQuestion", questions[i]);
          }
          console.log("Success!");
        }).catch(function(error) {
          console.log(error)
        })
    },
  },
  created() {
    this.$store.dispatch('retrieveThemes');
  }
}
</script>

<style scoped>

</style>