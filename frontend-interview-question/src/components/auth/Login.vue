<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat class="mb-5">
                <v-toolbar-title>Zaloguj</v-toolbar-title>
              </v-toolbar>
              <v-spacer></v-spacer>
              <v-form class="mx-4 pb-2" ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="credential.login"
                  :rules="loginRules"
                  label="Login"
                  type="text"
                  required
                ></v-text-field>

                <v-text-field
                  class="mb-5"
                  v-model="credential.password"
                  :rules="passwordRules"
                  label="Hasło"
                  type="password"
                  required
                  @keyup.enter="validate"
                ></v-text-field>

                <v-btn :disabled="!valid" color="primary" @click.prevent="validate()">Login</v-btn>
              </v-form>
              <div v-if="isError">
                Błąd podczas logowania
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      credential: {
        login: "",
        password: "", 
      },
      valid: true,
      loginRules: [v => !!v || "Login jest wymagany"],
      passwordRules: [v => !!v || "Hasło jest wymagane"],
      isError: false,
    };
  },
  methods: {
    validate() {
      this.$store.dispatch('retrieveToken', {
        login: this.credential.login,
        password: this.credential.password
      })
      .then(() => {
        localStorage.setItem('login',this.credential.login);
        Array.from(this.getUsers).forEach((item) => {
          if(item.username === this.credential.login && item.roles==="ADMIN") {
            localStorage.setItem('isAdmin',true);
          } 
        })
        this.$router.push("/");
      })
      .catch((error) => {
        this.$store.commit("LOADER",false);  
        console.log(error);
        this.isError = true;
      })
    },
    
  },
  computed: {
    getUsers() {
      return this.$store.getters.users;
    }    
  },
  created() {
    this.$store.dispatch('retrieveUsers');
  }
};
</script>

<style scoped>
</style>
