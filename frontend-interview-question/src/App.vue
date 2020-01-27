<template>
  <v-app>
    <router-view/> 

    <loader></loader>
  </v-app>
</template>

<script>
import Loader from './components/_loader';
import axios from 'axios';
export default {
  components: {Loader},
  methods: {
    sendToDbWhenTabOrBrowserClosed() {
      window.addEventListener('beforeunload', () => {
        this.$store.commit('LOADER',false);
        this.$store.dispatch('addUserQuestions', this.$store.getters.questionAnswer);
      }, false)
    }
  },
  created() {
   axios.interceptors.request.use((config) => {
     this.$store.commit("LOADER",true);
     return config;
   }, (error) => {
     this.$store.commit('LOADER',false);
     return Promise.reject(error);
   });

   axios.interceptors.response.use((response) => {
      this.$store.commit("LOADER",false);
      return response;
    }, function(error) {
      this.$store.commit('LOADER',false);
      return Promise.reject(error);
    });

    this.sendToDbWhenTabOrBrowserClosed();
    
  }
};
</script>