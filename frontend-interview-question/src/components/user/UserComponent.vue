<template>
  <div>
    <menu-panel></menu-panel>
    Witaj {{login}}
    {{userId}}
    <v-data-table
      :headers="headers"
      :items="questions"
      item-key="name"
      class="elevation-1"
    >
   
    </v-data-table>
  </div>
</template>

<script>
import MenuPanel from "../../components/MenuPanel.vue";
export default {
  data() {
    return {
      login: localStorage.getItem('login'),
      userId: localStorage.getItem('userId'),
      headers: [
        {
          text: 'Pytanie',
          align: 'left',
          sortable: false,
          value: 'question.description',
        },
        { text: 'Odpowiedz', value: 'answer' },
        { text: 'Rodzaj pytania', value: 'themeType' },
        { text: 'Wiem/Nie wiem', value: 'know' },
      ],
    }
  },
  components: {
    MenuPanel,
  },
  computed: {
    questions() {
      console.log("questions",this.$store.getters.userQuestions)
      return this.$store.getters.userQuestions;
    }
  },
  methods: {
    getMappedKnowToPl(know) {
      return know ? "Znam" : "Nie umiem";
    }
  },
  mounted() {
    this.$store.dispatch("retrieveUserQuestions", this.userId);
  }
}
</script>