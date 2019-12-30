<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">
          Dodaj pytanie
        </v-btn>
      </template>

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
                    filled
                    label="Kategoria"
                  ></v-select>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      answer: '',
      valid: false,
      dialog: false,
      selectedTheme: {
        id: 0,
        type:'',
      },
    }
  },
  computed: {
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
  },
  created() {
    this.$store.dispatch('retrieveThemes');
  }
}
</script>