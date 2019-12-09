<template>
  <div class="form">
    <div class="form-group">
      <label for="username">username</label>
      <input v-model="credential.username" class="form-control" type="username" id="username" name="username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="credential.password" class="form-control" type="password" id="password" name="password">
    </div>
    <div class="form-group">
      <button @click="login" class="btn btn-primary">Zaloguj</button>
    </div>
  </div> 
</template>

<script lang="ts">
import Vue from 'vue';
import LoginService from '../service/LoginService';
export default Vue.extend({
  data() {
    return {
      credential: {
        username:'',
        password:''
      }
    }
  },
  methods: {
    login() {
      LoginService.login(this.credential)
      .then(response => response)
      .then(result => {
        console.log(result);
      })
    }
  },
  created() {

  }
})
</script>