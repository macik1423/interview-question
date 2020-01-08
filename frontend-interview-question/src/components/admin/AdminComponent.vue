<template>
  <div id="app">
    <v-app id="inspire">
      <menu-panel></menu-panel>
      <v-card>
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-1 indigo--text">Admin panel</h1>
        </v-card-title>
    
        <v-tabs
          v-model="activeTab"
          background-color="transparent"
          color="indigo"
          grow
        >
          <v-tab 
            v-for="tab in tabs" 
            :key="tab.index" 
            :to="tab.route">
            {{ tab.name }}
          </v-tab>

        </v-tabs>
    
        <v-tabs-items v-model="activeTab">
          <v-tab-item v-for="tab in tabs" :key="tab.id" :id="tab.id">
            <router-view></router-view>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import MenuPanel from '../../components/MenuPanel.vue';
export default {
  data () {
    return {
      activeTab: null,
      tabs: [
        { route: "questions", id: "questions", name: "Pytania"},
        { route: "users", id: "users", name: "Uzytkownicy"}
      ]
    }
  },
  components: {
    MenuPanel,
  },
}
</script>

<style scoped>
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: indigo !important;
}
</style>