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
     console.log(config);
     return config;
   }, (error) => {
     console.log(error);
     this.$store.commit('LOADER',false);
     return Promise.reject(error);
   });

   axios.interceptors.response.use((response) => {
      this.$store.commit("LOADER",false);  
      console.log(response);
      return response;
    }, function(error) {
      console.log(error);
      this.$store.commit('LOADER',false);
      return Promise.reject(error);
    })
  }
};
</script>