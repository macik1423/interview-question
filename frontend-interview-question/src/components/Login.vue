<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
                class="mb-5"
              >
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-spacer></v-spacer>
              <v-form
                class="mx-4 pb-2"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="credential.username"
                  :rules="loginRules"
                  label="Login"
                  type="text"
                  required
                ></v-text-field>
            
                <v-text-field
                  class="mb-5"
                  v-model="credential.password"
                  :rules="passwordRules"
                  label="Password"
                  type="password"
                  required
                  @keyup.enter="validate"
                ></v-text-field>

                  <v-btn 
                    :disabled="!valid"
                    color="primary"
                    @click="validate"
                  >
                    Login
                  </v-btn>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
    
</template>

<script>
import LoginService from '../service/LoginService';

export default {
  data() {
    return {
      credential: {
        username:'',
        password:''
      },
      valid: true,
      loginRules: [
        v => !!v || 'Login is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        LoginService.login(this.credential)
        .then(response => response)
        .then(result => {
          console.log(result);
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
