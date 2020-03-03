<template>
  <div>
    <menu-panel></menu-panel>
    <v-card class="mx-12 mt-6">
      <v-toolbar flat color="indigo" dark>
        <v-toolbar-title>Panel admina</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-account</v-icon>
          Users
        </v-tab>
        <v-tab>
          <v-icon left>mdi-library-books</v-icon>
          Pytania
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <users-options></users-options>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <questions-options></questions-options>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import MenuPanel from '../../components/MenuPanel.vue';
import UsersOptions from './UsersOptions.vue';
import QuestionsOptions from './QuestionsOptions.vue';
export default {
  data () {
    return {
      
    }
  },
  components: {
    MenuPanel,
    UsersOptions,
    QuestionsOptions,
  },
}
</script>