<template>
  <div>
    <v-btn
      dark
      small
      color="indigo"
      fab
      @click.stop = "dialogPlusMultiple = true"
    >
      <v-icon>mdi-numeric-9-plus-box-multiple-outline</v-icon>  
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      fab: false,
      dialogPlusMultiple: false,
      file:[],
    }
  },
  methods: {
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
        }
      )
    },
  },
}
</script>