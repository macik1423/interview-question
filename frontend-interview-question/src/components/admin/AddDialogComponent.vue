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
        <add-one-question></add-one-question>
        <add-multiple-questions></add-multiple-questions>
      </v-speed-dial>
    </v-card>
  
</template>

<script>
import AddOneQuestion from "./AddOneQuestion.vue";
import AddMultipleQuestions from "./AddMultipleQuestions.vue";
export default {
  data() {
    return {
      fab: false,
    }
  },
  components: {
    AddOneQuestion,
    AddMultipleQuestions
  },
}
</script>

<style scoped>

</style>