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

    window.addEventListener('beforeunload', () => {
      console.log(this.$store.getters.questionAnswered);
      this.$store.dispatch('addUserQuestion', this.$store.getters.questionAnswered);
      
    }, false)
  }
};
</script>