<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on: onTooltip }">
        <v-col cols="12" sm="12" md="6" offset-md="3">
          <v-tooltip left>
            <template v-slot:activator="{ on: onAdd}">
              <v-btn class="mx-2 mb-10" fab dark color="indigo" v-on="{...onTooltip, ...onAdd}" absolute bottom right fixed>
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Dodaj pytanie</span>
          </v-tooltip>
        </v-col>
        
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