<template>
  <div id="app">
    <v-app id="inspire">
      <menu-panel></menu-panel>
      <!-- dodaj dialog -->
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              color="red lighten-2"
              dark
              v-on="on"
            >
              Dodaj pytanie
            </v-btn>
          </template>
    
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Dodaj pytanie
            </v-card-title>
    
            <v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                    >
                       <v-select
                        :items="themes"
                        v-model="selectedTheme"
                        item-text="type"
                        return-object
                        filled
                        label="Kategoria"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="description"
                        label="Opis"
                        required
                      ></v-text-field>
                    </v-col>
            
                    <v-col
                      md="10"
                    >
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
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
                <v-btn @click="addQuestion">Dodaj</v-btn>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
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
export default {
  name: "Questions",
  data() {
    return {
      message: null,
      dialog: false,
      valid: false,
      description: '',
      answer: '',
      selectedTheme: {
        id: 0,
        type:'',
      },
    };
  },
  components: {
    MenuPanel,
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    },
    themes() {
      return this.$store.getters.themes;
    }
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
    removeQuestion(id) {
      this.$store.dispatch('deleteQuestion', id);
    }
  },
  created() {
    this.$store.dispatch('retrieveQuestions');
    this.$store.dispatch('retrieveThemes');
  }
};
</script>

<style>
</style>