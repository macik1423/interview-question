<template>
  <div>
    <v-btn
      dark
      small
      color="green"
      fab
      @click.stop="dialogPlus = true"
    >
      <v-icon>mdi-plus-one</v-icon>
    </v-btn>
    <v-dialog v-model="dialogPlus" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Dodaj pytanie
        </v-card-title>

        <v-card-text>
          <form>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  :items="themes"
                  v-model="selectedTheme"
                  :error-messages="selectErrors"
                  item-text="type"
                  return-object
                  label="Kategoria"
                  required
                  @change="$v.selectedTheme.$touch()"
                  @blur="$v.selectedTheme.$touch()"
                ></v-select>
              </v-col>
              <v-col md="12">
                <v-text-field
                  v-model="description"
                  :error-messages="descriptionErrors"
                  label="Opis"
                  required
                  @input="$v.description.$touch()"
                  @blur="$v.description.$touch()"
                ></v-text-field>
              </v-col>

              <v-col md="12">
                <v-textarea
                  v-model="answer"
                  :error-messages="answerErrors"
                  label="Odpowiedz"
                  required
                  @input="$v.answer.$touch()"
                  @blur="$v.answer.$touch()"
                ></v-textarea>
              </v-col>
            </v-row>
          </form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">
            <v-btn @click="addQuestion">Dodaj</v-btn>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'


export default {
  mixins: [validationMixin],

  validations: {
    description: { required },
    selectedTheme: { required },
    answer: { required }
  },

  data() {
    return {
      fab: false,
      description: '',
      answer: '',
      dialogPlus: false,
      selectedTheme: {},
    }
  },
  computed: {
    themes() {
      return this.$store.getters.themes;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push('Opis jest wymagany');
      return errors;
    },
    answerErrors() {
      const errors = [];
      if (!this.$v.answer.$dirty) return errors;
      !this.$v.answer.required && errors.push('Opis jest wymagany');
      return errors;
    },
    selectErrors () {
      const errors = [];
      if (!this.$v.selectedTheme.$dirty) return errors;
      !this.$v.selectedTheme.required && errors.push('Wybierz język');
      return errors;
    },
  },
  methods: {
    addQuestion() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
        this.selectedTheme = {};
        this.dialogPlus = false;
        this.$v.$reset();
      }
      
    }, 
  },
  created() {
    this.$store.dispatch('retrieveThemes');
  }
}
</script>