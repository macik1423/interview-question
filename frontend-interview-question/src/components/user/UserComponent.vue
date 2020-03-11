<template>
  <div>
    <menu-panel></menu-panel>
    
    <v-data-table
      :headers="headers"
      :items="questions"
      item-key="name"
      class="elevation-1"
    >
      <!-- zmienia wartosc item.know z bazy danych true -> znam, false -> nie znam -->
      <template v-slot:item.know="{ item }">
        <div v-if="item.know">Znam</div>
        <div v-else>Nie znam</div>
      </template>
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
        { text: 'Odpowiedz', 
          value: 'question.answer',
          sortable: false, 
        },
        { text: 'Rodzaj pytania', value: 'question.theme.type' },
        { text: 'Wiem/Nie wiem', value: 'know' },
      ],
    }
  },
  components: {
    MenuPanel,
  },
  computed: {
    questions() {
      return this.$store.getters.userQuestions;
    }
  },
  created() {
    this.$store.dispatch("retrieveUserQuestions", this.userId);
  }
}
</script>